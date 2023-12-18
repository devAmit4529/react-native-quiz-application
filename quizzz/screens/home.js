import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../components/title';
import quizImage from '../images/quiz3.png';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText="Quizzz" />
      <View style={styles.bannerContainer}>
        <Image source={quizImage} style={styles.banner} resizeMode="contain" />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#6a4c93',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
});
