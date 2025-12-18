import { State } from "../state.js";
import { Container } from "@akala/commands";
import { BasicVideoPlayer, Binding, BridgeConfiguration, clusterFactory, ClusterIds, ClusterMap, CommissionningCluster, EndpointProxy, keypadInput, MatterClusterIds, mediaPlayback, registerNode, RootNode, targetNavigator } from "@domojs/devices";
import { Context } from "@akala/core";
import app, { pubsub, SidecarConfiguration } from "@akala/sidecar";
import { ProxyConfiguration } from "@akala/config";
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

                    new BasicVideoPlayer('test', 0, {
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
                            CurrentState: mediaPlayback.PlaybackStateEnum.NotPlaying,
                            async PauseCommand()
                            {
                                return [mediaPlayback.StatusEnum.NotAllowed, ''];
                            },
                            async PlayCommand()
                            {
                                return [mediaPlayback.StatusEnum.NotAllowed, ''];
                            },
                            async StopCommand()
                            {
                                return [mediaPlayback.StatusEnum.NotAllowed, ''];
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
                                return [targetNavigator.StatusEnum.NotAllowed, '']
                            },
                            TargetList: [],
                            CurrentTarget: 0
                        }),
                        userLabel: clusterFactory({
                            id: MatterClusterIds.UserLabel,
                            LabelList: []
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
                                    case keypadInput.CecKeyCodeEnum.Select:
                                    case keypadInput.CecKeyCodeEnum.Up:
                                    case keypadInput.CecKeyCodeEnum.Down:
                                    case keypadInput.CecKeyCodeEnum.Left:
                                    case keypadInput.CecKeyCodeEnum.Right:
                                    case keypadInput.CecKeyCodeEnum.RightUp:
                                    case keypadInput.CecKeyCodeEnum.RightDown:
                                    case keypadInput.CecKeyCodeEnum.LeftUp:
                                    case keypadInput.CecKeyCodeEnum.LeftDown:
                                    case keypadInput.CecKeyCodeEnum.RootMenu:
                                    case keypadInput.CecKeyCodeEnum.SetupMenu:
                                    case keypadInput.CecKeyCodeEnum.ContentsMenu:
                                    case keypadInput.CecKeyCodeEnum.FavoriteMenu:
                                    case keypadInput.CecKeyCodeEnum.Exit:
                                    case keypadInput.CecKeyCodeEnum.MediaTopMenu:
                                    case keypadInput.CecKeyCodeEnum.MediaContextSensitiveMenu:
                                    case keypadInput.CecKeyCodeEnum.NumberEntryMode:
                                    case keypadInput.CecKeyCodeEnum.Number11:
                                    case keypadInput.CecKeyCodeEnum.Number12:
                                    case keypadInput.CecKeyCodeEnum.Number0OrNumber10:
                                    case keypadInput.CecKeyCodeEnum.Numbers1:
                                    case keypadInput.CecKeyCodeEnum.Numbers2:
                                    case keypadInput.CecKeyCodeEnum.Numbers3:
                                    case keypadInput.CecKeyCodeEnum.Numbers4:
                                    case keypadInput.CecKeyCodeEnum.Numbers5:
                                    case keypadInput.CecKeyCodeEnum.Numbers6:
                                    case keypadInput.CecKeyCodeEnum.Numbers7:
                                    case keypadInput.CecKeyCodeEnum.Numbers8:
                                    case keypadInput.CecKeyCodeEnum.Numbers9:
                                    case keypadInput.CecKeyCodeEnum.Dot:
                                    case keypadInput.CecKeyCodeEnum.Enter:
                                    case keypadInput.CecKeyCodeEnum.Clear:
                                    case keypadInput.CecKeyCodeEnum.NextFavorite:
                                    case keypadInput.CecKeyCodeEnum.ChannelUp:
                                    case keypadInput.CecKeyCodeEnum.ChannelDown:
                                    case keypadInput.CecKeyCodeEnum.PreviousChannel:
                                    case keypadInput.CecKeyCodeEnum.SoundSelect:
                                    case keypadInput.CecKeyCodeEnum.InputSelect:
                                    case keypadInput.CecKeyCodeEnum.DisplayInformation:
                                    case keypadInput.CecKeyCodeEnum.Help:
                                    case keypadInput.CecKeyCodeEnum.PageUp:
                                    case keypadInput.CecKeyCodeEnum.PageDown:
                                    case keypadInput.CecKeyCodeEnum.Power:
                                    case keypadInput.CecKeyCodeEnum.VolumeUp:
                                    case keypadInput.CecKeyCodeEnum.VolumeDown:
                                    case keypadInput.CecKeyCodeEnum.Mute:
                                    case keypadInput.CecKeyCodeEnum.Play:
                                    case keypadInput.CecKeyCodeEnum.Stop:
                                    case keypadInput.CecKeyCodeEnum.Pause:
                                    case keypadInput.CecKeyCodeEnum.Record:
                                    case keypadInput.CecKeyCodeEnum.Rewind:
                                    case keypadInput.CecKeyCodeEnum.FastForward:
                                    case keypadInput.CecKeyCodeEnum.Eject:
                                    case keypadInput.CecKeyCodeEnum.Forward:
                                    case keypadInput.CecKeyCodeEnum.Backward:
                                    case keypadInput.CecKeyCodeEnum.StopRecord:
                                    case keypadInput.CecKeyCodeEnum.PauseRecord:
                                    case keypadInput.CecKeyCodeEnum.Reserved:
                                    case keypadInput.CecKeyCodeEnum.Angle:
                                    case keypadInput.CecKeyCodeEnum.SubPicture:
                                    case keypadInput.CecKeyCodeEnum.VideoOnDemand:
                                    case keypadInput.CecKeyCodeEnum.ElectronicProgramGuide:
                                    case keypadInput.CecKeyCodeEnum.TimerProgramming:
                                    case keypadInput.CecKeyCodeEnum.InitialConfiguration:
                                    case keypadInput.CecKeyCodeEnum.SelectBroadcastType:
                                    case keypadInput.CecKeyCodeEnum.SelectSoundPresentation:
                                    case keypadInput.CecKeyCodeEnum.PlayFunction:
                                    case keypadInput.CecKeyCodeEnum.PausePlayFunction:
                                    case keypadInput.CecKeyCodeEnum.RecordFunction:
                                    case keypadInput.CecKeyCodeEnum.PauseRecordFunction:
                                    case keypadInput.CecKeyCodeEnum.StopFunction:
                                    case keypadInput.CecKeyCodeEnum.MuteFunction:
                                    case keypadInput.CecKeyCodeEnum.RestoreVolumeFunction:
                                    case keypadInput.CecKeyCodeEnum.TuneFunction:
                                    case keypadInput.CecKeyCodeEnum.SelectMediaFunction:
                                    case keypadInput.CecKeyCodeEnum.SelectAvInputFunction:
                                    case keypadInput.CecKeyCodeEnum.SelectAudioInputFunction:
                                    case keypadInput.CecKeyCodeEnum.PowerToggleFunction:
                                    case keypadInput.CecKeyCodeEnum.F1Blue:
                                    case keypadInput.CecKeyCodeEnum.F2Red:
                                    case keypadInput.CecKeyCodeEnum.F3Green:
                                    case keypadInput.CecKeyCodeEnum.F4Yellow:
                                    case keypadInput.CecKeyCodeEnum.F5:
                                    case keypadInput.CecKeyCodeEnum.Data:
                                        return Promise.reject();
                                    case keypadInput.CecKeyCodeEnum.PowerOnFunction:
                                    case keypadInput.CecKeyCodeEnum.PowerOffFunction:

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