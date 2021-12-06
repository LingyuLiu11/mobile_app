import React from 'react';
import {Text, View, TextInput, Button, ImageBackground, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
const Separator = () => (
    <View style={styles.separator} />
  );

const image = { uri: "https://content.totalwar.com/total-war/com.totalwar.www2019/uploads/2021/09/17112829/CR-Grand-Cathay_Iron-Dragon_FINAL-1024x576.png" };
export default function About() {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style = {styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>About screen</Text>
            <Separator />
            <FlatList data={[{key: 'Lingyu Liu'},{key: 'CS 153A'},{key: ''},]} renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>
        </View>

        {/* <View style = {styles.container}>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View> */}
        </View>
        </ImageBackground>
    );
}

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