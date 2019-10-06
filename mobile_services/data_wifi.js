import React, {Component} from 'react';
import wifi from 'react-native-android-wifi';

export default class DataAndWifi extends React.Component{

     open_Phone_Wifi = ()=>{
        wifi.isEnabled((isEnabled) => {
            if (isEnabled) {
              console.log("wifi service enabled");
            } else {
              wifi.setEnabled(true);
            }
          });
     }

     open_Phone_Data = ()=>{
         // still not known
     }
}