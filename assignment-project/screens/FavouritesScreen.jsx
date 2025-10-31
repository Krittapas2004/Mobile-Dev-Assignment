import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function FavouritesScreen() {
  const [favourites, setFavourites] = useState(null);
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
    <View>
      <Text>Favourite Recipes</Text>
      {favourites && (
        <FlatList
          data={favourites}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>Rating: {item.averageRating || "N/A"}</Text>
              </View>
          )}
        />
      )}
    </View>
  );
}

export default FavouritesScreen;