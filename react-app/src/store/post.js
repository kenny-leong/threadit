// ----------------------------------- action creators ----------------------------------------

const loadPosts = (posts) => ({
    type: 'LOAD_POSTS',
    posts
});

const loadSubredditPosts = (posts) => ({
    type: 'LOAD_SUBREDDIT_POSTS',
    posts
});

const addPost = (post) => ({
    type: 'ADD_POST',
    post
});


const editPost = (post) => ({
    type: 'EDIT_POST',
    post
});

const deletePost = (postId) => ({
    type: 'DELETE_POST',
    postId
});


// -------------------------------------- thunk action creators -----------------------------------

// GET ALL POSTS
export const getAllPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');

    if (res.ok) {
        const allPosts = await res.json();
        dispatch(loadPosts(allPosts));
    }
};


// GETS ALL POSTS FOR A GIVEN SUBREDDIT ID
export const getSubredditPosts = (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}/posts`);

    if (res.ok) {
      const posts = await res.json();
      dispatch(loadSubredditPosts(posts));
    }
};

// CREATE A NEW POST
export const createPost = (title, content, subreddit_id, image_url) => async (dispatch) => {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content,
            subreddit_id,
            image_url
        })
    });

    if (res.ok) {
      const newPost = await res.json();
      dispatch(addPost(newPost));
      return newPost;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) return data.errors
    } else {
      return ['An error occurred. Please try again.']
    }
};

// EDIT AN EXISTING POST (NEED TO BE REFACTORED)
export const editExistingPost = (postId, title, content, image_url) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
        image_url
      })
    });

    if (res.ok) {
      const updatedPost = await res.json();
      dispatch(editPost(updatedPost));
      return updatedPost;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) return data.errors;
    } else {
      return ['An error occurred. Please try again.'];
    }
};


// DELETE AN EXISTING POST
export const deleteExistingPost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const message = await res.json();
      dispatch(deletePost(postId));
      return message;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) return data.errors;
    } else {
      return ['An error occurred. Please try again.'];
    }
};



// GET ALL COMMENTS FOR A GIVEN POST ID
// export const getPostComments = (postId) => async (dispatch) => {
//     const res = await fetch(`/api/posts/${postId}/comments`);

//     if (res.ok) {
//       const comments = await res.json();
//       dispatch(loadComments(comments));
//     }
// };





// ---------------------------------------- post reducer ----------------------------------------



const initialState = {}


const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            const allPosts = {};
            const postArr = action.posts.posts
            postArr.forEach(post => {
              allPosts[post.id] = post
            });
            return {
                ...state,
                allPosts: allPosts
            }
        case 'LOAD_SUBREDDIT_POSTS':
            const subredditPosts = {};
            const subPostArr = action.posts.posts;
            subPostArr.forEach(post => {
                subredditPosts[post.id] = post
            });
            return {
                ...state,
                subredditPosts: subredditPosts
            }
        case 'ADD_POST':
            return {
                ...state,
                singlePost: {
                    ...action.post
                }
            }
        case 'EDIT_POST':
            return {
                ...state,
                singlePost: {
                    ...action.post
                }
            }
        case 'DELETE_POST':
            const newState = {...state};
            return newState;
        default:
            return state;
    }
}


export default postReducer;
