import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState();
  const [quesNo, setQuesNo] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // To track selected option
  console.log('SELECTED', selectedOption);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  console.log('CORRECT', correctAnswer);
  const [quizHistory, setQuizHistory] = useState([]); // New state for history

  const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  const getQuiz = async () => {
    setIsLoading(true);
    const url =
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data?.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setCorrectAnswer(decodeURIComponent(data?.results[0]?.correct_answer)); // Set the correct answer
    console.log('RESSSS', data.results[0]);
    setIsLoading(false);
  };

  // const handleNextPress = () => {
  //   setQuesNo(quesNo + 1);
  //   setOptions(generateOptionsAndShuffle(questions[quesNo + 1]));
  // };

  const handleNextPress = () => {
    setQuesNo(quesNo + 1);
    setSelectedOption(null); // Reset selected option
    setOptions(generateOptionsAndShuffle(questions[quesNo + 1]));
    setCorrectAnswer(decodeURIComponent(questions[quesNo + 1]?.correct_answer)); // Update correct answer
  };

  const handlePrevPress = () => {
    setQuesNo(quesNo - 1);
    setOptions(generateOptionsAndShuffle(questions[quesNo - 1]));
  };

  const generateOptionsAndShuffle = _question => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleSelectOption = _option => {
    setSelectedOption(_option); // Track selected option

    const questionData = {
      question: decodeURIComponent(questions[quesNo]?.question),
      correctAnswer,
      selectedOption: _option,
    };

    setQuizHistory([...quizHistory, questionData]);

    if (_option === correctAnswer) {
      setScore(score + 3);
    } else {
      setScore(score - 1);
    }
  };

  // const handleSelectOption = _option => {
  //   if (_option === questions[quesNo].correct_answer) {
  //     setScore(score + 3);
  //   } else if (_option !== questions[quesNo].correct_answer) {
  //     setScore(score - 1);
  //   }
  //   if (quesNo != 9) {
  //     setQuesNo(quesNo + 1);
  //     setOptions(generateOptionsAndShuffle(questions[quesNo + 1]));
  //   }
  //   if (quesNo === 9) {
  //     navigation.navigate('Result', {result: score});
  //   }
  // };
  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>LOADING ...</Text>
        </View>
      ) : (
        questions && (
          <View style={styles.parent}>
            <View style={styles.top}>
              <Text style={styles.question}>
                Q.{quesNo + 1} {decodeURIComponent(questions[quesNo]?.question)}
              </Text>
            </View>
            <View style={styles.options}>
              {options.map((option, index) => {
                const decodedOption = decodeURIComponent(option);
                // console.log('DECODED', decodedOption);
                const optionColor =
                  selectedOption === decodedOption
                    ? decodedOption === correctAnswer
                      ? '#4CAF50'
                      : '#F44336'
                    : '#8d99ae';

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      {backgroundColor: optionColor},
                    ]}
                    onPress={() => handleSelectOption(decodedOption)}
                    disabled={selectedOption !== null} // Disable button after selection
                  >
                    <Text style={styles.option}>{decodedOption}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.bottom}>
              {quesNo < 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleNextPress}
                  disabled={selectedOption === null} // Disable "Next" until an option is selected
                >
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
              )}
              {quesNo < 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Result', {result: score})}
                  disabled={selectedOption === null} // Disable "Next" until an option is selected
                >
                  <Text style={styles.buttonText}>FINISH</Text>
                </TouchableOpacity>
              )}

              {quesNo === 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('Result', {result: score, quizHistory})
                  }
                  disabled={selectedOption === null} // Disable until an option is selected
                >
                  <Text style={styles.buttonText}>GO TO RESULT</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  parent: {height: '100%'},
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6a4c93',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#8d99ae',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '500',
  },
});
