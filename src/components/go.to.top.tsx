"use client"

import {ChevronUp} from "lucide-react";

export const GoToTop = () =>{
    return(
        <div className={"back-to-top"} onClick={() => window.scrollTo(0, 0)}>
            <ChevronUp className={"w-8 h-8"}/>
        </div>
    )
}