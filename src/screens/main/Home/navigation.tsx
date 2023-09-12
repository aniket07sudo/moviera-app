import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeScreen from ".";
import HomeDetails from "../Details/index";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../ts/types/navigation";
import Player from "../../../components/Player";

function HomeStackScreen() {
    const HomeStack = createNativeStackNavigator<HomeStackParamList>();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen options={{headerShown:false}} name="HomeDetailsScreen" component={HomeDetails} />
            <HomeStack.Screen options={{headerShown:false}} name="VideoPlayer" component={Player} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;