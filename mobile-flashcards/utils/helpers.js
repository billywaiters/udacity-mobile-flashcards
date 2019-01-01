import React from 'react'

export function getDecks () {
   const decks = {
      Math: {
         title: 'Math',
         questions : [
            {
               question: 'What is the square root of 225?',
               answer: '15'
            },
            {
               question: 'What is the square root of 196?',
               answer: '13'
            },
            {
               question: 'What is the square root of 169?',
               answer: '13'
            },

         ]
      },
      Chemistry: {
         title: 'Chemistry',
         questions: [
            {
               question: 'What is the chemical formula for water?',
               answer: 'H2O'
            },
            {
               question: 'What is the chemical formula for hyudrogen peroxide?',
               answer: 'H2O2'
            },
            {
               question: 'What is the chemical formula for methan?',
               answer: 'CH4'
            },
            {
               question: 'What is the chemical formula for 2 4-dinitrophenylhydrazine?',
               answer: 'C6H6N4O4'
            },

         ]
      }
   }

   return decks;
}

export function getDeck (deckId) {
   let decks = getDecks();
   return decks[deckId];
}

export function saveDeckTitle (title) {
   
}

export function addCardToDeck (question, answer) {
   
}