const express = require ('express');
const helmet = require ('helmet');
const knex = require ('knex');

const knexConfig = require ('./knexfile.js');
const server = express ();

const db = knex(knexConfig.development);

const getCohortById =(table, id)=>{
    return db(table).where({ id })
}

const getStudentsByCohort =(table,id)=>{
    return db(table).where({cohort_id: id})
}
const createCohort = (table, body)=>{
    return db(table).insert(body)
}

const deleteCohort = (table,id) =>{
    return db(table).where({id}).del(id)
}
const updateCohort = (table,id,body)=>{
    return db(table).where({id}).update(body)
}
server.use (express.json ());
server.use (helmet ());


server.get('/api/cohorts',(req,res)=>{
    db('cohorts')
    .then(cohorts =>{
        res.status(200).json(cohorts)
    })
    .catch(err=>{
        res.status(500).json(err)
    })

})

server.get ('/api/cohorts/:id', (req, res) => {
    const id = req.params.id
    getCohortById('cohorts',id)
    .then(cohort =>{
        res.status(200).json(cohort)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
});

server.get ('/api/cohorts/:id/students', (req, res) => {
  const id = req.params.id;
  getStudentsByCohort ('students', id)
    .then (students => {
      res.status (200).json(students);
    })
    .catch (err => {
      res.status (500).json (err);
    });
});


server.get ('/api/students', (req, res) => {
 db('students')
    .then (cohort => {
      res.status (200).json (cohort);
    })
    .catch (err => {
      res.status (500).json (err);
    });
});

server.post('/api/cohorts',(req,res)=>{
    const body = req.body
    if(!req.body.name){
        res.status(400).json({errorMessage: 'please add a name'})
    }
    createCohort('cohorts',body)
    .then(newCohort =>{
        res.status(201).json(newCohort);
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

server.delete('/api/cohorts/:id',(req,res)=>{
    const id = req.params.id;
    deleteCohort('cohorts',id)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

server.put('/api/cohorts/:id',(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    updateCohort('cohorts',id, body)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err)
    })

})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
