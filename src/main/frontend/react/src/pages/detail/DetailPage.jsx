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

    useEffect(() => {
        const url = axios.post(`http://localhost:8080/${idx}/pdfurl`);
        WebViewer(
            {
                path: "aws-winter-yonsei/node_modules/@pdftron/webviewer/public",
                licenseKey: "demo:1707201620106:7f4eafe9030000000069fe03ee7211c47e235a224e21040bb60f132600",
                initialDoc: url,
            },
            viewer.current,
        ).then((instance) => {
            const {documentViewer, annotationManager, Annotations} = instance.Core;

            documentViewer.addEventListener('documentLoaded', () => {
                const rectangleAnnot = new Annotations.RectangleAnnotation({
                    PageNumber: 1,
                    // values are in page coordinates with (0, 0) in the top left
                    X: 100,
                    Y: 150,
                    Width: 200,
                    Height: 50,
                    Author: annotationManager.getCurrentUser()
                });

                annotationManager.addAnnotation(rectangleAnnot);
                // need to draw the annotation otherwise it won't show up until the page is refreshed
                annotationManager.redrawAnnotation(rectangleAnnot);
            });
        });
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
    }, []);


    const [content, setContent] = useState();
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
            <h1 className="detail-page-title">{bill.id}</h1>
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
            <div>
                <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
            </div>
        </div>
    );
};

export default DetailPage;