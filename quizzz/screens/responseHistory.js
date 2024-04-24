import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Title from '../components/title';

const QuizHistory = ({route}) => {
  const quizHistory = route.params?.quizHistory;
  console.log('quizHistory', quizHistory);

  return (
    <View style={styles.container}>
      <Title titleText="Your Responses!" />
      <FlatList
        data={quizHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              Q{index + 1}: {decodeURIComponent(item.question)}
            </Text>
            <Text style={styles.correctAnswer}>
              Correct Answer: {decodeURIComponent(item.correctAnswer)}
            </Text>
            <Text
              style={[
                styles.selectedOption,
                {
                  color:
                    item?.correctAnswer === item?.selectedOption
                      ? 'green'
                      : 'red',
                },
              ]}>
              Selected Option:{' '}
              {item.selectedOption
                ? decodeURIComponent(item.selectedOption)
                : 'No selection'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default QuizHistory;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  correctAnswer: {
    fontSize: 16,
    color: 'green',
  },
  selectedOption: {
    fontSize: 16,
    color: 'red',
  },
});
