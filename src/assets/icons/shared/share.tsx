import React from "react";
import { Path, Svg } from "react-native-svg";

interface ShareIconProps {
    width:number,
    height:number,
    color:string
}

function ShareIcon({width,height,color}:ShareIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"></Path>
      <Path d="M16 6L12 2 8 6"></Path>
      <Path d="M12 2L12 15"></Path>
    </Svg>
  );
}

export default ShareIcon;
