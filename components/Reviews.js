import React, { useState, useEffect } from "react";
import { Image, TextInput, FlatList, StyleSheet, View, Button, Text, Animated, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Separator = () => (
  <View style={styles.separator} />
);
const image = { uri: "https://assets2.rockpapershotgun.com/total-war-warhammer-3-grand-cathay-battle.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/total-war-warhammer-3-grand-cathay-battle.jpg" };
const Reviews = () => {
    const [reviews, setReviews] = useState([0, 1]);
    const [debugging,setDebugging] = useState(false)
    const [answer,setAnswer] = useState('')

  useEffect(() => {getData()}, [])

  let debugView = "";
  if (debugging) {
    debugView =
      <View>
        {reviews.map((review) =>
          <View>
            <Text style ={{color:'red'}}>{review}</Text>
          </View>
        )}
        <Separator />
      </View>
  }

  const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@reviews', value)
        console.log('just stored '+value)
      } catch (e) {
        console.dir(e)
      }
  }

  const getData = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@reviews')
      let data = null
      if (jsonValue != null) {
        data = JSON.parse(jsonValue)
        setReviews(data);
        setAnswer('');
      } else {
        setReviews([]);
        setAnswer('')

      }
    } catch (e) {
      console.dir(e)
    }

  }

  const clearAll = async () => {
    try {
      console.log('in clearData')
      await AsyncStorage.clear()
      //console.log(reviews)
    } catch(e) {
      console.log("error in clearData ")
      console.dir(e)
      // clear error
    }
}

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={{fontSize:60}}> Add reviews </Text>
        <TextInput style={{fontSize:60}} placeholder='???' onChangeText={text => {setAnswer(text)}}value={answer}/>
        <Separator/>
        <Button color="green" title="Add" onPress={()=> {setReviews(reviews => [...reviews, answer]);storeData(reviews);setAnswer('');console.log(typeof reviews);}}/>
        <Separator/>
        <Button title={(debugging?'hide':'show')+" Riviews" }color="green"onPress = {() => setDebugging(!debugging)}/>
        {debugView}
        <Separator/>
        
        
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin:"20px",
    padding:"20px",
    },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});

export default Reviews;