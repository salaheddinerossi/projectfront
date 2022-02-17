import * as api from '../api/index';

// action creators
export const getPosts = () => {
  return async (dispatch) => {
    try{
        const {data} = await api.getPosts();
        dispatch({
            type: 'FETCH_POSTS',
            payload: data
        })
    }catch(err){
        console.log(err)
    }
  };
}

//create post
export const createPost = (post) => {
    return async (dispatch) => {
        
        try{
            console.log(post)
            const {data} = await api.createPost(post);

            dispatch({
                type: 'CREATE_POSTS',
                payload: data
            })
        }catch(err){
            console.log(err)
            console.log('save post error')

        }
    };
}
export const updatePost = (id, post) => {
    return async (dispatch) => {
        try{
            const {data} = await api.updatePost(id, post);
            dispatch({
                type: 'UPDATE_POSTS',
                payload: data
            })
        }catch(err){
            console.log(err)
            console.log('update post error')
        }
    };
}
export const deletePost = (id) => {
    return async(dispatch) => {
        try {
            await api.deletePost(id);
            dispatch({
                type:'DELETE_POSTS',
                payload : id
            })
        }catch(error){
            console.log(error)
        }
    }
}
export const likePost = (id) => {
    return async (dispatch) => {
        try{
            const {data} = await api.likePost(id);
            dispatch({
                type: 'LIKE_POST',
                payload: data
            })
        }catch(err){
            console.log(err)
            console.log('update post error')
        }
    };
}
