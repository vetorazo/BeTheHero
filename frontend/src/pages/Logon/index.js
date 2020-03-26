import React, {useState} from 'react';

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';
import { FiLogIn} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import heroesImg from '../../assets/heroes.png';

//Logon screen with image and link if not registered
export default function Logon () {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            //store NGO id and name
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName',response.data.name);
            //if login is succesfull push to profile page
            history.push('/profile');
        }catch (err) {
            alert('Failed to login, try again');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Please Login</h1>
                    <input placeholder="Your ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Enter</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Not registered yet
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt = "Heroes" />
        </div>
    );
};