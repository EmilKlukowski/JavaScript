const { appendFile } = require('fs').promises;
const {
  normalize,
  resolve
} = require('path');

function safeJoin(base, target) {
  const targetPath = '.' + normalize('/' + target);
  return resolve(base, targetPath);
}

const getDataFileName = cityName => safeJoin('D:\\Users\\Emil\\JS\\WebstormProjects\\Kurs\\node9\\data', `${cityName}.txt`);

const processWeatherData = async function (data, cityName) {

  const foundData = data.find(stationName => stationName.stacja === cityName);
  //find zwróci jeden element(obiekt) z tablicy lub zwróci undefined (bo nie znalazl)

  if (!foundData) {
    throw new Error('We do not have information about ' + cityName);     //koniec programu, wychodzimy z funkcji
  }

  const {
    cisnienie: pressure,
    wilgotnosc_wzgledna: humidity,
    temperatura: temperature,
  } = foundData;

  const weatherInfo = `In ${cityName} there is ${temperature}°C, ${humidity}% of humidity and pressure of ${pressure}hPa.`;
  console.log(weatherInfo);

  const dateTimeString = new Date().toLocaleTimeString();
  await appendFile(getDataFileName(cityName), `${dateTimeString}\n${weatherInfo}\n`);
};

const checkCityWeather = async cityName => {
  try {
    const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await res.json();
    await processWeatherData(data, cityName);
  } catch (err) {
    console.log('Error has occurred: ', err);
  }
};

checkCityWeather(process.argv[2]);
