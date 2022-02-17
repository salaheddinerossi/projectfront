import {useState} from 'react'
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import { signin } from '../../actions/auth';
import { signup } from '../../actions/auth';

function Auth ()  {
    const initialState ={
        firstName :'',
        lastName : '',
        email:'',
        password:'',
        confirmPassword:''
    }
    const [formData, setFormData] = useState(initialState);
    const history = useNavigate()
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(true);
    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId;
        try{
            dispatch({type:'AUTH' , data : {result ,token}})
            history('/');
            
        }catch(error){
            console.log(error)
        }

    }
    const googleFailure = (error) => {
        console.log(error)
        console.log('failure')
    }
    const handelSubmite =(e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))

        }
    }
    const handelChange = (e) => {
        setFormData({ ...formData,[e.target.name]:e.target.value})
    }

    return(
        <div className='w-2/6 text-center mt-10 text mx-auto'>
            <form className='bg-gray-100 text-center py-8 rounded'> 
                <p>{isSignup ? 'Sign up !' : 'Sign In'}</p>
                {
                    isSignup && (
                        <>
                            <Input handelChange={handelChange} placeholder='first name' type="text" name='firstName' />
                            <Input handelChange={handelChange} placeholder='last name' type="text" name='lastName' />
                        </>
                    )
                }
                <Input handelChange={handelChange} placeholder='email' type="email" name='email' />
                <Input handelChange={handelChange} placeholder='password' type="password" name='password' />
                {
                    isSignup && (
                        <>
                            <Input handelChange={handelChange} placeholder='confirm password' type="password" name='confirmPassword' />
                        </>
                    )
                    
                }
                    <p className='cursor-pointer text-gray-600 mt-3' onClick={() => setIsSignup(!isSignup)}>{isSignup ? "already have an account ? sing in " : "don't have an account ? sign up"}</p>
                <br/><button onClick={handelSubmite} className='bg-sky-500 text-white w-3/5 py-2 rounded  '>{isSignup ? 'sing up' : 'sing in'}</button><br/>
                <GoogleLogin clientId='137377341429-jqaom0p9bpv64rfp54r8stdf47pdfciq.apps.googleusercontent.com' className='mt-3 w-3/5 flex justify-center' onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin"/>
            </form>
        </div>
    )
}
export default Auth;