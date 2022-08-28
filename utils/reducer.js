export let CONNECTED = false;
export let SELECTED_ACCOUNT = null;
export let IS_ON_VALID_NETWORK = false;
export let IS_LOADING = false;
export let CHAIN_ID = '0';
export let TOKEN_MAP = new Map();

export const REDUCER_KEYS = Object.freeze({
    CONNECTED: 0,
    SELECTED_ACCOUNT: 1,
    IS_ON_VALID_NETWORK: 2,
    IS_LOADING: 3,
    CHAIN_ID: 4,
    TOKEN_MAP: 5,
});


export const setStage = (state, action) => {
    switch (action) {
        case REDUCER_KEYS.CONNECTED:
            CONNECTED = state;
            break;
        case REDUCER_KEYS.SELECTED_ACCOUNT:
            SELECTED_ACCOUNT = state;
            break;
        case REDUCER_KEYS.IS_ON_VALID_NETWORK:
            IS_ON_VALID_NETWORK = state;
            break;
        case REDUCER_KEYS.IS_LOADING:
            IS_LOADING = state;
            break;
        case REDUCER_KEYS.CHAIN_ID:
            CHAIN_ID = state;
            break;
        case REDUCER_KEYS.TOKEN_MAP:
            TOKEN_MAP = state;
            break;
    }
}

