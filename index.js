const URL = "https://dati.comune.milano.it/dataset/d01a4abd-1e76-4b06-a9e6-e96a4f1d6a35/resource/ac9a644c-a2bf-419a-9b93-735417eb6c73/download/portale_opendata_daterangemonth_20240510.json";

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

// problema dati visualiizati causato da select querySelector, non prende value perche sono in option 
// DA SISTEMARE STO BORDELLO

const showInfo = (info) => {
    
    document.querySelector('.choice').forEach(input => {
        input.addEventListener('change', () => {
            const div = document.querySelector('.info');
            const yearValue = document.querySelector('.year').value;
            const monthValue = document.querySelector('.month').value;
            info.map(element => {
                if (element.year == year && element.month == month) {
                    div.innerHTML = `
                        <p>Visite data ${element.year}/${element.month}</p>
                        <p>Visualizzazioni: ${element.visits}</p>
                        <p>Pagine Visitate: ${element.pageViews}</p>
                        <p>Visitatori: ${element.visitors}</p>
                    `;
                };
            });
        });
    });
}

fetchData(URL)
    .then((data) => {
        const info = dataExtraction(data);
        showInfo(info);
    })
// prendere i valori Select html e mostrare info in base mese e anno