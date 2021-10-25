import React, { useState, useEffect } from "react";
import { Image, TextInput, FlatList, StyleSheet, View, Button, Text, Animated, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
    <View style={styles.separator} />
  );

const Builds = () => {
    const [builds, setBuilds] = useState([]);
    const [debugging,setDebugging] = useState(false)
    const [curr,setCurr] = useState('')
    const [currlooking,setCurrlooking] = useState(false)

    useEffect(() => {getData()}, []);

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

  let currView = "";
  if (currlooking) {
    currView =
      <View>
          
          <Text style ={{color:'blue'}}>{curr}</Text>
        
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
          setCurr('');
        } else {
          setBuilds([]);
          setCurr('')

        }
      } catch (e) {
        console.dir(e)
      }

    }

    

    const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }


    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Lord',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Hero',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Army',
        },
      ];

      const Item = ({ title }) => {
        return (
          <View style={styles.item}>
            <Button style={styles.title} title={title }
                onPress={()=> {
                    const newCurr = curr.concat(title + ' ');
                    setCurr(newCurr);
                    storeData(newCurr);
                  }}
            
            />
          </View>
        );
      }
      
        const renderItem = ({ item }) => (
          <Item title={item.title} />
        )
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Separator />
          <Button
                  title={(currlooking?'hide':'show')+" Builds" }
                  color=""
                  onPress = {() => setDebugging(!de)}
                  />
          {debugView}
      <Button
                  title={(currlooking?'hide':'show')+" current build" }
                  color="green"
                  onPress = {() => setCurrlooking(!currlooking)}
                  />
                  {currView}

                  <Button
          color="green"
          title="Add"
          onPress={()=> {
            
            setBuilds(builds => [...builds, curr]);
            storeData(builds);
            setCurr('');

            // setReviews(reviews => [...reviews, answer]);
            // storeData(reviews);
            // setAnswer('');
            // console.log(typeof reviews);
          }}/>
          <Button
                  color='green' title='Clear memory'
                  onPress = {() => {
                        console.log('clearing memory');
                        clearAll()
                      }}
                />
        </SafeAreaView>
        
        
      );
}

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