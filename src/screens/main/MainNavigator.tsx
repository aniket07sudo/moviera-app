import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from "./Home/navigation";
import SearchScreen from "./Explore";
import DownloadsScreen from "./Downloads";
import ProfileScreen from "./Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainNavigation = () => {

    const TabBar = createBottomTabNavigator();
    // const Stack = createNativeStackNavigator();

    return (
        <Text></Text>
    )
}

export default MainNavigation;