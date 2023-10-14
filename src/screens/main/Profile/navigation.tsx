import React from "react";
import ProfileScreen from ".";
import EditProfile from "./EditProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function ProfileStack() {
    const Profile = createNativeStackNavigator();
    return (
        <Profile.Navigator>
            <Profile.Screen name="Profile" component={ProfileScreen} />
            <Profile.Screen name="EditProfile" component={EditProfile} />
        </Profile.Navigator>
    )
}

export default ProfileStack;