import { Button } from 'galio-framework'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Title, Card, Surface, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store/store'
import Octicons from 'react-native-vector-icons/Octicons'
import CalculDimension from '../utils/CalculDimension'

export default function ResultatDimensionScreen (props: any) {
    const currentId = useSelector((st: RootState) => st.currentId)
    const dimensions = useSelector((st: RootState) => st.dimensions)
    let dimension = dimensions.filter(el => el.id == currentId)[0]
    const Calcul = new CalculDimension(dimension);
    console.log(Calcul.getEnergieTotal(), Calcul.getPanneauSerie())

    return <View style={{ flex: 1 }}>
        <Title style={{
            textAlign: 'center',
            paddingVertical: 8,
            backgroundColor: '#fff',
            elevation: .3,
            marginHorizontal: 10,
            marginTop: 10
        }}>
            Resultat {dimension.nom}
        </Title>
        <ScrollView>
           <Card style={{
            marginHorizontal:10,
            marginVertical:5
           }}>
            <Card.Title title='Resumer de charge' />
            <Card.Content>
                <Text>Puiisance Total du des Charges: {Calcul.getPuissanceTotal()}W</Text>
                <Text>Puiisance Total du des Charges AC: {Calcul.getPuissanceTotalAC()}W</Text>
                <Text>Puiisance Total du des Charges DC: {Calcul.getPuissanceTotalDC()}W</Text>
                <Text>Energie Total: {Calcul.getEnergieTotal()}WH</Text>
                <Text>Courant regulateur: {Calcul.getCourantRegulateur()}A</Text>
                <Text>Puissance Convertisseur: {Calcul.getPuissanceConvertisseur()}W</Text>
                <Text>Tension systeme: {Calcul.getTensionSystem()}V</Text>
                <Text>Capacite des batteries: {Calcul.getBatterieCapacite()}AH</Text>
                <Text>DOD: {Calcul?.dimension?.dod}</Text>
                <Text>Puissance Total Peanneaux: {Calcul.getPuissancePanneau()}</Text>
                <Text>ICC: {Calcul.getICC()}</Text>
                <Text>Tension  panneau: {Calcul.dimension?.tension_panneau}V</Text>
                <Text>Puissance  panneau: {Calcul.dimension?.puissance_panneau}w</Text>
                <Text>Nombre total des panneaux: {Calcul.getTotalPanneau()}</Text>
                <Text>Tension Batterie: {Calcul.dimension?.tension_batterie}V</Text>
                <Text>Capacite Batterie: {Calcul.dimension?.capacite_batterie}AH</Text>
                <Text>Nombre des panneau en serie: {Calcul.getPanneauSerie()}</Text>
                <Text>Nombre des panneau en parallele: {Calcul.getPanneauParallele()}</Text>
                <Text>Nombre des batteries: {Calcul.getTotalBatterie()}</Text>
                <Text>Nombre des batteries en serie: {Calcul.getBatterieSerie()}</Text>
                <Text>Nombre des batteries en parallele: {Calcul.getBatterieParallele()}</Text>
                <Text>capacite batterie: {Calcul.getBatterieCapacite()}</Text>
            </Card.Content>
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
                <Octicons name='arrow-left' color='#fff' size={36} />
            </Button>
           
        </View>

    </View>
}