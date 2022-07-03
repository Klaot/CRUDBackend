const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = require('./config/db')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// Получаем данные из таблицы.

app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * FROM todo_list';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});


// Получаем стэйт из формы на фронте и отправляем его в БД.

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.review;
    const sql = "INSERT INTO todo_list (todo_header, todo_title) VALUE(?,?)"; 
    db.query(sql, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

// Удаляем запись.

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = 'DELETE FROM todo_list WHERE todo_header = ?';
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err); 
    });
});

// Изменение записи.

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.review;
    const sqlUpdate = 'UPDATE todo_list SET todo_title = ? WHERE todo_header = ?';
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err); 
    });
});

app.listen(3001, () => {
    console.log('Server started!');
});