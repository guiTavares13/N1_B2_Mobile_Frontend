import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, Alert } from "react-native";
import { format } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getWorkers } from "../services/workerApiFunctions.js";
import { registerAppointment } from '../services/appointmentApiFunctions.js'
import WorkerContext from "../middlewares/WorkerContext.js";
import UserContext from "../middlewares/UserContext.js";
import ProductsContext from "../middlewares/ProductsContext.js";
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HiringScreen() {
    const route = useRoute();
    const { product } = route.params;
    const navigation = useNavigation();

    const { workerContext, setWorkerContext } = useContext(WorkerContext);
    const { userContext, setUserContext } = useContext(UserContext);
    const { productsContext, setProductsContext } = useContext(ProductsContext);

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedTime, setSelectedTime] = useState('');
    const [showPicker, setShowPicker] = useState(false);


    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    console.log('Usercontext', userContext);
    console.log('ProductContext', productsContext);

    useEffect(() => {
        loadAvailableEmployees();
    }, []);

    function handleTimeChange(event, selectedDate) {
        if (selectedDate !== undefined) {
            setDate(selectedDate);
        }
        setShowPicker(false);
        setShowDatePicker(false);
    }


    const toggleEmployeeSelection = (employee) => {
        if (selectedEmployees.includes(employee)) {
            setSelectedEmployees(selectedEmployees.filter(e => e.id !== employee.id));
        } else {
            setSelectedEmployees([...selectedEmployees, employee]);
            setSelectedWorker(employee);
        }
    };

    const setSelectedWorker = (employee) => {
        setWorkerContext(employee);
    };

    async function loadAvailableEmployees() {
        try {
            const response = await getWorkers();

            if (response.success) {
                setAvailableEmployees(response.data);
                setWorkerContext(response.data);
            } else {
                throw new Error("Erro ao buscar funcionarios");
            }
        } catch (error) {
            console.error("Erro ao carregar funcionários disponíveis:", error);
        }
    }

    const handleConfirmHire = async () => {

        const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');

        const appointment = {
            user_id: userContext.id,
            worker_id: workerContext.id,
            product_id: productsContext.id,
            date_time: formattedDate,
            createdAt: formattedDate,
            updatedAt: formattedDate,
        };


        const response = await registerAppointment(appointment);
        if (response.success) {
            Alert.alert("Agendamento cadastrado com sucesso!");
            navigation.navigate("Home");
        } else {
            throw new Error("Erro ao registrar agendamento");
        }

    };

    function handleDateChange(day) {
        setDate(day.dateString);
    }

    function showTimePicker() {
        if (showPicker) {
            return (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            );
        }
        return null;
    }

    function showDatePickerComponent() {
        if (showDatePicker) {
            return (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleTimeChange}
                />);
        }
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione a data e escolha o terapeuta</Text>

            <View style={styles.calendarContainer}>
                {/* Adicione o botão e chame a função showDatePickerComponent */}
                <TouchableHighlight
                    onPress={() => setShowDatePicker(true)}
                    style={styles.datePickerButton}
                    underlayColor="#DDDDDD"
                >
                    <View style={styles.buttonWithIcon}>
                        <Icon name="calendar" size={18} color="#FFFFFF" />
                        <Text style={styles.datePickerButtonText}>Escolher data</Text>
                    </View>
                </TouchableHighlight>

                {showDatePickerComponent()}

                <View style={styles.container}>
                    {/* ... other components ... */}
                    <TouchableHighlight
                        onPress={() => setShowPicker(true)}
                        style={styles.timePickerButton}
                        underlayColor="#DDDDDD"
                    >
                        <View style={styles.buttonWithIcon}>
                            <Icon name="clock-o" size={18} color="#FFFFFF" />
                            <Text style={styles.timePickerButtonText}>Escolher hora</Text>
                        </View>
                    </TouchableHighlight>

                    {showTimePicker()}
                </View>
            </View>

            {availableEmployees.map((employee) => (
                <TouchableOpacity key={employee.id} onPress={() => toggleEmployeeSelection(employee)}>
                    <Text>{employee.name}</Text>
                </ TouchableOpacity>
            ))}


            <TouchableOpacity onPress={handleConfirmHire} style={styles.hireButton}>
                <Text style={styles.hireButtonText}>Confirmar Contratação</Text>
            </ TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        alignItems: "center",
        padding: 16,
    },
    datePickerButton: {
        backgroundColor: "#4a90e2",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 150,
        marginBottom: 16,
    },
    datePickerButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    calendarContainer: {
        marginBottom: 24,
        width: '100%',
    },
    datePickerContainer: {
        marginBottom: 24,
    },
    timePickerButton: {
        backgroundColor: "#4a90e2",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 5,
        width: '90%',
        height: '40%',
        alignItems: "center", // Adicione esta linha
        justifyContent: "center", // Adicione esta linha
        minWidth: 150, // Adicione esta linha
        marginBottom: 16,
    },
    timePickerButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },

    dateInput: {
        borderRadius: 5,
        borderColor: "#ccc",
        height: 40,
        backgroundColor: "#FFFFFF",
    },
    dateText: {
        fontSize: 16,
        color: "#000",
    },
    employeeList: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
    },
    employeeItem: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    employeeName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    hireButton: {
        backgroundColor: "#4a90e2",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 5,
        marginBottom: 16,
    },
    hireButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
