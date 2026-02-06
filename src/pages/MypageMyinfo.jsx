import './MypageMyinfo.css'
import { useContext } from "react"
import { AuthContext } from '../contexts/Authcontext';

export default function MypageMyinfo(){
    const {userid, username, user_email, user_resistnum, user_phonenum, address, address_detail, user_iskorean, user_license}=useContext(AuthContext);
    return(
        <div className="myinfo-Wrap">
            <div className="myinfo-header">
                {/* <h1 className="guideMainText">마이페이지</h1> */}
                <h2 className="guideMainText">내 정보</h2>
            </div>

            <div className="myinfo-tableBox">
                <table className="myinfo-context">
                    <tbody className="myinfo-list">
                        <tr>
                            <td className="myinfo-label">
                                <i class="bi bi-person-circle"></i>
                            </td>
                            <td className="myinfo-label">{username} {userid}</td>
                            {/* <td className="myinfo-value"></td> */}
                        </tr>
                        <tr>
                            <td className="myinfo-label">이름</td>
                            <td className="myinfo-value"></td>
                        </tr>
                        <tr>
                            <td className="myinfo-label">
                               <i class="bi bi-envelope"></i>
                                이메일
                            </td>
                            <td className="myinfo-value">{user_email}</td>
                        </tr>
                        <tr>
                            <td className="myinfo-label">주민번호</td>
                            <td className="myinfo-value">{user_resistnum}</td>
                        </tr>
                        <tr>
                            <td className="myinfo-label">
                                <i class="bi bi-phone"></i>
                                전화번호
                            </td>
                            <td className="myinfo-value">{user_phonenum}</td>
                        </tr>
                        <tr>
                            <td className="myinfo-label">주소</td>
                            <td className="myinfo-value">{address} {address_detail}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="myinfo-tableBox">
                <table className="myinfo-context">
                    <tbody className="myinfo-list">
                        <tr>
                            <td className="myinfo-label">국적</td>
                            <td className="myinfo-value">
                            {user_iskorean ? "대한민국 국적" : "외국 국적"}
                            </td>
                        </tr>
                        <tr>
                            <td className="myinfo-label">면허</td>
                            <td className="myinfo-value">{user_license}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <button className='myinfo-btn' type='button'>정보 수정</button>
        </div>
    )
}