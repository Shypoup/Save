import React, {Component} from 'react';
import  {AsyncStorage} from 'react-native';
import email from 'react-native-email'

export default class SendMail extends React.Component{

   Send_Email = () => {
     const to = 'yassertarek98@gmail.com';
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            // bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Show how to use',
            body: 'Some body right here'
        }).catch(console.error)
     }
   }
