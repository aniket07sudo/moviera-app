import React from "react";
import ProfileScreen from ".";
import EditProfile from "./EditProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function ProfileStack() {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Profile" component={ProfileScreen} />
            <HomeStack.Screen name="EditProfile" component={EditProfile} />
        </HomeStack.Navigator>
    )
}

export default ProfileStack;