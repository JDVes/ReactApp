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
            <button className="btn btn-contact">Add THE NEW PLAYER</button>
            </Link>
                    <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign : "center"}}>No.</th>
                        <th style={{textAlign : "center"}}>name</th>
                        <th style={{textAlign : "center"}}>club_player</th>
                        {/* <th style={{textAlign : "center"}}>wins</th>
                        <th style={{textAlign : "center"}}>losses</th>
                        <th style={{textAlign : "center"}}>points_scored</th> */}
                        <th style={{textAlign : "center"}}>Action</th>
                        
                    </tr>
                </thead>
                   <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row" >{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.club_player}</td>
                                {/* <td>{item.wins}</td>
                                <td>{item.losses}</td>
                                <td>{item.points_scored}</td> */}
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