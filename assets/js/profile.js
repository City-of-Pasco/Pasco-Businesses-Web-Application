mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJ2MyIsImEiOiJjbTd4d2cwN2wwM201MmtvY2tjNjBzdWZjIn0.RSGwfOSbzdhFZU_9zQnc1A';

const bizData = {
  "andys-north": {
    name: "Andy's North",
    image: "assets/images/Andys North.jpg",
    location: "3321 W Court St, Pasco, WA 99301",
    description: "Local favorite serving comfort food.",
    phone: "(509) 545-0152",
    hours: "7 AM – 8 PM",
    website: "https://www.andysnorthpasco.com",
    coordinates: [-119.11586, 46.23885]
  },
  "el-charrito": {
    name: "El Charrito Mexican Restaurant",
    image: "assets/images/el charrito.jpg",
    location: "130 N 10th Ave, Pasco, WA 99301-5428",
    description: "Authentic Mexican cuisine and margaritas.",
    phone: "(509) 544-9141",
    hours: "9 AM – 7 PM",
    website: "https://www.restaurantji.com/wa/pasco/el-charrito-/",
    coordinates: [-119.10052, 46.23934]
  },
  "fiesta": {
    name: "Fiesta Mexican Restaurant",
    image: "assets/images/fiesta mexican restaurant .jpg",
    location: "5210 N. RD 68 Suite L, Pasco, WA 99301",
    description: "Great place for tacos and nightlife.",
    phone: "(509) 543-6884",
    hours: "11 AM – 9 PM",
    website: "https://www.fiestarestaurant.com",
    coordinates: [-119.14266, 46.26494]
  }
};

const urlParams = new URLSearchParams(window.location.search);
const bizKey = urlParams.get('business');
const data = bizData[bizKey];

if (data) {
  document.getElementById('biz-name').textContent = data.name;
  document.getElementById('biz-img').src = data.image;
  document.getElementById('biz-location').innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}" target="_blank">${data.location}</a>`;
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

  // Clickable redirection to Google Maps using business address
  document.getElementById('biz-map').addEventListener('click', () => {
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`;
    window.open(googleUrl, '_blank');
  });
}

