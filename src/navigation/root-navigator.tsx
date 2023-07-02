import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import HomeStackScreen from "../screens/main/Home/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from './tabbar'
import ProfileStack from "../screens/main/Profile/navigation";
const Stack = createStackNavigator();

const AppRouter = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeTabs" component={Tabs} options={{headerShown:false}} />
                <Stack.Screen name="HomeStack" component={HomeStackScreen} />
                <Stack.Screen name="ProfileStack" component={ProfileStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter;