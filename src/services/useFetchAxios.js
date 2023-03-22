import { useState, useEffect } from "react";
import axios from "axios";

// Diferencias 
// Importar Axios y usar su método get en lugar de fetch.
// Configurar el objeto de opciones para incluir cancelToken en lugar de signal.
// Cambiar el manejo de errores para usar el método isCancel de Axios.
// Actualizar el estado en consecuencia y devolver los mismos valores que en el código original.

export function useFecthGet(url) {
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

export function useFecthPost(url, data = {}) {
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


// GET using Axios and async/await
// En este ejemplo, estamos utilizando el hook useEffect para realizar la petición en el momento en que se monta el componente y obtener los datos del servidor. La función fetchData es una función asíncrona que utiliza el método get de Axios para obtener los datos del servidor.
// Luego, utilizamos el bloque try/catch para manejar los posibles errores que puedan ocurrir durante la petición. Si hay algún error, lo almacenamos en el estado error.
// Finalmente, utilizamos el bloque finally para cambiar el estado de loading a false, independientemente de si la petición fue exitosa o no.
// Espero que esto te sea de ayuda. Si tienes alguna pregunta adicional, no dudes en preguntar.


export function useFetchAxios(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}


// POST using Axios and async/await

export function usePostAxios(url, requestData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, requestData);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, requestData]);

  return { data, loading, error };
}
