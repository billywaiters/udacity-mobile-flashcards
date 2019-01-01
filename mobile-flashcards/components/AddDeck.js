import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import AppButton from './AppButton';
import { white, purple, red }  from '../utils/colors';
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {

  
  state = {

    deckName: '',
  }

  addNewDeck = () => {
    let title =  this.state.deckName;
    debugger;
    saveDeckTitle(title)
    .then(() => {
      const { navigation } = this.props;
      navigation.navigate('Decks', { refresh: true });
    })

  }

   render() {
 
      return (
         <View style={styles.container}>
            <View style={styles.topContainer}>
             <Text style={styles.titleText}>What is the title of you new deck?</Text>
             <TextInput placeholder='Deck Title'  style={styles.textInput} onChangeText={(text) => this.setState({deckName: text})}/>
           </View>
           <View style={styles.bottomContainer}>
           <AppButton onPress={this.addNewDeck} label='Submit' />
           </View>
         </View>
      )
   }

}

function mapStateToProps (entries) {
   return {
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     backgroundColor: white,
     justifyContent: 'flex-start',
     alignItems: 'stretch',
   },
   topContainer: {
      flex: 1,
      backgroundColor: white,
      alignItems: 'stretch',
      marginTop: 4,
      height: 50,
      justifyContent: 'flex-start',
   },
    bottomContainer: {
      flex: 1,
      backgroundColor: white,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 80,
      justifyContent: 'flex-end',
      
    },
    center: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 30,
     marginRight: 30,
   },
   titleText: {
      color: purple,
      fontSize: 26,
      textAlign: 'center',
      fontWeight: '700',
    },
    textInput: {
      color: purple,
      height: 40,
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 14,
      padding: 6,
      
    },
 })


 export default connect(mapStateToProps,)(AddDeck)