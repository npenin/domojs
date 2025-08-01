async function generateSalt(length = 16): Promise<Uint8Array>
{
    return crypto.getRandomValues(new Uint8Array(length));
}

function passcodeToBytes(pin: number): Uint8Array
{
    const str = pin.toString();
    return new TextEncoder().encode(str);
}

async function deriveScalar(passcode: number, salt: Uint8Array, iterations: number): Promise<Uint8Array>
{
    const passcodeBytes = passcodeToBytes(passcode);

    const baseKey = await crypto.subtle.importKey(
        'raw',
        passcodeBytes,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            hash: 'SHA-256',
            salt,
            iterations,
        },
        baseKey,
        256 // 32 bytes * 8 bits
    );

    return new Uint8Array(derivedBits);
}

async function generateVerifierFromScalar(scalar: Uint8Array): Promise<Uint8Array>
{
    // Import the scalar as a raw P-256 private key
    const privateKey = await crypto.subtle.importKey(
        'raw',
        scalar,
        {
            name: 'ECDSA', // or 'ECDH', Matter uses PASE which is SPAKE2+ over P-256
            namedCurve: 'P-256',
        },
        false,
        ['sign'] // or ['deriveBits'] if using ECDH
    );

    // Export public key in spki format (ASN.1 DER)
    const publicKeySpki = await crypto.subtle.exportKey('spki', privateKey);

    return new Uint8Array(publicKeySpki);
}

const setupPin = 20202021;
const iterations = 1000;

const salt = await generateSalt();

const scalar = await deriveScalar(setupPin, salt, iterations);

const verifier = await generateVerifierFromScalar(scalar);

console.log('Salt (base64):', Buffer.from(salt).toString('base64'));
console.log('Verifier (spki hex):', Buffer.from(verifier).toString('hex'));
console.log('Iterations:', iterations);
