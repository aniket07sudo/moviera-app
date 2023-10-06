import LottieView from "lottie-react-native";
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";
import { Pressable, View } from "react-native";
import Animated, { Easing, FadeIn, ZoomInDown, ZoomInEasyUp, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { Colors } from "../../theme/colors";

const AnimatedLottie = Animated.createAnimatedComponent(LottieView);

export const TabButton = memo(({item,onPress,accessibilityState}) => {

    console.log("Tab Button ");

    const activeAnimation = useSharedValue(0);

    const TabRef = useRef();

    useEffect(() => {
        if(TabRef?.current && accessibilityState.selected) {
            console.log("current",accessibilityState);

            TabRef.current.play(item.animationEnter.start,item.animationEnter.end);
            activeAnimation.value = withSequence(withTiming(1,{duration:200}),withTiming(0,{duration:200}));
        }
    },[accessibilityState.selected])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scale = interpolate(activeAnimation.value,[0,1,0],[1,0.9,1]);
        return {
            transform:[{scale}]
        }
    })


    return (
        <View style={{flex:1}}>
            <Pressable style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={onPress}>
                <AnimatedLottie 
                    ref={TabRef}
                    speed={2}
                    colorFilters={[{
                        keypath:'outlines',
                        color:accessibilityState.selected ? Colors.primary : '#fff'
                    }]} 
                    style={[animatedIconStyle,{width:30,height:30}]} 
                    resizeMode="contain" 
                    loop={false} 
                    source={item.src} 
                />
            </Pressable>
        </View>
    )
})
