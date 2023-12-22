import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Title from '../components/title';
import quizImage from '../images/quiz3.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Home = ({navigation}) => {
  const [userinfo, setUserInfo] = useState();
  const handleNavToQuiz = () => {
    navigation.navigate('Quiz');
  };
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER INFO', userInfo);
      setUserInfo(userInfo);
      if (userInfo.user.email) {
        handleNavToQuiz();
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Error', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Error', error);
      } else {
        // some other error happened
        console.log('Other Error', error);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
    console.log(userinfo);
  }, []);

  return (
    <View style={styles.container}>
      <Title titleText="Quizzz" />
      <View style={styles.bannerContainer}>
        <Image source={quizImage} style={styles.banner} resizeMode="contain" />
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          Note: Each correct answer carries +3 marks and each wrong answer
          carries -1. If you skip any answer, it will be marked as zero!
        </Text>
      </View>

      <TouchableOpacity onPress={googleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>
          {userinfo?.user?.email
            ? 'Start the Quizzz!'
            : 'Sign in to start the Quizzz!'}
        </Text>
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
  noteContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  noteText: {
    fontSize: 16,
    textAlign: 'center',
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
