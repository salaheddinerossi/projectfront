import Posts from "./Posts/Posts";
import Form from "./Form/Form";
import { useDispatch } from 'react-redux';
import {useEffect , useState} from 'react';
import { getPosts } from '../actions/posts';




function Home () {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getPosts())
    }, [currentId,dispatch]);

    return(
    
        <div className="grid grid-cols-4">
        <Posts currentId={currentId}  setCurrentId={setCurrentId} />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    
    )

}
export default Home;