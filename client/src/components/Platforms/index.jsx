import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPlatforms } from "../../redux/actions";

function Platforms(){
    const platforms = useSelector((state) => state.platforms);
    console.log(platforms);
    const dispatch = useDispatch()
    useEffect(()=>{
        if(platforms && platforms.length === 0) dispatch(getPlatforms())
    },[platforms])
return(
    <div>
        {platforms.length && platforms.map((p,i) => {
            return (
                <p key={i} >
                    {p.name}
                </p>
            )
        })}
    
    </div>
)
}
export default Platforms