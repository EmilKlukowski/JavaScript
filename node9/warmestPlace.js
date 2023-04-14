
//sort zmienia tablicę
//[...data] pobiera nam tablicę
//i tworzy nową na jej bazie
const processWeatherData = async function (data) {

  const allCities = new Map();
  for (const city of data) {
    allCities.set(city.stacja, city.temperatura);
  }

  const sorted = [...data].sort((c1, c2) => {
    if (Number(c1.temperatura) > Number(c2.tempeatura)) {
      return 1;
    }

    if (Number(c1.temperatura) < Number(c2.temperatura)) {
      return -1;
    } else{
      return 0;
    }
  });

  //najwyzsza temperatura
  const {
    stacja: highestStation,
    temperatura: highestTemperature
  } = sorted[sorted.length - 1];
  console.log(`Highest temperature is in ${highestStation}: ${highestTemperature}°C.`);

  //najnizsza temperatura
  const {
    stacja: lowestStation,
    temperatura: lowestTemperature
  } = sorted[0];
  console.log(`Lowest temperature is in ${lowestStation}: ${lowestTemperature}°C.`);

  //wszystkie miasta =============================================
  const temperaturesArray = Array.from(allCities);

  // sortowanie po wartościach
  temperaturesArray.sort((a, b) => b[1]-a[1]);

  //konwersja posortowanej tablicy na mapę
  const sortedCityTemperatures = new Map(temperaturesArray);

  for (const [city, temperature] of sortedCityTemperatures) {
    console.log(`${city}: ${temperature} stopni`);
  }

};
const findWarmestPlace = async () => {
  try {
    const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await res.json();
    await processWeatherData(data);      //data to tablica obiektów
  } catch (err) {
    console.log('Error has occurred: ', err);
  }
};

findWarmestPlace();