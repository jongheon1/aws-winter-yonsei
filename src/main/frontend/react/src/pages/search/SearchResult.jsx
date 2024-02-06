// SearchResult.jsx
import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { fetchSearchResults } from 'api/search';
import '../../css/searchResult.css';

function SearchResult() {
    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState('RANK');
    const [pageSize] = useState(10);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const page = queryParams.get('page');

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
    }


    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                try {
                    const data = await fetchSearchResults(query, page, sort);
                    setSearchResults(data.result);
                    setCount(data.total);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };

            fetchResults();
        }
    }, [query, page, sort]);

    const totalPages = Math.ceil(count / pageSize);
    const MAX_PAGE_NUM_DISPLAY = 10; // 한 번에 보여줄 최대 페이지 번호 개수
    const startPage = Math.floor(page / MAX_PAGE_NUM_DISPLAY) * MAX_PAGE_NUM_DISPLAY;

    const handlePageChange = (newPage) => {
        navigate(`?query=${query}&page=${newPage}`); // URL을 업데이트하여 현재 페이지 상태를 반영
    };

    return (
        <>
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
                                    onKeyDown={(e) => handleSearch(e)}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => handleSearch(e)}
                                >조회</button>
                            </span>
                </li>
                <li>
                    <button
                        className="btn btn_blue_h46 pd35"
                        onClick={(e) => handleSearch(e)}
                    >검색
                    </button>
                </li>
            </ul>
        </div>
            <div className="search-results">
                {searchResults.map((result) => (
                    <Link to={`/DetailPage/${result.bill_no}`} className={`bn${result.status ?? 3}`}>
                        <strong>{result.title}</strong>
                        <span>{result.date}<br/>{result.speaker}</span>
                    </Link>
                ))}
                {searchResults.length === 0 && (
                    <p style={{alignContent: 'center'}}>검색 결과가 없습니다.</p>
                )}
                <div style={{display: count > 0 ? "block" : "none"}}>총 {count} 개의 검색결과</div>

                <div className="pagination">
                    {startPage > 0 && (
                        <button onClick={() => handlePageChange(startPage - 1)}>이전</button>
                    )}
                    {Array.from({length: Math.min(MAX_PAGE_NUM_DISPLAY, totalPages - startPage)}, (_, i) => (
                        <button
                            key={i + startPage}
                            onClick={() => handlePageChange(i + startPage)}
                            disabled={i + startPage === page}
                        >
                            {i + startPage + 1}
                        </button>
                    ))}
                    {startPage + MAX_PAGE_NUM_DISPLAY < totalPages && (
                        <button onClick={() => handlePageChange(startPage + MAX_PAGE_NUM_DISPLAY)}>다음</button>
                    )}
                </div>

            </div>
        </>
    )
        ;
}

export default SearchResult;
