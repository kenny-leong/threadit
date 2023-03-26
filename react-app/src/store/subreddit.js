

// ----------------------------------- action creators ----------------------------------------

const loadAllSR = (subreddits) => ({
    type: 'LOAD_SUBREDDITS',
    subreddits
});

const loadSingleSR = (subreddit) => ({
    type: 'LOAD_SINGLE_SR',
    subreddit
});

const loadOwnedSubreddits = (subreddits) => ({
    type: 'LOAD_OWNED_SR',
    subreddits
});

const loadSubredditMembers = (members) => ({
    type: 'LOAD_MEMBERS',
    members
});

const addSubreddit = (subreddit) => ({
    type: 'ADD_SUBREDDIT',
    subreddit
});

const removeSubreddit = () => ({
    type: 'REMOVE_SUBREDDIT'
  });

const updateSubreddit = (subreddit) => ({
    type: 'UPDATE_SUBREDDIT',
    subreddit
});





// -------------------------------------- thunk action creators -----------------------------------


// GET ALL SUBREDDITS
export const getAllSR = () => async (dispatch) => {
    const res = await fetch('/api/subreddits');

    if (res.ok) {
        const allSubreddits = await res.json();
        dispatch(loadAllSR(allSubreddits))
    }
};


// GET SPECIFIC SUBREDDIT BY SUBREDDIT ID
export const getSingleSR = (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}`);

    if (res.ok) {
        const subreddit = await res.json();
        dispatch(loadSingleSR(subreddit))
    }
};


// GET ALL SUBREDDITS OWNED BY A SPECIFIC USER ID
export const getOwnedSubreddits = (creatorId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/creator/${creatorId}`);

    if (res.ok) {
        const subredditMembers = await res.json()
        dispatch(loadSubredditMembers(subredditMembers));
    }
};

// GET ALL SUBREDDIT MEMBERS THROUGH A SUBREDDIT ID
export const getSubredditMembers = (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}/members`);

    if (res.ok) {
      const subredditMembers = await res.json();
      dispatch
    }

    const data = await res.json();
    dispatch(loadSubredditMembers(data.subredditMembers));
  };


// CREATE A NEW SUBREDDIT
export const createSubreddit = (name, description, profile_picture, banner_image) => async dispatch => {
    const res = await fetch('/api/subreddits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            profile_picture,
            banner_image,
        })
    });

    if (res.ok) {
        const newSubreddit = await res.json();
        dispatch(addSubreddit(newSubreddit));
    } else {
        return 'Could not add new subthreadit.'
    }
};


// UPDATE AN EXISTING SUBREDDIT
export const editSubreddit = (id, name, description, profile_picture, banner_image) => async dispatch => {
    const res = await fetch(`/api/subreddits/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            profile_picture,
            banner_image,
        })
    });

    if (res.ok) {
        const updatedSubreddit = await res.json();
        dispatch(updateSubreddit(updatedSubreddit));
        return updatedSubreddit;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors
    } else {
        return ['An error occurred. Please try again.']
    }
};



// DELETE A SUBREDDIT
export const deleteSubreddit = (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
      dispatch(removeSubreddit());
    }
};

//DELETE A SUBREDDIT MEMBER
export const removeSubredditMember = (subredditId, memberId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}/members/${memberId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeSubreddit());
    }
};












// ---------------------------------------- subreddit reducer ----------------------------------------


const initialState = {}



const subredditReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_SUBREDDITS':
            const allSubreddits = {};
            const subredditArr = action.subreddits.subreddits;
            subredditArr.forEach(subreddit => {
                allSubreddits[subreddit.id] = subreddit
            });
            return {
                ...state,
                allSubreddits: allSubreddits
            }
        case 'LOAD_OWNED_SR':
            const ownedSubreddits = {};
            const ownedSRArr = action.subreddits.subreddits;
            ownedSRArr.forEach(subreddit => {
                ownedSubreddits[subreddit.id] = subreddit
            });
            return {
                ...state,
                ownedSubreddits: ownedSubreddits
            }
        case 'LOAD_MEMBERS':
            const subredditMembers = {};
            const memberArr = action.members.subreddit_members;
            memberArr.forEach(member => {
                subredditMembers[member.id] = member
            });
            return {
                ...state,
                subredditMembers: subredditMembers
            }
        case 'LOAD_SINGLE_SR':
            const oneSubreddit = action.subreddit;
            return {
                ...state,
                singleSubreddit: oneSubreddit
            }
        case 'ADD_SUBREDDIT':
            return {
                ...state,
                singleSubreddit: {
                    ...action.subreddit
                }
            }
        case 'UPDATE_SUBREDDIT':
            return {
                ...state,
                singleSubreddit: {
                    ...action.subreddit
                }
            }
        case 'REMOVE_SUBREDDIT':
            const newState = {...state};
            return newState;
        default:
            return state;
    }
}

export default subredditReducer;
