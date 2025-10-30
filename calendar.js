function emailSend(event) {
    event.preventDefault(); 
    const userEmail = document.getElementById('emailAddress').value.trim();
    const debug = document.getElementById('debug');
    const iframe = document.getElementById('calendarFrame');
    const encodedEmail = userEmail.replace("@", "%40");
    const link = "https://calendar.google.com/calendar/embed?src=" + encodedEmail + "&ctz=America%2FLos_Angeles";
    iframe.src = link;
}