import React from "react";
import { Circle, Path, Svg } from "react-native-svg";

interface ExploreIconProps {
  color:string
}

function ExploreIcon({color}:ExploreIconProps) {
  return (
    <Svg
      width="24"
      height="24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Circle cx="12" cy="12" r="10"></Circle>
      <Path d="M2 12L22 12"></Path>
      <Path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></Path>
    </Svg>
  );
}

export default ExploreIcon;
