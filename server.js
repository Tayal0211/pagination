const express = require('express');
const app = express();
const mysql  = require('mysql2');
const bodyparser = require('body-parser');
app.set('view engine' ,'ejs')


app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host:'localhost',
    database : 'credentials',
    user:'person',
    password : 'pass'

})

module.exports = connection;




app.get('/', (req ,res) =>{
      res.sendFile('person.html' ,{root: __dirname});
}
);

app.post('/credentials', (req ,res) =>{
    const  username = req.body.Username;
    const  password = req.body.Password;
    console.log(username);
    console.log(password);
    console.log('alpha');
    
      if(username && password){
      let sql =`INSERT INTO Userdata(Username ,Password) VALUES ('${username}' ,'${password}')`;
        connection.query(
             sql,
                function( err ,results){
                    if(err)throw err;
                    else
                    {
                    res.send("data inserted");
                    }
                }
                
        )
     }
     else {
        res.send(err);
      }        
}
);
app.get('/data/:id', (req, res) =>{
    var id =req.params.id;
    let sql2 = 'SELECT * FROM Userdata LIMIT '+id+ ',5';
    connection.query(
        sql2,
           function( err ,rows , fields){
               if(!err){
               res.send(rows);
               }
               else
               {
               console.log(err);
               }
            
           }
           
   )


});

app.listen( 4001, () =>{
       console.log("server started on http://localhost:4001/");
}

)