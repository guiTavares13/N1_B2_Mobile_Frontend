import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/home';
import Auth from '../views/Auth';
import Products from '../views/Products';
import ProductDetail from '../views/ProductDetail';
import HiringScreen from '../views/HiringScreen';
import ShoppingCartScreen from '../views/ShoppingCartScreen';


const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/> 
      <Stack.Screen name="Products" component={Products} options={{headerShown: true}}/>
      <Stack.Screen name={"ProductDetail"} component={ProductDetail} />
      <Stack.Screen name={'HiringScreen'} component={HiringScreen}/> 
      <Stack.Screen name={'ShoppingCartScreen'} component={ShoppingCartScreen}/>
    </Stack.Navigator>
  );
};

export default Router;
