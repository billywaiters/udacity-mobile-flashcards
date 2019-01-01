#Mobile Flash Cards
*Mobile Flash* is a class project for the Udacity React Nanodegree Program. This project is designed to teach the developer the basics of React Native. 

The simple application provides the user with the ability to create and remove *decks* of flash cards for studying topics of interest.


##Installation

Change directories to the project source.


run yarn install
run yarn start


##Usage

When the application starts the user is presented with two tabs located at the bottom of the screen.  The default tab is displayed and contains a list of previously created decks.  If no decks have been created then the user is prompted to create a new deck. The second tab allows the user to add decks to the applications

Selecting a deck will display the Deck page.  From the page the user can choose to add a new card to the deck or to start the quiz.  

The Add Card page provide the user with two inputs, one for the question, one for the answer.  When the user has filled in the inputs he can submit the card for inclusion in the current dec.

The Quiz page will allow the user to view the question. Once they have an answer in mind they can select the *Answer* link to check their answer. If they answered correctly they can press the Correct button, otherwise they press the Incorrect button. Once they have answered all of the question for the deck, the results will be displayed.  At this point the user has the choice of retaking the quiz or returning to the deck page.

If the user presses the Start Quiz button on a deck with 0 cards they will be asked to return to the deck page an add some card.

The Add Deck tab of the start screen will open the Add Deck screen. Here the user can create a new deck by setting the title of the deck and clicking the Submit button.  The user will then be returned to the Decks tab where they can select the new deck so they can add cards for a new quiz.
 
##License: 

   The Unlicense
   