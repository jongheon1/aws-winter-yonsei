import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../css/detailPage.css'

const DetailPage = () => {
    const { id } = useParams();
    const idx = parseInt(id);

    const [bill, setBill] = useState({
        id: idx,
        name: '',
        proposer: '',
        date: ''
    });

    const [content, setContent] = useState(''); // 요약 내용을 저장할 상태

    // 법안 정보를 불러오는 함수
    useEffect(() => {
        const URL = "https://open.assembly.go.kr/portal/openapi/TVBPMBILL11?" +
            "TYPE=json&" +
            `BILL_NO=${idx}`;
        const fetchBillDetails = async () => {
            try {
                const response = (await axios.get(URL)).data.TVBPMBILL11[1].row[0];
                setBill({
                    ...bill,
                    name: response.BILL_NAME,
                    proposer: response.PROPOSER,
                    date: response.PROPOSE_DT
                });
            } catch (error) {
                console.error('법안 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchBillDetails();
    }, [idx]);

    // 요약 내용을 불러오는 함수
    const fetchSummary = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/gpt/${idx}/summary`);
            setContent(response.data);
        } catch (error) {
            console.error('요약 내용을 불러오는 데 실패했습니다.', error);
        }
    };

    return (
        <div className="detail-page">
            <h1 className="detail-page-title">Detail Page</h1>
            <div className="bill-info">
                <h2 className="bill-info-title">법안 정보</h2>
                <div className="bill-info-detail">
                    <span className="detail-label">법안 번호:</span> {bill.id}
                </div>
                <div className="bill-info-detail">
                    <span className="detail-label">법안 제목:</span> {bill.name}
                </div>
                <div className="bill-info-detail">
                    <span className="detail-label">대표 발의자:</span> {bill.proposer}
                </div>
                <div className="bill-info-detail">
                    <span className="detail-label">발의일:</span> {bill.date}
                </div>
            </div>

            <div className="bill-summary">
                <button className="summary-button" onClick={fetchSummary}>요약 보기</button>
                {content && (
                    <div className="summary-content">
                        <h3 className="summary-title">요약 내용</h3>
                        <p className="summary-text">{content}</p>
                    </div>
                )}
            </div>
            {/* PDF 뷰어 구성 부분은 여기에 추가 */}
        </div>
    );
}

export default DetailPage;
