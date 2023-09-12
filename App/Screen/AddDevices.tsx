import { Button } from 'galio-framework'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Title, TextInput, Modal, Card } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store/store'
import Device from '../Components/Device'
import Octicons from 'react-native-vector-icons/Octicons'
import { Appareil, addAppareil } from '../Store/dimensionsSlice'
import DropdownSelect from 'react-native-input-select'

export default function (props: any) {
    const currentId = useSelector((st: RootState) => st.currentId)
    console.log(currentId)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const dimensions = useSelector((st: RootState) => st.dimensions)
    let dimension = dimensions.filter(el => el.id == currentId)
    const [appareilForm, setAppareilForm] = useState<Appareil>({
        id: 0,
        nom: "Ampoule",
        temps: 8,
        nombre: 1,
        puissance: 10,
        tension: "DC"
    })
    console.log(currentId);

    return <View style={{ flex: 1 }}>
        <Title style={{
            textAlign: 'center',
            paddingVertical: 8,
            backgroundColor: '#fff',
            elevation: .3,
            marginHorizontal: 10,
            marginTop: 10
        }}>
            {dimension[0].nom}
        </Title>
        <ScrollView>
            {
                dimension[0].appareils?.map(el => <Device key={el.id} appareil={el} />)
            }
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
                icon='add'
                iconFamily='material'
                iconSize={24} onlyIcon
                onPress={() => {
                    setShow(true)
                }}
            />

            <Button
                round
                onPress={() => props.navigation.navigate('batt_paneau')}
                style={{
                    width: 45,
                    height: 45,

                }}
            >
                <Octicons name='arrow-right' color='#fff' size={38} />
            </Button>
        </View>
        <Modal
            onDismiss={() => setShow(false)}
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
                    label="Nom de l'appareil"
                    mode='outlined'
                    value={appareilForm?.nom}
                    onChangeText={txt => setAppareilForm({ ...appareilForm, nom: txt })}

                />
                <TextInput
                    label="Puissance(Watt)"
                    mode='outlined'
                    keyboardType='number-pad'
                    value={appareilForm.puissance.toString()}
                    onChangeText={txt => {
                        if (txt == '') {
                            setAppareilForm({ ...appareilForm, puissance: 0 })
                        }else{
                            setAppareilForm({ ...appareilForm, puissance: parseInt(txt) })
                        }
                    }}

                />

                <TextInput
                    label="Durre (Heure)"
                    mode='outlined'
                    keyboardType='number-pad'
                    value={appareilForm.temps.toString()}
                    onChangeText={txt =>{
                        if (txt == '') {
                            setAppareilForm({ ...appareilForm, temps: 0 })
                        }else{
                            setAppareilForm({ ...appareilForm, temps: parseInt(txt) })
                        }
                    }}

                />
                <TextInput
                    label="Nombre"
                    mode='outlined'
                    keyboardType='number-pad'
                    value={appareilForm.nombre.toString()}
                    onChangeText={txt => {
                        if (txt == '') {
                            setAppareilForm({ ...appareilForm, nombre: 0 })
                        } else {
                            setAppareilForm({ ...appareilForm, nombre: parseInt(txt) })
                        }
                    }}

                />
                <DropdownSelect
                    label="Tension"
                    placeholder="Selectioner le type de tension"
                    options={[
                        { label: "AC", value: "AC" },
                        { label: "DC", value: "DC" },
                    ]}
                    selectedValue={appareilForm.tension}
                    onValueChange={(value: any) => { setAppareilForm({ ...appareilForm, tension: value }) }}
                    primaryColor={'green'}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button style={{
                        marginLeft: 0
                    }}
                        onPress={() => {
                            dispatch(addAppareil({
                                id: currentId,
                                appareil: { ...appareilForm, id: new Date().getTime() }
                            }))
                            setShow(false)
                        }}
                    >
                        Ajouter
                    </Button>
                    <Button style={{
                        marginLeft: 0
                    }}
                        onPress={() => {
                            dispatch(addAppareil({
                                id: currentId,
                                appareil: { ...appareilForm, id: new Date().getTime() }
                            }))
                        }}
                    >
                        Ajouter autre
                    </Button>
                </View>
            </Card>
        </Modal>

    </View>
}