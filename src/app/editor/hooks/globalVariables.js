"use client"
import React,{createContext, useState} from "react";
export const GlobalVariables = createContext();

export const MyProvider = ({children}) => {
    const [image, setImage] = useState(null);
    const [processing, setProcessing] = useState(false)
    const [context, setContext] = useState(null)

    return (
        <GlobalVariables.Provider value={{image, setImage, processing, setProcessing, context, setContext}}>
            {children}
        </GlobalVariables.Provider>
    )
}