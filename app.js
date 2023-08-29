import express from 'express';
import connect from './database/connection.js';
import studentRouter from './routes/student.js';
import mentorRouter from './routes/mentor.js';
const app = express();

const port = process.env.port || 3000;
await connect();

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use('/student', studentRouter);
app.use('/mentor',mentorRouter);

app.use((req, res) => {
    res.status(404).send(`
    <dialog open>
    <p style="font-size:20px;">Error 404! The requested resource does not exist</p>
    </dialog>
    `);
  });
  
app.listen(port, () => {
    console.log('listening on port ' + port);
});

