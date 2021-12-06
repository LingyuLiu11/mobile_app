import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, TextInput, FlatList, StyleSheet, View, Button, Text, Animated, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
    <View style={styles.separator} />
  );
  const image = { uri: "https://www.nme.com/wp-content/uploads/2021/09/Total-Warhammer-3-Grand-Cathay-Dragon.jpg" };
const Builds = () => {
    const [builds, setBuilds] = useState([]);
    const [debugging,setDebugging] = useState(false)
    const [curr, setCurr] = useState('')
    const [currlooking,setCurrlooking] = useState(false)

    useEffect(() => {getData()}, []);

    let debugView = "";
  if (debugging) {
    debugView =
      <View>
        {builds.map((build) =>
        <View><Text style ={{color:'red'}}>{build}</Text></View>)}   
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
          await AsyncStorage.setItem('@builds', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.dir(e)
        }
    }

    const getData = async() => {
      try {
        const jsonValue = await AsyncStorage.getItem('@builds')
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
          title: 'Army1',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Army2',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Army3',
          },
      ];

      const Item = ({ title }) => {
        return (
          <View style={styles.item}>
            <TouchableOpacity style={{backgroundColor:"#fca"}}  onPress={()=> {const newCurr = curr.concat(title + ' ');setCurr(newCurr); storeData(newCurr);}}>
            <Text>{title}</Text>
            <Image style={styles.tinyLogo} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQlqbmzmjh691kWH6b1QxfBwKM_w67H1HPQ&usqp=CAU',}}/>
              </TouchableOpacity>
              
            <Separator />
          </View>
        );
      }
      
      const renderItem = ({ item }) => (
        <Item title={item.title} />    
      )
      return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}/>
          <Separator />
          <Button
            title={(currlooking?'hide':'show')+" Builds" }
            color=""
            onPress = {() => setDebugging(!debugging)}/>
          <Separator />
          {debugView}
          <Separator />
          <Button
            title={(currlooking?'hide':'show')+" current build" } color="green" onPress = {() => setCurrlooking(!currlooking)}/>
          <Separator />
          {currView}
          <Separator />
          <Button
            color="green" title="Add" onPress={()=> {
              setBuilds(builds => [...builds, curr]); storeData(builds);setCurr('');}}/>
          <Separator />
          <Button color='green' title='{Clear memory}' onPress = {() => {console.log('clearing memory'); clearAll()}}/>
          <Separator />
        </View>
        </ImageBackground>
      );
}

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
    tinyLogo: {
      width: 50,
      height: 50,
    },
  });
  
export default Builds;