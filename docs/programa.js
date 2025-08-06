// Inicializar el mapa en Bogotá (Plaza de Bolívar)
const map = L.map('map').setView([4.60971, -74.08175], 15);

// Capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

// Marcador de referencia en la Plaza de Bolívar
L.marker([4.60971, -74.08175])
  .addTo(map)
  .bindPopup("<b>Plaza de Bolívar</b><br>Punto de referencia.")
  .openPopup();

// Cargar el archivo GPX y dibujar la ruta
fetch('ruta.gpx')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar el archivo GPX: ' + response.status);
    return response.text();
  })
  .then(gpxContent => {
    const gpxLayer = new L.GPX(gpxContent, {
      async: true,
      color: '#E91E63', // Rosa brillante
      weight: 6,
      opacity: 0.9,
      markerOptions: {
        startIcon: 'fa-play',
        endIcon: 'fa-stop',
        shadow: false
      }
    }).addTo(map);

    gpxLayer.on('loaded', function (e) {
      const gpx = e.target;

      console.log('Ruta cargada:', {
        Nombre: gpx.get_name() || 'Sin nombre',
        Distancia: (gpx.get_distance() / 1000).toFixed(2) + ' km',
        Duración: gpx.get_duration_string(),
      });

      map.fitBounds(gpx.getBounds(), { padding: [50, 50] });
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo GPX:', error);
    alert('No se pudo cargar la ruta GPX. Verifica que el archivo "ruta.gpx" esté en la misma carpeta.');
  });

// Puntos de interés con imágenes
const puntosDeInteres = [
  { lat: 4.6101, lon: -74.0818, img: 'img_1.jpg', titulo: 'Punto 1' },
  { lat: 4.6105, lon: -74.0820, img: 'img_2.jpg', titulo: 'Punto 2' },
  { lat: 4.6110, lon: -74.0825, img: 'img_3.jpg', titulo: 'Punto 3' },
  { lat: 4.6115, lon: -74.0830, img: 'img_4.jpg', titulo: 'Punto 4' },
  { lat: 4.6120, lon: -74.0835, img: 'img_5.jpg', titulo: 'Punto 5' },
  { lat: 4.6125, lon: -74.0840, img: 'img_6.jpg', titulo: 'Punto 6' },
  { lat: 4.6130, lon: -74.0845, img: 'img_7.jpg', titulo: 'Punto 7' },
  { lat: 4.6135, lon: -74.0850, img: 'img_8.jpg', titulo: 'Punto 8' },
  { lat: 4.6140, lon: -74.0855, img: 'img_9.jpg', titulo: 'Punto 9' },
  { lat: 4.6145, lon: -74.0860, img: 'img_10.jpg', titulo: 'Punto 10' },
];

// Añadir marcadores con popups de imágenes
puntosDeInteres.forEach(poi => {
  L.marker([poi.lat, poi.lon])
    .addTo(map)
    .bindPopup(`
      <b>${poi.titulo}</b><br>
      <img src="imagenes/${poi.img}" alt="${poi.titulo}" style="width:200px;max-width:90vw;border-radius:6px;" />
    `);
});
