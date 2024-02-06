import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";
import '../../css/detailPage.css'

const DetailPage = () => {
    const {id} = useParams();
    const idx = parseInt(id);
    const viewer = useRef(null);

    const [bill, setBill] = useState({
        id: idx,
        name: '',
        proposer: '',
        date: ''
    });
    const [content, setContent] = useState();

    useEffect(() => {
        const fetchBillDetails = async () => {
            try{
                const response = await axios.get(
                    `https://open.assembly.go.kr/portal/openapi/TVBPMBILL11?TYPE=json&BILL_NO=${idx}`
                  );
                  const data = response.data.TVBPMBILL11[1].row[0];
                setBill({
                    ...bill,
                    name: data.BILL_NAME,
                    proposer: data.PROPOSER,
                    date: data.PROPOSE_DT
                });
            } catch (error) {
                console.error('법안 정보를 불러오는 데 실패했습니다.', error);
            }
        };
    
        const fetchPdf = async() => {
            try {
                const rectangleWidth = window.innerWidth * 0.8;
                const rectangleHeight = window.innerHeight * 0.2;
                WebViewer(
                    {
                        path: "/webviewer/lib/public",
                        licenseKey: "demo:1707201620106:7f4eafe9030000000069fe03ee7211c47e235a224e21040bb60f132600",
                        initialDoc: `http://52.78.206.96:5000/file/${idx}`
                    },
                    viewer.current,
                ).then((instance) => {
                    const { documentViewer, annotationManager, Annotations } = instance.Core;
                    documentViewer.addEventListener("documentLoaded", () => {
                        const rectangleAnnot = new Annotations.RectangleAnnotation({
                            PageNumber: 1,
                            X: 0,
                            Y: 0,
                            Width: rectangleWidth,
                            Height: rectangleHeight,
                            Author: annotationManager.getCurrentUser(),
                        });
                        annotationManager.addAnnotation(rectangleAnnot);
                        annotationManager.redrawAnnotation(rectangleAnnot);
                    });
                });
            } catch (error) {
                console.error("Failed to fetch PDF URL:", error);
            }
    };

        fetchBillDetails();
        fetchPdf();
    }, [idx]);

    const [isLoading, setIsLoading] = useState(false);
    const fetchSummary = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/gpt/${idx}/summary`);
            setContent(response.data);

            setIsLoading(false);
        } catch (error) {
            console.error('요약 내용을 불러오는 데 실패했습니다.', error);
            setIsLoading(false);
        }
    };

    const renderContentWithBreaks = (content) => {
        return content.split(/(?=\d\.)/).map((paragraph, index) => (
            <p key={index} className="summary-text">{paragraph}</p>
        ));
    };

        return (
        <div className="detail-page">
            <h1 className="detail-page-title">{bill.name}</h1>
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
                {!content && (
                <button className="summary-button" onClick={fetchSummary} disabled={isLoading}>
                    {isLoading ? '요약 중...' : '요약 보기'}
                </button>)
                }
                {content && (
                    <div className="summary-content">
                        <h3 className="summary-title">요약 내용</h3>
                        {renderContentWithBreaks(content)}
                    </div>
                )}
            </div>

            {/* PDF 뷰어 구성 부분은 여기에 추가 */}
            <div>
                <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
            </div>
        </div>
    );
};

export default DetailPage;