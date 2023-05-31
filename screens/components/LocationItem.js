import { Text, View,StyleSheet, Image, Switch} from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const colors = require("../../assets/colors.json")


function LocatioItem(props) {
    const {location,selectData,selectToggle} = props
    const [mapSelect,setMapSelect] = useState(false)

    useEffect(()=>{
        setMapSelect(selectData.includes(location))
    },[selectData])

    const toggleSwitch = ()=>{
        selectToggle(location)
    }


    return (
        <TouchableOpacity onPress={toggleSwitch}>
            <View style={style.main}>
                    <Image
                        style={style.image}
                    />
                    <View style={style.content}>
                        <Text style={style.header}>Date: {(new Date(location.timestamp)).toLocaleString()}</Text>
                        <Text style={style.par}>Latitude: {location.coords.latitude}</Text>
                        <Text style={style.par}>Longitude: {location.coords.longitude}</Text>
                    </View>
                    <View >
                    <Switch
                        trackColor={{false: "lightgray", true: "gray"}}
                        thumbColor={mapSelect ? "black" :"lightgray"}
                        ios_backgroundColor={colors.switchDotNo}
                        onValueChange={toggleSwitch}
                        value={mapSelect}
                    />
                    </View>
            </View>
        </TouchableOpacity>
    );
}



const style = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:10,
        marginVertical:5,
        padding:5,
        backgroundColor:"white",
        borderColor: "black",
        borderWidth:3,
        borderStyle: "solid",
        borderRadius:25
    },
    image:
    {
        width:75,
        height:75
    },
    content:
    {
        flex:1
    },
    header:{
        fontSize:25,
        color: "black"
    },
    par:
    {
        fontSize:15,
    }
})




export default LocatioItem;