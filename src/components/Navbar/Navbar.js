import { Link } from "react-router-dom"
import {useState,useEffect} from "react"
import { useDispatch } from 'react-redux'
import { useNavigate ,useLocation  } from 'react-router-dom'
import decode  from 'jwt-decode'


function Navbar () {
    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch();
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history('/')
        setUser(null)
        
    }
    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    
    return(
        <div className="bg-sky-500  mt-5 navbar flex justify-between ">
            <Link to='/'><p className="text-white font-semibold p-2 ml-2 text-lg	">Cute Pets</p></Link>
            <div>
                {user ? (
                    <div className="flex p-2 mr-4 ">
                        <img src={user.result.imageUrl} alt={user.result.name} className='profile_image mr-3'/>
                        <p className="text-white font-medium mt-1 ">{user.result.name}</p>
                        <button onClick={logout} className="text-white font-semibold  mx-4 text-lg">Logout</button>
                    </div>
                ) :<Link to="/auth"><button  className="text-white font-semibold p-2 mr-4 text-lg">sign in</button></Link>}
            </div>

        </div>

    )
}

export default Navbar;