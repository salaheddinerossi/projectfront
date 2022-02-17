import {useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import { updatePost } from '../../actions/posts';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';


function Form (props){
    const post = useSelector((state) => props.currentId ? state.posts.find((p) => p._id === props.currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [postData , setPostData] = useState({
        title: '',
        message : '',
        tags:'',
        selectedFile: ''
    })
    useEffect(() => {
        if (post){
            setPostData(post)
        }
    }, [post]);
    const dispatch = useDispatch();

    const handelSubmite = (e) => {
        e.preventDefault();
        if (props.currentId){
            dispatch(updatePost(props.currentId,{...postData, name:user?.result?.name}));
            
        }
        else{
            dispatch(createPost({...postData, name:user?.result?.name}));
        }
        clear()
    }
    const clear =() => {
        props.setCurrentId(null);
        setPostData({
            title: '',
            message : '',
            tags:'',
            selectedFile: ''
        })
    }   
    if(!user?.result?.name){
        return(
        <div className="col-span-1 text-center py-3 bg-gray-100 mt-5 ">
            <p>sign in to post </p>
        </div>
        )

    }
    return(
        <div className="col-span-1 ">
            <form onSubmit={handelSubmite} className='text-center py-3 bg-gray-100 mt-5'>
                <h1 className='text-gray-600'>{props.currentId ? "Edit the post" : "Create a new post" } </h1>
                <input type="text" placeholder='title' className='m-2 w-4/5 focus:outline-none p-1 rounded' name="title" value={postData.title} onChange={(e) => setPostData({...postData ,title:e.target.value})}></input>
                <input type="text" placeholder='message' className='m-2 w-4/5 focus:outline-none p-1 rounded' name="message" value={postData.message} onChange={(e) => setPostData({...postData ,message:e.target.value})}></input>
                <input type="text" placeholder='tags' className='m-2 w-4/5 focus:outline-none p-1 rounded' name="tags" value={postData.tags} onChange={(e) => setPostData({...postData ,tags:e.target.value.split(',')})}></input>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                <button type='submite' className='bg-sky-500 text-white py-2 px-4 rounded w-4/5 mt-2'>submite</button>
                <div  onClick={clear} className='bg-pink-500 text-white py-2 px-4 rounded w-4/5 mt-2 ml-10'>
                    <p>clear</p>
                </div>
            </form>
            </div>
    )
}
export default Form;
