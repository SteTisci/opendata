const URL = "https://dati.comune.milano.it/dataset/d01a4abd-1e76-4b06-a9e6-e96a4f1d6a35/resource/ac9a644c-a2bf-419a-9b93-735417eb6c73/download/portale_opendata_daterangemonth_20240510.json";

const fetchData = async (URL) => {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Errore durante la richiesta ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        
    } catch(error) {
        console.error(error)
    };
}

fetchData(URL);