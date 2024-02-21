import React, { useState, useEffect, useCallback } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { fetchSearchResults, fetchKeword } from 'api/search';
import '../../css/suggestedKeyword.css';
import axios from 'axios';

function EgovMain(props) {

    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState('RANK');
    const [page, setPage] = useState(0);
    const [fineSearch, setFineSearch] = useState(false);
    const navigate = useNavigate();
    const [docsCount, setDocsCount] = useState(0);

    const handleSearch = async (e) => {
        if (e.type === 'click' || e.key === 'Enter') {
            try {
              const data = await fetchSearchResults(searchQuery, page, sort);
              setSearchResults(data.result);
              setCount(data.total);
            } catch (error) {
              console.error('Error fetching search results:', error);
            }
            setSearchQuery("");
            setSuggestedKeywords([]);
        }
    };
    const handleInputChange = async (e) => {
        setSearchQuery(e.target.value);
        if (searchQuery.length > 1) {
            try {
                const suggested = await fetchKeword(searchQuery);
                console.log(suggested);
                setSuggestedKeywords(suggested);
            } catch (error) {
                console.error('Error fetching suggested keywords:', error);
                setSuggestedKeywords([]);
            }
        } else {
            setSuggestedKeywords([]);
        }
    };

    // /bills/countAll
    useEffect(() => {
        const fetchDocsCount = async () => {
            try {
                const response = await axios.get('/bills/countAll');
                console.log(response.data); // Log the response data to inspect its structure
                setDocsCount(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchDocsCount();
    }, []);
    
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
                                    {/* <option value="3">발의자</option> */}
                                </select>
                            </label>
                        </li>
                        <li className="third_2 R">
                            <span className="f_search">
                                <input
                                    type="text" name="" placeholder="검색어를 입력해주세요"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        setPage(0)
                                        handleSearch(e, 0, sort)
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        setPage(0)
                                        handleSearch(e, 0, sort)
                                    }}
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
                {suggestedKeywords &&
                    <ul className="suggested-keywords">
                        {suggestedKeywords.map((item, index) => (
                            <>{item &&
                                <li key={index} onClick={() => {
                                    setSearchQuery(item.keyword)
                                }}>
                                    {item.keyword}
                                </li>
                            }</>
                        ))}
                    </ul>
                }
                <div className="colbox" style={{marginBottom: "20px"}}>
                    <div className="left_col">
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a className={sort==="RANK" ? "on" : ""} onClick={async (e) => {
                                    setSort("RANK")
                                    handleSearch(e, page, "RANK")
                                }}>정확도순</a></li>
                                <li><a className={sort==="DATE" ? "on" : ""} onClick={async (e) => {
                                    setSort("DATE");
                                    handleSearch(e, page, "DATE")
                                }}>최신순</a></li>
                                {/* <li> 총 {kesword} </li> */}
                                <li>
                                    <div style={{display: count > 0 ? "block" : "none"}}>총 {count} 개의 검색결과</div>
                                </li>
                            </ul>
                            <ul className="navigate">
                                <div className="board_bot" style={{display: count > 0 ? "block" : "none"}}>
                                {/* <!-- Paging --> */}
                                <div className="paging">
                                    <ul>
                                        <li className="btn">
                                            <button to="#" className="first"
                                            onClick={(e) => {
                                                    setPage(0)
                                                    handleSearch(e, 0, sort)
                                                }
                                            }
                                            >처음</button>
                                        </li>
                                        <li className="btn">
                                            <button to="#" className="prev"
                                                onClick={(e) => {
                                                    var p = page > 1 ? page - 1 : 0
                                                    setPage(p)
                                                    handleSearch(e, p, sort)
                                                }}
                                            >이전</button>
                                        </li>
                                        <li><button to="#">{page+1} / {parseInt(count/10)+1}</button></li>
                                        <li className="btn">
                                            <button to="#" className="next"
                                            onClick={(e) => {
                                                var last = parseInt(count/10)
                                                var p = page < last ? page + 1 : last
                                                setPage(p)
                                                handleSearch(e, p, sort)
                                            }}
                                            >다음</button>
                                            </li>
                                        <li className="btn">
                                            <button to="#" className="last"
                                                onClick={(e) => {
                                                    let last = parseInt(count/10)
                                                    setPage(last)
                                                    handleSearch(e, last, sort)
                                                }}
                                            >마지막</button>
                                        </li>
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
                                <p style={{ textAlign: 'center', marginTop: "50px"}}>검색 결과가 없습니다.</p>
                            )}
                        </div>
                    </div>

                    <div className="right_col">
                        <p style={{ textAlign: 'center', 
                                    padding: "20px",
                                    fontWight: "500",
                                    fontSize: "25px"}}>
                           총 {docsCount} 개의 문서가 색인되어있습니다.
                        </p>
                        <iframe src="https://ysu-004.kb.us-east-2.aws.elastic-cloud.com:9243/app/dashboards?auth_provider_hint=anonymous1#/view/c01ec3f0-c53e-11ee-b58b-7bf68dd516e9?embed=true&_g=()"
                        height="100%" width="100%" style={{ borderRadius: "10px", minHeight: "900px" }}></iframe>
                    </div>
                    <br />
                </div>
            </div>
        </div>

    );
}

export default EgovMain;