// SearchResult.jsx
import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { fetchSearchResults } from 'api/search';
import '../../css/searchResult.css';

function SearchResult() {
    const [searchResults, setSearchResults] = useState([]);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState('RANK');
    const [pageSize] = useState(10);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const page = queryParams.get('page');


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
        <div className="search-results">
            {searchResults.map((result) => (
                <Link to={`/DetailPage/${result.bill_no}`} className={`bn${result.status ?? 3}`}>
                    <strong>{result.title}</strong>
                    <span>{result.date}
                    <br/>{result.speaker}
                    <br/>{result.contents}=</span>
                </Link>
            ))}
            {searchResults.length === 0 && (
                <p style={{alignContent: 'center'}}>검색 결과가 없습니다.</p>
            )}
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
    );
}

export default SearchResult;
