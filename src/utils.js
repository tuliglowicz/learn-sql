const getRandomFloatInRange = (min, max, dec) =>
  typeof dec === "undefined"
    ? Math.random() * (max - min) + min
    : Math.floor((Math.random() * (max - min) + min) * (10 ** dec)) / 10 ** dec
;

const getRandomIntInclusive = (min, max) =>
  Math.floor(getRandomFloatInRange(min, max));

const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1);
