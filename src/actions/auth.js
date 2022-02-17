import * as api from '../api/index';

export const signin = (formData,history) => {
  return async (dispatch) => {
    try{
      const { data } = await api.signin(formData);
      dispatch({type: 'AUTH',data});
      console.log(data)
        history('/')
    
    }catch(err){
        console.log(err)
    }
  };
}
export const signup = (formData,history) => {
    return async (dispatch) => {
      const { data } = await api.signup(formData);
      dispatch({ type: 'AUTH', data });
      try{
          history('/')
      
      }catch(err){
          console.log(err)
      }
    };
  }