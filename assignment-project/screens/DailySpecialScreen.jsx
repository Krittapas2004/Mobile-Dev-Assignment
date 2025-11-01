import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import recipeData from "../data/application-development-data.json";
import { useNavigation } from "@react-navigation/native";

function DailySpecialScreen() {
  const [dailySpecials, setDailySpecials] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getRandomDailySpecials();
  }, []);

  const getRandomDailySpecials = () => {
    const filtered = recipeData.recipes.filter(
      (r) => r.difficulty === "Easy" || r.difficulty === "Medium"
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
    setDailySpecials(shuffled);
  };

  return (
    <View className="flex-1 px-4 pt-2">
      <FlatList
        data={dailySpecials}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Home", {
                screen: "RecipeDetail",
                params: { recipe: item },
              })
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
              <Text className="text-sm text-gray-600 mb-1">{item.cuisine}</Text>
              <Text className="text-sm text-yellow-600">
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

export default DailySpecialScreen;
