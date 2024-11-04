import { useParams } from "react-router-dom";


export default function PlacePage(){
     const {id} = useParams();
    return(
      <div className="mt-7">
        place page: {id}
      </div>
    );
}