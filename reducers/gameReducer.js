import axios from 'axios';

const initialState = {
    start: "",
    end: "",
    currentLinks: [],
    currentArticleTitle: "",
    turns: [],
    loading: false
}

// Action type
const GOT_START_AND_END = "GOT_START_AND_END";
const GOT_LINKS = "GOT_LINKS";
const ADD_TURN = "ADD_TURN";
const CLEAR_STATE = "CLEAR_STATE";
const CHANGE_CURRENT_ARTICLE = "CHANGE_CURRENT_ARTICLE";
const CHANGE_LOADING = "CHANGE_LOADING";

// Action creators

const loadingSwitch = (boolean) => {
    return {
        type: CHANGE_LOADING,
        payload: boolean
    }
};

export const currentArticle = (articleTitle) => {
    return {
        type: CHANGE_CURRENT_ARTICLE,
        payload: articleTitle
    }
};

export const stateClearer = () => {
    return {
        type: CLEAR_STATE
    }
};

export const startAndEndLoader = (startAndEnd) => {
    return {
        type: GOT_START_AND_END,
        payload: startAndEnd
    }
};

const linkLoader = (links) => {
    return {
        type: GOT_LINKS,
        payload: links
    }
};

export const addTurn = (turn) => {
    return {
        type: ADD_TURN,
        payload: turn
    }
};

// Thunk creators
export const loadStartAndEnd = () => dispatch => {
    dispatch(loadingSwitch(true))
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=2&format=json')
        .then(response => response.json())
        .then(startAndEnd => dispatch(startAndEndLoader(startAndEnd.query.random)))
        .then(result =>{
            dispatch(loadingSwitch(false));
            return result;
        })
        .catch(error => console.log(error));
}

export const loadLinks = (title) => dispatch => {
    dispatch(loadingSwitch(true))
    title = title.split(' ').join('_');
    fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=links&titles=${title}&pllimit=max&format=json`)
        .then(response => response.json())
        .then(links =>{
            let pageid = Object.keys(links.query.pages)[0];
            return links.query.pages[pageid]
        })
        .then(responseObj => dispatch(linkLoader(responseObj.links)))
        .then(result =>{
            dispatch(loadingSwitch(false));
            return result;
        })
        .catch(error => console.log(error));
}

// Reducer

const Game = function (state = initialState, action) {
    switch (action.type) {
        case GOT_START_AND_END:
            return Object.assign({}, state, { start: action.payload[0].title, end: action.payload[1].title });
        
        case GOT_LINKS:
            return Object.assign({}, state, { currentLinks: action.payload });
            
        case ADD_TURN:
            return Object.assign({}, state, { turns: [...state.turns, action.payload] });

        case CLEAR_STATE:
            return initialState;

        case CHANGE_CURRENT_ARTICLE:
            return Object.assign({}, state, { currentArticleTitle: action.payload });

        case CHANGE_LOADING:
            return Object.assign({}, state, { loading: action.payload });

        default: return state
    }
};

export default Game;