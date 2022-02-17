import moment from "moment";
import {ReactComponent as Edit} from "../../images/edit.svg"
import { deletePost , likePost } from "../../actions/posts";

import { useDispatch} from 'react-redux';

function Post(props ){
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    function show () {
        props.setCurrentId(props.post._id)
    }
    const Likes = () => {
        if (props.post.likes.length > 0) {
          return props.post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><p fontSize="small" />&nbsp;{props.post.likes.length > 2 ? `You and ${props.post.likes.length - 1} others` : `${props.post.likes.length} like${props.post.likes.length > 1 ? 's' : ''}` }<p/></>
            ) : (
              <><p fontSize="small" />&nbsp;{props.post.likes.length} {props.post.likes.length === 1 ? 'Like' : 'Likes'}<p/></>
            );
        }
    
        return <><p fontSize="small" />&nbsp;Like<p/></>;
      };
    
    return(
        <div className=" rounded">
            <div className="post_image flex justify-between" style={{
                background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6) ),url("${props.post.selectedFile}")` , backgroundRepeat: 'no-repeat',
                height:'220px', backgroundSize: 'cover', backgroundPosition: 'center'
            }} >
                <div>
                    <h1 className="text-lg text-white font-medium ml-3 pt-3">{props.post.name}</h1>
                    <p className="text-sm text-white ml-3">{moment(props.post.createdAt).fromNow()}</p>
                </div>
                {(user?.result?.googleId === props.post?.creator || user?.result?._id === props.post?.creator) && (
                <div  className="mt-6 mr-4 cursor-pointer" onClick={show}>
                    <Edit  fill='red'  />
                </div>
                )}
            </div>
            <div className="mt-0 px-3 bg-gray-100 rounding">
                <p className="pt-3">{props.post.tags.map((tag) => `#${tag} `)}</p>
                <p className="text-xl font-medium py-1">{props.post.title}</p>
                <p className="text-gray-700	pb-2">{props.post.message}</p>
                <div className="flex justify-between pb-3">
                    <div className="flex cursor-pointer" onClick={() => dispatch(likePost(props.post._id))}>
                        <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" width="20px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z" fill="currentColor"/></svg>
                        <Likes />
                    </div>
                    {(user?.result?.googleId === props.post?.creator || user?.result?._id === props.post?.creator) && (
                    <div className="flex cursor-pointer" disabled={!user?.user} onClick={() => dispatch(deletePost(props.post._id))}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" fill="currentColor"/></svg>
                        <p>Delete</p>
                    </div>
                    )}

                </div>
            </div>
        </div>
    )
}
export default Post;