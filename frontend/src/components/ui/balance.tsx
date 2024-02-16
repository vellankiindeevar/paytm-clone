import { useEffect,useState } from "react"


export const Balance = ({ value }:{value:number}) => {


    return <div className="flex text-8xl justify-center">
        <div>
            Your balance:
        </div>
        <div className="ml-4 font-bold ">
            Rs {value}
        </div>
    </div>
}
