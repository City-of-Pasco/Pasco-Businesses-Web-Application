document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const businessId = params.get("business");

  const businessData = {
    "andys-north": {
      name: "Andy's North",
      image: "assets/images/Andys North.jpg",
      location: "Downtown Pasco",
      description: "Home-style food with local charm. Try our prime rib and loaded hashbrowns!",
      phone: "(509) 545-0152",
      hours: "Sun - Thurs 7AM - 8PM | Fri - Sat 6AM - 8PM",
      website: "https://andysnorthpasco.com/",
      lat: 46.239,
      lon: -119.101
    },
    "el-charrito": {
      name: "El Charrito Mexican Restaurant",
      image: "assets/images/el charrito.jpg",
      location: "Downtown Pasco",
      description: "Authentic Mexican food in a cozy setting. Known for their tamales and enchiladas.",
      phone: "(509) 545-5080",
      hours: "Mon - Sun 8AM - 9PM",
      website: "#",
      lat: 46.238,
      lon: -119.102
    },
    "fiesta": {
      name: "Fiesta Mexican Restaurant",
      image: "assets/images/fiesta mexican restaurant .jpg",
      location: "Downtown Pasco",
      description: "Lively spot for classic Mexican dishes and margaritas.",
      phone: "(509) 544-9696",
      hours: "Mon - Sun 10AM - 9PM",
      website: "#",
      lat: 46.240,
      lon: -119.103
    },
    "placeholder1": {
      name: "Placeholder Business 1",
      image: "assets/images/image 17.jpg",
      location: "Downtown Pasco",
      description: "Coming soon — exciting things ahead for Placeholder Business 1!",
      phone: "(509) 000-0001",
      hours: "Mon - Fri 9AM - 5PM",
      website: "#",
      lat: 46.241,
      lon: -119.104
    },
    "placeholder2": {
      name: "Placeholder Business 2",
      image: "assets/images/image 18.jpg",
      location: "Downtown Pasco",
      description: "More details coming soon for this business.",
      phone: "(509) 000-0002",
      hours: "Mon - Fri 9AM - 5PM",
      website: "#",
      lat: 46.237,
      lon: -119.105
    },
    "placeholder3": {
      name: "Placeholder Business 3",
      image: "assets/images/image 19.jpg",
      location: "Downtown Pasco",
      description: "Stay tuned — this business is under development.",
      phone: "(509) 000-0003",
      hours: "Mon - Fri 9AM - 5PM",
      website: "#",
      lat: 46.236,
      lon: -119.106
    }
  };

  const data = businessData[businessId];

  if (!data) {
    document.querySelector("main").innerHTML = "<p>Business not found.</p>";
    return;
  }

  // Fill in business details
  document.getElementById("biz-name").textContent = data.name;
  document.getElementById("biz-img").src = data.image;
  document.getElementById("biz-location").textContent = data.location;
  document.getElementById("biz-description").textContent = data.description;
  document.getElementById("biz-phone").textContent = data.phone;
  document.getElementById("biz-hours").textContent = data.hours;
  document.getElementById("biz-website").innerHTML = `<a href="${data.website}" target="_blank">${data.website}</a>`;

  // Load Armaan's map style
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJ2MyIsImEiOiJjbTd4d2cwN2wwM201MmtvY2tjNjBzdWZjIn0.RSGwfOSbzdhFZU_9zQnc1A';

  const map = new mapboxgl.Map({
    container: 'biz-map',
    style: 'mapbox://styles/azeem24/cmamtp71d016o01rfgf9z4yfk',
    center: [data.lon, data.lat],
    zoom: 14.2,
    interactive: false
  });

  map.on('load', () => {
    // Downtown polygon
    map.addSource('downtownPasco', {
      type: 'geojson',
      data: 'assets/downtownPasco.geojson'
    });

    map.addLayer({
      id: 'downtownPasco-fill',
      type: 'fill',
      source: 'downtownPasco',
      paint: {
        'fill-color': '#d9d9d9',
        'fill-opacity': 0.4
      }
    });

    new mapboxgl.Marker().setLngLat([data.lon, data.lat]).addTo(map);
  });
});

