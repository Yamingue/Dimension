import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { DiemsionType, updateDimension } from "../Store/dimensionsSlice";
import { Card } from "react-native-paper";
import Octicons from 'react-native-vector-icons/Octicons'
import DropdownSelect from "react-native-input-select";
import { Button } from "galio-framework";


export default function BattPanneaux(props: any) {
    const currentId = useSelector((st: RootState) => st.currentId)
    const dispatch = useDispatch()
    const dimensions = useSelector((st: RootState) => st.dimensions)
    const [dimension, setDimension] = useState<DiemsionType>({ ...dimensions.filter(el => el.id == currentId)[0] })
    const [panneauIndex, setPaneau] = useState(0);
    const [batterieIndex, setBatterie] = useState(0);
    const dataBat = [
        { label: "12v/50AH", value: 1, capacite: 50, tension: 12 },
        { label: "12v/100AH", value: 2, capacite: 100, tension: 12 },
        { label: "12v/150AH", value: 3, capacite: 150, tension: 12 },
        { label: "12v/200AH", value: 4, capacite: 200, tension: 12 },
        { label: "12v/230AH", value: 5, capacite: 230, tension: 12 },
        { label: "24v/150AH", value: 6, capacite: 150, tension: 24 },
        { label: "24v/200AH", value: 7, capacite: 200, tension: 24 },
        { label: "24v/230AH", value: 8, capacite: 230, tension: 24 }
    ];
    const dataPan = [
        { label: "12v/50w", value: 1, puissance: 50, tension: 12 },
        { label: "12v/100W", value: 2, puissance: 100, tension: 12 },
        { label: "12v/150W", value: 3, puissance: 150, tension: 12 },
        { label: "12v/160W", value: 4, puissance: 160, tension: 12 },
        { label: "12v/200W", value: 5, puissance: 200, tension: 12 },
        { label: "12v/250W", value: 6, puissance: 250, tension: 12 },
        { label: "24v/200W", value: 7, puissance: 200, tension: 24 },
        { label: "24v/250W", value: 8, puissance: 250, tension: 24 },
        { label: "24v/300W", value: 9, puissance: 300, tension: 24 }
    ];

    return <View style={{ flex: 1 }}>
        <ScrollView style={{
            flex: 1,
            paddingHorizontal: 10
        }}>
            <Card style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                margin: 10
            }}>
                <DropdownSelect
                    label="Batterie"
                    placeholder="Selectioner une batterie"
                    options={[
                        { label: "12v/50AH", value: 1, capacite: 50, tension: 12 },
                        { label: "12v/100AH", value: 2, capacite: 100, tension: 12 },
                        { label: "12v/150AH", value: 3, capacite: 150, tension: 12 },
                        { label: "12v/200AH", value: 4, capacite: 200, tension: 12 },
                        { label: "12v/230AH", value: 5, capacite: 230, tension: 12 },
                        { label: "24v/150AH", value: 6, capacite: 150, tension: 24 },
                        { label: "24v/200AH", value: 7, capacite: 200, tension: 24 },
                        { label: "24v/230AH", value: 8, capacite: 230, tension: 24 }
                    ]}
                    selectedValue={batterieIndex}
                    onValueChange={(value: any) => {
                        setBatterie(value)
                        let d = dataBat.filter(el => el.value == value)[0];

                        setDimension({
                            ...dimension,
                            capacite_batterie: d.capacite,
                            tension_batterie: d.tension
                        })
                        dispatch(updateDimension(dimension))
                    }}
                    primaryColor={'green'}
                />
                <DropdownSelect
                    label="Panneau"
                    placeholder="Selectioner une panneau"
                    selectedValue={panneauIndex}
                    options={[
                        { label: "12v/50w", value: 1, puissance: 50, tension: 12 },
                        { label: "12v/100W", value: 2, puissance: 100, tension: 12 },
                        { label: "12v/150W", value: 3, puissance: 150, tension: 12 },
                        { label: "12v/160W", value: 4, puissance: 160, tension: 12 },
                        { label: "12v/200W", value: 5, puissance: 200, tension: 12 },
                        { label: "12v/250W", value: 6, puissance: 250, tension: 12 },
                        { label: "24v/200W", value: 7, puissance: 200, tension: 24 },
                        { label: "24v/250W", value: 8, puissance: 250, tension: 24 },
                        { label: "24v/300W", value: 9, puissance: 300, tension: 24 }
                    ]}

                    onValueChange={(value: any, data: any) => {
                        setPaneau(value)
                        let d = dataPan.filter(el => el.value == value)[0];
                        console.log(d.puissance)
                        setDimension({
                            ...dimension,
                            puissance_panneau: d.puissance,
                            tension_panneau: d.tension
                        })

                        // console.log(d)
                        dispatch(updateDimension(dimension))
                        console.log(dimension)
                    }}
                />

            </Card>
        </ScrollView>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            zIndex: 0,
            position: 'absolute',
            bottom: 0,
            flex: 1,
            width: '100%'
        }}>
            <Button
                round
                style={{
                    width: 45,
                    height: 45,

                }}
                onPress={() => {
                    props.navigation.goBack()
                }}
            >
                <Octicons name='arrow-left' color='#fff' size={28} />
            </Button>

            <Button
                round
                onPress={() => props.navigation.navigate('dimension_result')}
                style={{
                    width: 45,
                    height: 45,

                }}
            >
                <Octicons name='arrow-right' color='#fff' size={38} />
            </Button>
        </View>
        
    </View>
}