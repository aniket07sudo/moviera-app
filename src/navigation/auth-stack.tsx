import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login";
import SignupScreen from "../screens/auth/signup";

const Stack = createStackNavigator();

const AuthNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;