import React from 'react'
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors'

export default function AppButton ({ onPress, label, style = {} }) {
   return (
     <TouchableOpacity
       style={[Platform.OS === 'ios' ? styles.iosButton : styles.AndroidButton, style]}
       onPress={onPress}>
         <Text style={styles.buttonText}>{label}</Text>
         
     </TouchableOpacity>
   )
 }

 const styles = StyleSheet.create({
   iosButton: {
     backgroundColor: purple,
     padding: 10,
     borderRadius: 7,
     height: 45,
     width: 250,
     marginLeft: 40,
     marginRight: 40,
     marginTop: 5,
   },
   AndroidButton: {
     backgroundColor: purple,
     padding: 10,
     paddingLeft: 30,
     paddingRight: 30,
     height: 45,
     width: 250,
     borderRadius: 2,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 5,
   },
   buttonText: {
     color: white,
     fontSize: 22,
     textAlign: 'center',
   },
 })

