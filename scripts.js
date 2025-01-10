document.getElementById('searchBtn').addEventListener('click', function() {
    const airport = document.getElementById('search').value;

    fetchFlights(airport);
});

function fetchFlights(airport) {
    fetch('getFlights.php?airport=' + airport)
        .then(response => response.json())
        .then(data => {
            displayFlights(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayFlights(flights) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (flights.length === 0) {
        resultsDiv.innerHTML = '<p>Nessun volo trovato per la ricerca.</p>';
        return;
    }

    flights.forEach(flight => {
        const flightDiv = document.createElement('div');
        flightDiv.classList.add('flight-item');

        flightDiv.innerHTML = `
            <h3>Volo ${flight.numero_volo}</h3>
            <p><strong>Aeroporto di partenza:</strong> ${flight.aeroporto_partenza}</p>
            <p><strong>Aeroporto di arrivo:</strong> ${flight.aeroporto_arrivo}</p>
            <p><strong>Data di partenza:</strong> ${flight.data_partenza}</p>
            <p><strong>Data di arrivo:</strong> ${flight.data_arrivo}</p>
            <p><strong>Compagnia:</strong> ${flight.compagnia}</p>
        `;

        resultsDiv.appendChild(flightDiv);
    });
}
