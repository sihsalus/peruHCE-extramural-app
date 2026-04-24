import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';


//Dummy Data
import patientListDummy from "@Utils/dummy/ListPatientsDummy.json"; 
import { PatientListTableDB } from '@Components/PatientListTable';

//SQL Lite Screen
import { useSQLiteContext } from 'expo-sqlite';

export default function PatientListScreen() {

    const db = useSQLiteContext();
    
    //Patient List Data
    const [patients, setPatients] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filteredPatients = patients.filter((patient) => {
        if (searchText.trim() === "") return true;

        const searchableText = [
            patient.dni,
            patient.givenName,
            patient.middleName,
            patient.paternalLastName,
            patient.maternalLastName,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(searchText.trim().toLowerCase());
    });

    const consultPatients = async () => {
        
        try {          
            setLoading(true); 

            let patientList = await db.getAllAsync(`SELECT * FROM Patient WHERE active = '1';`);

            setPatients(patientList);
            
            setError(null);

        } catch (err) {
          setError(err.message || 'Failed to consult data');
          console.error('Error consulting data:', err);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        consultPatients();
    }, []);

    return (
        <View style={styles.container}>            
            {loading ? (
                <Text style={styles.alert}>
                    Cargando ...
                </Text>
            ) : (          
                patients.length === 0 ? (
                    <View style={styles.alertContainer}>
                        <Text style={styles.alert}>
                            No hay pacientes cargados en el dispositivo
                        </Text> 
                    </View>                    
                ) : (
                    <View>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar paciente..."
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View>
                        <PatientListTableDB patientList={filteredPatients} />
                    </View>
                )
            ) }            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    searchInput: {
        height: 42,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        fontSize: 16,
    },
    alertContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    alert: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
  });