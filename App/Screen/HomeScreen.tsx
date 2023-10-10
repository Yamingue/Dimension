import { Button } from 'galio-framework';
import React, { useState } from 'react'
import { Pressable, ScrollView, View } from "react-native";
import { Card, Checkbox, Modal, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { DiemsionType, addDimension } from '../Store/dimensionsSlice';
import DimentionElement from '../Components/DimentionElement';
import { update } from '../Store/curentSlice';

type ckeckboxType = "checked" | "unchecked" | "indeterminate"
export function HomeScreen(props: any) {
    const [show, setShown] = useState(false)
    const [dimesion, setDimension] = useState<DiemsionType>({ dod: 30 })
    const dispatch = useDispatch()
    const [checked, setChecked] = React.useState<ckeckboxType>('checked');
    const toggleCheck = () => setChecked(checked === 'checked' ? 'unchecked' : 'checked');

    const dimensions = useSelector((st: RootState) => st.dimensions)

    let createNewDim = () => {
        let id = dimensions.length > 0 && dimensions != undefined ? dimensions.at(-1)?.id : 0;
        let date: Date | string = new Date()
        date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        dispatch(addDimension({
            ...dimesion,
            id: id + 1,
            created_at: date,
            sans_batterie: checked === 'checked'
        }))
        dispatch(update(id + 1));
        setShown(false)
        setDimension({})
        props.navigation.navigate('ville_dod')
        // setTimeout(function () {
        // },500)

    }


    return <View style={{
        flex: 1
    }}>
        <ScrollView style={{
            flex: 1
        }}>
            {
                dimensions.map(el => <DimentionElement {...props} key={el.id} dimension={el} />)
            }
        </ScrollView>
        <Button
            style={{
                position: 'absolute',
                bottom: 0,
                zIndex: 0,
                alignSelf: 'center'
            }}
            icon='add'
            iconFamily='material'
            iconSize={24} onlyIcon
            onPress={e => setShown(true)}
        />

        <Modal
            onDismiss={() => setShown(false)}
            visible={show}
            style={{
                marginHorizontal: 20,
            }}>
            <Card style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                zIndex: 1
            }}>
                <TextInput
                    label='Nom'
                    mode='outlined'
                    value={dimesion?.nom}
                    onChangeText={txt => setDimension({ ...dimesion, nom: txt })}

                />
                <TextInput
                    label='Autonomie desirée en Jour'
                    mode='outlined'
                    value={dimesion?.autonomie?.toString()}
                    onChangeText={txt => setDimension({ ...dimesion, autonomie: parseInt(txt) })}

                />
                {/* <Pressable
                    onPress={toggleCheck}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: -8

                    }}>
                    <Checkbox status={checked} />
                    <Text>Sans Batterie</Text>
                </Pressable> */}
                <Button style={{
                    marginLeft: 0
                }}
                    onPress={e => createNewDim()}
                >
                    Dimensioner
                </Button>
            </Card>
        </Modal>

    </View>
}