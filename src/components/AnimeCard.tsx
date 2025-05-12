import { useNavigate } from "react-router-dom";

interface Props {
  anime: {
    mal_id: number;
    title: string;
    synopsis: string;
    images: {
      jpg: { image_url: string };
    };
    score: number;
    scored_by: number;
  };
}

export default function AnimeCard({ anime }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-80 object-cover"
      />

      <div className="absolute top-2 right-2 z-10 hidden group-hover:flex items-center bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        ⭐ {anime.score ?? "N/A"} ({anime.scored_by?.toLocaleString() ?? "0"})
      </div>

      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
        <div className="font-bold text-sm truncate">{anime.title}</div>
        <p className="text-xs mt-1 line-clamp-2 leading-snug">
          {anime.synopsis || "No synopsis available."}
        </p>
      </div>
    </div>
  );
}
