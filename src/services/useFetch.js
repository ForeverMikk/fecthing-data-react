import { useState, useEffect } from "react";

export function useFecth(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);

        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
        }, []);
    
       
        return { data, loading, error }
}



export const useFecthAxios = async() => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = response.data;
        
        return data;
    } catch(err){
        return err;
    }
}