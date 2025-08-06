const map = L.map("map").setView([4.627858333, -74.06611111], 17);

// Capa base
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap"
}).addTo(map);

// Icono personalizado para las imágenes (mantener como antes)
const fotoIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // O el ícono que usabas
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28]
});

// Cargar archivo GPX y cambiar solo los íconos de inicio y fin
new L.GPX("ruta.gpx", {
  async: true,
  marker_options: {
    startIconUrl: "pin.png",
    endIconUrl: "pin.png",
    shadowUrl: null
  }
}).on("loaded", function (e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Coordenadas de las imágenes
const coordenadas = [
  { nombre: "img_1.jpg", lat: 4.627858333, lon: -74.06611111 },
  { nombre: "img_2.jpg", lat: 4.627502778, lon: -74.06567778 },
  { nombre: "img_3.jpg", lat: 4.62665, lon: -74.06578056 },
  { nombre: "img_4.jpg", lat: 4.6266, lon: -74.06643611 },
  { nombre: "img_5.jpg", lat: 4.626988889, lon: -74.06658056 },
  { nombre: "img_6.jpg", lat: 4.627344444, lon: -74.06717222 },
  { nombre: "img_7.jpg", lat: 4.628311111, lon: -74.06699167 },
  { nombre: "img_8.jpg", lat: 4.628930556, lon: -74.06673056 },
  { nombre: "img_9.jpg", lat: 4.6288, lon: -74.06593056 },
  { nombre: "img_10.jpg", lat: 4.628591667, lon: -74.06591111 }
];

// Añadir marcadores con las imágenes (sin cambiar ícono)
coordenadas.forEach(coord => {
  L.marker([coord.lat, coord.lon], { icon: fotoIcon })
    .addTo(map)
    .bindPopup(`<img src="${coord.nombre}" alt="${coord.nombre}" style="width:100px;">`);
});