import React, { PropsWithChildren } from "react";
import { List } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DiemsionType, removeDimension } from "../Store/dimensionsSlice";
import { useDispatch } from "react-redux";
import { update } from "../Store/curentSlice";
import { DefaultRouterOptions } from "@react-navigation/native";

export type DimensionProps = PropsWithChildren<{
    dimension: DiemsionType,
    restProps?:any,
    navigation: any
}>

export default function DimentionElement(props: DimensionProps) {
    const dispatch = useDispatch();
    let deleteDim = () => {
        dispatch(removeDimension(props.dimension.id))
     
    }
    
    return <List.Item
        onPress={() => {
           dispatch(update(props.dimension.id))
           props.navigation.navigate('ville_dod')
        }}
        rippleColor='#FE2472'
        style={{
            elevation: .2,
            backgroundColor: '#fff',
            marginVertical: 2,
            marginHorizontal: 8
        }}
        title={props.dimension.nom}
        description={props.dimension.created_at}
        left={props => <List.Icon  {...props} icon="folder" />}
        right={props => <MaterialIcons color='red' onPress={deleteDim} size={28} style={props.style} name="delete" />}
    />
}