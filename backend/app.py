from flask import Flask, request, jsonify
import ipaddress

app = Flask(__name__)

@app.route('/scan-network', methods=['POST'])
def scan_network():
    data = request.json
    network = data.get('network')
    # Adicione aqui sua lógica de escaneamento real
    return jsonify({"message": f"Scanning network {network}", "devices_found": []})

@app.route('/scan-ports', methods=['POST'])
def scan_ports():
    data = request.json
    host = data.get('host')
    ports = data.get('ports').split(',')
    scanned_ports = {port: "open" for port in ports}  # Simulação
    return jsonify({"host": host, "ports": scanned_ports})

@app.route('/calculate-ip', methods=['POST'])
def calculate_ip():
    data = request.json
    ip = data.get('ip')
    mask = data.get('mask')
    try:
        network = ipaddress.ip_network(f"{ip}/{mask}", strict=False)
        return jsonify({
            "network": str(network.network_address),
            "broadcast": str(network.broadcast_address),
            "hosts": network.num_addresses - 2  # Remove network e broadcast
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
