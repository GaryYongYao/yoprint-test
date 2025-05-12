import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface Props {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ current, total, onPageChange }: Props) {
  const createPageRange = () => {
    const range = [];
    const maxPages = 5;

    let start = Math.max(current - Math.floor(maxPages / 2), 1);
    let end = start + maxPages - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - maxPages + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageNumbers = createPageRange();

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      {current > 1 && (
        <Link
          to={`?page=${current - 1}`}
          onClick={() => onPageChange(current - 1)}
          className="flex items-center gap-1 px-3 py-1 text-white"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Prev
        </Link>
      )}

      {pageNumbers.map((page) => (
        <Link
          key={page}
          to={`?page=${page}`}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 ${
            current === page
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          {page}
        </Link>
      ))}

      {current < total && (
        <Link
          to={`?page=${current + 1}`}
          onClick={() => onPageChange(current + 1)}
          className="flex items-center gap-1 px-3 py-1 text-white"
        >
          Next
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
