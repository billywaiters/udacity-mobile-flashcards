import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { white, purple }  from '../utils/colors';
import AppButton from './AppButton';
import { AppLoading } from 'expo';
import {getDecks, initStorage} from '../utils/api';
import { receiveDecks } from '../actions'

export const DECKS_STORAGE_KEY = 'MobielFlashcards:decks';

function SelectDeck ({ onPress }) {
   return (
     <TouchableOpacity
       style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
       onPress={onPress}>
         <Text style={styles.submitBtnText}>Show Deck</Text>
     </TouchableOpacity>
   )
 }

class Decks extends Component {
 
  state = {
    ready: false,
    decks: null,
  }

  constructor (props) {
    super(props);
    this.reloadDecks = this.props.navigation.addListener('willFocus', () => {
        this.retrieveDecks();
    })
  }
 
  componentDidMount () {
     this.retrieveDecks();
  }

  componentWillUnmount() {
    this.reloadDecks;
  }

  retrieveDecks() {
    initStorage()
     .then(getDecks)
     .then((results) => {
       let d = JSON.parse(results);
       this.setState({
                 ready: true,
                 decks: d})})
  }

  showDeck = (key) => {
     this.props.navigation.navigate('Deck', {title: key, refreshFunction: this.refreshFunction}); 
  }

  refreshFunction = () => {

  }

   render() {

    const { decks } = this.state;

      if (decks === 'undefined' || decks ===  null) {
        return <AppLoading/>
      }

      let keys = Object.keys(decks);

      if (keys.length < 1) {
        return (
          <View style={styles.container}>
            <Text style={styles.titleText}>Please add a new deck.</Text>
          </View>
        )
      }

      let deckData = [];
      keys.map((key) => {
         let deck = decks[key];
         let item = {
           key: key,
           title: deck.title,
           numCards: deck.questions.length,
         }

         deckData.push(item);

      })
      return (
         <View style={styles.container}>
           <Text style={styles.titleText}>Decks</Text>
           <FlatList
             data ={deckData}
             renderItem={({item}) =>
               <View  style={styles.item}> 
                 <TouchableOpacity key={item.key} onPress={() => this.showDeck(item.key)} > 
                   <Text style={styles.titleText}>{item.title}</Text>
                   <Text style={styles.subTitleText}>{item.numCards + ' Cards'}</Text>
                 </TouchableOpacity> 
               </View>               
              }
            />
         </View>
      )


   }

}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     backgroundColor: white,
     justifyContent: 'space-between',
     alignItems: 'stretch',   },
   row: {
     flexDirection: 'row',
     flex: 1,
     justifyContent: 'center',
   },
   iosSubmitBtn: {
     backgroundColor: purple,
     padding: 10,
     borderRadius: 7,
     height: 45,
     marginLeft: 40,
     marginRight: 40,
   },
   AndroidSubmitBtn: {
     backgroundColor: purple,
     padding: 10,
     paddingLeft: 30,
     paddingRight: 30,
     height: 45,
     borderRadius: 2,
     alignSelf: 'flex-end',
     justifyContent: 'center',
     alignItems: 'center',
   },
   submitBtnText: {
     color: white,
     fontSize: 22,
     textAlign: 'center',
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
  item: {
    borderBottomWidth: 1,
    flex: 1,
    padding: 10,
  },

 })
 

function mapStateToProps (decks) {
   return {
     decks,
   }
 }

 export default connect(mapStateToProps,)(Decks)