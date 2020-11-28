import axios from 'axios';
import { BASE_URL } from '../common/config';

export const filteredResults = (data) => {
    const query = data?.split('?')[1];
    return async (dispatch) => {
        dispatch({ type: 'FETCH_FILTER_API' });
        try {
            const res = await axios.get(`${BASE_URL}&${query}`);
            dispatch({ type: 'FETCH_FILTER_COMPLETED', payload: res.data });
        } catch (e) {
            dispatch({ type: 'FETCH_FILTER_FAILED', payload: e.response?.data.message });
        }
    };
};
