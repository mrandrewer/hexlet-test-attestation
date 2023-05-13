import _ from 'lodash'

export default function solution(content) {
  // BEGIN
  const parseLine = (line) => {
    const fields = _.split(line, ',');
    return {
      date: fields[0],
      maxTemp: fields[1],
      minTemp: fields[2],
      humidity: fields[3],
      pressure: fields[4],
      windSpeed: fields[5],
      windDirection: fields[6],
      city: fields[7],
      state: fields[8],
      timeZon: fields[9],
    };
  }

  const lines = _.split(content, /\r*\n/).slice(1, -1).map((l) => parseLine(l));
  console.log(`Count: ${lines.length}`);

  const cities = _.uniq(lines.map((l) => l.city)).sort();
  console.log(`Cities: ${cities.join(', ')}`);

  const humidity = lines.map((l) => l.humidity);
  console.log(`Humidity: Min: ${_.min(humidity)}, Max: ${_.max(humidity)}`);

  const maxTemp = _.orderBy(lines, ['maxTemp'], ['desc']).at(0);
  console.log(`HottestDay: ${maxTemp.date} ${maxTemp.city}`);

  const avgTempLines = lines.map((l) => ({ city: l.city, avgTemp: (l.minTemp + l.maxTemp) / 2 }));
  const hottestCity = _.orderBy(avgTempLines, ['avgTemp'], ['desc']).at(0);
  console.log(`HottestCity: ${hottestCity.city}`);
  // END

}