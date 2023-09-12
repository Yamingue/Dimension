import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { PropsWithChildren } from 'react';
import { HomeScreen } from '../Screen/HomeScreen';
import AddDevices from '../Screen/AddDevices';
import { DefaultRouterOptions } from '@react-navigation/native';
import ResultatDimensionScreen from '../Screen/ResultatDimensionScreen';
import VilleDOD from '../Screen/VilleDOD';
import BattPanneaux from '../Screen/BattPanneaux';

const Stack = createNativeStackNavigator()

export default function HomeStack(props: DefaultRouterOptions) {

    return <Stack.Navigator>
        <Stack.Screen
            component={HomeScreen}
            name='dimension_home'
            options={{
                title: "List de dimensionement"
            }}
        />
        <Stack.Screen
            component={VilleDOD}
            name='ville_dod'
            options={{
                title: "Ville et DOD"
            }}
        />
        <Stack.Screen
            component={AddDevices}
            name='dimension_ad_device'
            options={{
                title: "Ajout des charges"
            }}
        />
        <Stack.Screen
            component={BattPanneaux}
            name='batt_paneau'
            options={{
                title: "Choix de Batterie et Panneau"
            }}
        />
        <Stack.Screen
            component={ResultatDimensionScreen}
            name='dimension_result'
            options={{
                title: "Resultat"
            }}
        />
    </Stack.Navigator>
}