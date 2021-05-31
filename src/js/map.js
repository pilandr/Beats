let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
  // center: [59.939438, 30.341962],
  center: [55.751948, 37.602633],
  zoom: 14,
  controls: []
  });

 
  const coords =[
    [55.756964, 37.621167],
    [55.749357, 37.604120],
    [55.742977, 37.582135],
    [55.758401, 37.583197]
  ];



  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/marker.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-3, -42]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable('scrollZoom');
}
ymaps.ready(init);
