import * as React from 'react';
import { Image, TextInput, FlatList, StyleSheet, View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Reviews from './components/Reviews'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Builds from './components/Builds'

const Separator = () => (
  <View style={styles.separator} />
);



function Main({ navigation }) {
  

  return (

  
    <div>
      <View style={styles.container}>
        <Text>Main screen</Text>
        <Separator />
        <Button
          margintop = '10'
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <Separator />
        
      </View>
      <View style = {styles.container}>
        <Button
          margintop = '10'
          title="Go to About"
          onPress={() => navigation.navigate('About')}
        />
        <Separator />
      </View>
      <View style = {styles.container}>
        <Button
          margintop = '10'
          title="Go to Reviews"
          onPress={() => navigation.navigate('Review')}
        />
      </View>
       <Separator />

       <View style = {styles.container}>
        <Button
          margintop = '10'
          title="Make my build"
          onPress={() => navigation.navigate('Build')}
        />
      </View>
       <Separator />
      
    </div>
  );
}

function Profile({ navigation }) {
  
  const [text, setText] = React.useState("Your name");
  return (
    <div>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile screen</Text>
        <Separator />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={text}
          onChangeText={text => setText(text)}
        />
        <Text style={{padding: 10, fontSize: 42}}>
        Hello {text.split(' ').map((word) => word ).join(' ')}
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{
              resizeMode: "cover",
              height: 100,
              width: 200
            }}
            source={"https://upload.wikimedia.org/wikipedia/en/2/27/Total_War_Warhammer_3_cover_art.jpg"}
          />
          <Text>Totalwar Warhammer 3!</Text>
          </View>
        <Separator />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{
              resizeMode: "cover",
              height: 100,
              width: 200
            }}
            source={"https://www.nme.com/wp-content/uploads/2021/09/Total-Warhammer-3-Grand-Cathay-Dragon.jpg"}
          />
        <Text>Grand Cathay</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Image
          style={{
            resizeMode: "cover",
            height: 100,
            width: 200
          }}
          source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM9n6tQzcRE8CXMXP5GXIIgYIF3wXVMZy4JA&usqp=CAU"}
        />
        <Text>Kislev</Text>
        </View>

      </View>


    </div>
  );
}

function About({ navigation }) {
  return (
    <div>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About screen</Text>
        <Separator />
        <FlatList
          data={[
            {key: 'Lingyu Liu'},
            {key: 'CS 153A'},
            {key: 'Assignment2'},
          
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        
      </View>

      <View style = {styles.container}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </div>
  );
}

function Review({ navigation }) {
  return (
    <div>
      <View style = {styles.container}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
      <Reviews />
    </div>
    
  );
}



const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{ headerStyleInterpolator: forFade }}
      />

      
     
    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
