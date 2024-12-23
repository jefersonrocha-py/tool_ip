// Configuração do particles.js
particlesJS.load('particles-js', 'particles-config.json', function () {
    console.log('Particles.js carregado com sucesso.');
});

// Scanner de Rede
document.getElementById('network-scan-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const network = document.getElementById('network').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/scan_network', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ network }),
        });

        const results = await response.json();
        const resultsContainer = document.getElementById('network-results');
        if (results.error) {
            resultsContainer.innerHTML = `Erro: ${results.error}`;
        } else {
            resultsContainer.innerHTML = `Hosts alcançáveis: ${results.join(', ')}`;
        }
    } catch (error) {
        console.error('Erro ao escanear a rede:', error);
    }
});

// Scanner de Portas
document.getElementById('port-scan-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const host = document.getElementById('host').value;
    const ports = document.getElementById('ports').value.split(',').map(Number);

    try {
        const response = await fetch('http://127.0.0.1:5000/scan_ports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ host, ports }),
        });

        const results = await response.json();
        const resultsContainer = document.getElementById('port-results');
        resultsContainer.innerHTML = `Portas abertas: ${results.join(', ')}`;
    } catch (error) {
        console.error('Erro ao escanear portas:', error);
    }
});

// Calculadora de IP
document.getElementById('ip-calc-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ip = document.getElementById('ip').value;
    const mask = document.getElementById('mask').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/ip_calculator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip, mask }),
        });

        const results = await response.json();
        const resultsContainer = document.getElementById('ip-results');
        if (results.error) {
            resultsContainer.innerHTML = `Erro: ${results.error}`;
        } else {
            resultsContainer.innerHTML = `
                <strong>Rede:</strong> ${results.network}<br>
                <strong>Broadcast:</strong> ${results.broadcast}<br>
                <strong>Hosts:</strong> ${results.hosts.join(', ')}
            `;
        }
    } catch (error) {
        console.error('Erro ao calcular IP:', error);
    }
});
