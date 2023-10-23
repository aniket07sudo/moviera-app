import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect } from "react";
import HomeStackScreen from "../screens/main/Home/navigation";
import { useState } from "react";
import AppNavigator from "./app-stack";
import AuthNavigator from "./auth-stack";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../ts/interfaces";
import {Colors} from '../theme/colors'
import { Dimensions } from "react-native";

const AppRouter = () => {

    console.log("APP ROUTER RENDERS");
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     console.log("Setting");
    //     dispatch({type:'SET_DIMENSIONS',payload:{deviceWidth:Dimensions.get('window').width,deviceHeight:Dimensions.get('window').height}});
    // },[])


    const isAuthenticated = useSelector((state : IAppState) => state.auth.isAuthenticated);

    return (
        <NavigationContainer theme={{colors:{ background:Colors.secondary }}}>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppRouter;