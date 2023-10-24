import React from "react";
import { Circle, Svg } from "react-native-svg";

interface DotsIconProps {
    color:string,
    width:string,
    height:string
}

function DotIcon({color,width,height}:DotsIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      fill={color}
    //   stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 14 16"
    >
      <Circle cx="8" cy="8" r="5"></Circle>
    </Svg>
  );
}

export default DotIcon;
