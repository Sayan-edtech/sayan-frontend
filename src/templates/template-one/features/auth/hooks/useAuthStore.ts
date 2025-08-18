import {
  useIsAuthenticated,
  useIsLoading,
  useLogin,
  useSignup,
  useLogout,
} from "@/features/auth/store";

// Main authentication hook that combines all the functionality
export function useAuth() {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();

  return {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };
}
