import { createContext, useContext, useState } from "react";

export const newContext = createContext(
    {   
        Theme: "light",
        darkTheme: ()=>{},
        lightTheme: ()=>{} 
    },
)

export const ContextProvider = newContext.Provider

export function newContextValue(){
    return(
        useContext(newContext)
    )
}