import { useState, useEffect } from "react";

export function useFecth(url) {
    //En este estado se guardara la data de la informacion
    const [data, setData] = useState(null);
    // Loading es un estado que te servira para indicar el tiempo que se ejecuta la peticion 
    // Con este puedes implementar una vista de Loading o alguna animacion
    const [loading, setLoading] = useState(true);
    // Un error se guardara en este estado
    const [error, setError] = useState(null);
    // Aqui se guarda el controller
    const [controller, setController] = useState(null);
    

    useEffect(() => {
        //abort controller cancela la ejecucion de la peticion en caso de que desmonte el componente
        //o que no se renderize
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);

        fetch(url, { signal: abortController.signal })
            .then((response) => response.json())
            // Se setea la data en el estado
            .then((data) => setData(data))
            // Se setea el error (en caso de haber uno)
            .catch((error) => {
                if(error.name === "AbortError"){
                    console.log("Request Cancelled");
                } else{
                    setError(error);
                }
            })
            // Una vez terminan las ejecuciones setea false el loading
            .finally(() => setLoading(false));
        return () => abortController.abort();
        }, []);

        //En caso de que quieras cancelar la Request manualmente usa esto
        const handleCancelRequest = () => {
            if(controller){
                controller.abort();
                setError("Request Cancelled");
            }
        }
    
        // Regresas toda la data a tu componente
        return { data, loading, error, handleCancelRequest }
}
