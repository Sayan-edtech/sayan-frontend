import {
  useUser,
  useIsAuthenticated,
  useIsLoading,
  useLogin,
  useSignup,
  useLogout,
  useRefreshUser,
  useRefreshTokens,
  useClearAuth,
  useForgotPassword,
  useVerifyAccount,
  useResnedOtp,
  useResetPassword,
} from "@/features/auth/store";

// Main authentication hook that combines all the functionality
export function useAuth() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();
  const refreshUser = useRefreshUser();
  const refreshTokens = useRefreshTokens();
  const clearAuth = useClearAuth();
  const forgotPassword = useForgotPassword();
  const verifyAccount = useVerifyAccount();
  const resendOtp = useResnedOtp();
  const resetPassword = useResetPassword();
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
    refreshTokens,
    clearAuth,
    forgotPassword,
    verifyAccount,
    resendOtp,
    resetPassword,
  };
}

// Individual hooks for specific functionality
export function useCurrentUser() {
  return useUser();
}

export function useAuthState() {
  return {
    user: useUser(),
    isAuthenticated: useIsAuthenticated(),
    isLoading: useIsLoading(),
  };
}

// Hook for authentication actions only
export function useAuthMutations() {
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();
  const refreshUser = useRefreshUser();
  const refreshTokens = useRefreshTokens();
  const clearAuth = useClearAuth();

  return {
    login,
    signup,
    logout,
    refreshUser,
    refreshTokens,
    clearAuth,
  };
}
