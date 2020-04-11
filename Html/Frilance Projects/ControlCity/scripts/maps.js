$(document).ready(function () {
    var myMap = null;
    var clickCoordinats = [];
    function createMap(x, y, map_zoom, selector, draggable) {
        draggable = typeof draggable !== 'undefined' ? draggable : true;
        if (typeof map_zoom === 'undefined') map_zoom = 11;
        if (x == null || y==null || x=="" || y=="")
        {
            center_x = 49.421009;
            center_y = 26.994894;
        }
        else {
            center_x = parseFloat(x.replace(",","."));
            center_y = parseFloat(y.replace(",", "."));
        }
        var mapDiv = document.getElementById(selector);
        mapDiv.innerHTML = '';

        myMap = new ymaps.Map(mapDiv, {
            center: [center_x, center_y],
            zoom: map_zoom,
            behaviors: ['default', 'scrollZoom']
        }, {
            maxZoom: 17,
            minZoom: 11,
        });

        myMap.controls.add(new ymaps.control.ZoomControl({ 
            customTips: [{ index: 12, value: 'Район' }, { index: 15, value: 'Вулиця' }, { index: 17, value: 'Будинок' }]
        }), { left: 25, top: 25 });
        myMap.behaviors.disable('scrollZoom');
        myMap.behaviors.disable("rightMouseButtonMagnifier"); 
        myMap.behaviors.disable("leftMouseButtonMagnifier"); 

        if (center_x > 0 && center_y > 0) {
            var myPlacemark = new ymaps.GeoObject({ geometry: { type: "Point", coordinates: [center_x, center_y] }, properties: {} }, {draggable: draggable});
            userGeoObject = new ymaps.Clusterer(); 
            userGeoObject.add(myPlacemark); 
            myMap.geoObjects.add(userGeoObject); 
        }
    }
    function saveCoordinates(x,y)
    {
        $('#CoordinateX').val(x);
        $('#CoordinateY').val(y);
    }
    function clearCoordinates()
    {
        $('#CoordinateX').val('');
        $('#CoordinateY').val('');
    }
    function getClickCoordinats() {
        myMap.events.add("click",
            function (e) {
                var loc = location.pathname.toLowerCase();
                if (loc.indexOf("details") == -1 && location.pathname != "/" && location.pathname != "/Home/Index") {
                    clickCoordinats = e.get('coords');
                    var myPlacemark = new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: [clickCoordinats[0], clickCoordinats[1]]
                        },
                        properties: {
                            iconContent: '',
                            hintContent: '',
                            balloonContent: ''
                        }
                    });
                    if (typeof userGeoObject !== 'undefined') {
                        userGeoObject.removeAll();
                        myMap.geoObjects.remove(userGeoObject);
                    }
                    userGeoObject = new ymaps.Clusterer();
                    userGeoObject.add(myPlacemark);
                    myMap.geoObjects.add(userGeoObject);
                }}
        );
    }

    
    $(document).on('click', '.showmap', function () {
        var loc=location.pathname.toLowerCase();
        var buttons=[]
        if (loc.indexOf("details") > -1 || location.pathname=="/" || location.pathname=="/Home/Index")
        {
            var buttons=[]
        }
        else {
          buttons=  [{
                text: 'Зберегти', buttonClass: 'btn-primary', click: function ()
                { saveCoordinates(clickCoordinats[0], clickCoordinats[1]); SiteDialog.current.container.modal('hide'); }
            }]
        }
            SiteDialog.showmap({
                buttons: buttons
            }, "<div id='map'></div>")
            setTimeout(function () {
                var o = $('div.modal-dialog>div.modal-content>div.modal-body>div#map')
                createMap($('#CoordinateX').val(), $('#CoordinateY').val(), 8,"map",false);
                $('#map').click(getClickCoordinats());
                $("#map").show();
            }, 1000)
          
        })
})