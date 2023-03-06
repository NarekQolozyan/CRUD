const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3005
app.use(express.json())
const cors = require('cors')
app.use(cors())

const db = new sqlite.Database('database.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, data) => {
        res.send(data)
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM books WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
})

app.post('/', (req,res) => {
    
    const name = req.body.name
    const author = req.body.author
    const price = req.body.price
    const size = req.body.size
    const weight = req.body.weight
    const button_text = req.body.button_text
    const language = req.body.language
    const cover = req.body.cover
    const pages_count = req.body.pages_count
    const img = req.body.img
     
    db.run('INSERT INTO books (name,author,price,size,weight,button_text,cover,language,pages_count,img) VALUES (?,?,?,?,?,?,?,?,?,?)', [name,author,price,size,weight,button_text,cover,language,pages_count,img],(err) => {
        res.send("OK")
    })
})

app.patch('/books/:id',(req,res) => {
    const id = req.params.id
    const {name,author,price,size,weight,button_text,language,cover,pages_count,img,} = req.body

    db.run('UPDATE books SET name=?, author=?, price=?, size=?,weight=?,button_text=?, language=?, cover=?, pages_count=?, img=? WHERE id=?',[name,author,price,size,weight,button_text,language,cover,pages_count,img,id], (err) => {
        if(err){
        console.log(err)
    }
    else{
        res.send('Ok')
    }})
})

app.delete('/delete/:id', (req,res) => {
    
    const books_id = req.params.id

    db.run('DELETE FROM books WHERE id=?', [books_id],(err) => {
        res.send("Sucsessfuly deleted")
    })
})


app.listen(port)

