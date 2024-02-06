import { queryAllByAltText } from '@testing-library/react';
import axios from 'axios';

export const fetchSearchResults = async () => {
    try {
      const response = await axios.get('/api/search');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch search results');
    }
  };

export const fetchKeword = async (query) => {
    try {
      const response = await axios.get(`http://52.78.206.96:5000/keword/${query}`);

    response.data.result.items.map((item) => {
        return item.keyword;
    });
    } catch (error) {
      throw new Error('Failed to fetch keword results');
    }
};