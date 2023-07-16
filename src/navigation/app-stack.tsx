import { createStackNavigator } from "@react-navigation/stack";
import HomeStackScreen from "../screens/main/Home/navigation";
import ProfileStack from "../screens/main/Profile/navigation";
import Tabs from './tabbar'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { BottomTabParamList, RootStackParamList } from "../ts/types/navigation";



const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeTabs" component={Tabs} options={{headerShown:false}} />
            <Stack.Screen name="HomeStack" component={HomeStackScreen} />
            <Stack.Screen name="ProfileStack" component={ProfileStack} />
        </Stack.Navigator>
    )
}

export default AppNavigator;