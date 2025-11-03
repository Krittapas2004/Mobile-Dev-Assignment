import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

function RecipeDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipe } = route.params;

  const [isFavourite, setIsFavourite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    checkFavourite();
    checkIfIngredientsAdded();
  }, []);

  const checkFavourite = async () => {
    try {
      const value = await AsyncStorage.getItem("favourites");
      if (value !== null) {
        const parsedFavourites = JSON.parse(value);
        const exists = parsedFavourites.some(
          (item) => item.name === recipe.name
        );
        setIsFavourite(exists);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFavourite = async () => {
    try {
      const value = await AsyncStorage.getItem("favourites");
      let favourites = [];
      if (value !== null) {
        favourites = JSON.parse(value);
      }

      if (isFavourite) {
        favourites = favourites.filter((item) => item.name !== recipe.name);
        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
        setIsFavourite(false);
      } else {
        favourites.push({
          name: recipe.name,
          image: recipe.image,
          averageRating: recipe.averageRating || "N/A",
          cuisine: recipe.cuisine || "Unknown",
        });
        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
        setIsFavourite(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfIngredientsAdded = async () => {
    try {
      const value = await AsyncStorage.getItem("ingredients");
      if (value) {
        const parsed = JSON.parse(value);
        const exists = parsed.some((item) => item.recipeName === recipe.name);
        setIsAdded(exists);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addIngredients = async () => {
    try {
      const value = await AsyncStorage.getItem("ingredients");
      const ingredients = value ? JSON.parse(value) : [];

      const alreadyAdded = ingredients.some(
        (item) => item.recipeName === recipe.name
      );
      if (alreadyAdded) {
        setIsAdded(true);
        return;
      }

      const newIngredients =
        recipe.ingredients?.map((i) => ({
          recipeName: recipe.name,
          name: i.name,
          quantity: i.quantity,
          category: recipe.cuisine || "General",
        })) || [];

      const updatedIngredients = [...ingredients, ...newIngredients];
      await AsyncStorage.setItem(
        "ingredients",
        JSON.stringify(updatedIngredients)
      );

      setIsAdded(true);
    } catch (err) {
      console.log("Error saving ingredients:", err);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white px-5"
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View className="flex-row justify-between items-center mb-4 mt-8">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-100 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>

        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={toggleFavourite}
            className="bg-gray-100 p-2 rounded-full"
          >
            <Ionicons
              name="heart-outline"
              size={22}
              color={isFavourite ? "red" : "#333"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={addIngredients}
            className="bg-gray-100 p-2 rounded-full"
          >
            <Ionicons
              name="add-outline"
              size={22}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={{ uri: recipe.image }}
        className="w-full h-56 rounded-2xl mb-5"
        resizeMode="cover"
      />

      <Text className="text-3xl font-extrabold text-gray-900 mb-1">
        {recipe.name}
      </Text>
      <Text className="text-base text-gray-500 mb-3">
        {recipe.cuisine || "No cuisine specified"}
      </Text>

      <View className="flex-row items-center mb-4">
        <View className="flex-row items-center">
          <Text className="text-lg text-yellow-600 font-semibold">
            {recipe.averageRating || "Not rated"}
          </Text>
          <Ionicons name="star" size={15} color="#facc15" className="ml-1.5" />
        </View>
      </View>

      {recipe.tags?.length ? (
        <View className="flex-row flex-wrap mb-4">
          {recipe.tags.map((tag, index) => (
            <View
              key={index}
              className="bg-amber-100 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-amber-700 font-medium text-sm">{tag}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-gray-400 mb-4">No tags available.</Text>
      )}

      <Text className="text-xl font-semibold mb-2 text-gray-800">
        Ingredients
      </Text>
      {recipe.ingredients?.length ? (
        recipe.ingredients.map((ingredient, index) => (
          <Text key={index} className="text-gray-700 ml-2 mb-1">
            • {ingredient.name} ({ingredient.quantity})
          </Text>
        ))
      ) : (
        <Text className="text-gray-400 ml-2 mb-1">
          No ingredients available.
        </Text>
      )}

      <Text className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        Instructions
      </Text>
      <Text className="text-gray-700 leading-6 tracking-wide">
        {recipe.instructions || "Follow these steps to prepare the recipe..."}
      </Text>

      <Text className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        Nutrition
      </Text>
      {recipe.nutrition ? (
        <View className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-3">
          <Text className="text-gray-700">
            Calories: {recipe.nutrition.calories || "N/A"}
          </Text>
          <Text className="text-gray-700">
            Protein: {recipe.nutrition.protein || "N/A"}
          </Text>
          <Text className="text-gray-700">
            Fat: {recipe.nutrition.fat || "N/A"}
          </Text>
          <Text className="text-gray-700">
            Carbs: {recipe.nutrition.carbs || "N/A"}
          </Text>
        </View>
      ) : (
        <Text className="text-gray-400 mb-4 ml-1">
          No nutrition info available.
        </Text>
      )}

      <View className="flex-row justify-between flex-wrap mt-6">
        <View className="w-[48%] mb-3 bg-gray-50 rounded-xl p-3">
          <Text className="font-semibold text-gray-800">Prep Time</Text>
          <Text className="text-gray-700">{recipe.prepTime || "N/A"} min</Text>
        </View>
        <View className="w-[48%] mb-3 bg-gray-50 rounded-xl p-3">
          <Text className="font-semibold text-gray-800">Cook Time</Text>
          <Text className="text-gray-700">{recipe.cookTime || "20"} min</Text>
        </View>
        <View className="w-[48%] mb-3 bg-gray-50 rounded-xl p-3">
          <Text className="font-semibold text-gray-800">Servings</Text>
          <Text className="text-gray-700">{recipe.serving || "8"}</Text>
        </View>
        <View className="w-[48%] mb-3 bg-gray-50 rounded-xl p-3">
          <Text className="font-semibold text-gray-800">Difficulty</Text>
          <Text className="text-gray-700">
            {recipe.difficulty || "Unknown"}
          </Text>
        </View>
      </View>

      <Text className="text-xl font-semibold mt-8 mb-3 text-gray-800">
        Reviews
      </Text>
      {recipe.reviews?.length ? (
        recipe.reviews.map((review, index) => (
          <View
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3 shadow-sm"
          >
            <Text className="font-semibold text-gray-800 text-base mb-1">
              {review.user}
            </Text>
            <Text className="text-yellow-600 mb-1">
              Rating: {review.rating} ★
            </Text>
            <Text className="text-gray-700 text-sm leading-5">
              {review.review}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-400 mb-6">No reviews available.</Text>
      )}
    </ScrollView>
  );
}

export default RecipeDetailScreen;
