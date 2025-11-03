import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import recipeData from "../data/application-development-data.json";

function HomeScreen({ navigation }) {
  const recipes = recipeData.recipes;

  return (
    <View className="flex-1 px-4 pt-2 bg-gray-200">
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipe: item })
            }
            className="bg-white rounded-2xl shadow-md mb-5 border border-gray-100 flex-row p-3"
          >
            <Image
              source={{ uri: item.image }}
              className="w-28 h-28 rounded-xl mr-4"
              resizeMode="cover"
            />

            <View className="flex-1 justify-center">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                {item.name}
              </Text>

              <Text className="text-sm text-gray-600 mb-1">
                Difficulty:{" "}
                <Text className="font-semibold text-gray-700">
                  {item.difficulty || "N/A"}
                </Text>
              </Text>

              <Text className="text-sm text-gray-600 mb-1">
                Total Time:{" "}
                <Text className="font-semibold text-gray-700">
                  {item.prepTime || "Unknown"}
                </Text>
              </Text>

              <Text className="text-sm text-gray-600 mb-1">
                Rating:{" "}
                <Text className="font-semibold text-yellow-600">
                  {item.averageRating ? `${item.averageRating} ★` : "Not rated"}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default HomeScreen;
