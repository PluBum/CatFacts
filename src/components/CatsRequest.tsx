import axios from "axios";
import { CatResponse, CatImageResponse, GetFactsResponse } from "../model";

const API_URL = "https://catfact.ninja";
const API_URL2 = "https://api.thecatapi.com/v1/images/search?limit=25";
const API_KEY =
  "live_XbWNqSZwbGwj3yVW82yZe9JOuIH0j0iZTHehVOliz6MgA53yNzGUfdQjXQtfUa2A";
type HttpClient<T> = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
  data: T[];
  pageNumbers: number;
};

export async function getData(pageNumbers: number) {
  try {
    const { data } = await axios.get<HttpClient<CatResponse>>(
      `https://catfact.ninja/breeds?page=${pageNumbers}`
    );
    return data;
  } catch (error) {
    throw new Error("Broken api");
  }
}

export async function getImageData() {
  try {
    const { data } = await axios.get<CatImageResponse[]>(`${API_URL2}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Broken api");
  }
}
export async function getFactsData(pageNumbers: number) {
  try {
    const { data } = await axios.get<HttpClient<GetFactsResponse>>(
      `${API_URL}/facts?limit=25&page=${pageNumbers}`
    );
    return data;
  } catch (error) {
    throw new Error("Broken api");
  }
}
export async function getNextData(next_page_url: string) {
  try {
    const { data } = await axios.get<HttpClient<CatResponse>>(next_page_url);
    return data;
  } catch (error) {
    throw new Error("Broken api");
  }
}
