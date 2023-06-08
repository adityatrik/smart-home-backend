const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

// Konfigurasi MQTT broker
const brokerUrl = 'mqtt://103.123.62.36';  // Ganti dengan URL broker yang sesuai
const topic = '/mcv/sh/device/1';  // Ganti dengan topik yang ingin Anda subscribe

// Membuat koneksi MQTT
const client = mqtt.connect(brokerUrl);
var dataMonitoring;

// Event listener saat koneksi berhasil dibuat
client.on('connect', () => {
  console.log('Terhubung ke MQTT broker');
  
  // Melakukan subscribe pada topik yang ditentukan
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Gagal melakukan subscribe:', err);
    } else {
      console.log('Berhasil melakukan subscribe pada topik:', topic);
    }
  });
});

// Event listener saat menerima pesan
client.on('message', (topic, message) => {
  console.log('Menerima pesan:', message.toString());
  dataMonitoring = message.toString();
  // Lakukan tindakan lain sesuai kebutuhan dengan pesan yang diterima
});

// Event listener saat koneksi terputus
client.on('close', () => {
  console.log('Koneksi ke MQTT broker terputus');
});

// Event listener saat terjadi error
client.on('error', (err) => {
  console.error('Error:', err);
});

// Inisialisasi aplikasi Express.js
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post("/api/monitoring", (req, res) => {
  var dataApp = req.body.data;
  var topic = '/mcv/sh/server/1'
  console.log(dataApp);
  // Publish pesan ke topik MQTT
  client.publish(topic, dataApp, (err) => {
    if (err) {
      console.error('Gagal mempublish pesan:', err);
      res.send('Gagal mempublish pesan');
    } else {
      console.log('Berhasil mempublish pesan:', dataApp);
      res.send(dataMonitoring);
    }
  });
});

// Jalankan server Express.js
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});