// ----------------------------------- action creators ----------------------------------------

const loadPostVoteStatus = (vote) => ({
    type: 'LOAD_POST_VOTE_STATUS',
    vote
});

const createVote = () => ({
    type: 'ADD_VOTE',
});


const removeVote = () => ({
    type: 'DELETE_VOTE'
});


// -------------------------------------- thunks -----------------------------------

// Thunk for getting the user's vote for a post
export const getPostVote = (postId) => async (dispatch) => {
    const res = await fetch(`/api/votes/posts/${postId}/user-vote`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPostVoteStatus(data))
        return data;
    }
};


// Thunk for getting the user's vote for a comment
export const getCommentVote = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/votes/comments/${commentId}/user-vote`);

    if (res.ok) {
        const data = await res.json();
        return data;
    }
};


// VOTE ON A POST
export const postVote = (postId, voteType) => async (dispatch) => {
    const res = await fetch(`/api/votes/posts/${postId}/votes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: voteType
        })
    });

    if (res.ok) {
        const voteRes = await res.json();
        dispatch(createVote());
        return voteRes;
    }
};


// VOTE ON A COMMENT
export const commentVote = (commentId, voteType) => async (dispatch) => {
    const res = await fetch(`/api/votes/comments/${commentId}/votes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: voteType
        })
    });

    if (res.ok) {
        const voteRes = await res.json();
        dispatch(createVote());
        return voteRes;
    }

    return res.json();
};




// DELETE POST VOTE
export const deletePostVote = (postId) => async (dispatch) => {
    const res = await fetch(`/api/votes/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const deleteMsg = await res.json();
      dispatch(removeVote());
      return deleteMsg
    }

    return res.json();
};


// DELETE COMMENT VOTE
export const deleteCommentVote = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/votes/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const deleteMsg = await res.json();
      dispatch(removeVote());
      return deleteMsg
    }

    return res.json();
};







// ---------------------------------------- post reducer ----------------------------------------



const initialState = {}


const voteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POST_VOTE_STATUS':
            return {
                ...state,
                voteDetails: {
                    ...action.vote
                }
            }
        case 'ADD_VOTE':
            const newState = {...state};
            return newState;
        case 'DELETE_VOTE':
            const freshState = {...state};
            return freshState;
        default:
            return state;
    }
}


export default voteReducer;
