import { useState, useEffect } from "react";

export function useFecth(url) {
    //En este estado se guardara la data de la informacion
    const [data, setData] = useState(null);
    // Loading es un estado que te servira para indicar el tiempo que se ejecuta la peticion 
    // Con este puedes implementar una vista de Loading o alguna animacion
    const [loading, setLoading] = useState(true);
    // Un error se guardara en este estado
    const [error, setError] = useState(null);
    

    useEffect(() => {
        setLoading(true);

        fetch(url)
            .then((response) => response.json())
            // Se setea la data en el estado
            .then((data) => setData(data))
            // Se setea el error (en caso de haber uno)
            .catch((error) => setError(error))
            // Una vez terminan las ejecuciones setea false el loading
            .finally(() => setLoading(false));
        }, []);
    
        // Regresas toda la data a tu componente
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