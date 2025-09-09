import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalItems?: number;
	itemsPerPage?: number;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	totalItems,
	itemsPerPage,
}: PaginationProps) {
	const startItem = (currentPage - 1) * (itemsPerPage || 10) + 1;
	const endItem = Math.min(currentPage * (itemsPerPage || 10), totalItems || 0);

	return (
		<div className='flex items-center justify-between px-2'>
			<div className='flex-1 text-sm text-muted-foreground'>
				{totalItems && (
					<span>
						Showing {startItem} to {endItem} of {totalItems} results
					</span>
				)}
			</div>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='h-8 w-8 p-0 bg-transparent'
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage <= 1}
					>
						<ChevronLeft className='h-4 w-4' />
					</Button>
					<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
						Page {currentPage} of {totalPages}
					</div>
					<Button
						variant='outline'
						className='h-8 w-8 p-0 bg-transparent'
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPages}
					>
						<ChevronRight className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
}
