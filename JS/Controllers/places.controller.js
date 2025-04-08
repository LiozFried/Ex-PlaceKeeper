'use strcit'

let gMap = null
let gMarkers = []
let gCoords

function onPlacesInit() {
    renderPlaces()
    initMap()
}

function renderPlaces() {
    const places = getPlaces()
    const strHtml = places.map(place => `
        <li>
        ${place.name}
        <button onclick="onRemovePlace('${place.id}')">x</button>
        <button onclick="onPanToPlace('${place.id}')">Go</button>
        </li>`
    )

    document.querySelector('.places-list').innerHTML = strHtml.join('')
}

function initMap() {
    const elMap = document.querySelector('.map-container')
    const defaultLocation = { lat: 29.557669, lng: 34.951923 }

    gMap = new google.maps.Map(elMap, {
        zoom: 8,
        center: defaultLocation,
    })

    gMap.addListener('click', (ev) => {
        openModal()
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        gCoords = { lat, lng }
    })

    const homeButton = document.createElement('button')
    homeButton.innerText = '→🏠←'
    gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(homeButton)
    homeButton.addEventListener('click', onPanToUserLoc)

    renderMarkers()
}

function onAddPlace(ev) {
    ev.preventDefault()
    closeModal()

    const { placeName } = ev.target
    const { lat, lng } = gCoords

    addPlace(placeName.value, lat, lng, gMap.getZoom())
    renderPlaces()
    renderMarkers()
}

function onPanToUserLoc() {
    navigator.geolocation.getCurrentPosition(setCenterToUserLoc, handleLocationError)
}

function setCenterToUserLoc({ coords }) {
    const { latitude: lat, longitude: lng } = coords
    gMap.setCenter({ lat, lng })
}

function handleLocationError() {
    alert('Problem getting your location ')
}

function onPanToPlace(placeId) {
    const place = getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function onRemovePlace(placeId) {
    if (!confirm('Are you sure?')) return
    removePlace(placeId)
    renderPlaces()
    renderMarkers()
}

function renderMarkers() {
    const places = getPlaces()
    gMarkers.forEach((marker) => marker.setMap(null))
    gMarkers = places.map((place) => {
        return new google.maps.Marker({
            position: place,
            map: gMap,
            title: place.name,
        })
    })
}

function openModal() {
    document.querySelector('.modal').style.display = 'block'
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none'
}