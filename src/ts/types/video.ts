import { OnSeekData, VideoProperties } from "react-native-video";

export type CustomVideoProperties = VideoProperties & {
    presentFullscreenPlayer?: () => void;
    seek?:OnSeekData
    // Add other custom properties if needed
  };