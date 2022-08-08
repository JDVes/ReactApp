import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";



const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async() =>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    },[]);

    const deletePlayer = (id) => {
        if(
            window.confirm("are you sure to delete player?")
        ){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Player delete successfull");
            setTimeout(() => loadData(),500);
        }
    };

    return ( 
        <div style={{marginTop:"150px"}} className="container">
            <Link to="/Add">
            <button className="btn btn-contact">ADD NEW PLAYER STATISQUES</button>
            </Link>
                    <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign : "center"}}>No.</th>
                        <th style={{textAlign : "center"}}>name</th>
                        <th style={{textAlign : "center"}}>club</th>
                        <th style={{textAlign : "center"}}>goal_scored</th>
                        <th style={{textAlign : "center"}}>goal_losses</th>
                        <th style={{textAlign : "center"}}>poste_title</th> 
                        <th style={{textAlign : "center"}}>Action</th>
                        
                    </tr>
                </thead>
                
                   <tbody>
                    
                   {[data].map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row" >{index+1}</th>
                                <td key="{item.name}" >{item.name}</td>
                                <td>{item.club}</td>
                                 <td>{item.goal_scored}</td>
                                <td>{item.goal_losses}</td>
                                <td>{item.poste_title}</td> 
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete"  onClick={() => deletePlayer(item.id)} >Delete</button>
                                    <Link to={`/View/${item.id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>

                                </td>

                            </tr>
                        );
                    })} 
                </tbody> 
            </table>
        </div>
     );
}
 
export default Home;