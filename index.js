const URL = "https://dati.comune.milano.it/dataset/d01a4abd-1e76-4b06-a9e6-e96a4f1d6a35/resource/ac9a644c-a2bf-419a-9b93-735417eb6c73/download/portale_opendata_daterangemonth_20240510.json";

// Manda una richiesta al sito OpenData
const fetchData = async (URL) => {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Errore durante la richiesta ${response.statusText}`);
        }
        const data = await response.json();
        
        return data;
        
    } catch(error) {
        console.error(error)
    };
}

// Formattazione dati da Risposta Json
const dataExtraction = (data) => {
    const info = data.map(element => {
        return {
            year: element.anno,
            month: element.mese_num,
            visits: element.visits,
            pageViews: element.pageviews,
            visitors: element.visitors,
        }
    });
    return info;
}

fetchData(URL)
    .then((data) => {
        const info = dataExtraction(data);

        document.querySelector('.send').addEventListener('click', () => {

            const div = document.querySelector('.info');
            const yearValue = document.querySelector('.yearChoice').value;
            const monthValue = document.querySelector('.monthChoice').value;

            div.innerHTML = '';  // Clear previous results

            info.forEach(element => {

                if (element.year == yearValue && element.month == monthValue) {
                    div.innerHTML = `
                        <div class="result">
                            <p class="data"><strong>Data:</strong> ${element.month}/${element.year}</p>
                            <p class="visits"><strong>Visite:</strong> ${element.visits}</p>
                            <p class="pageViews"><strong>Pagine Visitate:</strong> ${element.pageViews}</p>
                            <p class="visitors"><strong>Visitatori:</strong> ${element.visitors}</p>
                        </div>
                    `
                }
            })
        });
    })
    .catch(error => console.error(error));
