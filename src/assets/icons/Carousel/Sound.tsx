import React, { useEffect } from "react";
import Animated, { interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

interface SoundIcons {
  color:string,
  isSound:boolean
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

function SoundIcon({color,isSound}:SoundIcons) {

  const toggleValue = useSharedValue(isSound ? 1 : 0);

  const animatedProps = useAnimatedProps(() => {
    const strokeWidth = interpolate(toggleValue.value,[0,1],[0,2]);
    const opacity = interpolate(toggleValue.value,[0,1],[0,1]);

    return {
      strokeWidth,
      opacity
    }
  })  

  const noSoundProps = useAnimatedProps(() => {
      const opacity = interpolate(toggleValue.value,[0,1],[1,0]);
      return {
        opacity
      }
  })

  useEffect(() => {
    toggleValue.value = withTiming(isSound ? 1 : 0,{duration:500})
  },[isSound])

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
      
      <Path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z"></Path>
      {/* {isSound ? <Path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"></Path> : 
      <>
      <Path d="M23 9L17 15"></Path>
      <Path d="M17 9L23 15"></Path>
      </>
      } */}
      <AnimatedPath animatedProps={animatedProps} d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"></AnimatedPath>
      <AnimatedPath animatedProps={noSoundProps} d="M23 9L17 15"></AnimatedPath>
      <AnimatedPath animatedProps={noSoundProps} d="M17 9L23 15"></AnimatedPath>
    </Svg>
  );
}

SoundIcon.defaultProps = {
  color:'white'
}

export default SoundIcon;
