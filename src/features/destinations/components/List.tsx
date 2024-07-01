import { Loading } from '@/components/Loading';
import { DestinationType } from '@/types';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getDestinations } from '../axios';
import {
  matchCategoryDestinations,
  matchSearchDestinations,
  matchTagDestinations,
} from '../lib';
import { DestinationCard } from './Card';

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

  const getDestinationData = () =>
    getDestinations()
      .then((data) => setAllDestinations(data))
      .catch((err) => console.log(err));

  useEffect(() => {
    const searchFilter = matchSearchDestinations(allDestinations, search);
    const categoryFilter = matchCategoryDestinations(
      searchFilter,
      activeCategory
    );
    const tagFilter = matchTagDestinations(categoryFilter, activeTag);

    setDisplayedDestinations(tagFilter);
  }, [allDestinations, search, activeCategory, activeTag]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getDestinationData().finally(() => setLoading(false));
    }, [])
  );

  return (
    <View className="flex-wrap mx-4 flex-row justify-between pb-10">
      {loading && <Loading />}
      {!loading && displayedDestinations.length === 0 && (
        <View className="flex items-center w-full">
          <Text className="text-lg">Sem resultados</Text>
        </View>
      )}
      {!loading &&
        displayedDestinations.map((item, index) => {
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
