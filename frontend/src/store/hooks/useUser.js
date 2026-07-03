import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userAllGetApi, userLoginApi, userRegisterApi, currentUserApi } from "../apis/user.api";
import {rootApi} from "../apis/root.api.js"
import { useNavigate } from "react-router-dom"

export const useAllGetUser = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi,
        enabled: !!token,
    })
}

// 토큰 사용 x
// export const useLoginUser = () => {
//     // const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: userLoginApi,

//         onSuccess: (user) => {
//             // axios response 대비 (data 안전 처리)
//             // const user = res?.data ?? res;

//             localStorage.setItem("currentUser", JSON.stringify(user));

//             // queryClient.setQueryData(["user"], user);
//         }
//     });
// };

// 토큰 사용 o
export const useLoginUser = () => {
  return useMutation({
    mutationFn: userLoginApi,
    onSuccess: (res) => {
      console.log("login response:", res);

      const accessToken = res?.data?.access_token || res?.access_token; // 여기 수정

      if (!accessToken) {
        console.error("TOKEN NOT FOUND:", res);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
    },
  });
};

// 현재 유저 토큰값 back단에서 확인
export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: currentUserApi,
        enabled: !!localStorage.getItem("accessToken"),
        retry: false,
    });
};

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}

export const logout = () => {
    localStorage.removeItem("accessToken")
}

// export const getCurrentUser = () => {
//     const user = localStorage.getItem("currentUser")
//     return user && JSON.parse(user)
// }