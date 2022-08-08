import React, { useState, useEffect } from 'react';
import {useParams,Link}  from  "react-router-dom" ;
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user , setUser] = useState([]);

    const {id} = useParams();


    
    useEffect(() =>{
        axios.get( `http://localhost:5000/api/get/${id}` )
        .then((resp) => setUser({...resp.data[0]}))
    },[id])



    return ( 
                            

       
        <div style={{ marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>STATISQUES OF {id}</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />


                    <strong>Name:</strong>
                    <span>{user.name}</span>
                    <br />
                    <br />

                    <strong>club:</strong>
                    <span>{user.club}</span>
                    <br />
                    <br />

                    <strong>goal_scored:</strong>
                    <span>{user.goal_scored}</span>
                    <br />
                    <br />

                    <strong>goal_losses:</strong>
                    <span>{user.goal_losses}</span>
                    <br />
                    <br />

                    <strong>poste_title:</strong>
                    <span>{user.poste_title}</span>
                    <br />
                    <br />

                    <Link to="/">
                       <div className="btn btn-edit">Go back</div>
                    </Link> 
                </div>
            </div>
        </div>
     );
}
 
export default View;