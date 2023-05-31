import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, Easing} from 'react-native';
import { useFonts } from 'expo-font';


const colors = require("../assets/colors.json")

function Home({navigation}) {

    const nextView = ()=>{
        navigation.navigate('Locations')
    }




    return (

        <View style={style.main}>
            <TouchableOpacity onPress={nextView}>
                <View style={style.content}>
                
                     
                        <Text style={style.header}>GeoApp</Text>

                 
                </View>
            </TouchableOpacity>
        </View>
        
    );
}




const style = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#c77dff",
        gap:50
    },
    content:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    header:{
        fontSize:75,
        textAlign:"center",
        color: "white",
        borderWidth:  6,  
        borderRadius: 30,
        padding: 10
    },
    paragraf:{
        fontSize: 25,
        textAlign:"center",
        color:colors.text
    }
})




export default Home;