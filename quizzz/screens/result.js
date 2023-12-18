import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import average from '../images/stick-man-writing-on-paper.png';
import winner from '../images/office-best-achiever.jpg';
import loser from '../images/stickman-sleeping-on-desk.png';

import {useRoute} from '@react-navigation/native';
import Title from '../components/title';

const Result = ({navigation}) => {
  const route = useRoute();
  const result = route.params?.result;
  return (
    <View style={styles.container}>
      <Title titleText="RESULT" />
      <Text style={styles.scoreValue}> {result}</Text>
      <View style={styles.bannerContainer}>
        {result >= 25 && (
          <Image source={winner} style={styles.banner} resizeMode="contain" />
        )}
        {result < 25 && result > 10 && (
          <Image source={average} style={styles.banner} resizeMode="contain" />
        )}
        {result <= 10 && (
          <Image source={loser} style={styles.banner} resizeMode="contain" />
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

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
  scoreValue: {
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center',
  },
});