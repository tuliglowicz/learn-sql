const STAR_COUNT = 5e4;
const DEFAULT_R = 100

const getCoords = (R = DEFAULT_R) => {
  const theta = Math.random() * 2.0*Math.PI;
  const phi = Math.random() * Math.PI;
  const r = Math.random() * R;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);
  const sinPhi = Math.sin(phi);
  const cosPhi = Math.cos(phi);
  const x = r * sinPhi * cosTheta;
  const y = r * sinPhi * sinTheta;
  const z = r * cosPhi;
  const distance = Math.sqrt(x * x + y * y + z * z);

  return {
    x: Math.floor(x * 1e4) / 1e4,
    y: Math.floor(y * 1e4) / 1e4,
    z: Math.floor(z * 1e4) / 1e4,
    orbit: Math.floor(distance * 1e4) / 1e4,
  };
}

// Star Type	Color	Approximate Surface Temperature	Average Mass (The Sun = 1)	Average Radius (The Sun = 1)
// O	Blue	over 25000 K	60	15
// B	Blue	11,000 - 25,000 K	18	7
// A	Blue	7,500 - 11,000 K	3.2	2.5
// F	Blue to White	6,000 - 7,500 K	1.7	1.3
// G	White to Yellow	5,000 - 6,000 K	1.1	1.1
// K	Orange to Red	3,500 - 5,000 K	0.8	0.9
// M	Red	under 3,500 K	0.3	0.4

const rgbPerType = {
  'O': [
    [0.615686274509804,0.7058823529411765,1], //   0x9db4ff
  ],
  'B': [
    [162, 185, 255], //   0xa2b9ff
    [167, 188, 255], //   0xa7bcff
    [170, 191, 255], //   0xaabfff
    [175, 195, 255], //   0xafc3ff
  ],
  'A': [
    [186, 204, 255], //   0xbaccff
    [192, 209, 255], //   0xc0d1ff
    [202, 216, 255], //   0xcad8ff
  ],
  'F': [
    [228, 232, 255], //   0xe4e8ff
    [237, 238, 255], //   0xedeeff
    [251, 248, 255], //   0xfbf8ff
    [255, 249, 249], //   0xfff9f9
  ],
  'G': [
    [255, 245, 236], //   0xfff5ec
    [255, 244, 232], //   0xfff4e8
    [255, 241, 223], //   0xfff1df
  ],
  'K': [
    [255, 235, 209], //   0xffebd1
    [255, 215, 174], //   0xffd7ae
    [255, 198, 144], //   0xffc690
  ],
  'M': [
    [255, 190, 127], //   0xffbe7f
    [255, 187, 123], //   0xffbb7b
    [255, 187, 123], //   0xffbb7b
  ],
};

Object.keys(rgbPerType).forEach(key => {
  rgbPerType[key] = rgbPerType[key].map(arr => arr.map(rgb => rgb / 255));
})

const typeProbability = {
  O: 0.00003,
  B: 0.13,
  A: 0.60,
  F: 3,
  G: 7.60,
  K: 12.10,
  M: 76.45,
};

const colorsPerType = {
  O: ["Blue"],
  B: ["Blue", "Blue", "White" ],
  A: ["Blue", "Blue", "White"],
  F: ["Blue", "White", "White", "Whitish"],
  G: ["White", "Whitish", "White-Yellow", "Yellowish"],
  K: ["Orange", "Orange-Red"],
  M: ["Red"],
};

const tempPerType = {
  O: [25000, 100000],  // second value pick as a gut feeling
  B: [11000, 25000],
  A: [7500, 11000],
  F: [6000, 7500],
  G: [5000, 6000],
  K: [3500, 5000],
  M: [1200, 3500], // first value pick as a gut feeling
};

const avgMassPerType = {
  O: 60,
  B: 18,
  A: 3.2,
  F: 1.7,
  G: 1.1,
  K: 0.8,
  M: 0.3,
};

const avgRadiusPerType = {
  O: 15,
  B: 7,
  A: 2.5,
  F: 1.3,
  G: 1.1,
  K: 0.9,
  M: 0.4,
};

const randomOneOf = arr => arr[Math.floor(Math.random() * arr.length)];

const getIntFromMean = avg => getRandomFloatInRange(avg * 0.8, avg * 1.2, 2);

getSingleStar = type => ({
  name: generateUniqueName(),
  type,
  ...getCoords(),
  color: randomOneOf(colorsPerType[type]),
  temp: getRandomIntInclusive(...tempPerType[type]),
  mass: getIntFromMean(avgMassPerType[type]),
  radius:  getIntFromMean(avgMassPerType[type]),
})

const generateStars = (n = STAR_COUNT) => {
  const result = [];
  Object.entries(typeProbability).forEach(([type, probability]) => {
    const starTypeCount = probability * n / 100;
    if (starTypeCount < .5) return;

    for (let i = 0; i < starTypeCount; i++) {
      result.push(getSingleStar(type))
    }
  });

  for (let i = 0, j = STAR_COUNT - result.length; i < j; i++) {
    result.push(getSingleStar("M"));
  }

  return result;
}

let idPlanet;
const addPlanets = (star) => {
  const result = [];
  while (Math.random() <= .4) {
    result.push({
      planetId: idPlanet,
      starId: star.starId,
      mass: null,
      diameter: null,
      gravity: null,
      day: null,
      orbit: null,
      temp: null,
      ring_system: Math.random() > .7 ? 1 : 0,
    });
    idPlanet++;
  }

  return result;
}

let idMoon;
const addMoons = (planet) => {
  const result = [];
  while (Math.random() <= .5) {
    result.push({
      moonId: idMoon,
      planetId: planet.planetId,
      mass: null,
      diameter: null,
      orbit: null,
    });
    idMoon++;
  }

  return result;
}


const regenerateGalaxy = () => {
  // generateStars - ordered by type
  const stars = generateStars();
  // shuffle them
  stars.sort(() => Math.random() < 0.5)
  // add id
  stars.forEach((star, idx) => { star.starId = idx + 1; });
  // for each star add planets incl. planetId
  idPlanet = 1;
  const planets = stars.flatMap(addPlanets);
  // for each planet add moon
  idMoon = 1;
  const moons = planets.flatMap(addMoons);

  return {
    stars,
    planets,
    moons,
  }
}

