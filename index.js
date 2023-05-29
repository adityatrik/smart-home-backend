const mqtt = require('mqtt');

// Konfigurasi MQTT broker
const brokerUrl = 'mqtt://103.146.203.230';  // Ganti dengan URL broker yang sesuai
const topic = '/mcv/sh/device/1';  // Ganti dengan topik yang ingin Anda subscribe

// Membuat koneksi MQTT
const client = mqtt.connect(brokerUrl);

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