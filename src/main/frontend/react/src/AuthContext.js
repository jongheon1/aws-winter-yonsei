// AuthContext.js
import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('/user/isLogin')
            .then(response => {
                // 성공적으로 응답을 받았을 때 실행되는 부분
                const loginResponse = response.data;

                if (loginResponse) {
                    setIsLoggedIn(true);
                    console.log('사용자는 로그인 상태입니다.');
                    // 로그인 상태에 따른 처리를 추가할 수 있음
                } else {
                    console.log('사용자는 로그인 상태가 아닙니다.');
                    // 로그인 상태에 따른 처리를 추가할 수 있음
                }
            })
            .catch((err) => {
                window.location.href = "/login";
            });
    }, []);

    const [sessionUserName, setUserName] = useState("");
    useEffect(() => {
        axios.get('/user/name')
            .then(response => {
                // 서버에서 성공적으로 사용자 이름을 가져왔을 때 실행되는 부분
                const nameResponse = response.data;
                setUserName(nameResponse);
                console.log('사용자 이름:', nameResponse);
                // 가져온 사용자 이름에 대한 처리를 추가할 수 있음
            })
            .catch((err) => {
                console.error('사용자 이름을 가져오는 데 실패했습니다.', err);
            });
    }, []);
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, sessionUserName }}>
            {children}
        </AuthContext.Provider>
    );
};
