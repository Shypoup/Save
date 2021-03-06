import React, {Component} from 'react';
import {View,Button,StyleSheet,PermissionsAndroid,Linking,Text, AsyncStorage,YellowBox} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import wifi from 'react-native-android-wifi';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import DataAndWifi from './mobile_services/data_wifi';
import FindLoction from './mobile_services/find_location';
import SendMail from './mobile_services/send_mail';

export default class App extends React.Component{
  
  state={
    addr: {},
    formattedAddress: ''
  };

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
              // Geocoder.geocodeAddress('New Cairo').then(res => {
              //   this.addr = res[0].position;
              //   console.log(this.addr);
              //   const address = this.addr;
                  
                  
              // }) .catch(err => console.log(err))
              Geolocation.getCurrentPosition(
                (position) => {
                     console.log(position);
                     Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then((res) => {
                      // let data = res.filter(info => info.position.lng == position.coords.longitude && info.position.lat == position.coords.latitude);
                      //  console.log(data);
                      console.log(res);
                      return this.setState({formattedAddress: res[0].formattedAddress})
                  
                  }).catch(err => console.log(err))
                }, 
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, showLocationDialog: false }
            );
            } else {
                alert("You don't have access for the location");
            }
        } catch (err) {
            alert(err)
        }
    }
};


  render(){
    return(

      <View style={styles.container}>
          

          <Button 
           title="Danger_Mode"
           onPress={()=>{
             this.requestLocationPermission();
           }}
          >

          </Button>

          
          <Text>{this.state.formattedAddress}</Text>

          <QRCode
            value="Hesham"
            size = {200}
          />



       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
     alignItems:'center',
     justifyContent:'center',
     marginTop:25,
     flex:1
  },
  
})

