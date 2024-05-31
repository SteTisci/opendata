const URL = "https://dati.comune.milano.it/dataset/d01a4abd-1e76-4b06-a9e6-e96a4f1d6a35/resource/ac9a644c-a2bf-419a-9b93-735417eb6c73/download/portale_opendata_daterangemonth_20240510.json";


// Manda una richiesta al sito OpenData
const fetchData = async (URL) => {
    try {
        const response = await fetch(URL);

        // Controllo stato risposta
        if (!response.ok) {
            throw new Error(`Errore durante la richiesta ${response.statusText}`);
        }
        const data = await response.json();
        
        return data;
        
    } catch(error) {
        console.error(error);
        throw error;
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

        // Event listener per la visualizzazione dei risultati quandi il button send viene cliccato
        document.querySelector('.send').addEventListener('click', () => {

            const div = document.querySelector('.info');
            const yearValue = document.querySelector('.yearChoice').value;
            const monthValue = document.querySelector('.monthChoice').value;

            div.innerHTML = '';  // Rimuove risultati precedenti

            // Cerco l'elemento con la data corrispondente all'input dell'utente
            const filteredData = info.find(element => element.year == yearValue && element.month == monthValue);
                
            // Se l'elemento esiste viene inserito nella pagina html
            if (filteredData) {
                // Struttura elementi che verranno inseriti
                div.innerHTML = `
                    <div class="result">
                        <p class="data"><strong>Data:</strong> ${filteredData.month}/${filteredData.year}</p>
                        <p class="visits"><strong>Visite:</strong> ${filteredData.visits}</p>
                        <p class="pageViews"><strong>Pagine Visitate:</strong> ${filteredData.pageViews}</p>
                        <p class="visitors"><strong>Visitatori:</strong> ${filteredData.visitors}</p>
                    </div>
                `
            } else {
                div.innerHTML = `
                    <div class='result'>
                        <p class='noData'>Nessun dato presente per la Data ${monthValue}/${yearValue}</p>
                    </div>    
                `   
            }
        });
        return info;
    })
    .then((info) => {
        const reversedInfo = info.reverse();

        const xValues = reversedInfo.map(({ month, year }) => `${month}/${year}`);
        const visitors = reversedInfo.map(({ visitors }) => visitors);
        const visits = reversedInfo.map(({visits}) => visits);
        const pageviews = reversedInfo.map(({pageViews}) => pageViews);

        new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: "Visitatori",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderColor: "rgba(0, 0, 255, 1)",
                    data: visitors,
                    fill: false,
                    tension: 0.1 // rende la linea leggermente curva
                }, 
                {
                    label: "Visite",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderColor: "rgba(0, 255, 0, 1)",
                    data: visits,
                    fill: false,
                    tension: 0.1 // rende la linea leggermente curva
                },
                {
                    label: "Pagine visitate",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderColor: "rgba(255, 0, 0, 1)",
                    data: pageviews,
                    fill: false,
                    tension: 0.1 // rende la linea leggermente curva
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Visitors Over Time'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
            }
        });
    })
    .catch(error => console.error(error));
