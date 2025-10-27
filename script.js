// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    let programs = [];

    // Load the JSON data
    fetch('programs.json')
        .then(response => response.json())
        .then(data => {
            programs = data;
            displayResults(programs); // Display all programs initially
        });

    function displayResults(filteredPrograms) {
        resultsDiv.innerHTML = ''; // Clear previous results
        filteredPrograms.forEach(p => {
            const tags = Array.isArray(p.tags) ? p.tags.join(', ') : 'N/A';
            const programEl = document.createElement('div');
            programEl.className = 'program';
            programEl.innerHTML = `
                <h2>${p.program_name}</h2>
                <p><strong>Category:</strong> ${p.category} (${p.sub_category})</p>
                <p>${p.summary}</p>
                <p><strong>Eligibility:</strong> ${p.eligibility_criteria}</p>
                <p><strong>Cost:</strong> ${p.cost}</p>
                <p><strong>Tags:</strong> ${tags}</p>
            `;
            resultsDiv.appendChild(programEl);
        });
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = programs.filter(p => {
            const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : '';
            return p.program_name.toLowerCase().includes(query) ||
                   p.category.toLowerCase().includes(query) ||
                   p.sub_category.toLowerCase().includes(query) ||
                   tags.includes(query);
        });
        displayResults(filtered);
    });
});