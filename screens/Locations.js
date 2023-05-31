import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, ActivityIndicator, Alert, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from "./components/MyButton"
import LocationItem from "./components/LocationItem"
import * as Location from "expo-location";
import { TouchableOpacity } from 'react-native';

const colors = require("../assets/colors.json")

function Locations({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [locationData, setLocationData] = useState([])
    const [globalToMap, setGlobalToMap] = useState(false)
    const [selectedLocations, setSelectedLocations] = useState([])

    useEffect(() => {
        Location.requestForegroundPermissionsAsync();
        getAllFromStorage()
            .then((data) => {
                setLocationData(data)
            })
    }, [])

    useEffect(() => {
        const sortedLocations = locationData.sort((a, b) => {
            return a.timestamp - b.timestamp
        })
        const sortedSelect = selectedLocations.sort((a, b) => {
            return a.timestamp - b.timestamp
        })
        setGlobalToMap(JSON.stringify(sortedLocations) == JSON.stringify(sortedSelect))
    }, [locationData, selectedLocations])

    const toggleAllSwitches = () => {
        if (!globalToMap) {
            setSelectedLocations(locationData)
        }
        else {
            setSelectedLocations([])
        }
        setGlobalToMap(!globalToMap)
    }

    const toggleSwitch = (location) => {
        const newSelect = [...selectedLocations]
        const index = newSelect.indexOf(location)
        if (index < 0) {
            newSelect.push(location)
        }
        else {
            newSelect.splice(index, 1)
        }
        setSelectedLocations(newSelect)
    }


    const setToStorage = async (key, data) => {
        await AsyncStorage.setItem(key.toString(), JSON.stringify(data))
    }

    const getAllFromStorage = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        const data = stores.map((item) => {
            return JSON.parse(item[1])
        })
        return data
    }

    const delAllFromStore = async () => {
        await AsyncStorage.clear()
    }


    const saveLocation = (pos) => {
        Alert.alert(
            "Location",
            "Pobrano pozycję\nCzy zapisać ją?",
            [
                {
                    text: "Tak",
                    onPress: () => {
                        const loc = [...locationData, pos]
                        setLocationData(loc)
                        setToStorage(pos.timestamp, pos)
                        if (globalToMap) {
                            const selLoc = [...selectedLocations, pos]
                            setSelectedLocations(selLoc)
                        }
                    }
                },
                {
                    text: "Nie",
                }
            ]
        )
    }

    const getLocation = async () => {
        // setLoading(true)
        try {
            let pos = await Location.getCurrentPositionAsync({})
            saveLocation(pos)
        }
        catch (err) {
            Alert.alert("Error", err)
        }
        finally {
            setLoading(false)
        }
    }

    const goToMap = () => {
        if (selectedLocations.length == 0) {
            Alert.alert("Alert", "Zaznacz przynajmniej jedną pozycję!")
        }
        else {
            navigation.navigate("Map", {
                locations: selectedLocations
            })
        }
    }


    const delData = () => {
        Alert.alert(
            "Delete",
            "Czy usunąć wszystko?",
            [
                {
                    text: "Tak",
                    onPress: () => {
                        setLocationData([])
                        setSelectedLocations([])
                        delAllFromStore()
                        Alert.alert("Result", "Dane usunięte")
                    }
                },
                {
                    text: "Nie",
                }
            ]
        )
    }

    return (
        <View style={style.main}>
            {!loading ?
                <View style={style.content}>
                    <View style={style.buttonView}>
                        <View style={style.buttonsSet}>
                            <MyButton text={"Get location"} style={style.button} click={getLocation} />
                            <MyButton text={"Delete all"} style={style.button} click={delData} />
                            <MyButton text={"Open map"} style={style.button} click={goToMap} />
                        </View>
                        <View style={style.buttonsSet}>
                            <TouchableOpacity style={style.switch} onPress={toggleAllSwitches}>
                                <Text style={style.switchText}>Select All:</Text>

                                <Switch
                                    trackColor={{ false: "lightgray", true: "gray" }}
                                    thumbColor={globalToMap ? "black" : "lightgray"}
                                    ios_backgroundColor={colors.switchDotNo}
                                    onValueChange={toggleAllSwitches}
                                    value={globalToMap}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <SafeAreaView style={style.locations}>
                        <FlatList
                            data={locationData}
                            renderItem={({ item }) => <LocationItem location={item} selectData={selectedLocations} selectToggle={toggleSwitch} />}
                            keyExtractor={(item, index) => index}
                            style={style.locationsList}
                        />
                    </SafeAreaView>

                </View>
                :
                <View style={style.contentLoading}>
                    <Text style={style.loadingText}>Opening map...</Text>
                </View>
            }
        </View>
    );
}




const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: "#c77dff",
        padding: 15,
    },
    buttonView: {
        flex: 0.20,
    },
    buttonsSet: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 18
    },
    button: {
        display: 'flex',
        width: 100,
        fontSize: 18,
        height: 70,
        borderRadius: 15,
        padding: 10,
        textAlign: "center",
        backgroundColor: "#5a189a",
        color: "white",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",

    },
    switch: {
        width: 150,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    switchText:
    {
        fontSize: 20,
    },
    locations: {
        flex: 1,
        padding: 10
    },
    contentLoading: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        backgroundColor: "lightgreen"
    },
    loading: {
        transform: [{ scale: 4 }],
        margin: 20,
    },
    loadingText:
    {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 40,

        color: "black"
    }

})


export default Locations;