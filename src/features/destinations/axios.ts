import { axios } from "@/lib/axios";
import { DestinationType } from "@/types";

export async function getDestinations(): Promise<DestinationType[]> {
  return axios.get<DestinationType[]>('/destinations').then(res => res.data)
}

export async function getDestination(id: number): Promise<DestinationType> {
  return axios.get<DestinationType>(`/destinations/${id}`).then(res => {
    console.log('end', res)
    return res.data
  })
}

export async function changeFavoriteDestination(itemId: DestinationType['id'], newFavorite: boolean): Promise<DestinationType> {
  return axios.patch<DestinationType>(`/destinations/${itemId}`, { 'isFavorite': newFavorite }).then(res => res.data)
}
