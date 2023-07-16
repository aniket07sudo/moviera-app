import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"

export type HomeStackParamList = {
    HomeScreen:undefined,
    HomeDetailsScreen: { id:number }
}

export type RootStackParamList = {
    HomeTabs:NavigatorScreenParams<BottomTabParamList>,
    HomeStack:NavigatorScreenParams<HomeStackParamList>,
    ProfileStack:undefined
}

export type BottomTabParamList = {
    Home:undefined,
    Explore:undefined,
    MyList:undefined,
    Profile:undefined
}

export type HomeScreenNavigationProps = CompositeNavigationProp<BottomTabNavigationProp<BottomTabParamList,'Home'>,NativeStackNavigationProp<RootStackParamList>>
export type HomeScreenProps = CompositeScreenProps<BottomTabScreenProps<BottomTabParamList,'Home'>,NativeStackScreenProps<RootStackParamList>>


// export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList,'HomeScreen'>