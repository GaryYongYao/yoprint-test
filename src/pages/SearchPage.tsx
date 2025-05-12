import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

import SearchBar from "../components/SearchBar";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import { searchAnime } from "../api/jikan";

interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: { image_url: string };
  };
  score: number;
  scored_by: number;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAnime = useMemo(
    () =>
      debounce(async (search: string, pageNum: number) => {
        if (!search) {
          setAnimeList([]);
          setLastPage(1);
          return;
        }

        setLoading(true);
        try {
          const res = await searchAnime(search, pageNum);

          setAnimeList(res.data.data);
          setLastPage(res.data.pagination.last_visible_page || 1);
        } catch (error) {
          setAnimeList([]);
          setLastPage(1);
        } finally {
          setLoading(false);
        }
      }, 250),
    []
  );

  useEffect(() => {
    fetchAnime(searchQuery, pageParam);
  }, [searchQuery, pageParam, fetchAnime]);

  const handleQueryChange = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: searchQuery, page: newPage.toString() });
  };

  return (
    <div className="mx-auto min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-8">
      <SearchBar value={searchQuery} onChange={handleQueryChange} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {animeList.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">No results found.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 p-4 max-w-6xl mx-auto">
                {animeList.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
              <Pagination
                current={pageParam}
                total={lastPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
