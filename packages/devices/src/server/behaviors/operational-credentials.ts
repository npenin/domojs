import { IsomorphicBuffer, ObservableObject } from '@akala/core';
import { ClusterIds, operationalCredentialsCluster } from '../../codegen/clusters/clusters-index.js'
import { ClusterEvents, ClusterInstanceLight } from '../clients/index.js'
import { Descriptor } from './descriptor.js';
import { ProxyConfiguration } from '@akala/config';

export function OperationalCredentials(options: {
    dac: CryptoKey, pai: CryptoKey, state: ProxyConfiguration<{ credentials: { fabricId: number, identity: CryptoKeyPair, ipk: IsomorphicBuffer, caseAdminSubject: bigint }[] }>
})
{
    const vidVerificationStatements = [];
    const operationalIdentities: Map<number, CryptoKeyPair> = new Map();
    let ephemeralKeyPair: CryptoKeyPair | undefined;
    // After creating descriptor:
    Object.entries(options.state).forEach(e =>
    {
        operationalIdentities.set(e[0] as unknown as number, e[1].identity);
    })

    const cluster = new ObservableObject<ClusterInstanceLight<operationalCredentialsCluster.OperationalCredentials> & ClusterEvents<operationalCredentialsCluster.OperationalCredentials>>({
        id: ClusterIds.OperationalCredentials,
        async AddNOCCommand(noc, icac, ipk, caseAdminSubject, vendorId)
        {
            if (!ephemeralKeyPair)
                return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.MissingCsr, 0, 'Missing ephemeral key'];

            if (!(ipk instanceof IsomorphicBuffer))
                return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.InvalidAdminSubject, 0, 'Invalid IPK type'];

            if (typeof caseAdminSubject !== 'bigint')
                return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.InvalidAdminSubject, 0, 'Invalid caseAdminSubject'];

            if (typeof vendorId !== 'number')
                return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.InvalidAdminSubject, 0, 'Invalid vendorId'];

            // TODO: Parse NOC to extract actual FabricID from certificate if needed
            const fabricId = this.target.Fabrics.length;

            this.setValue('NOCs', this.target.NOCs.concat([{ NOC: noc, ICAC: icac }]));
            this.setValue('Fabrics', this.target.Fabrics.concat([{
                FabricID: fabricId,
                Label: '',
                NodeID: '',
                RootPublicKey: IsomorphicBuffer.fromArrayBuffer(await crypto.subtle.exportKey('spki', ephemeralKeyPair.publicKey)),
                VendorID: vendorId,
            }]));

            // Persist the operational key pair
            options.state.credentials.push({ fabricId, identity: ephemeralKeyPair, ipk, caseAdminSubject });
            await options.state.commit();

            operationalIdentities.set(fabricId, ephemeralKeyPair);
            ephemeralKeyPair = undefined;

            return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.OK, fabricId, ''];
        },

        async AddTrustedRootCertificateCommand(rootCA)
        {
            this.setValue('TrustedRootCertificates', this.target.TrustedRootCertificates.concat([rootCA]));
        },

        async AttestationRequestCommand(AttestationNonce)
        {
            const nonceBuf = AttestationNonce instanceof Uint8Array ? AttestationNonce : AttestationNonce.toArray();

            const attestationElements = new Uint8Array([
                ...nonceBuf,
                0x15,
                0x00
            ]);

            const signature = await crypto.subtle.sign(
                { name: 'ECDSA', hash: { name: 'SHA-256' } },
                options.dac,
                attestationElements
            );

            return [new IsomorphicBuffer(attestationElements), IsomorphicBuffer.fromArrayBuffer(signature)];
        },

        async CertificateChainRequestCommand(CertificateType)
        {
            const fs = await import('fs/promises');
            let certPath = '';
            if (CertificateType === operationalCredentialsCluster.CertificateChainTypeEnum.DACCertificate)
                certPath = './certs/dacCert.der';
            else if (CertificateType === operationalCredentialsCluster.CertificateChainTypeEnum.PAICertificate)
                certPath = './certs/paiCert.der';
            else
                return [new IsomorphicBuffer(new Uint8Array())];

            try
            {
                const certBuf = await fs.readFile(certPath);
                return [new IsomorphicBuffer(certBuf)];
            } catch (err)
            {
                return [new IsomorphicBuffer(new Uint8Array())];
            }
        },

        get CommissionedFabrics() { return this.Fabrics.length },

        async CSRRequestCommand(CSRNonce, IsForUpdateNOC)
        {
            const nonceBuf = CSRNonce instanceof Uint8Array ? CSRNonce : CSRNonce.toArray();

            ephemeralKeyPair = await crypto.subtle.generateKey(
                {
                    name: 'ECDSA',
                    namedCurve: 'P-256'
                },
                true,
                ['sign', 'verify']
            );

            const exportedSpki = new Uint8Array(await crypto.subtle.exportKey('spki', ephemeralKeyPair.publicKey));

            const csrElements = new Uint8Array([
                0x15, ...[nonceBuf.length], ...nonceBuf,
                0x16, ...[exportedSpki.length], ...exportedSpki
            ]);

            const signature = await crypto.subtle.sign(
                { name: 'ECDSA', hash: { name: 'SHA-256' } },
                ephemeralKeyPair.privateKey,
                csrElements
            );

            return [new IsomorphicBuffer(csrElements), IsomorphicBuffer.fromArrayBuffer(signature)];
        },

        CurrentFabricIndex: 0,
        Fabrics: [],
        NOCs: [],
        async RemoveFabricCommand(idx)
        {
            if (idx < 0 || idx >= this.target.Fabrics.length)

                return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.InvalidFabricIndex, idx, ''];

            const fabricId = this.target.Fabrics[idx].FabricID;

            this.setValue('Fabrics', this.target.Fabrics.toSpliced(idx, 1));
            this.setValue('NOCs', this.target.NOCs.toSpliced(idx, 1));  // keep arrays in sync

            operationalIdentities.delete(fabricId);

            return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.OK, this.target.CurrentFabricIndex, ''];
        },
        TrustedRootCertificates: [],
        SupportedFabrics: 5,

        async SetVIDVerificationStatementCommand(VendorID, VIDVerificationStatement, VVSC)
        {
            vidVerificationStatements.push({ VendorID, VIDVerificationStatement, VVSC });
        },

        async SignVIDVerificationRequestCommand(FabricIndex, ClientChallenge)
        {
            const challengeBuf = ClientChallenge instanceof Uint8Array ? ClientChallenge : ClientChallenge.toArray();

            const signature = await crypto.subtle.sign(
                { name: 'ECDSA', hash: { name: 'SHA-256' } },
                options.dac,
                challengeBuf
            );

            const FabricBindingVersion = 1;
            return [FabricIndex, FabricBindingVersion, IsomorphicBuffer.fromArrayBuffer(signature)];
        },

        async UpdateFabricLabelCommand(Label)
        {
            const idx = this.target.CurrentFabricIndex;
            if (this.target.Fabrics && this.target.Fabrics[idx])
            {
                if (this.target.Fabrics.find((f, i) => f.Label === Label && i !== idx))
                    return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.LabelConflict, idx, ''];
                this.target.Fabrics[idx].Label = Label;
                this.setValue('Fabrics', this.target.Fabrics);
            }
            return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.OK, idx, ''];
        },

        async UpdateNOCCommand(NOC, ICAC)
        {
            const idx = this.target.CurrentFabricIndex;
            if (this.target.NOCs && this.target.NOCs[idx])
            {
                this.target.NOCs[idx].NOC = NOC;
                this.target.NOCs[idx].ICAC = ICAC;
                this.setValue('NOCs', this.target.NOCs);
                return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.OK, idx, ''];
            }
            return [operationalCredentialsCluster.NodeOperationalCertStatusEnum.InvalidNOC, idx, ''];
        },
    });

    return cluster;
}
