import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';

function EgovMain(props) {
    console.group("EgovMain");
    console.log("[Start] EgovMain ------------------------------");
    console.log("EgovMain [props] : ", props);

    const location = useLocation();
    console.log("EgovMain [location] : ", location);

	// eslint-disable-next-line no-unused-vars
    const [noticeBoard, setNoticeBoard] = useState();
	// eslint-disable-next-line no-unused-vars
    const [gallaryBoard, setGallaryBoard] = useState();
    const [noticeListTag, setNoticeListTag] = useState();
    const [gallaryListTag, setGallaryListTag] = useState();

    const retrieveList = useCallback(() => {
        console.groupCollapsed("EgovMain.retrieveList()");

        const retrieveListURL = '/mainPage';
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                setNoticeBoard(resp.result.notiList);
                setGallaryBoard(resp.result.galList);

                let mutNotiListTag = [];
                mutNotiListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

                // 리스트 항목 구성
                resp.result.notiList.forEach(function (item, index) {
                    if (index === 0) mutNotiListTag = []; // 목록 초기화
                    mutNotiListTag.push(
                        <li key={item.nttId}>
                            <Link
                                to={{pathname: URL.INFORM_NOTICE_DETAIL}}
                                state={{
                                    nttId: item.nttId,
                                    bbsId: item.bbsId
                                }}
                            >
                                {item.nttSj}
                                <span>{item.frstRegisterPnttm}</span>
                            </Link>
                        </li>
                    );
                });
                setNoticeListTag(mutNotiListTag);

                let mutGallaryListTag = [];
                mutGallaryListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

                // 리스트 항목 구성
                resp.result.galList.forEach(function (item, index) {
                    if (index === 0) mutGallaryListTag = []; // 목록 초기화
                    mutGallaryListTag.push(
                        <li key={item.nttId}>
                            <Link
                                to={{pathname: URL.INFORM_GALLERY_DETAIL}}
                                state={{
                                    nttId: item.nttId,
                                    bbsId: item.bbsId
                                }}
                            >
                                {item.nttSj}
                                <span>{item.frstRegisterPnttm}</span>
                            </Link>
                        </li>
                    );
                });
                setGallaryListTag(mutGallaryListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovMain.retrieveList()");
    },[]);

    useEffect(() => {
        retrieveList();
    }, [retrieveList]);

    console.log("------------------------------EgovMain [End]");
    console.groupEnd("EgovMain");

    return (
        <div className="container P_MAIN" background-color="lightblue">
            <div className="c_wrap">
                <div className="condition">
                    <ul>
                        <li className="third_1 L">
                            <label className="f_select" htmlFor="search_select">
                                <select defaultValue={"0"} name="search_select" id="search_select">
                                    <option value="0">전체</option>
                                    <option value="1">제목</option>
                                    <option value="2">제목/내용</option>
                                    <option value="3">작성자</option>
                                </select>
                            </label>
                        </li>
                        <li className="third_2 R">
                            {/* <!-- 210806 수정 --> */}
                            <span className="f_search">
                                <input type="text" name="" placeholder=""/>
                                <button type="button">조회</button>
                            </span>
                        </li>
                        <li>
                            <Link to={URL.SUPPORT_DOWNLOAD_CREATE} className="btn btn_blue_h46 pd35">검색</Link>
                        </li>
                    </ul>
                </div>
                <div className="colbox">
                    <div className="left_col">
                        <iframe src="https://ysu-004.kb.us-east-2.aws.elastic-cloud.com:9243/app/visualize?auth_provider_hint=anonymous1#/edit/92357800-bc4f-11ee-aeaf-7bd8b9fe8b6e?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(emptyAsNull:!f),schema:metric,type:count),(enabled:!t,id:'2',params:(excludeIsRegex:!t,field:account_length,includeIsRegex:!t,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:15),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,fittingFunction:linear,grid:(categoryLines:!f),labels:(),legendPosition:right,maxLegendLines:1,palette:(name:default,type:palette),radiusRatio:9,seriesParams:!((circlesRadius:1,data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:area,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:area,valueAxes:!((id:ValueAxis-1,labels:(filter:!t,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:''),type:value))),title:test,type:area))"
                        height="100%" width="100%"></iframe>
                    </div>

                    <div className="right_col">
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="#공지사항" className="on">공지사항</a></li>
                                <li><a href="#갤러리">갤러리</a></li>
                            </ul>
                            <div className="list">
                                <div className="notice">
                                    <h2 className="blind">공지사항</h2>
                                    <ul>
                                        {noticeListTag}
                                    </ul>
                                    <Link to={URL.INFORM_NOTICE} className="more">더보기</Link>
                                </div>

                                <div className="gallary">
                                    <h2 className="blind">갤러리</h2>
                                    <ul>
                                        {gallaryListTag}
                                    </ul>
                                    <Link to={URL.INFORM_GALLERY} className="more">더보기</Link>
                                </div>
                            </div>
                        </div>

                        <div className="banner">
                            <Link to={URL.SUPPORT_DOWNLOAD} className="bn1">
                                <strong>자료실</strong>
                                <span>다양한 자료를<br />다운로드 받으실 수 있습니다.</span>
                            </Link>
                            <Link to={URL.ABOUT} className="bn2">
                                <strong>표준프레임워크센터</strong>
                                <span>표준프레임워크센터의<br />약도 등의 정보를 제공합니다.</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* <div className="banner_bot">
                    <div className="b1">
                        <div>
                            <h2>주요사업 소개</h2>
                            <p>표준프레임워크가 제공하는<br />
                                주요 사업을 소개합니다.</p>
                        </div>
                        <Link to={URL.INTRO_WORKS}>자세히 보기</Link>
                    </div>
                    <div className="b2">
                        <div>
                            <h2>대표서비스 소개</h2>
                            <p>표준프레임워크 실행환경의<br />
                                서비스 그룹에서 제공하는<br />
                                대표서비스입니다.</p>
                        </div>
                        <Link to={URL.INTRO_SERVICE}>자세히 보기</Link>
                    </div>
                    <div className="b3">
                        <div>
                            <h2>서비스 신청</h2>
                            <p>표준프레임워크 경량환경<br />
                                홈페이지의 다양한 서비스를<br />
                                신청 하실 수 있습니다.</p>
                        </div>
                        <Link to={URL.SUPPORT_APPLY}>자세히 보기</Link>
                    </div>
                    <div className="b4">
                        <div>
                            <h2>일정 현황</h2>
                            <p>표준프레임워크 경량환경<br />
                                홈페이지의 전체적인 일정<br />
                                현황을 조회하실 수 있습니다.</p>
                        </div>
                        <Link to={URL.INFORM}>자세히 보기</Link>
                    </div>
                </div> */}
            </div>
        </div>

    );
}

export default EgovMain;