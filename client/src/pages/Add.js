import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import "./Add.css";

const initialState = {
    name:"",
    club:"",
    goal_scored:"",
    goal_losses:"",
    poste_title:"",
}
const Add = () => {
    const[state,setState] = useState(initialState);

    const {name,club,goal_scored,goal_losses,poste_title}= state;

    const history = useNavigate();

    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0] }));
    },[id]) ;




    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!name || !club || !goal_scored || !goal_losses || !poste_title){
            toast.error("Please provide value into each  input field");
        }else {
            if(!id) {
                axios
                .post("http://localhost:5000/api/post", {
                    name,
                    club,
                    goal_scored,
                    goal_losses,
                    poste_title,
                })
                .then(()=>{
                    setState({name:"", club:"",goal_scored:"",goal_losses:"",poste_title:"", });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Contact added successfully ");
            }else {
                axios
                .put(`http://localhost:5000/api/update/${id}`, {
                    name,
                    club,
                    goal_scored,
                    goal_losses,
                    poste_title,
                })
                .then(()=>{
                    setState({name:"", club:"", goal_scored:"", goal_losses:"", poste_title:"" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Contact update successfully ");
            }

            setTimeout(() => history.push("/"),500);
        }
    }

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({ ...state,[name]:value});
    }
    return ( 
        <div style={{marginTop:"100px"}}>
            <form action="" style={{
                margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id='name' 
                name='name'
                placeholder='Player name'
                value={name || ""}
                onChange={handleInputChange}/><br /><br />


                <label htmlFor="club">club</label>
                <input type="text"
                id='club' 
                name='club'
                placeholder='Player club'
                value={club || ""}
                onChange={handleInputChange}/><br /><br />


                <label htmlFor="goal_scored">Goal scored</label>
                <input type="number"
                id='goal_scored' 
                name='goal_scored'
                placeholder='Player goal_scored'
                value={goal_scored || ""}
                onChange={handleInputChange}/><br /><br />


                <label htmlFor="goal_losses">Goal losses</label>
                <input type="number"
                id='goal_losses' 
                name='goal_losses'
                placeholder='Player goal_losses'
                value={goal_losses || ""}
                onChange={handleInputChange}/><br /><br />


                <label htmlFor="poste_title">Poste Title</label>
                <input type="text"
                id='poste_title' 
                name='poste_title'
                placeholder='Player poste_title'
                value={poste_title || ""}
                onChange={handleInputChange}/><br /><br />


                <input type="submit" value={id ? "Update" : "save"} /><br /><br />

                <Link to="/">
                       
                        <input type="submit" value={"Go back"} />
                      
                </Link>
            </form>
        </div>
     );
}
 
export default Add;