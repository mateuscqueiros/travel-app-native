import { match } from "@/lib/regex";
import { DestinationType } from "@/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getDestinations } from "../axios";
import { DestinationCard } from "./Card";

export type DestinationListProps = {
  search?: string;
  activeCategory: number | null;
  activeTag: number | null;
};

export function DestinationsList({
  search,
  activeCategory,
  activeTag,
}: DestinationListProps) {
  const [allDestinations, setAllDestinations] = useState<DestinationType[]>([]);
  const [displayedDestinations, setDisplayedDestinations] =
    useState<DestinationType[]>(allDestinations);

  const getDestinationData = () =>
    getDestinations()
      .then((data) => setAllDestinations(data))
      .catch((err) => console.log(err));

  const matchSearchDestinations = (
    destinations: DestinationType[],
    search: string | undefined,
  ) => {
    if (search && search !== "") {
      return destinations.filter((d) => match(search, d.title));
    } else return destinations;
  };

  const matchCategoryDestinations = (
    destinations: DestinationType[],
    categoryId: number | null,
  ) => {
    if (categoryId !== null) {
      return destinations.filter((d) => d.categories.includes(categoryId));
    } else return destinations;
  };

  const matchTagDestinations = (
    destinations: DestinationType[],
    tagId: number | null,
  ) => {
    if (tagId === 0) return destinations;
    if (tagId !== null) {
      return destinations.filter((d) => d.tags.includes(tagId));
    } else return destinations;
  };

  useEffect(() => {
    const filterSearch = matchSearchDestinations(allDestinations, search);
    const filterCategories = matchCategoryDestinations(
      filterSearch,
      activeCategory,
    );
    const filterTags = matchTagDestinations(filterCategories, activeTag);

    setDisplayedDestinations(filterTags);
  }, [allDestinations, search, activeCategory, activeTag]);

  useFocusEffect(
    useCallback(() => {
      getDestinationData();
    }, []),
  );

  return (
    <View className="flex-wrap mx-4 flex-row justify-between pb-10">
      {displayedDestinations.length === 0 && (
        <View className="flex items-center w-full">
          <Text className="text-lg">Sem correspondências para a pesquisa</Text>
        </View>
      )}
      {displayedDestinations.map((item, index) => {
        return (
          <DestinationCard
            onChangeFavorite={getDestinationData}
            item={item}
            key={index}
          />
        );
      })}
    </View>
  );
}
