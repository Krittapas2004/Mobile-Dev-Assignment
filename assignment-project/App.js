import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import "./global.css";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
