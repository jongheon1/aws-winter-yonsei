import { queryAllByAltText } from '@testing-library/react';
import axios from 'axios';

export const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`http://52.78.206.96:5000/search/${query}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch search results');
    }
  };

export const fetchKeword = async (query) => {  
  // 추천 검색어 요청해서 받아오기\
    try {
      const response = await axios.get(`http://52.78.206.96:5000/keword/${query}`);

    response.data.result.items.map((item) => {
        return item.keyword;
    });
    } catch (error) {
      throw new Error('Failed to fetch keword results');
    }
};

