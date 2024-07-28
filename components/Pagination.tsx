import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";


interface PaginationProps {
  currentPage: number;
}

export default function Pagination({currentPage}:PaginationProps) {
  return (
    <div className="flex item-center gap-2 pb-3">
      <Link href={`/reviews?page=${currentPage - 1}`}>
        {" "}
        <ChevronLeftIcon className="h-5 w-5" />{" "}
      </Link>
      <span>page {currentPage} </span>
      <Link href={`/reviews?page=${currentPage + 1}`}>
        {" "}
        <ChevronRightIcon className="h-5 w-5" />{" "}
      </Link>
    </div>
  );
}


