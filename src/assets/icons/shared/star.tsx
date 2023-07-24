import React from "react";
import { Path, Svg } from "react-native-svg";

interface StarIconProps {
    width:number,
    height:number,
    color:string
}

function StarIcon({width,height,color}:StarIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      fill={color}
    //   stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></Path>
    </Svg>
  );
}

export default StarIcon;
