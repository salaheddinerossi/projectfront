import Post from "./Post";
import { useSelector } from "react-redux";

function Posts(props){
    const posts = useSelector(state => state.posts);
    return(
        <div className="col-span-3 mr-6">
            <div className="grid grid-cols-3 gap-8 mt-5">
                {
                    posts.map(post => (
                        <Post key={post._id}  post={post}  currentId={props.currentId}  setCurrentId={props.setCurrentId}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Posts;