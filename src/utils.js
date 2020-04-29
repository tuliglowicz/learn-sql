// const x=[], y=[], z=[]
// let coords = [x, y, z];

// const halfWidth = window.innerWidth / 2;
// const halfHeight = window.innerHeight / 2;

// let min, max , diff

// const normalize = arr => {
//   arr.forEach((elem, idx) => coords[idx % 3].push(elem));

//   coords = coords.map(arr => {
//     min = arr.reduce((acc, itm) => itm < acc ? itm : acc, Infinity);
//     max = arr.reduce((acc, itm) => itm > acc ? itm : acc, -Infinity);
//     diff = max - min;

//     return arr.map(itm => ((itm - min) / diff) - .5);
//   })

//   // console.log(coords);

//   return coords[0].reduce((acc, _, idx) => {
//     acc.push(coords[0][idx] * halfWidth, coords[1][idx] * halfHeight, coords[2][idx] * 100);
//     return acc;
//   }, [])

// }