import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from "expo-location";


function Map({ navigation, route }) {
    const { locations } = route.params

    const [loading, setLoading] = useState(true)
    const [currentPos, setCurrentPos] = useState(
        {
            latitude: 1,
            longitude: 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        }
    )
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        buildMap()
    }, [])

    useEffect(() => {
        buildMap()
    }, [locations])

    const buildMap = () => {
        Location.requestForegroundPermissionsAsync();
        getLocation()
            .then((pos) => {
                const newPos = { ...currentPos }
                newPos.latitude = pos.coords.latitude
                newPos.longitude = pos.coords.longitude
                setCurrentPos(newPos)

                const newMarkers = []

                for (let location of locations) {
                    newMarkers.push(
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            }}
                            title={"Pinezka"}
                            description={`Date: ${(new Date(location.timestamp)).toLocaleString()}`}
                            pinColor={'red'}
                            key={location.timestamp.toString()}
                        />
                    )
                }
                setMarkers(newMarkers)
                setLoading(false)
            })
            .catch((err) => {
                Alert.alert("Error", err)
            })
    }


    const getLocation = async () => {
        return Location.getCurrentPositionAsync({})
    }

    return (
        <View style={style.main}>
            {!loading ?
                <MapView
                    style={style.map}
                    initialRegion={currentPos}
                >
                    {markers}
                </MapView>
                :
                <View style={style.contentLoading}>
                    <Text style={style.loadingText}>Opening map...</Text>









                </View>
            }
        </View>
    )
}


const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#9d4edd",
    },
    map: {
        flex: 1
    },
    contentLoading: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        backgroundColor: "#9d4edd",
    },
    loading: {
        transform: [{ scale: 2 }]
    },
    loadingText:
    {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        color: "black",
    }
})




export default Map