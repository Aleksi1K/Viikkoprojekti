const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;


const Pool = require('pg').Pool;
require('dotenv').config();
const conopts = {
    user: USER,
    password: PASSWORD,
    host: 'localhost',
    database: 'viikkoprojekti'
}


const pool=new Pool(conopts)  

const haekirjaukset = (kirjaus) => {
    pool.query('SELECT * from topics ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        kirjaus(results.rows);
    })
}
const haekirjaus = (id, kirjaus) => {
    pool.query('SELECT * FROM topics WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        kirjaus(results.rows);
    })
}
const luokirjaus = (uusikirjaus, kirjaus) => {
    const { title, description, timetomaster, source, startlearningdate, inprogress, completiondate } = uusikirjaus;
    pool.query('INSERT INTO topics(title, description, timetomaster, source, startlearningdate, inprogress, completiondate) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title, description, timetomaster, source, startlearningdate, inprogress, completiondate], (err, results) => {
        if (err) throw err;
        console.dir(results);
        kirjaus(results.rowCount);
    })
}

const paivitakirjaus = (paivita, id, kirjaus) => {
    const { title, description, timetomaster, source, startlearningdate, inprogress, completiondate } = paivita;
    pool.query('UPDATE topics SET title=$1, description=$2, timetomaster=$3, source=$4, startlearningdate=$5, inprogress=$6, completiondate=$7 WHERE id=$8', [title, description, timetomaster, source, startlearningdate, inprogress, completiondate, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        kirjaus(results.rowCount);
    })
}
const poistakirjaus = (id, kirjaus) => {
    pool.query('DELETE FROM topics WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        kirjaus(results.rowCount);
    })
}
module.exports = { haekirjaukset, haekirjaus, luokirjaus, paivitakirjaus, poistakirjaus }