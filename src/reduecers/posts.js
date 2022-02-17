export default (posts = [], action) => {
    switch (action.type) {
        
        case 'FETCH_POSTS':
            return action.payload;
        case 'CREATE_POSTS':
            console.log(action.payload);
            return [ ...posts , action.payload];
        case 'UPDATE_POSTS':
            return posts.map((post) => post._id === action.payload._id? action.payload : post)
        case 'LIKE_POST':    
            return posts.map((post) => post._id === action.payload._id? action.payload : post)
        case 'DELETE_POSTS' : 
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts;
    }
}