import React, { useState } from "react";
import { supabase } from "../services/supabase";
import { ReactNativeIcon, CloseIcon } from "./icons";
import { useLanguage } from "../hooks/use-language";

interface AuthProps {
	onAuthSuccess: () => void;
	onClose: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onClose }) => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { t } = useLanguage();

	const handleAuth = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
			onAuthSuccess();
		} catch (err) {
			setError((err as Error)?.message || t("somethingWentWrong"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 m-4'>
			<button
				onClick={onClose}
				className='absolute top-4 right-4 p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
			>
				<CloseIcon className='w-6 h-6' />
			</button>

			<div className='text-center'>
				<ReactNativeIcon className='w-16 h-16 text-primary-500 mx-auto' />
				<h2 className='mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
					{t("login")}
				</h2>
			</div>
			<form className='mt-8 space-y-6' onSubmit={handleAuth}>
				<div className='rounded-md shadow-sm -space-y-px'>
					<div>
						<label htmlFor='email-address' className='sr-only'>
							{t("email")}
						</label>
						<input
							id='email-address'
							name='email'
							type='email'
							autoComplete='email'
							required
							className='relative block w-full appearance-none rounded-t-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
							placeholder={t("email")}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password' className='sr-only'>
							{t("password")}
						</label>
						<input
							id='password'
							name='password'
							type='password'
							autoComplete='current-password'
							required
							className='relative block w-full appearance-none rounded-b-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
							placeholder={t("password")}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				{error && (
					<p className='text-sm text-red-600 dark:text-red-400 text-center'>
						{error}
					</p>
				)}

				<div>
					<button
						type='submit'
						disabled={loading}
						className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:bg-slate-400 dark:disabled:bg-slate-600'
					>
						{loading ? "Processing..." : t("login")}
					</button>
				</div>
			</form>
		</div>
	);
};
