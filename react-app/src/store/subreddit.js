

// ----------------------------------- action creators ----------------------------------------

const loadAllSR = (subreddits) => ({
    type: 'LOAD_SUBREDDITS',
    payload: subreddits,
    });


const loadSingleSR = (subreddit) => ({
    type: 'LOAD_SINGLE_SR',
    payload: subreddit
});

const loadSubredditPosts = (posts) => ({
    type: 'LOAD_SUBREDDIT_POSTS',
    payload: posts,
});


const addPostToSubreddit = (post) => ({
    type: 'ADD_POST_TO_SUBREDDIT',
    payload: post,
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




// ---------------------------------------- subreddit reducer ----------------------------------------
