import * as React from 'react';
import { Image, ImageBackground, TextInput, FlatList, StyleSheet, View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import Reviews from './components/Reviews'
import Profile from './components/Profile'

import Home from './components/Home'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Builds from './components/Builds'

import About from './components/About'


const Tab = createBottomTabNavigator();
const Separator = () => (
  <View style={styles.separator} />
);



const App = () => {
  
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component= {Home} options={{
            title: 'Home',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'data:image/png;base64,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',
                  }}
                />
              );
            },
          }}/>
        <Tab.Screen name="Profile" component= {Profile} options={{
            title: 'Existing builds',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOkuJSuL2wXr-FWd-mnPK2NBTa3co38kYvQ&usqp=CAU',
                  }}
                />
              );
            },
          }}/>
        <Tab.Screen name="About" component= {About} options={{
            title: 'About',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'data:image/png;base64,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',
                  }}
                />
              );
            },
          }}/>
        <Tab.Screen name="Reviews" component= {Reviews} options={{
            title: 'Reviews',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbjdeAclFUjoFgzvUiJP9gJqCmCv0vwQo8kg&usqp=CAU',
                  }}
                />
              );
            },
          }}/>
        <Tab.Screen name="Builds" component= {Builds} options={{
            title: 'Builds',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrGGe0pCrQQLMAOpAEhceXtG9myn0KKqazVg&usqp=CAU',
                  }}
                />
              );
            },
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;