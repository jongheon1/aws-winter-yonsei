import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";

const DetailPage = () => {
    const {id} = useParams();
    const idx = parseInt(id);
    const viewer = useRef(null);
    useEffect(() => {
        const url = axios.post(`http://localhost:8080/${idx}/pdfurl`);
        WebViewer(
        {
            path: "../node_modules/@pdftron/webviewer/public",
            licenseKey: "demo:1707201620106:7f4eafe9030000000069fe03ee7211c47e235a224e21040bb60f132600",
            initialDoc: url,
        },
        viewer.current,
    ).then((instance) => {
            const { documentViewer, annotationManager, Annotations } = instance.Core;

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
    }, []);
    const [content, setContent] = useState(); // 요약 내용을 저장할 상태
    //이게 요약 받아오는거
    const summary = async () => {
      const response = await axios.post(`http://localhost:8080/gpt/${idx}/summary`);
      setContent(response.data);
    };

    return (
        <div>
            <h1>Detail Page</h1>
            //pdf 뷰어
            <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
            //요약 버튼
            <button onClick={() => summary()}>요약</button>
            {content && <div> {content} </div>}
        </div>
    );
}

export default DetailPage;