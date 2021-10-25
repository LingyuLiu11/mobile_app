import React, { useState, useEffect } from "react";
import { Image, TextInput, FlatList, StyleSheet, View, Button, Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from 

const Separator = () => (
  <View style={styles.separator} />
);

const Builds = () => {
    const [builds, setBuilds] = useState([]);
    const [debugging,setDebugging] = useState(false)
    const [answer,setAnswer] = useState('')

    
      // ========================================
      
    
  useEffect(() => {getData()}, [])

  let debugView = "";
  if (debugging) {
    debugView =
      <View>
          {builds.map((build) =>
          <View><Text style ={{color:'red'}}>{build}</Text></View>
        )}   
        <Separator />     
      </View>

  }

    
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@reviews', jsonValue)
          console.log('just stored '+jsonValue)
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
          setBuilds(data);
          setAnswer('');
        } else {
          setBuilds([]);
          setAnswer('')

        }
      } catch (e) {
        console.dir(e)
      }

    }

    

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          console.dir(e)
        }
  }



    return (
      <View style={styles.container}>
            <Text style={{fontSize:60}}> Add reviews </Text>
            <TextInput
                  style={{fontSize:60}}
                  placeholder='reviews'
                  onChangeText={text => {setAnswer(text)}}
                  value={answer}
                  
              />
              
              <Separator />

              <Button
          color="green"
          title="Add"
          onPress={()=> {
            const newReviews = builds.concat(answer);
            setBuilds(newReviews);
            storeData(newReviews);
            setAnswer('');
          }}
      />
      
      <Separator />
      <Button
                  title={(debugging?'hide':'show')+" Riviews" }
                  color="green"
                  onPress = {() => setDebugging(!debugging)}
                  />
                  {debugView}
      
      
      <Separator />

      
              
          </View>
      
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      border: "thick solid red",
      margin:"20px",
      padding:"20px",
    },
    separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Builds;