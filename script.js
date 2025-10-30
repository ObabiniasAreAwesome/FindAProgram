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
                <p><strong>Application Deadline:</strong> ${p.application_deadline}</p>
                <button class="calendar-btn" data-program="${p.program_name}">Add to Google Calendar</button>
            `;
            resultsDiv.appendChild(programEl);
            
            
        });
        const buttons = document.querySelectorAll('.calendar-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const programName = e.target.getAttribute('data-program');
                selectProgram(programName);
            });
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
async function getStart(program) {
  const debugButton = document.getElementById("debugButton");
  const rawDate = program.start_date;

  if (!rawDate) {
    alert("No start date found for this program.");
    return null;
  }

  debugButton.innerHTML = "Running getStart()...";

  const parsedDate = new Date(rawDate); 

  if (isNaN(parsedDate)) {
    alert("Invalid start date format.");
    return null;
  }

  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");
  const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
  const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(parsedDate.getUTCSeconds()).padStart(2, "0");
  const formattedDate = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

  debugButton.innerHTML = "Success!";
  return formattedDate;
}


async function selectProgram(programName) {
  const debugButton = document.getElementById("debugButton");

  try {
    const response = await fetch('programs.json');
    const programs = await response.json();

    const program = programs.find(
      p => p.program_name.toLowerCase() === programName.toLowerCase()
    );

    if (!program) {
      alert("Program not found.");
      return;
    }

    // Get the formatted start date (UTC string like 20250609T170000Z)
    const start = await getStart(program);

    if (!start) {
      alert("No valid start date for this program.");
      return;
    }

    // Default: 1-hour event after start time
    const startDate = new Date(program.start_date);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const end = `${endDate.getUTCFullYear()}${String(endDate.getUTCMonth() + 1).padStart(2, '0')}${String(endDate.getUTCDate()).padStart(2, '0')}T${String(endDate.getUTCHours()).padStart(2, '0')}${String(endDate.getUTCMinutes()).padStart(2, '0')}00Z`;

    // Build Google Calendar URL
    const title = encodeURIComponent(program.program_name);
    const details = encodeURIComponent(program.summary || "");
    const location = encodeURIComponent(program.location || "");

    const calendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;

    console.log("Redirecting to:", calendarURL);
    debugButton.innerHTML = "Redirecting to Google Calendar...";

    window.open(calendarURL, "_blank");

  } catch (error) {
    console.error("Error selecting program:", error);
    debugButton.innerHTML = "Error fetching program data." + error;
  }er
}
