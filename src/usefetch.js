import {useState, useEffect} from 'react';

const useFetch = (url) => {
const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

     
      useEffect(() => {
        const abort = new AbortController()
        
       fetch(url, {signal : abort.signal })
       .then(res => {
         if (!res.ok) {
           throw Error('could not fetch the data for that resource');
           
         }
         return res.json();
       })
       .then(data => {
          console.log(Object.keys(data).length);
         setData(data);
         setIsPending(false);
         setError(null);
       })
       .catch(err => {
         if (err.name === 'AbortError'){

         }else{
         setIsPending(false);
         setError(err.message);
         }
        })
       return () => abort.abort();
      }, [url]); 

      return {data, isPending, error}
}



export default useFetch;