import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function IngredientsScreen() {
  const [ingredients, setIngredients] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getIngredients();
    const unsubscribe = navigation.addListener("focus", getIngredients);
    return unsubscribe;
  }, [navigation]);

  const getIngredients = async () => {
    try {
      const value = await AsyncStorage.getItem("ingredients");
      if (value) {
        const parsed = JSON.parse(value);
        setIngredients(parsed);
      } else {
        setIngredients([]);
      }
    } catch (err) {
      console.log("Error loading ingredients:", err);
    }
  };

  const removeIngredient = async (ingredientToRemove) => {
    try {
      const updated = ingredients.filter(
        (item) =>
          !(
            item.name === ingredientToRemove.name &&
            item.category === ingredientToRemove.category
          )
      );
      await AsyncStorage.setItem("ingredients", JSON.stringify(updated));
      setIngredients(updated);
    } catch (err) {
      console.log("Error removing ingredient:", err);
    }
  };

  const grouped = ingredients.reduce((result, ing) => {
    if (!result[ing.category]) result[ing.category] = [];
    result[ing.category].push(ing);
    return result;
  }, {});
  
  const categories = Object.keys(grouped);

  return (
    <View className="flex-1 px-4 pt-2 bg-white">
      {ingredients.length === 0 ? (
        <Text className="text-gray-500 text-center mt-10">
          No ingredients added yet
        </Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(category) => category}
          renderItem={({ item: category }) => (
            <View className="mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-3">
                {category}
              </Text>

              {grouped[category].map((ingredient, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center bg-white rounded-2xl shadow-md mb-3 border border-gray-100 p-3"
                >
                  <View>
                    <Text className="text-lg font-semibold text-gray-800">
                      {ingredient.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      Quantity: {ingredient.quantity}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeIngredient(ingredient)}
                    className="p-2 rounded-full bg-gray-100"
                  >
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

export default IngredientsScreen;
