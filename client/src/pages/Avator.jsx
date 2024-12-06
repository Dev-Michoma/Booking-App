export default function Avator({userId ,username}){
  const colors =[ "bg-green-200" ,"bg-teal-200", "bg-purple-200" , ,"bg-yellow-200"];
  const userIdBase10 = isNaN(parseInt(userId, 16)) ? 0 : parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex]
  console.log(color)
  
    return(
          <div className={"w-10 h-10  rounded-full flex items-center "+color} > 
        <div className="text-center w-full">    {username[0]}</div>
        </div>
    )
}