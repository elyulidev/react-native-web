import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./contexts/language-provider.tsx";
import { AuthProvider } from "./contexts/auth-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { HashRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<LanguageProvider>
					<AuthProvider>
						<App />
						<Toaster duration={3000} richColors position='top-right' />
					</AuthProvider>
				</LanguageProvider>
			</QueryClientProvider>
		</HashRouter>
	</StrictMode>
);
