
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import '../../css/userInfo.css'; // CSS 모듈 임포트

const UserInfo = () => {
    const { sessionUserName } = useContext(AuthContext);
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscriptionName, setSubscriptionName] = useState('');

    const SERVER_URL = 'http://localhost:8080';

    useEffect(() => {
        // 구독 정보를 불러오는 API 호출
        axios.get(`${SERVER_URL}/subscriptions`)
            .then(response => {
                setSubscriptions(response.data);
            })
            .catch(error => console.error('구독 정보를 불러오는 데 실패했습니다.', error));
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        // 구독 추가 API 호출
        axios.post(`${SERVER_URL}/subscribe`, { value: subscriptionName })
            .then(response => {
                console.log('구독이 성공적으로 추가되었습니다.', response.data);
                setSubscriptionName('');
                const newSubscription = response.data;
                setSubscriptions([...subscriptions, newSubscription]);
            })
            .catch(error => {
                console.error('구독 추가에 실패했습니다.', error);
            });
    };
    const handleUnsubscribe = (subscriptionId) => {
        axios.delete(`${SERVER_URL}/unsubscribe/${subscriptionId}`)
            .then(() => {
                // 성공적으로 삭제된 후 구독 목록 업데이트
                setSubscriptions(subscriptions.filter(subscription => subscription.id !== subscriptionId));
            })
            .catch(error => console.error('구독 취소 실패', error));
    };

    return (
        <div className="userInfoContainer">
            <h2 className="userInfoTitle">유저 정보</h2>
            <p className="userName">이름: <strong>{sessionUserName}</strong></p>
            <div>
                <h3 className="subscriptionInfoTitle">키워드 구독</h3>
                <form onSubmit={handleSubscribe} className="subscriptionForm">
                    <label htmlFor="subscriptionName"></label>
                    <input
                        type="text"
                        id="subscriptionName"
                        className="subscriptionInput"
                        value={subscriptionName}
                        onChange={(e) => setSubscriptionName(e.target.value)}
                        required
                        placeholder="키워드를 입력해주세요"
                    />
                    <button type="submit" className="subscribeButton">구독 추가</button>
                </form>
                {subscriptions.map(subscription => (
                    <div key={subscription.id} className="subscriptionItem">
                        {subscription.value}
                        <button onClick={() => handleUnsubscribe(subscription.id)}
                                className="unsubscribeButton">X
                        </button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default UserInfo;
