import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { NavigationContainer } from "@react-navigation/native";
import HomeStackScreen from "../../screens/main/Home/navigation";
import SearchScreen from "../../screens/main/Explore";
import DownloadsScreen from "../../screens/main/Downloads";
import ProfileScreen from "../../screens/main/Profile";
import HomeScreen from "../../screens/main/Home";

const MainNavigation = () => {

    const TabBar = createBottomTabNavigator();

    return (
        <TabBar.Navigator initialRouteName="Home">
            <TabBar.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <TabBar.Screen name="Explore" component={SearchScreen} />
            <TabBar.Screen name="My List" component={DownloadsScreen} />
            <TabBar.Screen name="Profile" component={ProfileScreen} />
        </TabBar.Navigator>
    )
}

export default MainNavigation;