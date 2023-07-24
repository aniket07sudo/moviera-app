import { View ,Text, StyleSheet, FlatList} from "react-native";
import { MediumText } from "../../utils/Text";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import TabHeader from "./header";
import { TabsDataProps } from "../../screens/main/Home/Details";
import { SCREEN_WIDTH } from "../../screens/main/Home";
import { useRef } from "react";

interface TabsComponentProps {
    tabsData:TabsDataProps[]
}



// export const TabsDefault = tabsData.map(({id,title}) => ({id,title,anchor:0}));

// console.log("Tabs Default",TabsDefault);
export const TAB_HEIGHT = 30;


export default function TabsComponent({tabsData}:TabsComponentProps) {

    const ScrollX = useSharedValue(0);
    const ScrollRef = useRef<FlatList>(null);

    const ScrollHandler = useAnimatedScrollHandler({
        onScroll:(event) => {
            ScrollX.value = event.contentOffset.x
        }
    })

    console.log("Handle scroll",ScrollX.value);


    return (
        <View>
            <View style={Styles.tabsHeaderContainer}>
                <TabHeader ScrollRef={ScrollRef} ScrollX={ScrollX} data={tabsData} />
            </View>
            <Animated.FlatList
                ref={ScrollRef}
                bounces={false}
                data={tabsData}
                horizontal
                keyExtractor={(item,index) => index.toString()}
                initialScrollIndex={0}
                snapToInterval={SCREEN_WIDTH}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0.1}                
                onScroll={ScrollHandler}
                scrollEventThrottle={16}
                renderItem={({item}) => {
                    // Add Skeletal 
                    return (
                        <View style={{backgroundColor:'green',width:SCREEN_WIDTH,height:200}}>
                            <MediumText>{item.title}</MediumText>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    tabsHeaderContainer:{
        paddingTop:10,
        paddingBottom:10,
        // backgroundColor:'red'
    }
})