import VideoPlayer, { OnSeekData, VideoProperties } from "react-native-video";

export type CustomVideoProperties = VideoPlayer & VideoProperties & {
    // presentFullscreenPlayer?: () => void;
    // seek?:() => void;
    onBuffer?:(e:{isBuffering:number}) => void;
    // Add other custom properties if needed
  };

export type CustomOverlayOptionsType = {
    play: () => void; 
    pause: () => void;
    forward:() => void;
    backward:() => void;
  };
