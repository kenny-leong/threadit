// ----------------------------------- action creators ----------------------------------------

const loadPostVoteStatus = (vote) => ({
    type: 'LOAD_POST_VOTE_STATUS',
    vote
});

const loadPostVotes = (votes) => ({
    type: 'LOAD_POST_VOTES',
    votes
});

const loadCommentVotes = (votes) => ({
    type: 'LOAD_COMMENT_VOTES',
    votes
});


const createVote = () => ({
    type: 'ADD_VOTE',
});


const removeVote = () => ({
    type: 'DELETE_VOTE'
});


// -------------------------------------- thunks -----------------------------------

// GET SINGLE POST VOTE STATUS
export const getPostVote = (postId) => async (dispatch) => {
    const res = await fetch(`/api/votes/posts/${postId}/user-vote`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPostVoteStatus(data))
        return data;
    }
};


// GET ALL USER POST VOTES
export const getUserPostVotes = () => async (dispatch) => {
    const res = await fetch(`/api/votes/posts/user-votes`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPostVotes(data))
        return data;
    }
};

// GET ALL USER COMMENT VOTES
export const getUserCommentVotes = () => async (dispatch) => {
    const res = await fetch(`/api/votes/comments/user-votes`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadCommentVotes(data))
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
        case 'LOAD_POST_VOTES':
            return {
                ...state,
                allPostVotes: action.votes
            }
        case 'LOAD_COMMENT_VOTES':
            return {
                ...state,
                allCommentVotes: action.votes
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
