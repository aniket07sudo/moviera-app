import React from "react";
import { Path, Svg } from "react-native-svg";

interface BackIconProps {
    width:number,
    height:number,
    color:string
}

function BackIcon({width,height,color}:BackIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      fill={'transparent'}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M15 18L9 12 15 6"></Path>
    </Svg>
  );
}

export default BackIcon;
