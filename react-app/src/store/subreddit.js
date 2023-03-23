

// ----------------------------------- action creators ----------------------------------------

const loadAllSR = (subreddits) => ({
    type: 'LOAD_SUBREDDITS',
    subreddits
});

const loadSingleSR = (subreddit) => ({
    type: 'LOAD_SINGLE_SR',
    subreddit
});

const loadSubredditPosts = (posts) => ({
    type: 'LOAD_SUBREDDIT_POSTS',
    posts
});

const addPostToSubreddit = (post) => ({
    type: 'ADD_POST_TO_SUBREDDIT',
    post
});

const addSubreddit = (subreddit) => ({
    type: 'ADD_SUBREDDIT',
    subreddit
});




// -------------------------------------- thunk action creators -----------------------------------


// LOADS ALL SUBREDDITS
export const getAllSR = () => async (dispatch) => {
    const res = await fetch('/api/subreddits');

    if (res.ok) {
        const allSubreddits = await res.json();
        dispatch(loadAllSR(allSubreddits))
    }
};


// LOADS ONE SUBREDDIT BY ID
export const getSingleSR = (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}`);

    if (res.ok) {
        const subreddit = await res.json();
        dispatch(loadSingleSR(subreddit))
    }
};

// LOADS ALL POSTS FOR A GIVEN SUBREDDIT ID
export const getSubredditPosts = (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}/posts`);

    if (res.ok) {
      const posts = await res.json();
      dispatch(loadSubredditPosts(posts));
    }
};


// CREATE A POST WITHIN A SUBREDDIT
export const createPostInSubreddit = (subredditId, title, content) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}/create_post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const post = await res.json();
      dispatch(addPostToSubreddit(post));
    }
};


export const createSubreddit = ({ name, description, profile_picture, banner_image }) => async dispatch => {
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
      return newSubreddit;
    }
};



// ---------------------------------------- subreddit reducer ----------------------------------------


const initialState = {}
