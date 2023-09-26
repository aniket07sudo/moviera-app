import { createStackNavigator } from "@react-navigation/stack";
import HomeStackScreen from "../screens/main/Home/navigation";
import ProfileStack from "../screens/main/Profile/navigation";
import Tabs from './tabbar'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { BottomTabParamList, RootStackParamList } from "../ts/types/navigation";



const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    console.log("app Navigator Renders");
    

    return (
        <Stack.Navigator initialRouteName="HomeTabs">
            <Stack.Screen name="HomeTabs" component={Tabs} options={{headerShown:false}} />
            <Stack.Screen name="HomeStack" options={{headerShown:false}} component={HomeStackScreen} />
            <Stack.Screen name="ProfileStack" options={{headerShown:false}} component={ProfileStack} />
        </Stack.Navigator>
    )
}

export default AppNavigator;