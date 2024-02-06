import React, {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
    const {id} = useParams();
    const idx = parseInt(id);

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
            //요약 버튼
            <button onClick={() => summary()}>요약</button>
            {content && <Content> {content} </Content>}
        </div>
    );
}

export default DetailPage;