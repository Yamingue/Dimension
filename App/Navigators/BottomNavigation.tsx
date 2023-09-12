import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { PropsWithChildren } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export function BottomNavigation(props:PropsWithChildren){
return <Tab.Navigator
screenOptions={{
    headerShown: false
}}
>
    <Tab.Screen component={HomeStack} name="Home" options={{
        tabBarIcon:p=><AntDesign name='home' {...p}/>
    }}/>
</Tab.Navigator>
}