import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import Loader from "../components/Loader";

import { getAnimeDetails } from "../api/jikan";

interface AnimeDetails {
  title: string;
  synopsis: string;
  images: {
    jpg: { image_url: string };
  };
  score: number;
  rank: number;
  popularity: number;
  status: string;
  episodes: number;
  rating: string;
  year: number;
}

export default function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAnimeDetails = async () => {
      setLoading(true);
      try {
        const res = await getAnimeDetails(id!);
        setAnime(res.data.data);
      } catch (err) {
        setAnime(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!anime)
    return (
      <p className="text-center mt-10 text-gray-500 text-gray-400">
        Anime not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-2 mb-6 px-4 py-2 border  rounded text-white bg-gray-800 border-gray-600 hover:bg-gray-700"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>

        <div className=" bg-gray-800 rounded-lg shadow-md p-6 md:flex md:gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-64 h-auto rounded-md shadow"
            />
          </div>

          <div className="flex-1 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold text-white mb-4">
              {anime.title}
            </h1>

            <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
              {anime.synopsis || "No synopsis available."}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-200">
              <div>
                <span className="font-semibold">Score:</span>{" "}
                {anime.score ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Rank:</span>{" "}
                {anime.rank ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Popularity:</span>{" "}
                {anime.popularity ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {anime.status ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Episodes:</span>{" "}
                {anime.episodes ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Rating:</span>{" "}
                {anime.rating ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Year:</span>{" "}
                {anime.year ?? "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
