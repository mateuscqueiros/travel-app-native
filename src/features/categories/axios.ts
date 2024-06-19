import { axios } from "@/lib/axios";
import { CategoryType } from "@/types";

export async function getCategories() {
  return axios.get<CategoryType[]>('/categories').then(res => res.data)
}
