import { Loading } from "@/components/Loading";
import { DestinationType } from "@/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { getDestinations } from "../axios";
import {
  matchCategoryDestinations,
  matchSearchDestinations,
  matchTagDestinations,
} from "../lib";

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
  const [loading, setLoading] = useState<boolean>(true);

  const getDestinationData = () => {
    setLoading(true);
    getDestinations()
      .then((data) => setAllDestinations(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const searchFilter = matchSearchDestinations(allDestinations, search);
    const categoryFilter = matchCategoryDestinations(
      searchFilter,
      activeCategory,
    );
    const tagFilter = matchTagDestinations(categoryFilter, activeTag);

    setDisplayedDestinations(tagFilter);
  }, [allDestinations, search, activeCategory, activeTag]);

  useFocusEffect(
    useCallback(() => {
      getDestinationData();
    }, []),
  );

  return (
    <View className="flex-wrap mx-4 flex-row justify-between pb-10">
      <Loading />
    </View>
  );
}
