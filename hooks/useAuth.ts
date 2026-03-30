import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "./axios/interceptors";

interface Me {
  userId: string;
  role: string;
}

interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axiosInstance.get<Me>("/auth/me").then((response) => response.data),
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) =>
      axiosInstance
        .post<Me>("/auth/login", payload)
        .then((response) => response.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
    },
    // 👇 do NOT redirect on error, just let it throw back to the caller
    onError: () => {},
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) =>
      axiosInstance
        .post<Me>("/auth/register", payload)
        .then((response) => response.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
    },
    // 👇 do NOT redirect on error, just let it throw back to the caller
    onError: () => {},
  });

  const logoutMutation = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    register: registerMutation.mutateAsync, // mutateAsync re-throws so the form can catch it
    login: loginMutation.mutateAsync, // mutateAsync re-throws so the form can catch it
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
  };
}
