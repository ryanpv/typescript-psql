import express from 'express';
import "dotenv/config.js";
import { createUser, deleteUser, getEmails, getUserById, getUsers, updateUser } from './queries.js';
import { testFile } from './testFile.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ info: 'nodejs, express, and postgres api' });
});
// GET ALL USERS
app.get('/users', getUsers);
// GET SINGLE USER
app.get('/users/:id', getUserById);
// CREATE USER
app.post('/users', createUser);
// UPDATE USER
app.put('/users/id', updateUser);
// DELETE USER
app.delete('/users/id', deleteUser);
////////////////// TEST QUERIES //////////////////
app.get('/emails', getEmails);
app.get('/tester', testFile);
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
//# sourceMappingURL=server.js.map