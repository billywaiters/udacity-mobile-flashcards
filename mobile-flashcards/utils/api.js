import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from '../components/Decks'

export function initStorage() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results)  => {
       if (!results) {
         let dummydata = {};
         AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummydata));

       }
    })
}

export function getDecks() {
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck(title) {
   console.log("getDeck called....");
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
   .then((results) => {
      let decks = JSON.parse(results);
      let deck = decks[title];
      return deck;
   })
}

export function saveDeckTitle (title) {
   let deck = {
      title: title,
      questions: [],
   }
   return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: deck
   }))
}

export function addCardToDeck (title, card) {
   return getDeck(title)
   .then((deck) => {
      deck.questions.push(card); 
      return  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
         [title]: deck
      }))
   })
}

export function deleteDeck (key) {
 return AsyncStorage.getItem(DECKS_STORAGE_KEY)
.then((results) => {
     const data = JSON.parse(results)
     data[key]  = undefined
     delete data[key]
     AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
   })
}

function createDeckKey (deckTitle) {
   return deckTitle.split(' ').join('');

}