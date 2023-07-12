import React from "react";
import { Path, Svg } from "react-native-svg";

interface HomeIconProps {
  color:string
}

function HomeIcon({color}:HomeIconProps) {
  return (
    <Svg
      width="20"
      height="20"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></Path>
      <Path d="M9 22L9 12 15 12 15 22"></Path>
    </Svg>
  );
}

export default HomeIcon;