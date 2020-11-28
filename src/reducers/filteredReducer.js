const initialState = {
    loading: true,
    filterData: [],
    filterError: '',
    key: 0,
};

const filteredReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FILTER_API':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_FILTER_COMPLETED':
            return {
                ...state,
                loading: false,
                filterData: action.payload,
                filterError: '',
            };
        case 'FETCH_FILTER_FAILED':
            return {
                ...state,
                loading: false,
                filterData: [],
                filterError: action.payload,
            };
        case 'SET_KEY':
            return {
                ...state,
                key: action.payload,
            };
        default:
            return state;
    }
};
export default filteredReducer;
