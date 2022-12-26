import React, { useState, useEffect }from "react";
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
    // const [location, setLocation] = useState({});

    // useEffect(() => {
    //     if (route.params){
    //         setLocation(route.params);
    //     }
    // }, [route.params]);

    console.log(route.params);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    longitude: route.params.longitude,
                    latitude: route.params.latitude,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={{
                    longitude: route.params.longitude,
                    latitude: route.params.latitude
                }} />
            </MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
    width: '100%',
    height: '100%',
  },
})

export default MapScreen;