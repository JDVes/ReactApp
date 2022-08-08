 const express = require("express");
 const app = express();
 const bodyparser = require("body-parser");


 const mysql = require("mysql2");
 const cors = require("cors");

 const db = mysql.createpool({
    host : "localhost",
    user: "root",
    password: "",
    database: "stats_db",
    port : 80
 });
 
 db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });
 
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 // get requette

 app.get("/api/get", (req, res) =>{
    const sqlget = "SELECT * FROM joueur_info";
    db.query(sqlget,(error, result) => {
        res.send("Hello Express" );
    });
 } );


  //INSERTION

  app.post("/api/post" ,(req, res) => {

    const {name,club,goal_scored,goal_losses,poste_title} = req.body;
    const sqlInsert = "INSERT INTO joueur_info (name,club,goal_scored,goal_losses,poste_title) VALUES(?,?,?,?,?)";
    db.query(sqlInsert,[name, club, goal_scored, goal_losses, poste_title],(error,result) =>{
    if (error) {
        console.log(error)
    }
     });
    })

     //DELETE
     app.delete(`/api/remove/:id`, (req, res) => {

        const { id } = req.params;
        const sqlRemove = 
        "DELETE FROM joueur_info WHERE id = ?";
        db.query(sqlRemove,id,(err,result) =>{
        if (err) {
            console.log(err); 
        }
         });
        });

        app.get("/api/get/:id" , (req ,res ) => {
            const {id} = req.params;
            const sqlGet = "SELECT * FROM joueur_info where id = ?";
            db.query(sqlGet,id, (error , result) => {
                if( error){
                    console.log(error)
                }
                res.send(result);
            });
        });

                    //update
            app.put("/api/update/:id" , (req ,res ) => {

                const { id } = req.params;

                const {name, club, goal_scored, goal_losses, poste_title} = req.body;

                const sqlUpdate = `UPDATE joueur_info SET name = ?,club = ?, goal_scored, = ?,goal_losses = ?, poste_title = ? WHERE id = ? `;

                db.query(sqlUpdate,[name, club, goal_scored, goal_losses, poste_title, id],(err,result) =>{
                if (err) {
                    console.log(err);
                }
                res.send(result)
                 });
                });
        


//  app.get("/",(req,res) => {
//     const sqlinsert = "insert into liste_joueur (nom et prenoms, poste, club, contact,) values ('john Davis', 'attaquant','gomido', 90000000)";
//     res.send("Hello express");
//     db.query(sqlinsert, (error,result) => {
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello world");
//     });
//  } );

 app.listen(5000,() => 
    console.log("server is running on port 5000 ")


  );