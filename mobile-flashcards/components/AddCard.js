import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView  } from 'react-native'
import { white, purple, red }  from '../utils/colors';
import AppButton from './AppButton';
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card',
    }
  }

  state = {
    question: '',
    answer: '',
    title: '',
  }

  componentDidMount () {
    const { navigation } = this.props;
    const title = navigation.getParam('title', "Unnamed Deck")
    this.setState({ title: title });
  }

  addNewCard = () => {

    let title = this.state.title;
    let newQuestion = { question: this.state.question, answer: this.state.answer};

    addCardToDeck(title, newQuestion)
    .then(() => {
      const { navigation } = this.props;
      navigation.navigate('Deck', { refresh: true });        
    })

  }

   render() {
 
      return (
         <KeyboardAvoidingView behavior="padding"  style={styles.container}>
           <View style={styles.topContainer}>
           <TextInput placeholder='Question' 
                      style={styles.textInput}
                      onChangeText={(text) => this.setState({question: text})}/>
           <TextInput placeholder='Answer'  
                      style={styles.textInput}
                      onChangeText={(text) => this.setState({answer: text})}/>
           </View>
           <View style={styles.bottomContainer}>
           <AppButton onPress={this.addNewCard} label='Submit' />
           </View>
         </KeyboardAvoidingView>
      )

   }


}

// function mapStateToProps (entries) {
//    return {
//    }
//  }

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
    deleteText: {
      color: red,
      fontSize: 22,
      textAlign: 'center',
      fontWeight: '700',
    },
 
 })

 export default AddCard 