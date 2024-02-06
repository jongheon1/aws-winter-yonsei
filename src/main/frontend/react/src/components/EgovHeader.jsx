import React, { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { AuthContext } from '../AuthContext';

import URL from 'constants/url';

function EgovHeader() {

    const { isLoggedIn, sessionUserName } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="inner">

                <h1 className="logo">
                    <Link to={URL.MAIN} className="w"><img src="/assets/images/logo.svg" alt="표준프레임워크포털 eGovFrame 심플홈페이지" /></Link>
                    <Link to={URL.MAIN} className="m"><img src="/assets/images/logo.svg" alt="표준프레임워크포털 eGovFrame 심플홈페이지" /></Link>
                </h1>

                <div className="gnb">
                    <h2 className="blind">주메뉴</h2>
                    <ul>
                        {/* <li><NavLink to={URL.ABOUT} className={({ isActive }) => (isActive ? "cur" : "")}>사이트소개</NavLink></li> */}
                        {isLoggedIn &&
                        <li><NavLink to={URL.USERINFO} >회원 정보</NavLink></li>
                        }
                    </ul>
                </div>

                <div className="user_info">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {isLoggedIn &&
                        <>
                            <span className="person">{sessionUserName} </span>
                            <a href="/logout">
                                <button className="btn logout">로그아웃</button>
                            </a>
                        </>
                    }
                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!isLoggedIn &&
                        <a href="/oauth2/authorization/google">
                            <button className="btn login">로그인</button>
                        </a>
                    }
                </div>
            </div>

            {/* <!-- All menu : mobile --> */}
            <div className="all_menu Mobile closed">
                <div className="user_info_m">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {isLoggedIn &&
                        <>
                            <span className="person">{sessionUserName} </span> 님이, 관리자로 로그인하셨습니다.
                            <a href="/logout">
                                <button className="btn logout">로그아웃</button>
                            </a>
                        </>
                    }

                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!isLoggedIn &&
                        <a href="/oauth2/authorization/google">
                            <button className="btn login">로그인</button>
                        </a>
                    }
                </div>
            </div>
        </div>
    );
}

export default EgovHeader;