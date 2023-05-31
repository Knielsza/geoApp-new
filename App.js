import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home"
import Locations from "./screens/Locations"
import Map from './screens/Map';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerShown:false,
        }}/>
        <Stack.Screen 
          name='Locations' 
          component={Locations}
          options={{
            ...globalOptions,
            title:"Locations"
          }}/>
        <Stack.Screen
        name='Map' 
        component={Map}
        options={{
          ...globalOptions,
          title:"Map"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const globalOptions = {
  headerStyle: {
  backgroundColor: "#e0aaff",

 },
 headerTintColor: "black",
 headerTitleStyle: {
    fontWeight: 'bold',
 },
}