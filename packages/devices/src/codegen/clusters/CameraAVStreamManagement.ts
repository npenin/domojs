// This file is generated from CameraAVStreamManagement.xml - do not edit it directly
// Generated on 2025-12-18T03:04:57.316Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type AudioStreamID = number;


export type SnapshotStreamID = number;


export type VideoStreamID = number;


export enum AudioCodecEnum {
	OPUS = 0,
	AACLC = 1,
}

export enum ImageCodecEnum {
	JPEG = 0,
}

export enum TriStateAutoEnum {
	Off = 0,
	On = 1,
	Auto = 2,
}

export enum TwoWayTalkSupportTypeEnum {
	NotSupported = 0,
	HalfDuplex = 1,
	FullDuplex = 2,
}

export enum VideoCodecEnum {
	H264 = 0,
	HEVC = 1,
	VVC = 2,
	AV1 = 3,
}

export interface AVMetadataStruct {
	UTCTime:number,
	MotionZonesActive?:readonly import("./ZoneManagement.js").ZoneID[],
	BlackAndWhiteActive?:boolean,
	UserDefined?:import ("@akala/core").IsomorphicBuffer,
}

export interface AudioCapabilitiesStruct {
	MaxNumberOfChannels:number,
	SupportedCodecs:readonly AudioCodecEnum[],
	SupportedSampleRates:readonly number[],
	SupportedBitDepths:readonly number[],
}

export interface AudioStreamStruct {
	AudioStreamID:AudioStreamID,
	StreamUsage:import("./global-Enums.js").StreamUsageEnum,
	AudioCodec:AudioCodecEnum,
	ChannelCount:number,
	SampleRate:number,
	BitRate:number,
	BitDepth:number,
	ReferenceCount:number,
}

export interface RateDistortionTradeOffPointsStruct {
	Codec:VideoCodecEnum,
	Resolution:VideoResolutionStruct,
	MinBitRate:number,
}

export interface SnapshotCapabilitiesStruct {
	Resolution:VideoResolutionStruct,
	MaxFrameRate:number,
	ImageCodec:ImageCodecEnum,
	RequiresEncodedPixels:boolean,
	RequiresHardwareEncoder?:boolean,
}

export interface SnapshotStreamStruct {
	SnapshotStreamID:SnapshotStreamID,
	ImageCodec:ImageCodecEnum,
	FrameRate:number,
	MinResolution:VideoResolutionStruct,
	MaxResolution:VideoResolutionStruct,
	Quality:number,
	ReferenceCount:number,
	EncodedPixels:boolean,
	HardwareEncoder:boolean,
	WatermarkEnabled?:boolean,
	OSDEnabled?:boolean,
}

export interface VideoResolutionStruct {
	Width:number,
	Height:number,
}

export interface VideoSensorParamsStruct {
	SensorWidth:number,
	SensorHeight:number,
	MaxFPS:number,
	MaxHDRFPS?:number,
}

export interface VideoStreamStruct {
	VideoStreamID:VideoStreamID,
	StreamUsage:import("./global-Enums.js").StreamUsageEnum,
	VideoCodec:VideoCodecEnum,
	MinFrameRate:number,
	MaxFrameRate:number,
	MinResolution:VideoResolutionStruct,
	MaxResolution:VideoResolutionStruct,
	MinBitRate:number,
	MaxBitRate:number,
	KeyFrameInterval:number,
	WatermarkEnabled?:boolean,
	OSDEnabled?:boolean,
	ReferenceCount:number,
}

export type CameraAVStreamManagement = CameraAVStreamManagementCluster & { id: 0x0551};

export interface CameraAVStreamManagementCluster {
id: 0x0551;
	attributes: {
		readonly MaxConcurrentEncoders?:number
		readonly MaxEncodedPixelRate?:number
		readonly VideoSensorParams?:VideoSensorParamsStruct
		readonly NightVisionUsesInfrared?:boolean
		readonly MinViewportResolution?:VideoResolutionStruct
		readonly RateDistortionTradeOffPoints?:readonly RateDistortionTradeOffPointsStruct[]
		readonly MaxContentBufferSize:number
		readonly MicrophoneCapabilities?:AudioCapabilitiesStruct
		readonly SpeakerCapabilities?:AudioCapabilitiesStruct
		readonly TwoWayTalkSupport?:TwoWayTalkSupportTypeEnum
		readonly SnapshotCapabilities?:readonly SnapshotCapabilitiesStruct[]
		readonly MaxNetworkBandwidth:number
		readonly CurrentFrameRate?:number
		readonly HDRModeEnabled?:boolean
		readonly SupportedStreamUsages:readonly import("./global-Enums.js").StreamUsageEnum[]
		readonly AllocatedVideoStreams?:readonly VideoStreamStruct[]
		readonly AllocatedAudioStreams?:readonly AudioStreamStruct[]
		readonly AllocatedSnapshotStreams?:readonly SnapshotStreamStruct[]
		readonly StreamUsagePriorities:readonly import("./global-Enums.js").StreamUsageEnum[]
		readonly SoftRecordingPrivacyModeEnabled?:boolean
		readonly SoftLivestreamPrivacyModeEnabled?:boolean
		readonly HardPrivacyModeOn?:boolean
		readonly NightVision?:TriStateAutoEnum
		readonly NightVisionIllum?:TriStateAutoEnum
		readonly Viewport?:import("./global-Structs.js").ViewportStruct
		readonly SpeakerMuted?:boolean
		readonly SpeakerVolumeLevel?:number
		readonly SpeakerMaxLevel?:number
		readonly SpeakerMinLevel?:number
		readonly MicrophoneMuted?:boolean
		readonly MicrophoneVolumeLevel?:number
		readonly MicrophoneMaxLevel?:number
		readonly MicrophoneMinLevel?:number
		readonly MicrophoneAGCEnabled?:boolean
		readonly ImageRotation?:number
		readonly ImageFlipHorizontal?:boolean
		readonly ImageFlipVertical?:boolean
		readonly LocalVideoRecordingEnabled?:boolean
		readonly LocalSnapshotRecordingEnabled?:boolean
		readonly StatusLightEnabled?:boolean
		readonly StatusLightBrightness?:import("./global-Enums.js").ThreeLevelAutoEnum
		/** Audio Streams supported */
		readonly SupportsAudio: boolean
		/** Video Streams supported */
		readonly SupportsVideo: boolean
		/** Snapshot Streams supported */
		readonly SupportsSnapshot: boolean
		/** Privacy supported */
		readonly SupportsPrivacy: boolean
		/** Speaker supported */
		readonly SupportsSpeaker: boolean
		/** Image control supported */
		readonly SupportsImageControl: boolean
		/** Watermark supported */
		readonly SupportsWatermark: boolean
		/** OSD supported */
		readonly SupportsOnScreenDisplay: boolean
		/** Local Storage available */
		readonly SupportsLocalStorage: boolean
		/** High Dynamic Range supported */
		readonly SupportsHighDynamicRange: boolean
		/** Night Vision mode supported */
		readonly SupportsNightVision: boolean
}
	commands: {
		AudioStreamAllocate?: {
			inputparams: readonly [
				StreamUsage: import("./global-Enums.js").StreamUsageEnum, 
				AudioCodec: AudioCodecEnum, 
				ChannelCount: number, 
				SampleRate: number, 
				BitRate: number, 
				BitDepth: number, 
			],
			 outputparams: readonly [
				AudioStreamID: AudioStreamID, ]
            }
		AudioStreamDeallocate?: {
			inputparams: readonly [
				AudioStreamID: AudioStreamID, 
			],
			 outputparams: readonly []
            }
		VideoStreamAllocate?: {
			inputparams: readonly [
				StreamUsage: import("./global-Enums.js").StreamUsageEnum, 
				VideoCodec: VideoCodecEnum, 
				MinFrameRate: number, 
				MaxFrameRate: number, 
				MinResolution: VideoResolutionStruct, 
				MaxResolution: VideoResolutionStruct, 
				MinBitRate: number, 
				MaxBitRate: number, 
				KeyFrameInterval: number, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly [
				VideoStreamID: VideoStreamID, ]
            }
		VideoStreamModify?: {
			inputparams: readonly [
				VideoStreamID: VideoStreamID, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly []
            }
		VideoStreamDeallocate?: {
			inputparams: readonly [
				VideoStreamID: VideoStreamID, 
			],
			 outputparams: readonly []
            }
		SnapshotStreamAllocate?: {
			inputparams: readonly [
				ImageCodec: ImageCodecEnum, 
				MaxFrameRate: number, 
				MinResolution: VideoResolutionStruct, 
				MaxResolution: VideoResolutionStruct, 
				Quality: number, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly [
				SnapshotStreamID: SnapshotStreamID, ]
            }
		SnapshotStreamModify?: {
			inputparams: readonly [
				SnapshotStreamID: SnapshotStreamID, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly []
            }
		SnapshotStreamDeallocate?: {
			inputparams: readonly [
				SnapshotStreamID: SnapshotStreamID, 
			],
			 outputparams: readonly []
            }
		SetStreamPriorities: {
			inputparams: readonly [
				StreamPriorities: readonly import("./global-Enums.js").StreamUsageEnum[], 
			],
			 outputparams: readonly []
            }
		CaptureSnapshot?: {
			inputparams: readonly [
				SnapshotStreamID: SnapshotStreamID, 
				RequestedResolution: VideoResolutionStruct, 
			],
			 outputparams: readonly [
				Data: import ("@akala/core").IsomorphicBuffer, 
				ImageCodec: ImageCodecEnum, 
				Resolution: VideoResolutionStruct, ]
            }
}
	events: {
	}
}

export const cameraAVStreamManagement: ClusterDefinition<CameraAVStreamManagement> = {
id: 0x0551,
	attributes: [
		"MaxConcurrentEncoders",
		"MaxEncodedPixelRate",
		"VideoSensorParams",
		"NightVisionUsesInfrared",
		"MinViewportResolution",
		"RateDistortionTradeOffPoints",
		"MaxContentBufferSize",
		"MicrophoneCapabilities",
		"SpeakerCapabilities",
		"TwoWayTalkSupport",
		"SnapshotCapabilities",
		"MaxNetworkBandwidth",
		"CurrentFrameRate",
		"HDRModeEnabled",
		"SupportedStreamUsages",
		"AllocatedVideoStreams",
		"AllocatedAudioStreams",
		"AllocatedSnapshotStreams",
		"StreamUsagePriorities",
		"SoftRecordingPrivacyModeEnabled",
		"SoftLivestreamPrivacyModeEnabled",
		"HardPrivacyModeOn",
		"NightVision",
		"NightVisionIllum",
		"Viewport",
		"SpeakerMuted",
		"SpeakerVolumeLevel",
		"SpeakerMaxLevel",
		"SpeakerMinLevel",
		"MicrophoneMuted",
		"MicrophoneVolumeLevel",
		"MicrophoneMaxLevel",
		"MicrophoneMinLevel",
		"MicrophoneAGCEnabled",
		"ImageRotation",
		"ImageFlipHorizontal",
		"ImageFlipVertical",
		"LocalVideoRecordingEnabled",
		"LocalSnapshotRecordingEnabled",
		"StatusLightEnabled",
		"StatusLightBrightness",
		"SupportsAudio",
		"SupportsVideo",
		"SupportsSnapshot",
		"SupportsPrivacy",
		"SupportsSpeaker",
		"SupportsImageControl",
		"SupportsWatermark",
		"SupportsOnScreenDisplay",
		"SupportsLocalStorage",
		"SupportsHighDynamicRange",
		"SupportsNightVision",
	] as const,
	commands: [
		"AudioStreamAllocate",
		"AudioStreamDeallocate",
		"VideoStreamAllocate",
		"VideoStreamModify",
		"VideoStreamDeallocate",
		"SnapshotStreamAllocate",
		"SnapshotStreamModify",
		"SnapshotStreamDeallocate",
		"SetStreamPriorities",
		"CaptureSnapshot",
	] as const,
	events: [
	] as const
}

export default cameraAVStreamManagement;