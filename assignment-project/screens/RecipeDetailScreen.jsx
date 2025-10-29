import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

function RecipeDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipe } = route.params;

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

        <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
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
        <Text className="text-lg font-semibold text-gray-800 mr-2">
          Overall Rating:
        </Text>
        <View className="flex-row items-center">
          <Text className="text-lg text-yellow-600 font-semibold">
            {recipe.averageRating || "Not rated"}
          </Text>
          <Ionicons name="star" size={15} color="#facc15" className="ml-1.5" />
        </View>
      </View>

      <Text className="text-xl font-semibold mb-2 text-gray-800">Tags</Text>
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
