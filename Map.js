import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Map({ route, navigation }) {
    
    
    const { data } = route.params;
    const [location, setLocation] = useState([null]); // State where location is saved
    const [lat, setLat] = useState(60.201373);
    const [lng, setLng] = useState(24.934041);
    const [address, setAddress] = useState();
    

    const initial = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      };
    
      const coordinates = {
        latitude: lat,
        longitude: lng
    };
    
    useEffect(() => {
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=76PpvcjXRuXjn7vJr3JvOim3RwT68q7v&location=${data}`)
          .then(response => response.json())
          .then(responseJson => {
            setLocation(responseJson.results[0].locations[0].latLng)
            setLat((responseJson.results[0].locations[0].latLng.lat))
            setLng((responseJson.results[0].locations[0].latLng.lng))
            setAddress(responseJson.results[0].locations[0].street)
    
          })
        .catch(error => { 
            Alert.alert(JSON.stringify(responseJson)); 
        });
    }, []);

    const searchAddress = () => {
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=76PpvcjXRuXjn7vJr3JvOim3RwT68q7v&location=${data}`)
          .then(response => response.json())
          .then(responseJson => {
            setLocation(responseJson.results[0].locations[0].latLng)
            setLat((responseJson.results[0].locations[0].latLng.lat))
            setLng((responseJson.results[0].locations[0].latLng.lng))
            setAddress(responseJson.results[0].locations[0].street)
    
          })
        .catch(error => { 
            Alert.alert(JSON.stringify(responseJson)); 
        });    
      }

    
      return (
        <View style={styles.container}>
        <MapView
          style={styles.map}
          region={initial}
        >
          <Marker
            coordinate={coordinates}
            title='Haaga-Helia'
          />
        </MapView>
        <View style={{ width: "100%" }}>
          <Button onPress={searchAddress} title="SHOW"></Button>
        </View>
      </View>
      );
}
const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: "100%",
      height: "100%"
    }
  });