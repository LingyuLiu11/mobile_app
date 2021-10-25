import React, { useState, useEffect } from "react";
import { Image, TextInput, FlatList, StyleSheet, View, Button, Text, Animated, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
    <View style={styles.separator} />
  );

const Boards = () => {
    const [builds, setBuilds] = useState([]);
    const [debugging,setDebugging] = useState(false)
    const [curr,setCurr] = useState('')

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
          setCurr([]);
        } else {
          setBuilds([]);
          setCurr([])

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
                    const newCurr = curr.concat({title} + ' ');
                    setCurr(newCurr);
                    storeData(newBuilds);
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
                  title={(debugging?'hide':'show')+" Riviews" }
                  color="green"
                  onPress = {() => setDebugging(!debugging)}
                  />
                  {debugView}
        </SafeAreaView>
        <Button
          color="green"
          title="Add"
          onPress={()=> {
            const newReviews = builds.concat(answer);
            setBuilds(newReviews);
            storeData(newReviews);
            setAnswer('');
          }}
        
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 5,
      marginVertical: 8,
    //   marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
export default Boards;

