import { api, type ApiError } from "@/lib/axios";
import { authCookies } from "@/lib/cookies";
import type {
  Transaction,
  WalletBalance,
  WithdrawalRequest,
  TransactionFilter,
  DateRange,
} from "@/types/wallet";

// Type guard for axios error
const isAxiosError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
};

// Types for API responses
export interface TransactionsListResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    transactions: Transaction[];
  };
}

export interface WalletBalanceResponse {
  status: string;
  status_code: number;
  message: string;
  data: WalletBalance;
}

export interface WithdrawalRequestsResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    requests: WithdrawalRequest[];
  };
}

export interface WithdrawalRequestPayload {
  amount: number;
  accountHolderName: string;
  bankName: string;
  iban: string;
  email: string;
  phoneNumber: string;
}

export interface WithdrawalRequestResponse {
  status: string;
  status_code: number;
  message: string;
  data: WithdrawalRequest;
}

// API service for wallet
export const walletApi = {
  // Get wallet transactions
  getTransactions: async (
    filter?: TransactionFilter,
    dateRange?: DateRange,
    searchQuery?: string
  ): Promise<TransactionsListResponse> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    // Build query parameters
    const params: Record<string, string> = {};
    if (filter && filter !== "all") params.filter = filter;
    if (dateRange) params.date_range = dateRange;
    if (searchQuery) params.search = searchQuery;

    console.log("Fetching transactions with params:", params);
    console.log("Access token exists:", !!tokens.accessToken);
    console.log("Refresh token exists:", !!tokens.refreshToken);

    // Check if tokens exist
    if (!tokens.accessToken || !tokens.refreshToken) {
      console.error("Missing authentication tokens");
      throw new Error("Authentication tokens are required");
    }

    try {
      console.log("Making request to /wallet/transactions");

      const response = await api.get("/wallet/transactions", {
        params,
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      console.log("API response:", response.data);
      return response.data;
    } catch (error: unknown) {
      const errorInfo = isAxiosError(error)
        ? {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
          }
        : {
            message: error instanceof Error ? error.message : "Unknown error",
            status: undefined,
            data: undefined,
            url: undefined,
          };

      console.error("Error fetching transactions:", errorInfo);
      throw error;
    }
  },

  // Get wallet balance
  getWalletBalance: async (): Promise<WalletBalanceResponse> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    try {
      console.log("Making request to /wallet/balance");

      const response = await api.get("/wallet/balance", {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      console.log("Wallet balance response:", response.data);
      return response.data;
    } catch (error: unknown) {
      const errorInfo = isAxiosError(error)
        ? {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
          }
        : {
            message: error instanceof Error ? error.message : "Unknown error",
            status: undefined,
            data: undefined,
            url: undefined,
          };

      console.error("Error fetching wallet balance:", errorInfo);
      throw error;
    }
  },

  // Get withdrawal requests
  getWithdrawalRequests: async (): Promise<WithdrawalRequestsResponse> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    try {
      console.log("Making request to /wallet/withdrawal-requests");

      const response = await api.get("/wallet/withdrawal-requests", {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      console.log("Withdrawal requests response:", response.data);
      return response.data;
    } catch (error: unknown) {
      const errorInfo = isAxiosError(error)
        ? {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
          }
        : {
            message: error instanceof Error ? error.message : "Unknown error",
            status: undefined,
            data: undefined,
            url: undefined,
          };

      console.error("Error fetching withdrawal requests:", errorInfo);
      throw error;
    }
  },

  // Create withdrawal request
  createWithdrawalRequest: async (
    payload: WithdrawalRequestPayload
  ): Promise<WithdrawalRequestResponse> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    try {
      console.log("Making request to /wallet/withdrawal-requests");
      console.log("Withdrawal request payload:", payload);

      const response = await api.post("/wallet/withdrawal-requests", payload, {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      console.log("Create withdrawal request response:", response.data);
      return response.data;
    } catch (error: unknown) {
      const errorInfo = isAxiosError(error)
        ? {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
          }
        : {
            message: error instanceof Error ? error.message : "Unknown error",
            status: undefined,
            data: undefined,
            url: undefined,
          };

      console.error("Error creating withdrawal request:", errorInfo);
      throw error;
    }
  },
};

export default walletApi;
