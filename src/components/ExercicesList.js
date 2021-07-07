import Axios from 'axios';
import { React,useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercice = ({ exercice, deleteExercice }) => {
 return (
    <tr>
        <td>{exercice.username}</td>
        <td>{exercice.description}</td>
        <td>{exercice.duration}</td>
        <td>{exercice.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+exercice._id}>edit</Link> | <a href="#" onClick={() => {deleteExercice(exercice._id)}}>delete</a>
        </td>
    </tr>
 )
}

function ExercicesList() {
    const [exercices,setExercices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercices/')
            .then(response => {
                 setExercices(response.data);
            })
            .catch(err => console.log(err));
    }, [])

    const exercicelist = () => {
        return exercices.map(currexercice => {
            return <Exercice exercice={currexercice} deleteExercice={deleteExercice} key={currexercice._id} />
        })
    }

    const deleteExercice = (id) => {
        axios.delete('http://localhost:5000/exercices/'+id)
             .then(res => console.log(res.data));
        setExercices(exercices.filter(el => el._id !== id));
    }

    return (
        <div>
            <h3>Exercices list</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <td>Username</td>
                        <td>Description</td>
                        <td>Duration</td>
                        <td>Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {exercicelist()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercicesList
