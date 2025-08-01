import { State } from "../state.js";
import { Container } from "@akala/commands";
import { BasicVideoPlayer, Binding, BridgeConfiguration, clusterFactory, ClusterIds, ClusterMap, CommissionningCluster, EndpointProxy, MatterClusterIds, mediaPlaybackCluster, registerNode, RootNode, targetNavigatorCluster } from "@domojs/devices";
import { Context } from "@akala/core";
import app, { pubsub, SidecarConfiguration } from "@akala/sidecar";
import { ProxyConfiguration } from "@akala/config";
import { CECKeyCodeEnum } from "@domojs/devices/src/codegen/clusters/keypad-input-cluster.js";
import { IscpMessage, protocol } from "../iscp-processor.js";
import { parserWrite } from '@akala/protocol-parser';

import { networkInterfaces } from 'os'
import dgram from 'dgram'
import { resolve } from "path";

var state: State = null;

function broadcastv4(ip: string, netmask: string)
{
    const ipParts = ip.split('.');
    const netmaskParts = netmask.split('.');

    return ipParts.map((part, i) =>
    {
        return Number(part) | (Number(netmaskParts) & 0xFF)
    }).join('.')
}

export default async function init(this: State, container: Container<void>, context: Context<ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{
    state = this;
    state.collection = {};

    const sidecar = await app(context);

    state.fabric = await registerNode('iscp', sidecar, context.state);

    const onkyo_magic = parserWrite(protocol, new IscpMessage('!xECNQSTN'));
    const pioneer_magic = parserWrite(protocol, new IscpMessage('!pECNQSTN'));

    for (const iface of Object.values(networkInterfaces()))
    {
        for (const netInfo of iface)
        {
            const sock = dgram.createSocket({
                type: netInfo.family == 'IPv4' ? 'udp4' : 'udp6',
                signal: context.abort.signal,
            },
                (data, remote) =>
                {

                    new BasicVideoPlayer(0, {
                        audioOutput: clusterFactory({
                            id: MatterClusterIds.AudioOutput,
                            async SelectOutputCommand(i)
                            {
                                this.CurrentOutput = i;
                            },
                            CurrentOutput: 0,
                            OutputList: [],
                            SupportsNameUpdates: false,
                        }),
                        channel: clusterFactory({
                            id: MatterClusterIds.Channel,
                            async ChangeChannelByNumberCommand(major, minor)
                            {

                            },
                            async SkipChannelCommand(count)
                            {

                            },
                            SupportsChannelList: false,
                            SupportsElectronicGuide: false,
                            SupportsLineupInfo: false,
                            SupportsRecordProgram: false
                        }),
                        contentControl: clusterFactory({
                            id: MatterClusterIds.ContentControl,
                            Enabled: false,
                            SupportsBlockUnrated: false,
                            SupportsOnDemandContentRating: false,
                            SupportsPINManagement: false,
                            SupportsScheduledContentRating: false,
                            SupportsScreenTime: false,
                        }),
                        fixedLabel: clusterFactory({
                            id: MatterClusterIds.FixedLabel,
                            LabelList: []
                        }),
                        lowPower: clusterFactory({
                            id: MatterClusterIds.LowPower,
                            async SleepCommand()
                            {

                            }
                        }),
                        mediaInput: clusterFactory({
                            CurrentInput: 0,
                            async HideInputStatusCommand() { },
                            id: MatterClusterIds.MediaInput,
                            InputList: [],
                            async SelectInputCommand(index)
                            {
                                this.setValue('CurrentInput', index);
                            },
                            async ShowInputStatusCommand() { },
                            SupportsNameUpdates: false
                        }),
                        mediaPlayback: clusterFactory({
                            id: MatterClusterIds.MediaPlayback,
                            CurrentState: mediaPlaybackCluster.PlaybackStateEnum.NotPlaying,
                            async PauseCommand()
                            {
                                return [mediaPlaybackCluster.StatusEnum.NotAllowed, ''];
                            },
                            async PlayCommand()
                            {
                                return [mediaPlaybackCluster.StatusEnum.NotAllowed, ''];
                            },
                            async StopCommand()
                            {
                                return [mediaPlaybackCluster.StatusEnum.NotAllowed, ''];
                            },
                            SupportsAdvancedSeek: false,
                            SupportsAudioAdvance: false,
                            SupportsAudioTracks: false,
                            SupportsTextTracks: false,
                            SupportsVariableSpeed: false,
                        }),
                        messages: clusterFactory({
                            id: MatterClusterIds.Messages,
                            ActiveMessageIDs: [],
                            async CancelMessagesRequestCommand(messageIds)
                            {

                            },
                            Messages: [],
                            async PresentMessagesRequestCommand(messageId, priority, control, startTime, duration, text, responses) { },
                            SupportsConfirmationReply: false,
                            SupportsConfirmationResponse: false,
                            SupportsProtectedMessages: false,
                            SupportsReceivedConfirmation: false,
                        }),
                        onOff: clusterFactory({
                            id: MatterClusterIds.OnOff,
                            async OffCommand() { },
                            async OnCommand() { },
                            async ToggleCommand() { },
                            OnOff: false,
                            SupportsDeadFrontBehavior: false,
                            SupportsLighting: false,
                            SupportsOffOnly: false,
                        }),
                        targetNavigator: clusterFactory({
                            id: MatterClusterIds.TargetNavigator,
                            async NavigateTargetCommand(target, data)
                            {
                                return [targetNavigatorCluster.StatusEnum.NotAllowed, '']
                            },
                            TargetList: [],
                            CurrentTarget: 0
                        }),
                        userLabel: clusterFactory({
                            id: MatterClusterIds.UserLabel,
                        }),
                        wakeOnLAN: clusterFactory({
                            id: MatterClusterIds.WakeOnLAN,
                        }),
                        binding: Binding(),
                        keypadInput: clusterFactory({
                            id: MatterClusterIds.KeypadInput,
                            SendKeyCommand(key)
                            {
                                switch (key)
                                {
                                    case CECKeyCodeEnum.Select:
                                    case CECKeyCodeEnum.Up:
                                    case CECKeyCodeEnum.Down:
                                    case CECKeyCodeEnum.Left:
                                    case CECKeyCodeEnum.Right:
                                    case CECKeyCodeEnum.RightUp:
                                    case CECKeyCodeEnum.RightDown:
                                    case CECKeyCodeEnum.LeftUp:
                                    case CECKeyCodeEnum.LeftDown:
                                    case CECKeyCodeEnum.RootMenu:
                                    case CECKeyCodeEnum.SetupMenu:
                                    case CECKeyCodeEnum.ContentsMenu:
                                    case CECKeyCodeEnum.FavoriteMenu:
                                    case CECKeyCodeEnum.Exit:
                                    case CECKeyCodeEnum.MediaTopMenu:
                                    case CECKeyCodeEnum.MediaContextSensitiveMenu:
                                    case CECKeyCodeEnum.NumberEntryMode:
                                    case CECKeyCodeEnum.Number11:
                                    case CECKeyCodeEnum.Number12:
                                    case CECKeyCodeEnum.Number0OrNumber10:
                                    case CECKeyCodeEnum.Numbers1:
                                    case CECKeyCodeEnum.Numbers2:
                                    case CECKeyCodeEnum.Numbers3:
                                    case CECKeyCodeEnum.Numbers4:
                                    case CECKeyCodeEnum.Numbers5:
                                    case CECKeyCodeEnum.Numbers6:
                                    case CECKeyCodeEnum.Numbers7:
                                    case CECKeyCodeEnum.Numbers8:
                                    case CECKeyCodeEnum.Numbers9:
                                    case CECKeyCodeEnum.Dot:
                                    case CECKeyCodeEnum.Enter:
                                    case CECKeyCodeEnum.Clear:
                                    case CECKeyCodeEnum.NextFavorite:
                                    case CECKeyCodeEnum.ChannelUp:
                                    case CECKeyCodeEnum.ChannelDown:
                                    case CECKeyCodeEnum.PreviousChannel:
                                    case CECKeyCodeEnum.SoundSelect:
                                    case CECKeyCodeEnum.InputSelect:
                                    case CECKeyCodeEnum.DisplayInformation:
                                    case CECKeyCodeEnum.Help:
                                    case CECKeyCodeEnum.PageUp:
                                    case CECKeyCodeEnum.PageDown:
                                    case CECKeyCodeEnum.Power:
                                    case CECKeyCodeEnum.VolumeUp:
                                    case CECKeyCodeEnum.VolumeDown:
                                    case CECKeyCodeEnum.Mute:
                                    case CECKeyCodeEnum.Play:
                                    case CECKeyCodeEnum.Stop:
                                    case CECKeyCodeEnum.Pause:
                                    case CECKeyCodeEnum.Record:
                                    case CECKeyCodeEnum.Rewind:
                                    case CECKeyCodeEnum.FastForward:
                                    case CECKeyCodeEnum.Eject:
                                    case CECKeyCodeEnum.Forward:
                                    case CECKeyCodeEnum.Backward:
                                    case CECKeyCodeEnum.StopRecord:
                                    case CECKeyCodeEnum.PauseRecord:
                                    case CECKeyCodeEnum.Reserved:
                                    case CECKeyCodeEnum.Angle:
                                    case CECKeyCodeEnum.SubPicture:
                                    case CECKeyCodeEnum.VideoOnDemand:
                                    case CECKeyCodeEnum.ElectronicProgramGuide:
                                    case CECKeyCodeEnum.TimerProgramming:
                                    case CECKeyCodeEnum.InitialConfiguration:
                                    case CECKeyCodeEnum.SelectBroadcastType:
                                    case CECKeyCodeEnum.SelectSoundPresentation:
                                    case CECKeyCodeEnum.PlayFunction:
                                    case CECKeyCodeEnum.PausePlayFunction:
                                    case CECKeyCodeEnum.RecordFunction:
                                    case CECKeyCodeEnum.PauseRecordFunction:
                                    case CECKeyCodeEnum.StopFunction:
                                    case CECKeyCodeEnum.MuteFunction:
                                    case CECKeyCodeEnum.RestoreVolumeFunction:
                                    case CECKeyCodeEnum.TuneFunction:
                                    case CECKeyCodeEnum.SelectMediaFunction:
                                    case CECKeyCodeEnum.SelectAvInputFunction:
                                    case CECKeyCodeEnum.SelectAudioInputFunction:
                                    case CECKeyCodeEnum.PowerToggleFunction:
                                    case CECKeyCodeEnum.F1Blue:
                                    case CECKeyCodeEnum.F2Red:
                                    case CECKeyCodeEnum.F3Green:
                                    case CECKeyCodeEnum.F4Yellow:
                                    case CECKeyCodeEnum.F5:
                                    case CECKeyCodeEnum.Data:
                                        return Promise.reject();
                                    case CECKeyCodeEnum.PowerOnFunction:
                                    case CECKeyCodeEnum.PowerOffFunction:

                                        break;
                                }
                            },
                            SupportsLocationKeys: false,
                            SupportsNavigationKeyCodes: true,
                            SupportsNumberKeys: false,
                        })
                    });
                }
            );
            await new Promise<void>(resolve => sock.bind(undefined, netInfo.address, () => resolve()));
            sock.setBroadcast(true);
            if (netInfo.family == 'IPv4')
            {
                await new Promise<void>((resolve, reject) => sock.send(onkyo_magic.toArray(), 60128, broadcastv4(netInfo.address, netInfo.netmask), err => err ? reject(err) : resolve()));
                await new Promise<void>((resolve, reject) => sock.send(pioneer_magic.toArray(), 60128, broadcastv4(netInfo.address, netInfo.netmask), err => err ? reject(err) : resolve()));
            }

        }
    }
}