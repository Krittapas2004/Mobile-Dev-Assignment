import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import DailySpecialScreen from "./screens/DailySpecialScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import IngredientsScreen from "./screens/IngredientsScreen";
import "./global.css";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Meal Recipe"
        component={HomeScreen}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#000",
          },
        }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Favourites() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourite Meal Recipe"
        component={FavouritesScreen}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#000",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function DailySpecial() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Daily Special"
        component={DailySpecialScreen}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#000",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Ingredient() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Daily Special"
        component={IngredientsScreen}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#000",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Daily Special") iconName = iconName = "ribbon";
            else if (route.name === "Favourites") iconName = "heart";
            else if (route.name === "Ingredients") iconName = "restaurant";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#000",
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Daily Special" component={DailySpecial} />
        <Tab.Screen name="Favourites" component={Favourites} />
        <Tab.Screen name="Ingredients" component={Ingredient} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
