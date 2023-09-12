import React, { useState} from 'react';
import { View } from 'react-native'
import DropdownSelect from 'react-native-input-select';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { DiemsionType, updateDimension } from '../Store/dimensionsSlice';
import { Button } from 'galio-framework';


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
                    { label: "N'Djamena", value: 0.6 },
                    { label: "Sarh", value: 0.5 },
                    { label: "Abeche", value: 0.7 },
                ]}
                selectedValue={dimension?.ensoleillement}
                onValueChange={(value: any) => {setDimension({...dimension,ensoleillement:value})}}
                primaryColor={'green'}
            />
            <DropdownSelect
                label="DOD"
                placeholder="Selectioner un DOD"
                options={[
                    { label: "90", value: 90 },
                    { label: "50", value: 50 },
                    { label: "30", value: 30 },
                ]}
                selectedValue={dimension?.dod}
                onValueChange={(value: any) => {setDimension({...dimension,dod:value})}}
                primaryColor={'green'}
            />
            <Button onPress={next}>Suivant</Button>
        </Card>
    </View>
}