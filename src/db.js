var db = openDatabase('Stellar', '1.0', 'Stellar', 50 * 1024 * 1024); 

const restoreDB = () => {
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS answers');
    tx.executeSql('DROP TABLE IF EXISTS stars');
    tx.executeSql('DROP TABLE IF EXISTS planets');
    tx.executeSql('DROP TABLE IF EXISTS moons');

    tx.executeSql(`
      CREATE TABLE stars (
        starId INTEGER PRIMARY KEY,
        x REAL,
        y REAL,
        z REAL,
        type TEXT,
        orbit REAL,
        mass INTEGER,
        temp INTEGER,
        radius INTEGER,
        color TEXT,
        name TEXT
      )
    `);
    tx.executeSql(`
      CREATE TABLE answers (
        starId INTEGER, 
        FOREIGN KEY (starId) REFERENCES stars (starId)
      )
    `);
    tx.executeSql(`
      CREATE TABLE planets (
        planetId INTEGER PRIMARY KEY,
        day INTEGER,
        diameter REAL,
        gravity REAL,
        mass INTEGER,
        orbit REAL,
        ring_system INTEGER,
        starId INTEGER,
        temp INTEGER,
        FOREIGN KEY (starId) REFERENCES stars (starId)
      )
    `);
    tx.executeSql(`
      CREATE TABLE moons (
        moonId INTEGER,
        planetId INTEGER,
        mass INTEGER,
        diameter REAL,
        orbit REAL,
        FOREIGN KEY (planetId) REFERENCES planets (planetId)
      )
    `);
    
    const { stars, planets, moons } = regenerateGalaxy();

    console.log(stars, planets, moons);

    stars.forEach(({ starId,x,y,z,type,orbit,mass,temp,radius,color,name }) => {
      tx.executeSql(
        'INSERT INTO stars(starId,x,y,z,type,orbit,mass,temp,radius,color,name) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [starId,x,y,z,type,orbit,mass,temp,radius,color,name],
        undefined,
        console.error,
       );
    });

    planets.forEach(({ planetId,day,diameter,gravity,mass,orbit,ring_system,starId,temp }) => {
      tx.executeSql(
        'INSERT INTO planets(planetId,day,diameter,gravity,mass,orbit,ring_system,starId,temp) VALUES (?,?,?,?,?,?,?,?,?)',
        [planetId,day,diameter,gravity,mass,orbit,ring_system,starId,temp],
        undefined,
        console.error,
       );
    });
    moons.forEach(({ moonId,planetId,mass,diameter,orbit }) => {
      tx.executeSql(
        'INSERT INTO moons(moonId,planetId,mass,diameter,orbit) VALUES (?,?,?,?,?)',
        [moonId,planetId,mass,diameter,orbit],
        undefined,
        console.error,
      );
    });
  });
};

const DEFAULT_HANDLER = (...rest) => {
  console.log(...rest);
  errorDomNode.innerText = '';
};
const DEFAULT_ERROR_HANDLER = (_, { message }) => {
  console.error(message);
  errorDomNode.innerText = message;
}

const errorDomNode = document.getElementById('error');

const dbExecute = (sql, handler, errHandler) =>
  db.transaction(tx =>
    tx.executeSql(
        sql,        // sql code, template (may include ?, which will be filled)
        [],         // ordered list of values to be placed in the sql under ?
        (...rest) => DEFAULT_HANDLER(...rest) || handler && handler(...rest),    // success handler
        (...rest) => DEFAULT_ERROR_HANDLER(...rest) || errHandler && errHandler(...rest), // error handler
    )
  );

const getAnswers = cb => new Promise(resolve => {
  dbExecute(
    'select starId from answers',
    (_, { rows }) => resolve(Array.from(rows)),
    console.error
  );
});
