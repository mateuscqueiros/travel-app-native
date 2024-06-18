import { axios } from "@/lib/axios";
import { CategoryType } from "@/types";

export function getCategories() {
  return axios.get<CategoryType>('/categories')
}
