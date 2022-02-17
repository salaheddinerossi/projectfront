function Input(props) {
    return(
        <input onChange={props.handelChange} className="mt-3 p-2 outline-0 w-3/5" name={props.name} placeholder={props.placeholder}  type={props.type}  />
     )
}
export default Input;