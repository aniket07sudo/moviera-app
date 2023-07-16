import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import HomeStackScreen from "../screens/main/Home/navigation";
import { useState } from "react";
import AppNavigator from "./app-stack";
import AuthNavigator from "./auth-stack";
import { useSelector } from "react-redux";
import { IAppState } from "../ts/interfaces";

const AppRouter = () => {

    const isAuthenticated = useSelector((state : IAppState) => state.auth.isAuthenticated);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppRouter;