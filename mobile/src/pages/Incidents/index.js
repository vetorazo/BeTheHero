import React , {useState ,useEffect}from 'react';
import {View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import styles from './styles';

export default function Incidents() {

    const navigation = useNavigation();

    //useState to show all incidents in page
    const [incidents, setIncidents] = useState([]);

    //useState to show how many incidents on the top right corner of the app
    const [total, setTotal] = useState(0);

    //useState to set "infinite scroll" and loading to do the same task
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    };

    async function loadIncidents() {
        //check if loading is true so it doesn't load again in case it's already loading
        if (loading) {
            return;
        }

        //if total id bigger than 0 it means the page is loaded, and if the number of incidents is equal to total, itdoesn't need to load more
        if (total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        
        setIncidents([...incidents, ...response.data]);    
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    };

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}> 
                    Total of <Text style={styles.headerTextBold}>{total} incidents</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Welcome !</Text>
            <Text style={styles.description}>Choose one of the Incidents below and be a Hero</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>NGO: </Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>Incident: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Cost: </Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('en-US', 
                        {style : 'currency',
                         currency: 'USD'})
                         .format(incident.value)}
                    </Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>See more details</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
            
        </View>
    );
}