import { Button } from 'galio-framework'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Title, Card, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState } from '../Store/store'
import Octicons from 'react-native-vector-icons/Octicons'
import CalculDimension from '../utils/CalculDimension'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ResultatDimensionScreen(props: any) {
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
            <Card style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Card.Title
                    title="Synthese des charges"
                    left={(props) => <AntDesign {...props} name='calculator' />}
                />
                <Card.Content>
                    <Text>Puiisance Total du des Charges: {Calcul.getPuissanceTotal()}W</Text>
                    <Text>Puiisance Total du des Charges AC: {Calcul.getPuissanceTotalAC()}W</Text>
                    <Text>Puiisance Total du des Charges DC: {Calcul.getPuissanceTotalDC()}W</Text>
                    <Text>Energie Total: {Calcul.getEnergieTotal()}WH</Text>
                    <Text>Autonomie: {Calcul?.dimension?.autonomie} Jour(s)</Text>
                    <Text>DOD: {Calcul?.dimension?.dod * 100}%</Text>
                </Card.Content>
            </Card>
            <Card style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Card.Title
                    title="Panneau solaire"
                    left={(props) => <MaterialIcons {...props} name='solar-power' />}
                />
                <Card.Content>
                    <Text>Nombre des panneau en serie: {Calcul.getPanneauSerie()}</Text>
                    <Text>Nombre des panneau en parallele: {Calcul.getPanneauParallele()}</Text>
                    <Text>Puissance Total Peanneaux: {Calcul.getPuissancePanneau()}</Text>
                    <Text>Tension  panneau: {Calcul.dimension?.tension_panneau}V</Text>
                    <Text>Puissance  panneau: {Calcul.dimension?.puissance_panneau}w</Text>
                    <Text>Nombre total des panneaux: {Calcul.getTotalPanneau()}</Text>

                </Card.Content>
            </Card>
            <Card style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Card.Title
                    title="Batterie"
                    left={(props) => <FontAwesome5 {...props} name='car-battery' />}
                />
                <Card.Content>
                    <Text>Capacité totale des batteries: {Calcul.getBatterieCapacite()}AH</Text>
                    <Text>Tension Batterie: {Calcul.dimension?.tension_batterie}V</Text>
                    <Text>Capacité Batterie: {Calcul.dimension?.capacite_batterie}AH</Text>
                    <Text>Nombre des batteries: {Calcul.getTotalBatterie()}</Text>
                    <Text>Nombre des batteries en serie: {Calcul.getBatterieSerie()}</Text>
                    <Text>Nombre des batteries en parallele: {Calcul.getBatterieParallele()}</Text>
                </Card.Content>
            </Card>
            <Card style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Card.Title
                    title="Contrôleur de charge"
                    left={(props) => <FontAwesome5 {...props} name='charging-station' />}
                />
                <Card.Content>
                    <Text>Courant regulateur: {Calcul.getCourantRegulateur()}A</Text>
                </Card.Content>
            </Card>
            <Card style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 50 }}>
                <Card.Title
                    title="Convertisseur DC-AC"
                    left={(props) => <MaterialCommunityIcons {...props} name='current-ac' />}
                />
                <Card.Content>
                    <Text>Puissance Convertisseur: {Calcul.getPuissanceConvertisseur()}W</Text>
                    <Text>Tension: {Calcul.getTensionSystem()}V</Text>
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