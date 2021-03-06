import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import AppButton from './AppButton';
import { AppLoading } from 'expo';
import { white, purple, red, green }  from '../utils/colors';
import { getDeck } from '../utils/api';
import { clearLocalNotificaiton } from '../utils/helpers';

class Quiz extends Component {

   static navigationOptions = ({ navigation }) => {
      const { title } = navigation.state.params
  
      return {
        title: title,
      }
    }
  

   state = {
      ready: false,
      title: '',
      deck: null,
      showingQuestion: true,
      questionIndex: 0,
      correctAnswers: 0,
      }

   componentDidMount () {
      const { navigation } = this.props;
      const title = navigation.getParam('title', null);
      getDeck(title)
      .then((deck) => {this.setState({ ready: true, title: title, deck: deck });
      })
      
    }
  
   answerWasCorrect = () => {
      this.setState( {
         questionIndex: this.state.questionIndex + 1, 
         showingQuestion: true,
         correctAnswers: this.state.correctAnswers + 1,
       });
   }

   answerWasIncorrect = () => {
      this.setState( {
         questionIndex: this.state.questionIndex + 1, 
         showingQuestion: true, 
      });
   }

   showAnswerOrQuestion = () => {
      this.setState( {
         showingQuestion: !this.state.showingQuestion, 
      });
   }

   restart = () => {
      this.setState( {
         questionIndex: 0, 
         correctAnswers: 0,
       });

   }

   backToDeck = () => {

      this.props.navigation.navigate('Deck', { title: this.state.title });

   }

   render() {

      const {ready, title, deck } = this.state;

      if (ready === false ) {
         return <AppLoading />
       }
   
      if (deck.questions.length < 1) {
         return (
            <View style={styles.container}>
            <View style={styles.topContainer}>
              <Text style={styles.titleText}>The deck contains no questions.</Text> 
              <Text style={styles.titleText}>Please return to the Deck screen and select Add Card to add a question to the Deck.</Text> 
            </View>
         </View>    
         )
      }

      if (this.state.questionIndex >= deck.questions.length) {
         let percent = this.state.correctAnswers / deck.questions.length * 100;
         let percentString = percent + '%';
         let resultString = 'Results for Deck: '  + title;
         return (

            <View style={styles.container}>
               <View style={styles.topContainer}>
                 <Text style={styles.titleText}>{resultString}</Text> 
                 <Text style={styles.titleText}>{percentString}</Text>
               </View>
               <View style={styles.bottomContainer}>
                <AppButton onPress={this.restart} label='Restart Quiz' style={{backgroundColor: 'green'}}/>
                <AppButton onPress={this.backToDeck} label='Return to Deck' style={{backgroundColor: 'red'}} />
               </View>
            </View> 
         )
      }          

      let display = this.state.showingQuestion 
                  ? deck.questions[this.state.questionIndex].question 
                  : deck.questions[this.state.questionIndex].answer;
      

      let counterString = 'Question ' + (this.state.questionIndex + 1) + ' of ' + deck.questions.length; 
           
      return (
         <View style={styles.container}>
         <View style={styles.topContainer}>
         <Text>{counterString}</Text> 
           <Text style={styles.titleText}>{display}</Text>
           <TextButton onPress={this.showAnswerOrQuestion} style={styles.answerText}>{ this.state.showingQuestion ? 'Answer' : 'Question'}</TextButton>
         </View>
         <View style={styles.bottomContainer}>
           <AppButton onPress={this.answerWasCorrect} label='Correct' style={{backgroundColor: 'green'}}/>
           <AppButton onPress={this.answerWasIncorrect} label='Incorrect' style={{backgroundColor: 'red'}} />
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
    answerText: {
      color: red,
      fontSize: 22,
      textAlign: 'center',
      fontWeight: '700',
    },
 
 })

 export default Quiz 