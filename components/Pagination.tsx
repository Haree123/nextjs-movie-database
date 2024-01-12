import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationCardsProps {
  currentPage: number;
  type: string;
}

export function PaginationCards({ currentPage, type }: PaginationCardsProps) {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.max(3, currentPage + 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i} className={currentPage === i ? "active" : ""}>
          <PaginationLink
            href={`/${type}?page=${currentPage + 1}`}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? (
            <Button variant="ghost" disabled={true}>
              <ChevronLeft size={15} className="mr-1" />
              Previous
            </Button>
          ) : (
            <PaginationPrevious href={`/${type}/?page=${currentPage - 1}`} />
          )}
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {currentPage === 499 ? (
            <Button variant="ghost" disabled={true}>
              Next
              <ChevronRight size={15} className="mr-1" />
            </Button>
          ) : (
            <PaginationNext href={`/${type}/?page=${currentPage + 1}`} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
