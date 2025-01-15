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
        <Stack.Screen name="Login" component={Loginscreen} />
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
