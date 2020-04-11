$(document).ready(function () {
    var myMap = null;
    var start = 0;
    var all = [];
    var allPoints = [];
    var allMapped = [];
    var clickCoordinats = [];
    var serverFilter={StartDate:'',EndDate:'',Categories:[],Statuses:[],Types:[]}
    var filter = [];
    var MyBalloonLayout=null;
    var MyBalloonContentLayout = null;
    function loadPoints()
    {
        if ($('#bigmap').length!=0)
        $.post('/Complaint/GetPoints')
            .success(function (data) {
                allPoints = data;
                allMapped = mapToPoints(allPoints);
                createMap('', '', 8, 'bigmap');
                createDiagram(allMapped);
               
            })
    }
    function getPlacemark(id)
    {
        var p={}
        for (var i = 0; i < allMapped.length; i++)
        {
            if (allMapped[i].properties.get('id')==id)
            {
                p = allMapped[i];
            }
        }
        return p;
    }
    
    function mapToPoints(array) {
        return _.map(array, function (b) {
            var preset = {};
            if (b.Status == 0) {
                preset.preset = 'islands#blueIcon'
                preset.color = '#4693FC'
            }
            else
                if (b.Status == 1) {
                    preset.preset = 'islands#redIcon'
                    preset.color = '#E06963'
                }
                else if (b.Status == 2) {
                    preset.preset = 'islands#orangeIcon'
                    preset.color = '#D7BA5E'
                }
                else {
                    preset.preset = 'islands#greenIcon'
                    preset.color = '#5C9E27'
                }
            var p= new ymaps.Placemark(
                      [b.CoordinateX, b.CoordinateY],
                      {
                          balloonHeader: b.Status
                      },
                      {
                          preset: preset.preset                          
                      }
                  )
            p.properties.set("id", b.Id);
            p.events.add('click', function (e) {
                e.get('target').properties.set('balloonContent', "Йде завантаження");
                e.get('target').properties.set('balloonContent', getPointContent(e.get('target').properties.get('id')));
               
            });
            return p;
        })
    }
    function getPointContent(id)
    {
        var d=''
        $.post('/Complaint/GetComplaintDescription', { id: id,showmap:true})
               .success(function (data) {
                   d = data;
                   var txt = $('<div/>').append(data)
                  
                   var p = getPlacemark(id);
                   myMap.balloon.open(p.geometry.getCoordinates(), { content: txt.html()}, { closeButton: true, minWidth: 530 });
                   var i = p.properties.get('coordPosition');
                  
               })
        
    }
    function createDiagram(points) {
        ymaps.modules.require(['PieChartClusterer'], function (PieChartClusterer) {
            var clusterer = new PieChartClusterer();
            clusterer.add(points);
            myMap.geoObjects
            myMap.geoObjects.each(function (geoObject) {
                myMap.geoObjects.remove(geoObject);
            });
            myMap.geoObjects.add(clusterer);
        });
    }
    function createMap(x, y, map_zoom, selector) {
        if (typeof map_zoom === 'undefined') map_zoom = 11;
        if (x == null || y == null || x == "" || y == "") {
            center_x = 49.421009;
            center_y =26.994894;
        }
        else {
            center_x = x;
            center_y = y;
        }
        var mapDiv = document.getElementById(selector);
        mapDiv.innerHTML = '';

        myMap = new ymaps.Map(mapDiv, {
            center: [center_x, center_y],
            zoom: map_zoom
           
        }, {
            maxZoom: 17,
            minZoom: 11,
        })
        myMap.behaviors.disable('scrollZoom');
    };
   
    
    function init() {
        ymaps.ready(function () {
           loadPoints()
        })
    }
    $("#from-filter").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function (selectedDate) {
            $("#to-filter").datepicker("option", "minDate", selectedDate);
        },
        onSelect: function (selectedDate) {
            var splited = selectedDate.split('.');
            var D = new Date(splited[2], splited[1], splited[0]);
            var ticks = D.getTime();
            $("#StartDate").val(ticks);
            performFiltering();
        }
    });
    
   init()
})