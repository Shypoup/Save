import React, {Component} from 'react';
import {PermissionsAndroid, View, Text, AsyncStorage,YellowBox} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';

export default class FindLoction extends React.Component {
  
    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                     return true;
               
                } else {
                    alert("You don't have access for the location");
                }
            } catch (err) {
                alert(err)
            }
        }
    };
   
    Get_Location =async () => {
        if(await this.requestLocationPermission()){
            Geolocation.getCurrentPosition(
                (position) => {
                    //  console.log(position);
                        Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then(async(res) => {
                        console.log(res[1].formattedAddress);
                        await AsyncStorage.clear();
                        await AsyncStorage.setItem('Address',res[0].formattedAddress)
                        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
                        }).catch(err => console.log(err))
                    }, 
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
    
                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, showLocationDialog: false, forceRequestLocation: true }
            );        
        }
        
   }

    
}


