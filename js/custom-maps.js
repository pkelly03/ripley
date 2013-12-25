$('#googlemaps').gMap({
    controls: {
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
    },
    maptype: 'ROADMAP',
    scrollwheel: false,
    zoom: 13,
    markers: [
        {
            address: '34 Main Street, Blackrock, Co. Dublin, Ireland',
            html: '',
            popup: false
        }

    ]
});
