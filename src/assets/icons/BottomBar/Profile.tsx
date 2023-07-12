import React from "react";
import { Circle, Path, Svg } from "react-native-svg";

interface ProfileIconProps {
  color:string
}

function ProfileIcon({color}:ProfileIconProps) {
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
      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></Path>
      <Circle cx="12" cy="7" r="4"></Circle>
    </Svg>
  );
}

export default ProfileIcon;