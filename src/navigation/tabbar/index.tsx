import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { NavigationContainer } from "@react-navigation/native";
import HomeStackScreen from "../../screens/main/Home/navigation";
import SearchScreen from "../../screens/main/Explore";
import DownloadsScreen from "../../screens/main/Downloads";
import ProfileScreen from "../../screens/main/Profile";
import HomeScreen from "../../screens/main/Home";
import { Colors } from "../../theme/colors";
import { Image, StyleSheet } from "react-native";
import HomeIcon from "../../assets/icons/BottomBar/Home";
import ExploreIcon from "../../assets/icons/BottomBar/Explore";
import ListIcon from "../../assets/icons/BottomBar/List";
import ProfileIcon from "../../assets/icons/BottomBar/Profile";
import CustomTabbar from "./customTab";
import { BlurView } from "@react-native-community/blur";
import { BottomTabParamList } from "../../ts/types/navigation";


const IconChooser = (name:string,color:string) => {

    let iconUrl;
    
    switch(name) {
        case 'Home':
            iconUrl = <HomeIcon color={color} />;
            break;
        case 'Explore':
            iconUrl = <ExploreIcon color={color} />;
            break;
        case 'MyList':
            iconUrl = <ListIcon color={color} />;
            break;
        case 'Profile':
            iconUrl = <ProfileIcon color={color} />;
            break
        case 'default':
            break;
    }

    return iconUrl;
}

const MainNavigation = () => {

    const TabBar = createBottomTabNavigator<BottomTabParamList>();

    return (
        <TabBar.Navigator 
            initialRouteName="Home"
            tabBar={(props:any) => <CustomTabbar {...props} />}
            screenOptions={({route}) => ({
                tabBarActiveTintColor:Colors.primary,
                tabBarInactiveTintColor:Colors.grey,
                tabBarIcon:({color}) => IconChooser(route.name,color),
                tabBarLabel(props) {
                    return null
                },
                tabBarStyle:{
                    backgroundColor:'transparent',
                    elevation:0,
                    borderTopWidth:0
                }
            })}
        >
            <TabBar.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <TabBar.Screen name="Explore" component={SearchScreen} />
            <TabBar.Screen name="MyList" component={DownloadsScreen} />
            <TabBar.Screen name="Profile" component={ProfileScreen} />
        </TabBar.Navigator>
    )
}

export default MainNavigation;