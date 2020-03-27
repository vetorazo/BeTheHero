import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View,Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail() {

    const navigation = useNavigation();
   
    //route to be able to get info from this page
    const route = useRoute();
   
    //incident to update incident details page
    const incident = route.params.incident;
    
    const message = `Hello ${incident.name}, I am contacting you because I would like to help in the "${incident.title}" incident with the amount of ${Intl.NumberFormat('en-US', {style : 'currency', currency: 'USD'}).format(incident.value)}`;
    
    //useNavigation to make left arrow go back
    function navigateBack() {
        navigation.goBack();
    };

    function sendMail () {
        MailComposer.composeAsync({
            subject: `Hero of Incident: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    };

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop : 0}]}>NGO: </Text>
    <Text style={styles.incidentValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>Incident: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Cost: </Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('en-US', 
                        {style : 'currency',
                         currency: 'USD'})
                         .format(incident.value)}
                    </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the Day</Text>
                <Text style={styles.heroTitle}>Be The Hero of this Incident</Text>

                <Text style={styles.heroDescription}>Contact</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}