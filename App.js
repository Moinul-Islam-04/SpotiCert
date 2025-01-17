import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import your screens
import Homescreen from "./scr/screens/Homescreen";
import Loginscreen from "./scr/screens/Loginscreen";
import ProfileScreen from "./scr/screens/Profile";
import Artistdetail from "./scr/screens/Artistdetail";
import SearchScreen from "./scr/screens/Searchscreen";
import FriendsScreen from "./scr/screens/Friendsscreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create TabNavigator component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SearchTab") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "FriendsTab") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#282828",
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Homescreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchScreen}
        options={{ tabBarLabel: "Search" }}
      />
      <Tab.Screen 
        name="FriendsTab" 
        component={FriendsScreen}
        options={{ tabBarLabel: "Friends" }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Loginscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArtistDetail"
          component={Artistdetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}