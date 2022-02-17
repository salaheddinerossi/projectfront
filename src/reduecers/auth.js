const authReducer = (state = {authDtate :null} , action ) =>{
    switch(action.type){
        case 'AUTH':
            console.log(action?.data)
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return { ...state, authDtate:action?.data}
        case 'LOGOUT':
            console.log('salam')
            localStorage.clear();
            return { ...state,authDtate:null}
        default :
            return state;
    }
}
export default authReducer;