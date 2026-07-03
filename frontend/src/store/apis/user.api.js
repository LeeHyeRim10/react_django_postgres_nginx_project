import {rootApi} from "../apis/root.api.js"

// 전체 json 테이블 호출 [{},{},{}] response table
export const userAllGetApi = async () => { // async, await 비동기 처리 (api만 이렇게 처리함 why? 컴퓨터간의 통신이기 때문) 빠른 애부터 보여줌
    try { // 통신 상이므로 try/catch문
        const response = await rootApi.get("/users/") // restful로 request
        return response.data
    } catch (error) {
        return error
    }
}

// auth 사용하여 back단에서 확인
export const userLoginApi = async (loginUser) => {

    try {

        const response = await rootApi.post(
            "/auth/login/",
            {
                username: loginUser.username,
                password: loginUser.password,
            }
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.detail ??
            "로그인에 실패했습니다."
        );

    }

};

// auth 사용하여 back단에서 확인
export const userRegisterApi = async (userObj) => {
    try {
        const response = await rootApi.post(
            "/users/",
            userObj
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ??
            "회원가입에 실패했습니다."
        );

    }

};

// 토큰 사용하여 현재 유저 확인
export const currentUserApi = async () => {
  const token = localStorage.getItem("accessToken");

  // 로그인 안 했으면 요청 자체 막기
  if (!token || token === "undefined") {
    return null;
  }

  const response = await rootApi.get("/auth/me/");
  return response.data;
};

// 특정 obj 호출 {} response obj, auth 미사용
// export const userLoginApi = async (loginUser) => {
//     try {
//         const response = await rootApi.get(`/users?name=${loginUser.username}`)
//         // console.log("users", response.data)
//         const users = response.data

//         if (!users.length) {
//             throw new Error("존재하지 않는 사용자")
//         }
//         const foundUser = users[0]

//         if(foundUser.password !== loginUser.password) {
//             throw new Error(
//                 "비밀번호가 일치 xxxx"
//             )
//         }

//         // const user = users[0]
//         // if (user.password !== userObj.password) {
//         //     alert("비밀번호가 일치하지 않습니다 !")
//         //     return
//         // }
//         // console.log("1111", users[0])
//         return foundUser
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// auth 미사용
// export const userRegisterApi = async (userObj) => {
//     try {
//         const response = await rootApi.get(`/users?name=${userObj.username}`)
//         const users = response.data
//         console.log(response)
//         if (users.length > 0) {
//             return Error("이미 존재하는 사용자")
//         }

//         return await rootApi.post(`/users`, userObj)

//     } catch (error) {
//         return error
//     }
// }
