import { useState } from "react";

const PER_PAGE = 5;

export function usePage<T>({
  list,
  perPage = PER_PAGE,
}: {
  list: T[];
  perPage?: number;
}) {
  perPage = perPage <= 0 ? PER_PAGE : perPage;
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };
  const goNext = () => onPageChange(currentPage + 1);
  const goPrev = () => onPageChange(currentPage - 1);

  const start = perPage * (currentPage - 1);
  const items = list.slice(start, start + perPage);

  return { items, totalPages, currentPage, onPageChange, goNext, goPrev };
}
