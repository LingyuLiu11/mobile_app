import React from "react";
import {View,Text, StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
    <View style={styles.separator} />
  );

const image = { uri: "https://assets2.rockpapershotgun.com/total_war_warhammer_3_preview1.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/total_war_warhammer_3_preview1.jpg" };
const HomeScreen = ({ navigation }) => {
  return (
    
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View>
        
    </View>
    </ImageBackground>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    separator: {
      flex:1,
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    item: {
      flex:1,
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    input: {
      flex:1,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    container11: {
      flex: 1,
    },
  });
  