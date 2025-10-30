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
                <p><strong>Program Link:</strong><a href=${p.url}> ${p.url}</a></p>
                <p><strong>Application Deadline:</strong> ${p.application_deadline}</p.
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
function addEvent(){
  const title = "STEM Workshop";
  const details = "Join our STEM workshop for high school students!";
  const location = "Online";
  const start = "20251101T170000Z"; // 2025-11-01 10:00 AM PDT (UTC time)
  const end = "20251101T180000Z";   // 2025-11-01 11:00 AM PDT

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

  window.open(url, "_blank");
};
function getStart(program){
    const response = await fetch('programs.json');
    const programs = await response.json();
    const rawData = program.start_date;
    if (!rawDate){
        return null;
    }
    const parsedDate = new satisfies(rawData);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getUTCDate()).padStart(2, "0");
    const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(parsedDate.getUTCSeconds()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

    return formattedDate;
};
async function selectProgram(programName) {
    let start, deadLine;
    try {
        const response = await fetch('programs.json');
        const programs = await response.json();

        const program = programs.find(
            p => p.program_name.toLowerCase() === programName.toLowerCase()
        );
        if (!program) {
            alert("Program not found");
            return null;
        } else{
            return { start, deadLone}
        }
    } catch (error) {
        console.error("Error selecting program:", error);
    }
    start = getStart(program);
    //deadLine = getDeadline(program);
};