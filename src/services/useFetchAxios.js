import { useState, useEffect } from "react";
import axios from "axios";

// Diferencias 
// Importar Axios y usar su método get en lugar de fetch.
// Configurar el objeto de opciones para incluir cancelToken en lugar de signal.
// Cambiar el manejo de errores para usar el método isCancel de Axios.
// Actualizar el estado en consecuencia y devolver los mismos valores que en el código original.

export function useFecthAxios(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setSource(source);
        setLoading(true);

        axios.get(url, { cancelToken: source.token })
            .then((response) => setData(response.data))
            .catch((thrown) => {
                if (axios.isCancel(thrown)) {
                    console.log("Request Cancelled");
                } else {
                    setError(thrown);
                }
            })
            .finally(() => setLoading(false));
        
        return () => source.cancel();
    }, [url]);

    const handleCancelRequest = () => {
        if (source) {
            source.cancel("Request Cancelled");
            setError("Request Cancelled");
        }
    }

    return { data, loading, error, handleCancelRequest };
}



// Metodo POST
import { useState, useEffect } from "react";
import axios from "axios";

export function useFecth(url, data = {}) {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setSource(source);
        setLoading(true);

        axios.post(url, data, { cancelToken: source.token })
            .then((response) => setResponseData(response.data))
            .catch((thrown) => {
                if (axios.isCancel(thrown)) {
                    console.log("Request Cancelled");
                } else {
                    setError(thrown);
                }
            })
            .finally(() => setLoading(false));

        return () => source.cancel();
    }, [url, data]);

    const handleCancelRequest = () => {
        if (source) {
            source.cancel("Request Cancelled");
            setError("Request Cancelled");
        }
    }

    return { responseData, loading, error, handleCancelRequest };
}

