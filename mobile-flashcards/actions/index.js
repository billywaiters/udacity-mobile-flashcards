export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK      = 'ADD_DECK';
export const ADD_CARD      = 'ADD_CARD';

export function receiveDecks (decks) {

   return {
      type: RECEIVE_DECKS,
      decks,
   }
}

export function addDedck(deck) {
   return {
      type: ADD_DECK,
      deck,
   }
}

export function addCard (question, answer, deckId) {
   return {
      type: ADD_CARD,
      question: question,
      answer: answer,
      deckId: deckId,
   }
}