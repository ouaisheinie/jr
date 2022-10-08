import { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
