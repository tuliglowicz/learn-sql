

const runSql = (sql, cb = updatePoints) => {
  dbExecute(sql, (_, { rows }) => 
    cb(
      Array.from(rows).flatMap(itm => ({
        id: itm.id,
        coords: [itm.x, itm.y, itm.z],
        dist: itm.distance,
      })),
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

const updatePoints = (newPoints, isDefaultSql) => {
  if (!newPoints || newPoints.length === 0) {
    return runSql(DEFAULT_CODE);
  }

  const c = newPoints.flatMap(x => colors[x.id] || (colors[x.id] = getColor(x.coords)))
  console.log(c);

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( newPoints.flatMap(x => x.coords), 3 ) );
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute(c , 3 ) );
  renderer.render( scene, camera );
}

const reset = () => {
  editor.setValue(localStorage.getItem('sql') || DEFAULT_CODE);
  restoreVertices();
  restoreDB();
  executeSql();
}

const executeSql = () => {
  const sql = editor.getValue() || DEFAULT_CODE;
  localStorage.setItem('sql', sql);
  runSql(sql);
};

document.getElementById('exe').addEventListener('click', executeSql)

document.getElementById('restore').addEventListener('click', () => {
  reset();
  runSql(DEFAULT_CODE);
})


executeSql();