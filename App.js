import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./scr/screens/Homescreen";
import Loginscreen from "./scr/screens/Loginscreen";
import ProfileScreen from "./scr/screens/Profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Login" component={Loginscreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Homescreen} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
