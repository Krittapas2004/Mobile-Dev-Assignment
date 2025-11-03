import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import recipeData from "../data/application-development-data.json";

function FavouritesScreen() {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getFavourites();
    const unsubscribe = navigation.addListener("focus", getFavourites);
    return unsubscribe;
  }, [navigation]);

  const getFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("favourites");
      if (value !== null) {
        const parsedFavourites = JSON.parse(value);
        setFavourites(parsedFavourites);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 px-4 pt-2 bg-gray-200">
      {favourites.length === 0 ? (
        <Text className="text-gray-500 text-center mt-10">
          No favourite recipes yet
        </Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const fullRecipe = recipeData.recipes.find(
                  (r) => r.name === item.name
                );
                navigation.navigate("Home", {
                  screen: "RecipeDetail",
                  params: { recipe: fullRecipe || item },
                });
              }}
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

                <Text className="font-semibold text-yellow-600">
                  {item.averageRating ? `${item.averageRating} ★` : "Not rated"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default FavouritesScreen;
