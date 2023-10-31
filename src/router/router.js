import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/home';
import Auth from '../views/Auth';
import Products from '../views/Products';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/> 
      <Stack.Screen name="Products" component={Products} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default Router;
