import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ExploreScreen from "../../screens/main/Explore";
import DownloadsScreen from "../../screens/main/Downloads";
import ProfileScreen from "../../screens/main/Profile";
import HomeScreen from "../../screens/main/Home";
import { Colors } from "../../theme/colors";
import CustomTabbar from "./customTab";
import { BottomTabParamList } from "../../ts/types/navigation";
import { createRef, forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { TabButton } from "./tabButton";

const TabArray = [
    {
        id:0,
        name:"Home",
        component:HomeScreen,
        src:require('../../assets/lottie_animations/home_.json'),
        animationEnter:{
            start:0,
            end:30,
        },
    },
    {
        id:1,
        name:"Explore",
        component:ExploreScreen,
        src:require('../../assets/lottie_animations/explore.json'),
        animationEnter:{start:0,end:30}
    },
    {
        id:2,
        name:"MyList",
        component:DownloadsScreen,
        src:require('../../assets/lottie_animations/list.json'),
        animationEnter:{start:0,end:55}

    },
    {
        id:3,
        name:"Profile",
        component:ProfileScreen,
        src:require('../../assets/lottie_animations/profile.json'),
        animationEnter:{start:0,end:70}

    }
]

const TabBar = createBottomTabNavigator<BottomTabParamList>();

const MainNavigation = () => {

    console.log("Main Navigation Tabs"); 


    const RenderScreen = useMemo(() => {
        console.log("REndersScreen");
        
        return (
            TabArray.map((item,index) => (
                <TabBar.Screen key={index} name={item.name} component={item.component} options={{
                    headerShown:false,
                    tabBarButton:({accessibilityState,onPress}) => <TabButton item={item} onPress={onPress} accessibilityState={accessibilityState} />,
                    // tabBarButton:({onPress}) => <TabButton onPress={onPress} />,
                }} />
            ))
        )
    },[]) 


    return (
        <TabBar.Navigator 
            // initialRouteName="Home"
            tabBar={(props:any) => <CustomTabbar {...props} />}
            screenOptions={({route}) => ({
                // tabBarActiveTintColor:Colors.primary,
                // tabBarInactiveTintColor:Colors.grey,
                // tabBarButton:({onPress}) => <TabButton onPress={onPress} />,
                // tabBarIcon:({color,focused}) => IconChooser(route.name,color),
                // tabBarLabel(props) {
                //     return null
                // },
                // tabBarStyle:{
                //     backgroundColor:'transparent',
                //     elevation:0,
                //     borderTopWidth:0
                // }
            })}
        >
            {/* {TabArray.map(item => (
                <TabBar.Screen key={item.id} name={item.name} component={item.component} options={{
                    headerShown:false,
                    tabBarButton:(props) => <TabButton item={item} {...props} />,
                }} />
            ))} */}
            {RenderScreen}
            {/* <TabBar.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <TabBar.Screen name="Explore" component={ExploreScreen} />
            <TabBar.Screen name="MyList" component={DownloadsScreen} />
            <TabBar.Screen name="Profile" component={ProfileScreen} /> */}
            {/* <TabBar.Screen name="MyList" component={DownloadsScreen} />
            <TabBar.Screen name="Explore" component={ExploreScreen} />
            <TabBar.Screen name="Profile" component={ProfileScreen} /> */}
            
        </TabBar.Navigator>
    )
}

export default memo(MainNavigation);