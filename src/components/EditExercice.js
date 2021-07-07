import { React,useState,useEffect,useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercice({ match }) {
    useEffect(() => {
        axios.get('http://localhost:5000/exercices/'+match.params.id)
        .then(response => {
           setUsername(response.data.username);
           setDescription(response.data.description);
           setDuration(response.data.duration);
           setDate(new Date(response.data.date));
        })

        axios.get('http://localhost:5000/users')
             .then(response => {
                 if(response.data.length > 0) {
                     setUsers(response.data.map(user => user.username));
                 }
             })
    },[]);

    const selectRef = useRef('');

    const [username,setUsername] = useState('');
    const [description,setDescription] = useState('');
    const [duration,setDuration] = useState(0);
    const [date,setDate] = useState(new Date());
    const [users,setUsers] = useState([]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    }

    const onChangeDate = (date) => {
        setDate(date);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const exercice = {
            username : username,
            description : description,
            duration : duration,
            date : date
        }
        console.log(exercice);

        axios.post('http://localhost:5000/exercices/update'+match.params.id, exercice)
             .then(response => console.log(response.data));

        window.location = '/';
    }
    return (
        <div>
            <h3>Edit exercice: </h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                        <select ref={selectRef}
                            required
                            className="form-control"
                            value={username}
                            onChange={onChangeUsername}>
                                {
                                    users.map(function(user) {
                                        return <option 
                                          key={user}
                                          value={user}>{user}
                                          </option>;
                                      })
                                    }
                        </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>

                <div className="form-group">
                    <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={parseInt(date)}
                                onChange={onChangeDate}
                            />
                        </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit exercice" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercice