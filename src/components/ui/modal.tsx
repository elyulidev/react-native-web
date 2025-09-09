import type React from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
}: ModalProps) {
	if (!isOpen) return null;

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div className='fixed inset-0 bg-black/50' onClick={onClose} />
			<div
				className={`relative bg-card rounded-lg shadow-lg w-full mx-4 ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
			>
				<div className='flex items-center justify-between p-6 border-b border-border'>
					<h2 className='text-xl font-semibold text-card-foreground'>
						{title}
					</h2>
					<Button variant='ghost' size='sm' onClick={onClose}>
						<X className='h-4 w-4' />
					</Button>
				</div>
				<div className='p-6'>{children}</div>
			</div>
		</div>
	);
}
