import express from 'express';
import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: 'localhost',
  database: 'rvapi',
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getEmails = (req: express.Request, res: express.Response) => {
  pool.query('SELECT email FROM users', (error, results) => {
    if (error) {
      console.log("getEmails ERROR: ", error);
      throw error;
    } else {
      results.rows.filter((email, idx) => {
        console.log(`index: ${ idx }, email: ${ email.email }`)
        
        if (results.rows[idx +1] && email.email === results.rows[idx + 1].email) {
          console.log("dupe: ", email.email)
        } else if (results.rows[idx + 1] === undefined) {
          console.log("undefined last row")
        }
      })
    }

    console.log("getEmails results: ", results.rows);  
    res.status(200).send(results.rows);
  });
};

const getUsers = (req: express.Request, res: express.Response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log("error message", error)
      throw error
    }

    console.log("GET query success");
    res.status(200).json(results.rows);
  });
};

const getUserById = (req: express.Request, res: express.Response) => {
  const id: Number = parseInt(req.params.id)
  
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log("getUserById ERROR: ", error);
      throw error
    }
    
    console.log('getUserById SUCCESS');
    res.status(200).json(results.rows);    
  });
};

const createUser = (req: express.Request, res: express.Response) => {
  const { name, email } = req.body;

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (error, results) => {
    if (error) {
      console.log('ERROR for createUser: ', error);
      throw error;
    }

    console.log('createUser SUCCESS', results.rows[0].id);
    res.status(201).send(`User added with ID: ${ results.rows[0].id }`);
  });
};

const updateUser = (req: express.Request, res: express.Response) => {
  const id: Number = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        console.log("ERROR for updateUser: ", error);
        throw error;
      }

      console.log('updateUser SUCCESS');
      res.status(200).send(`User modified with ID: ${ id }`);
    }
  );
};

const deleteUser = (req: express.Request, res: express.Response) => {
  const id: Number = parseInt(req.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log('ERROR for deleteUser ', error);
      throw error;
    }
    
    console.log('deleteUser SUCCESS');
    res.status(200).send(`User deleted with ID: ${ id }`)
  })
}

export { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  getEmails
 }
