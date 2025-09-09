import React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

interface Column<T> {
	key: keyof T | string;
	label: string;
	render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	searchKey?: keyof T;
	onAdd?: () => void;
	onEdit?: (item: T) => void;
	onDelete?: (item: T) => void;
	addLabel?: string;
	loading?: boolean;
}

export function DataTable<T extends { id: string | number }>({
	data,
	columns,
	searchKey,
	onAdd,
	onEdit,
	onDelete,
	addLabel = "Add New",
	loading = false,
}: DataTableProps<T>) {
	const [searchTerm, setSearchTerm] = React.useState("");

	const filteredData = React.useMemo(() => {
		if (!searchKey || !searchTerm) return data;
		return data.filter((item) => {
			const value = item[searchKey];
			return String(value).toLowerCase().includes(searchTerm.toLowerCase());
		});
	}, [data, searchKey, searchTerm]);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			<div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center'>
				{searchKey && (
					<div className='relative flex-1 max-w-sm'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
						<Input
							placeholder='Search...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='pl-10'
						/>
					</div>
				)}
				{onAdd && (
					<Button onClick={onAdd} className='flex items-center gap-2'>
						<Plus className='h-4 w-4' />
						{addLabel}
					</Button>
				)}
			</div>

			<div className='border border-border rounded-lg overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='bg-muted'>
							<tr>
								{columns.map((column, index) => (
									<th
										key={index}
										className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'
									>
										{column.label}
									</th>
								))}
								{(onEdit || onDelete) && (
									<th className='px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider'>
										Actions
									</th>
								)}
							</tr>
						</thead>
						<tbody className='bg-card divide-y divide-border'>
							{filteredData.length > 0 ? (
								filteredData.map((item) => (
									<tr key={item.id} className='hover:bg-muted/50'>
										{columns.map((column, colIndex) => (
											<td
												key={colIndex}
												className='px-6 py-4 whitespace-nowrap text-sm text-card-foreground'
											>
												{column.render
													? column.render(item)
													: String(item[column.key as keyof T] || "")}
											</td>
										))}
										{(onEdit || onDelete) && (
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<div className='flex justify-end gap-2'>
													{onEdit && (
														<Button
															variant='ghost'
															size='sm'
															onClick={() => onEdit(item)}
														>
															<Edit className='h-4 w-4' />
														</Button>
													)}
													{onDelete && (
														<Button
															variant='ghost'
															size='sm'
															onClick={() => onDelete(item)}
															className='text-destructive hover:text-destructive'
														>
															<Trash2 className='h-4 w-4' />
														</Button>
													)}
												</div>
											</td>
										)}
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
										className='px-6 py-8 text-center text-muted-foreground'
									>
										No data available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
