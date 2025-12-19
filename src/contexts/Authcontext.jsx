// react에서 자료 공유
import { createContext, useState, useEffect} from "react";

// 공유할 데이터가 저장되는 저장소
export const AuthContext = createContext();

// Provider 함수 생성
export default function AuthProvider({children}){
    // 상태 저장 변수
    // 마이페이지, 예약 내 사용을 위해 입력된 모든 값을 저장함
    const[userid, setUserid]=useState(null);
    // const[userpw, setUserpw]=useState(null);
    const[username, setUsername]=useState(null);
    // const[user_email, setUser_email]=useState(null);
    // const[user_resistnum, setUser_resistnum]=useState(null);
    // const[user_phonenum, setUser_phonenum]=useState(null);
    // const[address, setAddress]=useState(null);
    // const[address_detail, setAddress_detail]=useState(null);
    // const[user_iskorean, setUser_iskorean]=useState(null);
    // const[user_license, setUser_license]=useState(null);

    // 컴포넌트 마운트 될 때 localStorage에서 사용자 정보 불러오기
    useEffect(() => {
        const savedUserid = localStorage.getItem("userid");
        if (savedUserid) {
        setUserid(savedUserid);
        }
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
        setUsername(savedUsername);
        }
    }, []);

    // 로그인 정보 저장 함수
      const loginsave = (userData) => {
        // userData 전체 중 userid, username 저장
        setUserid(userData.userid);
        setUsername(userData.username);
        localStorage.setItem("userid", userData.userid);
        localStorage.setItem("username", userData.username);
        console.log("로그인 시도 값", userid, username);
    };
    
    // 로그아웃 함수
    const logout = () => {
        setUserid(null);
        setUsername(null);
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
    };

    // 공유할 변수, 함수 내보내기
    return(
        <AuthContext.Provider value={{userid, username, loginsave, logout}}>
            {children}
        </AuthContext.Provider>
    )
}