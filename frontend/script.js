// Cookie Consent
document.getElementById("accept-cookies").addEventListener("click", () => {
    document.getElementById("cookie-consent").style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
});

if (localStorage.getItem("cookiesAccepted") === "true") {
    document.getElementById("cookie-consent").style.display = "none";
}

// Network Scanner
document.getElementById("network-scan-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const network = document.getElementById("network").value;
    const response = await fetch('/scan-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ network })
    });
    const results = await response.json();
    document.getElementById("network-results").innerText = JSON.stringify(results, null, 2);
});

// Port Scanner
document.getElementById("port-scan-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const host = document.getElementById("host").value;
    const ports = document.getElementById("ports").value;
    const response = await fetch('/scan-ports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, ports })
    });
    const results = await response.json();
    document.getElementById("port-results").innerText = JSON.stringify(results, null, 2);
});

// IP Calculator
document.getElementById("ip-calc-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const ip = document.getElementById("ip").value;
    const mask = document.getElementById("mask").value;
    const response = await fetch('/calculate-ip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, mask })
    });
    const results = await response.json();
    document.getElementById("ip-results").innerText = JSON.stringify(results, null, 2);
});
