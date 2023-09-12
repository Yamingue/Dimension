import React, { PropsWithChildren } from "react";
import { List } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Appareil, removeAppareil, removeDimension } from "../Store/dimensionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
export type DiviceProps = PropsWithChildren<{
    appareil: Appareil
}>
export default function Device(props: DiviceProps) {
    const dispatch = useDispatch();
    let currentId = useSelector((st:RootState)=>st.currentId)
    let remove = () => {
        dispatch(removeAppareil({
            id: currentId,
            appareil: props.appareil
        }))
    }
    return <List.Item
     
        // rippleColor={'red'}
        style={{
            elevation: .2,
            backgroundColor: '#fff',
            marginVertical: 2,
            marginHorizontal: 8
        }}
        title={props.appareil.nom}
        description={props.appareil.tension +'v/'+ `${props.appareil.puissance}W (${props.appareil.temps}H)`}
        left={props => <List.Icon  {...props} icon="home-battery" />}
        right={props => <MaterialIcons color='red' onPress={remove} size={28} style={props.style} name="delete" />}
    />
}