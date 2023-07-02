import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import HomeScreen from ".";
import HomeDetails from "./Details";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeStackScreen() {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="HomeDetailsScreen" component={HomeDetails} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;