import { useFecth } from "./services/useFetch";

function Fecth() {
    const  { data, loading, error }  = useFecth('https://jsonplaceholder.typicode.com/users');    
    console.log(data);
    
    return (
        <div>
            <div className="card">
                {error && <h2>Error: {error}</h2>}
                {loading && <h2>Loaing...</h2>}
                <ul>
                    {data?.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>

        </div>

    )
}


export default Fecth;