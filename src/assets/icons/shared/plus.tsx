import React from "react";
import { Path, Svg } from "react-native-svg";

interface PlusIconsProps {
    height:number,
    width:number,
    color:string
}

function PlusIcon({height,width,color}:PlusIconsProps) {
  return (
    <Svg
      width={width}
      height={height}
    //   fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M12 5L12 19"></Path>
      <Path d="M5 12L19 12"></Path>
    </Svg>
  );
}

export default PlusIcon;
