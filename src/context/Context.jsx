import React, { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResults, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index , next) =>{
        setTimeout(function(){
            setResultData(prev => prev + next)
        }, 75 * index) 
    }


    const fetchData = async (prompt) => {

            setResultData("")
            setLoading(true)
            setShowResult(true)
            let response;
            if(prompt !== undefined){
                response = await run(prompt)
                setRecentPrompt(prompt)
            }else{
                setPrevPrompt(prev => [...prev , input])
                setRecentPrompt(input)
                response = await run(input)
            }
            
            let responseArray = response.split("**")
            let newResponse = "" ;
            for(let i = 0 ; i < responseArray.length ; i++ ){
                if(i === 0 | i % 2 !== 1 ){
                    newResponse += responseArray[i]
                }else{
                    newResponse += "<b> " + responseArray[i] + "</b>"
                }
            }

            let newResponse2 = newResponse.split("*").join("</br>")
            let newResArray = newResponse2.split(" ")
            for (let i = 0; i < newResArray.length; i++) {
                const next = newResArray[i]
                delayPara(i , next + " ")
            }
            setLoading(false) 
            setInput("")

    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        fetchData,
        setRecentPrompt,
        recentPrompt,
        showResults,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;