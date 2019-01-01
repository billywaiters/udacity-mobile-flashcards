import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { white, purple, red }  from '../utils/colors';
import TextButton from './TextButton';
import { AppLoading } from 'expo';
import { deleteDeck, getDeck } from '../utils/api'

class Deck extends Component {
  
  state = {
    ready: false,
    title: '',
    deck: null,
  }

  constructor (props) {
    super(props);
    this.reloadDeck = this.props.navigation.addListener('willFocus', () => {
        console.log("reloadDeck called - loading deck");
        this.retrieveDeck(props.navigation.getParam('title', null));
    })
  }

  componentDidMount () {
    // const { navigation } = this.props;
    // const title = navigation.getParam('title', null);
    // console.log("DecK: Loading " + title);
    // getDeck(title)
    // .then((deck) => {this.setState({ ready: true, title: title, deck: deck });
    // })
    
  }

  componentWillUnmount() {
    console.log("Unmounting");
    this.reloadDeck;
  }


  onAddCard = () => {
    const { navigation } = this.props;
    navigation.navigate('AddCard', {title: this.state.title});
  }

  onStartQuiz = () => {
   const { navigation } = this.props;
   navigation.navigate('Quiz', {title: this.state.deck.title});
  }

  onDeleteDeck = () => {
    const { navigation } = this.props;
    deleteDeck(this.state.title)
    .then(() => {
      navigation.navigate('Decks', { refresh: true });
    })
  }


  retrieveDeck(foo) {
    console.log("Deck: Retrieving Deck....")
    getDeck(foo)
    .then((deck) => { 
      console.log("Deck: " + deck);
        this.setState({ready: true, deck: deck, title: deck.title})
    })
  }

   render() {
   
   const { ready, deck } = this.state;

    if (ready === false ) {
      return <AppLoading />
    }

    return (
         <View style={styles.container}>
         <View style={styles.topContainer}>
           <Text style={styles.titleText}>{ deck.title }</Text>
           <Text style={styles.subTitleText}>{ deck.questions.length + ' Cards' }</Text>
         </View>
         <View style={styles.bottomContainer}>
           <AppButton onPress={this.onAddCard} label='Add Card' />
           <AppButton onPress={this.onStartQuiz} label='Start Quiz' />
           <TextButton onPress={this.onDeleteDeck} style={styles.deleteText}>Delete Deck</TextButton>
         </View>
         </View>

      )

   }

}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     backgroundColor: white,
     justifyContent: 'space-evenly',
     alignItems: 'center',
   },
   topContainer: {
      flex: 1,
      backgroundColor: white,
      alignItems: 'center',
      marginBottom: 40,
      marginTop: 40,
      
    },
    bottomContainer: {
      flex: 1,
      backgroundColor: white,
      alignItems: 'center',
      marginBottom: 80,
      
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
    subTitleText: {
      color: purple,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '500',

    },
    deleteText: {
      color: red,
      fontSize: 22,
      textAlign: 'center',
      fontWeight: '700',
    },
 
 })

 export default Deck 