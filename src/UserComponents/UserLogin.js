import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function UserLogin() {

    const navigate = useNavigate();
    // const location = useLocation();

    const [loginCred, setLoginCred] = useState({ userName: '', password: '' });

    const URL = 'http://localhost:8083/api/users/login';

    const inputHandler = (event) => {
        setLoginCred((loginCred) => (
            {
                ...loginCred, [event.target.name]: event.target.value
            }
        ));
    };
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(URL, loginCred);
            // let responseData = location.state.data;
            // responseData.push(response.data);
            navigate(`/dashboard/${response.data.id}`, { state: response.data });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='col-md-4 offset-md-4 mt-5'>
            <form className='form' onSubmit={submitHandler}>
                <div className="mb-3">
                    <label for="username" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="username" name='userName' onChange={inputHandler} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={inputHandler} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UserLogin