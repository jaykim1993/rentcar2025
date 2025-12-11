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
    // const[username, setUsername]=useState(null);
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

        if (!savedUserid || savedUserid === "undefined") return;

        try {
            const parsed = JSON.parse(savedUserid);
            setUserid(parsed);
        } catch (error) {
            console.error("JSON parse 오류: userid 초기화함", error);
            localStorage.removeItem("userid");
        }
    }, []);

    // 로그인 정보 저장 함수
    const loginsave = (userData) => {
        setUserid(userData); //loginForm.jsx에서 저장할 예정
        // localStorage에 정보 저장
        localStorage.setItem('userid', JSON.stringify(userData));
    }
    // 로그아웃 함수
    const logout =()=>{
        setUserid(null);
        // localStroage에서 삭제
        localStorage.removeItem('userid');
    }

    // 공유할 변수, 함수 내보내기
    return(
        <AuthContext.Provider value={{userid, loginsave, logout}}>
            {children}
        </AuthContext.Provider>
    )
}