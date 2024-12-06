export default function Avator({userId ,username}){

    return(
        <div className="w-10 h-10 bg-red-200 rounded-full flex items-center"> 
        <div className="text-center w-full">    {username[0]}</div>
        </div>
    )
}