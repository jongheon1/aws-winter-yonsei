import React, { useState, useEffect, useCallback } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { fetchSearchResults, fetchKeword } from 'api/search';

function EgovMain(props) {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState('RANK');
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
    };

    const handleSearch = async (e) => {  
        if (e.type === 'click' || e.key === 'Enter') {
            navigate(`/searchResult?query=${searchQuery}&page=0`);
            // try {
            //   const data = await fetchSearchResults(searchQuery, page, sort);
            //   setSearchResults(data.result);
            //   setCount(data.total);
            //   setPage(0);
            // } catch (error) {
            //   console.error('Error fetching search results:', error);
            // }
        }
    };

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
                                    onKeyDown={(e) => handleSearch(e, page, sort)} 
                                />
                                <button
                                    type="button"
                                    onClick={(e) => handleSearch(e, page, sort)}
                                >조회</button>
                            </span>
                        </li>
                        <li>
                            <button 
                            className="btn btn_blue_h46 pd35"
                            onClick={(e) => handleSearch(e, page, sort)}
                            >검색</button>
                        </li>
                    </ul>
                </div>
                <div className="colbox" style={{ marginBottom : "20px" }}>
                    <div className="left_col">
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a className={sort==="RANK" ? "on" : ""} onClick={async (e) => {
                                    setSort("RANK")
                                    await handleSearch(e, page, "RANK")
                                }}>정확도순</a></li>
                                <li><a className={sort==="DATE" ? "on" : ""} onClick={async (e) => {
                                    setSort("DATE");
                                    await handleSearch(e, page, "DATE")
                                }}>최신순</a></li>
                                {/* <li> 총 {kesword} </li> */}
                                <li>
                                    <div style={{display: count > 0 ? "block" : "none"}}>총 {count} 개의 검색결과</div>
                                </li>
                            </ul>
                            <ul className="navigate">
                                <div className="board_bot">
                                {/* <!-- Paging --> */}
                                <div className="paging">
                                    <ul>
                                        <li className="btn"><button to="#" className="first">처음</button></li>
                                        <li className="btn"><button to="#" className="prev">이전</button></li>
                                        <li><button to="#">{page+1}</button></li>
                                        <li className="btn"><button to="#" className="next">다음</button></li>
                                        <li className="btn"><button to="#" className="last">마지막</button></li>
                                    </ul>
                                </div>
                            {/* <!--/ Paging --> */}
                        </div>
                            </ul>
                        </div>

                        <div className="banner">
                            {searchResults.map((result) => (
                                <Link to={`/DetailPage/${result.bill_no}`} className={`bn${result.status ?? 3}`}>
                                    <strong>{result.title}</strong>
                                    <span>{result.date}<br />{result.speaker}</span>
                                </Link>
                            ))}
                            {/* 
                                if there are no search results, display a message
                            */}
                            {searchResults.length === 0 && (
                                <p style={{ alignContent: 'center' }}>검색 결과가 없습니다.</p>
                            )}
                        </div>
                    </div>

                    <div className="right_col">
                        <iframe src="https://ysu-004.kb.us-east-2.aws.elastic-cloud.com:9243/app/visualize?auth_provider_hint=anonymous1#/edit/92357800-bc4f-11ee-aeaf-7bd8b9fe8b6e?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(emptyAsNull:!f),schema:metric,type:count),(enabled:!t,id:'2',params:(excludeIsRegex:!t,field:account_length,includeIsRegex:!t,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:15),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,fittingFunction:linear,grid:(categoryLines:!f),labels:(),legendPosition:right,maxLegendLines:1,palette:(name:default,type:palette),radiusRatio:9,seriesParams:!((circlesRadius:1,data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:area,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:area,valueAxes:!((id:ValueAxis-1,labels:(filter:!t,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:''),type:value))),title:test,type:area))"
                        height="100%" width="100%" style={{ borderRadius: "10px", minHeight: "500px" }}></iframe>
                    </div>
                    <br />
                </div>
            </div>
        </div>

    );
}

export default EgovMain;