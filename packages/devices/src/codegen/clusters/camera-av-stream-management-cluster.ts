

export enum AudioCodecEnum {
	OPUS= 0,
	AACLC= 1,
}

export enum ImageCodecEnum {
	JPEG= 0,
}

export enum TriStateAutoEnum {
	Off= 0,
	On= 1,
	Auto= 2,
}

export enum TwoWayTalkSupportTypeEnum {
	NotSupported= 0,
	HalfDuplex= 1,
	FullDuplex= 2,
}

export enum VideoCodecEnum {
	H264= 0,
	HEVC= 1,
	VVC= 2,
	AV1= 3,
}

export interface AudioCapabilitiesStruct {
	MaxNumberOfChannels: number,
	SupportedCodecs:AudioCodecEnum,
	SupportedSampleRates: number,
	SupportedBitDepths: number,
}

export interface AudioStreamStruct {
	AudioStreamID: number,
	StreamUsage:import("./global-enums.js").StreamUsageEnum,
	AudioCodec:AudioCodecEnum,
	ChannelCount: number,
	SampleRate: number,
	BitRate: number,
	BitDepth: number,
	ReferenceCount: number,
}

export interface RateDistortionTradeOffPointsStruct {
	Codec:VideoCodecEnum,
	Resolution:VideoResolutionStruct,
	MinBitRate: number,
}

export interface SnapshotCapabilitiesStruct {
	Resolution:VideoResolutionStruct,
	MaxFrameRate: number,
	ImageCodec:ImageCodecEnum,
	RequiresEncodedPixels:boolean,
	RequiresHardwareEncoder?:boolean,
}

export interface SnapshotStreamStruct {
	SnapshotStreamID: number,
	ImageCodec:ImageCodecEnum,
	FrameRate: number,
	MinResolution:VideoResolutionStruct,
	MaxResolution:VideoResolutionStruct,
	Quality: number,
	ReferenceCount: number,
	EncodedPixels:boolean,
	HardwareEncoder:boolean,
	WatermarkEnabled?:boolean,
	OSDEnabled?:boolean,
}

export interface VideoResolutionStruct {
	Width: number,
	Height: number,
}

export interface VideoSensorParamsStruct {
	SensorWidth: number,
	SensorHeight: number,
	MaxFPS: number,
	MaxHDRFPS?: number,
}

export interface VideoStreamStruct {
	VideoStreamID: number,
	StreamUsage:import("./global-enums.js").StreamUsageEnum,
	VideoCodec:VideoCodecEnum,
	MinFrameRate: number,
	MaxFrameRate: number,
	MinResolution:VideoResolutionStruct,
	MaxResolution:VideoResolutionStruct,
	MinBitRate: number,
	MaxBitRate: number,
	MinKeyFrameInterval: number,
	MaxKeyFrameInterval: number,
	WatermarkEnabled?:boolean,
	OSDEnabled?:boolean,
	ReferenceCount: number,
}

/**
 * The Camera AV Stream Management cluster is used to allow clients to manage, control, and configure various audio, video, and snapshot streams on a camera.
 */

export interface CameraAVStreamManagement {
id: 1361;
	attributes: {
		readonly MaxConcurrentEncoders: number
		readonly MaxEncodedPixelRate: number
		readonly VideoSensorParams:VideoSensorParamsStruct
		readonly NightVisionUsesInfrared:boolean
		readonly MinViewport:VideoResolutionStruct
		readonly RateDistortionTradeOffPoints:readonly RateDistortionTradeOffPointsStruct[]
		readonly MaxContentBufferSize: number
		readonly MicrophoneCapabilities:AudioCapabilitiesStruct
		readonly SpeakerCapabilities:AudioCapabilitiesStruct
		readonly TwoWayTalkSupport:TwoWayTalkSupportTypeEnum
		readonly SnapshotCapabilities:readonly SnapshotCapabilitiesStruct[]
		readonly MaxNetworkBandwidth: number
		readonly CurrentFrameRate: number
		HDRModeEnabled:boolean
		readonly SupportedStreamUsages:readonly import("./global-enums.js").StreamUsageEnum[]
		readonly AllocatedVideoStreams:readonly VideoStreamStruct[]
		readonly AllocatedAudioStreams:readonly AudioStreamStruct[]
		readonly AllocatedSnapshotStreams:readonly SnapshotStreamStruct[]
		readonly StreamUsagePriorities:readonly import("./global-enums.js").StreamUsageEnum[]
		SoftRecordingPrivacyModeEnabled:boolean
		SoftLivestreamPrivacyModeEnabled:boolean
		readonly HardPrivacyModeOn:boolean
		NightVision:TriStateAutoEnum
		NightVisionIllum:TriStateAutoEnum
		Viewport:import("./global-structs.js").ViewportStruct
		SpeakerMuted:boolean
		SpeakerVolumeLevel: number
		readonly SpeakerMaxLevel: number
		readonly SpeakerMinLevel: number
		MicrophoneMuted:boolean
		MicrophoneVolumeLevel: number
		readonly MicrophoneMaxLevel: number
		readonly MicrophoneMinLevel: number
		MicrophoneAGCEnabled:boolean
		ImageRotation: number
		ImageFlipHorizontal:boolean
		ImageFlipVertical:boolean
		LocalVideoRecordingEnabled:boolean
		LocalSnapshotRecordingEnabled:boolean
		StatusLightEnabled:boolean
		StatusLightBrightness:import("./global-enums.js").ThreeLevelAutoEnum
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
		/** This command SHALL allocate an audio stream on the camera and return an allocated audio stream identifier. */
		AudioStreamAllocate: {
			inputparams: readonly [
				StreamUsage: import("./global-enums.js").StreamUsageEnum, 
				AudioCodec: AudioCodecEnum, 
				ChannelCount:  number, 
				SampleRate:  number, 
				BitRate:  number, 
				BitDepth:  number, 
			],
			 outputparams: readonly [
				AudioStreamID:  number, ]
            }
		/** This command SHALL deallocate an audio stream on the camera, corresponding to the given audio stream identifier. */
		AudioStreamDeallocate: {
			inputparams: readonly [
				AudioStreamID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL allocate a video stream on the camera and return an allocated video stream identifier. */
		VideoStreamAllocate: {
			inputparams: readonly [
				StreamUsage: import("./global-enums.js").StreamUsageEnum, 
				VideoCodec: VideoCodecEnum, 
				MinFrameRate:  number, 
				MaxFrameRate:  number, 
				MinResolution: VideoResolutionStruct, 
				MaxResolution: VideoResolutionStruct, 
				MinBitRate:  number, 
				MaxBitRate:  number, 
				MinKeyFrameInterval:  number, 
				MaxKeyFrameInterval:  number, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly [
				VideoStreamID:  number, ]
            }
		/** This command SHALL be used to modify a stream specified by the VideoStreamID. */
		VideoStreamModify: {
			inputparams: readonly [
				VideoStreamID:  number, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL deallocate a video stream on the camera, corresponding to the given video stream identifier. */
		VideoStreamDeallocate: {
			inputparams: readonly [
				VideoStreamID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL allocate a snapshot stream on the device and return an allocated snapshot stream identifier. */
		SnapshotStreamAllocate: {
			inputparams: readonly [
				ImageCodec: ImageCodecEnum, 
				MaxFrameRate:  number, 
				MinResolution: VideoResolutionStruct, 
				MaxResolution: VideoResolutionStruct, 
				Quality:  number, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly [
				SnapshotStreamID:  number, ]
            }
		/** This command SHALL be used to modify a stream specified by the VideoStreamID. */
		SnapshotStreamModify: {
			inputparams: readonly [
				SnapshotStreamID:  number, 
				WatermarkEnabled: boolean, 
				OSDEnabled: boolean, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL deallocate an snapshot stream on the camera, corresponding to the given snapshot stream identifier. */
		SnapshotStreamDeallocate: {
			inputparams: readonly [
				SnapshotStreamID:  number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL set the relative priorities of the various stream usages on the camera. */
		SetStreamPriorities: {
			inputparams: readonly [
				StreamPriorities: import("./global-enums.js").StreamUsageEnum[], 
			],
			 outputparams: readonly []
            }
		/** This command SHALL return a Snapshot from the camera. */
		CaptureSnapshot: {
			inputparams: readonly [
				SnapshotStreamID:  number, 
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