
function getCoords() {
  // function take args from url and create matrix [[x1,y1], [x2,y2]...]
  let coords = [];

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (i = 1; i < 10; i++ ) {
    let coordX = urlParams.get(`x${i}`); 
    let coordY = urlParams.get(`y${i}`); 
    if (coordX, coordY) {
      // '+' - best str to int converter
      coords.push([+coordX, +coordY]);
    };
  };

  return coords
};

function init () {
    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: getCoords(),

       
        params: {
            results: 2
        }
    }, {
        boundsAutoApply: true
    });

    var trafficButton = new ymaps.control.Button({
            data: { content: "Учитывать пробки" },
            options: { selectOnClick: true }
        }),
        viaPointButton = new ymaps.control.Button({
            data: { content: "Добавить транзитную точку" },
            options: { selectOnClick: true }
        });

    trafficButton.events.add('select', function () {
        multiRoute.model.setParams({ avoidTrafficJams: true }, true);
    });

    trafficButton.events.add('deselect', function () {
        multiRoute.model.setParams({ avoidTrafficJams: false }, true);
    });

    // viaPointButton.events.add('select', function () {
    //     var referencePoints = multiRoute.model.getReferencePoints();
    //     referencePoints.splice(1, 0, "Москва, ул. Солянка, 7");
    //     multiRoute.model.setReferencePoints(referencePoints, [1]);
    // });

    viaPointButton.events.add('deselect', function () {
        var referencePoints = multiRoute.model.getReferencePoints();
        referencePoints.splice(1, 1);
        multiRoute.model.setReferencePoints(referencePoints, []);
    });

    // Создаем карту с добавленными на нее кнопками.
    var myMap = new ymaps.Map('map', {
      center: [55.750625, 37.626],
        zoom: 7,
        //controls: [trafficButton, viaPointButton]
    }, {
        buttonMaxWidth: 300
    });

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);