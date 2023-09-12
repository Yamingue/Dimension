import React, { useState} from 'react';
import { View } from 'react-native'
import DropdownSelect from 'react-native-input-select';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { DiemsionType, updateDimension } from '../Store/dimensionsSlice';
import { Button } from 'galio-framework';
import Octicons from 'react-native-vector-icons/Octicons'


export default function VilleDOD(props:any) {
    const currentId = useSelector((st: RootState) => st.currentId)
    const dispatch = useDispatch()
    const dimensions = useSelector((st: RootState) => st.dimensions)
    const [dimension, setDimension] = useState<DiemsionType>(dimensions.filter(el => el.id == currentId)[0])
    
    const next = ()=>{
       dispatch(updateDimension(dimension))
       props.navigation.navigate('dimension_ad_device')
    }
    
    return <View style={{ flex: 1 }}>
        <Card style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                marginHorizontal:20,
                zIndex: 1,
                marginTop:20
            }}>
            <DropdownSelect
                label="Ville"
                placeholder="Selectioner une ville"
                options={[
                    { label: "N'Djamena", value: 4.7 },
                    { label: "Sarh", value: 3 },
                    { label: "Abeche", value: 5 },
                ]}
                selectedValue={dimension?.ensoleillement}
                onValueChange={(value: any) => {setDimension({...dimension,ensoleillement:value})}}
                primaryColor={'green'}
            />
            <DropdownSelect
                label="DOD"
                placeholder="Selectioner un DOD"
                options={[
                    { label: "90", value: .9 },
                    { label: "80", value: .80 },
                    { label: "70", value: .70 },
                    { label: "50", value: .50 },
                ]}
                selectedValue={dimension?.dod}
                onValueChange={(value: any) => {setDimension({...dimension,dod:value})}}
                primaryColor={'green'}
            />
        </Card>
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
                onPress={() => next()}
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