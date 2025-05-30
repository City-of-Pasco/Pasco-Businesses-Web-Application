mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJ2MyIsImEiOiJjbTd4d2cwN2wwM201MmtvY2tjNjBzdWZjIn0.RSGwfOSbzdhFZU_9zQnc1A';

const baseUrl = "https://services5.arcgis.com/Mrjxd32WJFxUIHrM/arcgis/rest/services/survey123_b5fd0097dc654afba11078360758e9e8_results/FeatureServer/0";

// Get slug from URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('business');

// Get attachment image
async function getAttachmentUrl(objectId) {
  const res = await fetch(`${baseUrl}/${objectId}/attachments?f=json`);
  const data = await res.json();
  if (data.attachmentInfos && data.attachmentInfos.length > 0) {
    return `${baseUrl}/${objectId}/attachments/${data.attachmentInfos[0].id}`;
  }
  return "assets/images/default-placeholder.jpg";
}

// Convert business name to slug
function createSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

// Fetch and display business
fetch(`${baseUrl}/query?f=geojson&where=verification%3D%27Verified%27&outFields=*`)
  .then(res => res.json())
  .then(async data => {
    const feature = data.features.find(f => createSlug(f.properties.business_name) === slug);

    if (!feature) {
      document.querySelector('main').innerHTML = "<p>Business not found.</p>";
      return;
    }

    const props = feature.properties;
    const coords = feature.geometry.coordinates;
    const objectId = props.objectid;

    const imgUrl = await getAttachmentUrl(objectId);

    // Populate HTML fields
    document.getElementById('biz-name').textContent = props.business_name || "Unnamed Business";
    document.getElementById('biz-img').src = imgUrl;
    const fullAddress = `${props.business_location || ''}, ${props.city || ''}`;
    document.getElementById('biz-location').innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}" target="_blank" rel="noopener noreferrer">${fullAddress}</a>`;
    document.getElementById('biz-description').textContent = props.business_overview || "No description provided.";
    document.getElementById('biz-phone').textContent = props.business_phone_number || "No phone number.";
    document.getElementById('biz-hours').textContent = props.business_operation_hours || "No hours listed.";
    document.getElementById('biz-website').innerHTML = props.business_website
      ? `<a href="${props.website}" target="_blank">${props.business_website}</a>`
      : "No website listed.";

    // Initialize Map
    const map = new mapboxgl.Map({
      container: 'biz-map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coords,
      zoom: 14
    });

    new mapboxgl.Marker().setLngLat(coords).addTo(map);
    document.getElementById('biz-map').addEventListener('click', () => {
      const [lng, lat] = coords;
      const googleUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(googleUrl, '_blank');
    });

  })
  .catch(err => {
    console.error("Error loading business profile:", err);
    document.querySelector('main').innerHTML = "<p>Failed to load business data.</p>";
  });