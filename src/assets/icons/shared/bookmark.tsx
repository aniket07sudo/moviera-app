import React from "react";
import { Path, Svg } from "react-native-svg";

interface BookmarkIconProps {
    color:string,
    width:number,
    height:number
}

function BookmarkIcon({color,width,height}:BookmarkIconProps) {
  return (
    <Svg
      width={width}
      height={width}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></Path>
    </Svg>
  );
}

export default BookmarkIcon;
