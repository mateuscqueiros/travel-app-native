import { axios } from "@/lib/axios";
import { DestinationType } from "@/types";

export async function getDestinations(): Promise<DestinationType[]> {
  console.log('getting')
  return axios.get<DestinationType[]>('/destinations').then(res => {
    console.log('get axios')
    return res.data
  })
}
