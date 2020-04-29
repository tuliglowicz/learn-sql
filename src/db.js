var db = openDatabase('Stellar', '1.0', 'Stellar', 5 * 1024 * 1024); 


const restoreDB = () => {
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS lightup');
    tx.executeSql('DROP TABLE IF EXISTS stars');

    tx.executeSql('CREATE TABLE IF NOT EXISTS stars (starid INTEGER PRIMARY KEY, x REAL, y REAL, z REAL, distance REAL)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS lightup (starid INTEGER)');


    for (let i = 0, j = vertices.length; i < j; i += 3) {
      tx.executeSql(
        'INSERT INTO stars(x, y, z, distance) VALUES (?,?,?, ?)',
        [
          vertices[i],
          vertices[i + 1],
          vertices[i + 2],
          Math.sqrt(vertices[i] * vertices[i] + vertices[i + 1] * vertices[i + 1] + vertices[i + 2] * vertices[i + 2])
        ],
       );
    }
  });
};

const DEFAULT_HANDLER       = console.log;
const DEFAULT_ERROR_HANDLER = (_, { message }) => console.error(message);

const dbExecute = (sql, handler = DEFAULT_HANDLER, errHandler = DEFAULT_ERROR_HANDLER) =>
  db.transaction(tx =>
    tx.executeSql(
        sql,        // sql code, template (may include ?, which will be filled)
        [],         // ordered list of values to be placed in the sql under ?
        handler,    // success handler
        errHandler, // error handler
    )
  );  

const getLightUp = (cb) =>
  dbExecute(
    'select * from lightup',
    console.log,//(_, { rows }) => console.log('rows', rows) || cb(Array.from(rows).map(itm => itm.starid))
    console.error
  );
