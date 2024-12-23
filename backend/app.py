from flask import Flask, request, jsonify
import ipaddress
import socket
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite que o frontend se comunique com o backend

@app.route('/scan_network', methods=['POST'])
def scan_network():
    data = request.get_json()
    network = data.get("network", "")

    try:
        ip_net = ipaddress.ip_network(network, strict=False)
        hosts = [str(ip) for ip in ip_net.hosts()]

        reachable_hosts = []
        for host in hosts:
            result = subprocess.run(["ping", "-c", "1", host], stdout=subprocess.PIPE)
            if result.returncode == 0:
                reachable_hosts.append(host)

        return jsonify(reachable_hosts)
    except ValueError:
        return jsonify({"error": "Invalid network format"}), 400

@app.route('/scan_ports', methods=['POST'])
def scan_ports():
    data = request.get_json()
    host = data.get("host", "")
    ports = data.get("ports", [])

    open_ports = []
    for port in ports:
        try:
            with socket.create_connection((host, port), timeout=1):
                open_ports.append(port)
        except (socket.timeout, ConnectionRefusedError):
            pass

    return jsonify(open_ports)

@app.route('/ip_calculator', methods=['POST'])
def ip_calculator():
    data = request.get_json()
    ip = data.get("ip", "")
    mask = data.get("mask", "")

    try:
        network = ipaddress.ip_network(f"{ip}/{mask}", strict=False)
        return jsonify({
            "network": str(network.network_address),
            "broadcast": str(network.broadcast_address),
            "hosts": [str(host) for host in network.hosts()]
        })
    except ValueError:
        return jsonify({"error": "Invalid IP or mask"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
