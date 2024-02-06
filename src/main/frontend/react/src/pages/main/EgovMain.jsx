import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import { fetchSearchResults, fetchKeword } from 'api/search';

function EgovMain(props) {

    const [billId, setBillId] = useState('');
    const handleChange = (e) => {
        setBillId(e.target.value); // 입력 필드의 값이 변경될 때 billId 상태 업데이트
    };

    const location = useLocation();

	// eslint-disable-next-line no-unused-vars
    const [noticeBoard, setNoticeBoard] = useState();
	// eslint-disable-next-line no-unused-vars
    const [gallaryBoard, setGallaryBoard] = useState();
    const [noticeListTag, setNoticeListTag] = useState();
    const [gallaryListTag, setGallaryListTag] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [keword, setKeword] = useState('');
    const [count, setCount] = useState(0);

    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
    };

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



    return (
        <div className="container P_MAIN" style={{ backgroundColor: "#7A9ACB" }}>
            <div className="c_wrap">
                <br />
                <div className="condition">
                    <ul>
                        <li className="third_1 L">
                            <label className="f_select" htmlFor="search_select">
                                <select defaultValue={"0"} name="search_select" id="search_select">
                                    <option value="0">전체</option>
                                    {/* <option value="1">제목</option> */}
                                    {/* <option value="2">제목/내용</option> */}
                                    {/* <option value="3">작성자</option> */}
                                </select>
                            </label>
                        </li>
                        <li className="third_2 R">
                            <span className="f_search">
                                <input
                                    type="text" name="" placeholder="검색어를 입력해주세요"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {}}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        fetchSearchResults("sns", "title", "1", "10")
                                            .then((response) => {
                                                setSearchResults(response);
                                            })
                                            .catch((error) => {
                                                console.error("error : ", error);
                                            });
                                    }}
                                >조회</button>
                            </span>
                        </li>
                        <li>
                            <Link to={URL.SUPPORT_DOWNLOAD_CREATE} className="btn btn_blue_h46 pd35">검색</Link>
                        </li>
                    </ul>
                </div>
                <div className="colbox" style={{ marginBottom : "20px" }}>
                    <div className="left_col">
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="#default" className="on">정확도순</a></li>
                                <li><a href="#latest">최신순</a></li>
                                {/* <li> 총 {kesword} </li> */}
                                <li>
                                    <div style={{display: count > 0 ? "block" : "none"}}>총 {count} 개의 검색결과</div>
                                </li>
                            </ul>
                            <div className="list">
                                <div className="notice">
                                    <h2 className="blind">공지사항</h2>
                                    <ul>
                                        {noticeListTag}
                                    </ul>
                                    {/* <Link to={URL.INFORM_NOTICE} className="more">더보기</Link> */}
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
                            {/* {searchResults.map((result) => (
                                <Link key={result.id} to={result.url} className={`bn${result.status}`}>
                                    <strong>{result.billNumber}</strong>
                                    <span>{result.title}<br />{result.statusDescription}</span>
                                </Link>
                            ))} */}
                            <Link to={URL.SUPPORT_DOWNLOAD} className="bn1">
                                <strong>법안번호</strong>
                                <span>법안제목<br />초록색은 승인된법안</span>
                            </Link>
                            <Link to={URL.ABOUT} className="bn2">
                                <strong>법안번호</strong>
                                <span>법안제목<br />빨간색은 철회법안</span>
                            </Link>
                            <Link to={URL.SUPPORT_DOWNLOAD} className="bn3">
                                <strong>법안번호</strong>
                                <span>법안제목<br />회색은 계류법안</span>
                            </Link>
                            <Link to={URL.ABOUT} className="bn3">
                                <strong>법안번호</strong>
                                <span>법안제목<br />회색은 계류법안</span>
                            </Link>
                            <div>
                                <input
                                    type="text"
                                    value={billId}
                                    onChange={handleChange}
                                    placeholder="법안 ID 입력"
                                />
                                <Link to={`/detailPage/${billId}`}>클릭</Link> {/* 동적으로 경로 생성 */}
                            </div>
                        </div>
                    </div>

                    <div className="right_col">
                        <iframe src="https://ysu-004.kb.us-east-2.aws.elastic-cloud.com:9243/app/visualize?auth_provider_hint=anonymous1#/edit/92357800-bc4f-11ee-aeaf-7bd8b9fe8b6e?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(emptyAsNull:!f),schema:metric,type:count),(enabled:!t,id:'2',params:(excludeIsRegex:!t,field:account_length,includeIsRegex:!t,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:15),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,fittingFunction:linear,grid:(categoryLines:!f),labels:(),legendPosition:right,maxLegendLines:1,palette:(name:default,type:palette),radiusRatio:9,seriesParams:!((circlesRadius:1,data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:area,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:area,valueAxes:!((id:ValueAxis-1,labels:(filter:!t,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:''),type:value))),title:test,type:area))"
                        height="100%" width="100%" style={{ borderRadius: "10px", minHeight: "400px" }}></iframe>
                    </div>
                    <br />
                </div>
            </div>
        </div>

    );
}

export default EgovMain;