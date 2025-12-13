import { State } from "../state.js";
import { Container } from "@akala/commands";
import { BasicVideoPlayer, Binding, BridgeConfiguration, clusterFactory, ClusterIds, ClusterMap, CommissionningCluster, EndpointProxy, MatterClusterIds, mediaPlaybackCluster, registerNode, RootNode, targetNavigatorCluster } from "@domojs/devices";
import { Context } from "@akala/core";
import app, { pubsub, SidecarConfiguration } from "@akala/sidecar";
import { ProxyConfiguration } from "@akala/config";
import { keypadInputCluster } from "@domojs/devices";
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

    state.fabric = await registerNode('iscp', sidecar, context.state, context.abort.signal);

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
                            async EnableCommand()
                            {
                                this.Enabled = true;
                            },
                            async DisableCommand()
                            {
                                this.Enabled = false;
                            },
                            Enabled: false,
                            SupportsBlockApplications: false,
                            SupportsBlockChannels: false,
                            SupportsBlockContentTimeWindow: false,
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
                                    case keypadInputCluster.CECKeyCodeEnum.Select:
                                    case keypadInputCluster.CECKeyCodeEnum.Up:
                                    case keypadInputCluster.CECKeyCodeEnum.Down:
                                    case keypadInputCluster.CECKeyCodeEnum.Left:
                                    case keypadInputCluster.CECKeyCodeEnum.Right:
                                    case keypadInputCluster.CECKeyCodeEnum.RightUp:
                                    case keypadInputCluster.CECKeyCodeEnum.RightDown:
                                    case keypadInputCluster.CECKeyCodeEnum.LeftUp:
                                    case keypadInputCluster.CECKeyCodeEnum.LeftDown:
                                    case keypadInputCluster.CECKeyCodeEnum.RootMenu:
                                    case keypadInputCluster.CECKeyCodeEnum.SetupMenu:
                                    case keypadInputCluster.CECKeyCodeEnum.ContentsMenu:
                                    case keypadInputCluster.CECKeyCodeEnum.FavoriteMenu:
                                    case keypadInputCluster.CECKeyCodeEnum.Exit:
                                    case keypadInputCluster.CECKeyCodeEnum.MediaTopMenu:
                                    case keypadInputCluster.CECKeyCodeEnum.MediaContextSensitiveMenu:
                                    case keypadInputCluster.CECKeyCodeEnum.NumberEntryMode:
                                    case keypadInputCluster.CECKeyCodeEnum.Number11:
                                    case keypadInputCluster.CECKeyCodeEnum.Number12:
                                    case keypadInputCluster.CECKeyCodeEnum.Number0OrNumber10:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers1:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers2:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers3:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers4:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers5:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers6:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers7:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers8:
                                    case keypadInputCluster.CECKeyCodeEnum.Numbers9:
                                    case keypadInputCluster.CECKeyCodeEnum.Dot:
                                    case keypadInputCluster.CECKeyCodeEnum.Enter:
                                    case keypadInputCluster.CECKeyCodeEnum.Clear:
                                    case keypadInputCluster.CECKeyCodeEnum.NextFavorite:
                                    case keypadInputCluster.CECKeyCodeEnum.ChannelUp:
                                    case keypadInputCluster.CECKeyCodeEnum.ChannelDown:
                                    case keypadInputCluster.CECKeyCodeEnum.PreviousChannel:
                                    case keypadInputCluster.CECKeyCodeEnum.SoundSelect:
                                    case keypadInputCluster.CECKeyCodeEnum.InputSelect:
                                    case keypadInputCluster.CECKeyCodeEnum.DisplayInformation:
                                    case keypadInputCluster.CECKeyCodeEnum.Help:
                                    case keypadInputCluster.CECKeyCodeEnum.PageUp:
                                    case keypadInputCluster.CECKeyCodeEnum.PageDown:
                                    case keypadInputCluster.CECKeyCodeEnum.Power:
                                    case keypadInputCluster.CECKeyCodeEnum.VolumeUp:
                                    case keypadInputCluster.CECKeyCodeEnum.VolumeDown:
                                    case keypadInputCluster.CECKeyCodeEnum.Mute:
                                    case keypadInputCluster.CECKeyCodeEnum.Play:
                                    case keypadInputCluster.CECKeyCodeEnum.Stop:
                                    case keypadInputCluster.CECKeyCodeEnum.Pause:
                                    case keypadInputCluster.CECKeyCodeEnum.Record:
                                    case keypadInputCluster.CECKeyCodeEnum.Rewind:
                                    case keypadInputCluster.CECKeyCodeEnum.FastForward:
                                    case keypadInputCluster.CECKeyCodeEnum.Eject:
                                    case keypadInputCluster.CECKeyCodeEnum.Forward:
                                    case keypadInputCluster.CECKeyCodeEnum.Backward:
                                    case keypadInputCluster.CECKeyCodeEnum.StopRecord:
                                    case keypadInputCluster.CECKeyCodeEnum.PauseRecord:
                                    case keypadInputCluster.CECKeyCodeEnum.Reserved:
                                    case keypadInputCluster.CECKeyCodeEnum.Angle:
                                    case keypadInputCluster.CECKeyCodeEnum.SubPicture:
                                    case keypadInputCluster.CECKeyCodeEnum.VideoOnDemand:
                                    case keypadInputCluster.CECKeyCodeEnum.ElectronicProgramGuide:
                                    case keypadInputCluster.CECKeyCodeEnum.TimerProgramming:
                                    case keypadInputCluster.CECKeyCodeEnum.InitialConfiguration:
                                    case keypadInputCluster.CECKeyCodeEnum.SelectBroadcastType:
                                    case keypadInputCluster.CECKeyCodeEnum.SelectSoundPresentation:
                                    case keypadInputCluster.CECKeyCodeEnum.PlayFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.PausePlayFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.RecordFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.PauseRecordFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.StopFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.MuteFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.RestoreVolumeFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.TuneFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.SelectMediaFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.SelectAvInputFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.SelectAudioInputFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.PowerToggleFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.F1Blue:
                                    case keypadInputCluster.CECKeyCodeEnum.F2Red:
                                    case keypadInputCluster.CECKeyCodeEnum.F3Green:
                                    case keypadInputCluster.CECKeyCodeEnum.F4Yellow:
                                    case keypadInputCluster.CECKeyCodeEnum.F5:
                                    case keypadInputCluster.CECKeyCodeEnum.Data:
                                        return Promise.reject();
                                    case keypadInputCluster.CECKeyCodeEnum.PowerOnFunction:
                                    case keypadInputCluster.CECKeyCodeEnum.PowerOffFunction:

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