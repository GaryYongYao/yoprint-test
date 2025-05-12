import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export const searchAnime = (query: string, page: number = 1) => {
  return axios.get(`${BASE_URL}/anime`, {
    params: { q: query, page, limit: 20 },
  });
};

export const getAnimeDetails = (id: string) => {
  return axios.get(`${BASE_URL}/anime/${id}`);
};
