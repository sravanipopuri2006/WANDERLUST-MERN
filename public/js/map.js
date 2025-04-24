mapboxgl.accessToken = mapAccessToken;
const map = new mapboxgl.Map({
    container: 'map',

    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: listing.geometry.coordinates,
    zoom: 13
});
const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h3>${listing.location}</h3><p>Exact location provided after booking</p>`))

.addTo(map);

