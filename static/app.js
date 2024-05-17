// handles search functionality for the search bar
document.addEventListener('DOMContentLoaded', () => {

    const searchBar = document.getElementById('search-bar');
    const suggestions = document.getElementById('suggestions');
    const results = document.getElementById('results');

    // fetch data from the provided JSON file
    fetch('https://chimeclinic.com/front-end-task/front-end-task.json')
        .then(response => response.json())
        .then(data => {

            // link available data to the search bar
            searchBar.addEventListener('input', () => {

                const query = searchBar.ariaValueMax.toLowerCase();
                suggestions.innerHTML = '';

                // once user query is detected, continuously refine search
                if (query) {

                    const filteredItems = data.items.filter(item => item.name.toLowerCase().includes(query));
                    
                    // display each suggestion
                    filteredItems.forEach(item => {

                        const div = document.createElement('div');
                        div.textContent = item.name;

                        div.addEventListener('click', () => {
                            results.innerHTML = '<h2>${item.name}</h2><p>${item.description}</p>';
                            suggestions.innerHTML = '';
                            searchBar.value = '';
                        });

                        suggestions.appendChild(div);
                    });
                }
            });
        })
        // included default message for fetching data from the provided JSON
        .catch(error => console.error('Error fetching data:', error));
});