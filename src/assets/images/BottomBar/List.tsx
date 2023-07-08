import React from "react";
import { Path, Svg } from "react-native-svg";

interface ListIconProps {
  color:string
}

function ListIcon({color}:ListIconProps) {
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
      <Path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></Path>
    </Svg>
  );
}

export default ListIcon;
