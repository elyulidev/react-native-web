import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

import type { UserEdited } from "@/types/database";

type AdminAlertDialogProps = {
	onClose?: () => void;
	onContinue: (user: UserEdited) => Promise<void>;
	user: UserEdited;
};

export default function AdminAlertDialog({
	onClose,
	onContinue,
	user,
}: AdminAlertDialogProps) {
	const { t } = useLanguage();
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					size='sm'

					//disabled={deleteUser ? true : false}
				>
					<Trash2 className='h-4 w-4' />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("adminConfirmDelete")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t("adminDeleteUserConfirmation")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>
						{t("adminActionCancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => onContinue(user)}
						className='hover:bg-red-500 dark:text-white text-slate-800'
					>
						{t("adminActionSave")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
