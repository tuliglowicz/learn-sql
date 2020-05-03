const resultCount = document.getElementById('resultCount');
const results = document.getElementById('results');

const runSql = (sql, cb = updatePoints) => {
  dbExecute(sql, (_, { rows }) => 
    cb(
      Array.from(rows),
      sql === DEFAULT_CODE
  ));
}

let i = 0;
let rnd;
const updateColors = () => {
  if (i % 3 === 0) rnd = Math.random();
  i++; 
  return rnd;
}

let colors = {};
let highlight = {};

const getColor = ([ x, y, z ]) => {
  const c = Math.sqrt(x * x + y * y + z * z);
  return [c / 4, c / 4, c / 4];
}

const getLightColor = ([ x, y, z ]) => {
  const c = Math.sqrt(x * x + y * y + z * z);
  return [c, c, c];
}

const updateTable = allRows => {
  const table = [];
  if (allRows.length > 0) {
    const rows = allRows.slice(0, TAKE_N_FIRST_ROWS);
    table.push(`<tr><th>#</th><th>${Object.keys(rows[0]).join('</th><th>')}</th></tr>`);
    rows.forEach((row, idx) => {
      table.push(`<tr><td>${idx + 1}</td><td>${Object.values(row).join('</td><td>')}</td></tr>`);
    })
  }
  results.innerHTML = table.join('');
};

const updatePoints = (rows, isDefaultSql) => {

  updateTable(rows);

  resultCount.innerText = rows.length;
  // if (!rows || rows.length === 0) {
  //   return runSql(DEFAULT_CODE);
  // }

  // const c = rows.flatMap(star => [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR] );
  const c = rows.flatMap(star => colors[star.starId] = colors[star.starId] || randomOneOf(rgbPerType[star.type || 'M']));

  // console.log(c);

  geometry.setAttribute('position', new THREE.Float32BufferAttribute( rows.flatMap(star => [star.x || 0, star.y  || 0, star.z || 0]), 3 ));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(c , 3));
  renderer.render( scene, camera );
}

const reset = () => {
  // editor.setValue(DEFAULT_CODE);
  restoreDB(); // await restoreDB(); execute();
}

const executeSql = () => {
  const sql = editor.getValue() || DEFAULT_CODE;
  localStorage.setItem('sql', sql);
  runSql(sql);
};

const resetView = () => {
  editor.setValue(DEFAULT_CODE);
  executeSql();
}

document.getElementById('exe').addEventListener('click', executeSql);
document.getElementById('resetQuery').addEventListener('click', resetView);
document.getElementById('restore').addEventListener('click', reset);

executeSql();
