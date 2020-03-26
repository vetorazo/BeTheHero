import React, { useState, useEffect }from 'react';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

export default function Profile() {

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers : {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident (id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id))
        } catch (err) {
            alert('Failed to delete incident, try again')
        }
    };
    //to logout clear the localStorage and push to login page
    function handleLogout () {
        localStorage.clear();

        history.push('/');
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Welcome Back {ongName}</span>

                <Link className="button" to="/incidents/new" >Register new Incident</Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Registered Incidents</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id} >
                    <strong>Incident: </strong>
                    <p>{incident.title}</p>

                    <strong>Description: </strong>
                    <p>{incident.description}t</p>
                    
                    <strong>Cost: </strong>
                    <p>{Intl.NumberFormat('en-us', {style : 'currency', currency : 'USD'}).format(incident.value)}</p>

                    <button onClick = {() => handleDeleteIncident(incident.id)} type="button" >
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}