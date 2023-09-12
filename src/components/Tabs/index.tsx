import { View ,Text, StyleSheet, FlatList} from "react-native";
import { MediumText } from "../../utils/Text";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import TabHeader from "./header";
import { TabsDataProps } from "../../screens/main/Details";
import { SCREEN_WIDTH } from "../../screens/main/Home";
import { useRef } from "react";
import metrics from "../../theme/metrics";
import TabItem from "./tabItem";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

interface TabsComponentProps {
    tabsData:TabsDataProps[]
}
// export const TabsDefault = tabsData.map(({id,title}) => ({id,title,anchor:0}));

export const TAB_HEIGHT = 30;

export default function TabsComponent({tabsData}:TabsComponentProps) {

    const ScrollX = useSharedValue(0);
    let ScrollRef = useRef<FlatList>(null);

    const ScrollHandler = useAnimatedScrollHandler({
        onScroll:(event) => {
            ScrollX.value = event.contentOffset.x
        }
    })

    console.log("Handle scroll",ScrollX.value);


    return (
        <View style={{backgroundColor:Colors.secondary,paddingTop:Spacing.screenPadding}}>
            <View style={Styles.tabsHeaderContainer}>
                <TabHeader ScrollRef={ScrollRef} ScrollX={ScrollX} data={tabsData} />
            </View>
            <Animated.FlatList
                collapsable={false}
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

                    // To Do Add Skeletal 
                    return (
                        <View style={{width:SCREEN_WIDTH}}>
                            <TabItem key={item.id} pageType={item.title} />
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
       
    }
})