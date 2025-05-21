mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJ2MyIsImEiOiJjbTd4d2cwN2wwM201MmtvY2tjNjBzdWZjIn0.RSGwfOSbzdhFZU_9zQnc1A';

const bizData = {
  "andys-north": {
    name: "Andy's North",
    image: "assets/images/Andys North.jpg",
    location: "123 Main St, Pasco, WA",
    description: "Local favorite serving comfort food.",
    phone: "(509) 555-1234",
    hours: "8 AM – 8 PM",
    website: "https://andysnorth.com",
    coordinates: [-119.093, 46.239]
  },
  "el-charrito": {
    name: "El Charrito Mexican Restaurant",
    image: "assets/images/el charrito.jpg",
    location: "456 Fiesta Ln, Pasco, WA",
    description: "Authentic Mexican cuisine and margaritas.",
    phone: "(509) 555-5678",
    hours: "10 AM – 9 PM",
    website: "https://elcharritopasco.com",
    coordinates: [-119.095, 46.235]
  },
  "fiesta": {
    name: "Fiesta Mexican Restaurant",
    image: "assets/images/fiesta mexican restaurant .jpg",
    location: "789 Sunset Blvd, Pasco, WA",
    description: "Great place for tacos and nightlife.",
    phone: "(509) 555-7890",
    hours: "11 AM – 11 PM",
    website: "https://fiestapasco.com",
    coordinates: [-119.097, 46.237]
  }
};

const urlParams = new URLSearchParams(window.location.search);
const bizKey = urlParams.get('business');
const data = bizData[bizKey];

if (data) {
  document.getElementById('biz-name').textContent = data.name;
  document.getElementById('biz-img').src = data.image;
  document.getElementById('biz-location').textContent = data.location;
  document.getElementById('biz-description').textContent = data.description;
  document.getElementById('biz-phone').textContent = data.phone;
  document.getElementById('biz-hours').textContent = data.hours;
  document.getElementById('biz-website').innerHTML = `<a href="${data.website}" target="_blank">${data.website}</a>`;

  const map = new mapboxgl.Map({
    container: 'biz-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: data.coordinates,
    zoom: 15
  });

  new mapboxgl.Marker()
    .setLngLat(data.coordinates)
    .setPopup(new mapboxgl.Popup().setText(data.name))
    .addTo(map);

  // Clickable redirection to Google Maps
  document.getElementById('biz-map').addEventListener('click', () => {
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${data.coordinates[1]},${data.coordinates[0]}`;
    window.open(googleUrl, '_blank');
  });
}

