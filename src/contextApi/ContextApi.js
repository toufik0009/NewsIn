import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
const MyContext = createContext();

// Create Context Provider
const ContextProvider = (props) => {
    const [apiRes, setApiRes] = useState([]);
    const [searchTxt, setsearchTxt] = useState();

    const GetResponse = async () => {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2024-06-03&sortBy=publishedAt&apiKey=12745954295d4a71b2c4f219069c22c9');
            // setApiRes(prev => [...prev, response.data]);
            setApiRes([response?.data]);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const ContextValue = {
        apiRes,
        setApiRes,
        searchTxt,
        setsearchTxt,
        GetResponse
    };

    return (
        <MyContext.Provider value={ContextValue}>
            {props.children}
        </MyContext.Provider>
    );
};

export { MyContext, ContextProvider };
