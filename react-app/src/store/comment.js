// ----------------------------------- action creators ----------------------------------------

const loadComments = (comments) => ({
    type: 'LOAD_COMMENTS',
    comments
});

const loadSinglePost = (post) => ({
  type: 'LOAD_POST_DETAILS',
  post
});

const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    comment
});


const editComment = (comment) => ({
    type: 'EDIT_COMMENT',
    comment
});

const removeComment = () => ({
    type: 'DELETE_COMMENT'
});


// -------------------------------------- thunk action creators -----------------------------------



// GET COMMENTS FOR A POST BY POST ID
export const getComments = (postId) => async (dispatch) => {
  const res = await fetch(`/api/comments/post/${postId}`);

  if (res.ok) {
      const comments = await res.json();
      dispatch(loadComments(comments.comments));
  }
};



// CREATE A NEW COMMENT
export const createComment = (postId, content) => async (dispatch) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id: postId,
            content
        })
    });

    if (res.ok) {
        const newComment = await res.json();
        dispatch(addComment(newComment));
        return newComment;
    }
};

// EDIT AN EXISTING COMMENT
export const updateComment = (commentId, content) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });

    if (res.ok) {
        const updatedComment = await res.json();
        dispatch(editComment(updatedComment));
    }
};


// DELETE AN EXISTING COMMENT
export const deleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const message = await res.json();
      dispatch(removeComment());
      return message;
    }
};









// ---------------------------------------- post reducer ----------------------------------------



const initialState = {}


const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_COMMENTS':
            const allComments = {};
            const commentArr = action.comments
            commentArr.forEach(comment => {
              allComments[comment.id] = comment
            });
            return {
                ...state,
                allComments: allComments
            }
        case 'LOAD_POST_DETAILS':
            return {
              ...state,
              postDetails: {
                ...action.post
              }
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
        case 'ADD_COMMENT':
            return {
                ...state,
                singleComment: {
                    ...action.comment
                }
            }
        case 'EDIT_COMMENT':
            return {
                ...state,
                singleComment: {
                    ...action.comment
                }
            }
        case 'DELETE_COMMENT':
            const newState = {...state};
            return newState;
        default:
            return state;
    }
}


export default commentReducer;
