import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
  cerrarModal,
  modalVisible,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [email, setEmail] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setEmail(pacienteObj.email);
      setPropietario(pacienteObj.propietario);
      setTelefono(pacienteObj.telefono);
      setSintomas(pacienteObj.sintomas);
      setFecha(pacienteObj.fecha);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      nuevoPaciente.id = id;

      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );

      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    cerrarModal();
    setId('');
    setPaciente('');
    setEmail('');
    setPropietario('');
    setTelefono('');
    setSintomas('');
    setFecha(new Date());
  };
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={Styles.contenido}>
        <ScrollView>
          <Text style={Styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={Styles.tituloBold}>Cita</Text>
          </Text>
          <Pressable
            style={Styles.btnCancelar}
            onPress={() => {
              cerrarModal();
              setPacienteApp({});
              setId('');
              setPaciente('');
              setEmail('');
              setPropietario('');
              setTelefono('');
              setSintomas('');
              setFecha(new Date());
            }}>
            <Text style={Styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>
          <View style={Styles.campo}>
            <Text style={Styles.label}>Nombre Paciente</Text>
            <TextInput
              style={Styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor="#666"
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>
          <View style={Styles.campo}>
            <Text style={Styles.label}>Email Propietario</Text>
            <TextInput
              style={Styles.input}
              placeholder="Email Propietario"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={Styles.campo}>
            <Text style={Styles.label}>Nombre Propietario</Text>
            <TextInput
              style={Styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor="#666"
              keyboardType="email-address"
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          <View style={Styles.campo}>
            <Text style={Styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={Styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>
          <View style={Styles.campo}>
            <Text style={Styles.label}>Fecha Alta</Text>
            <View style={Styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale="es"
                fadeToColor="none"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>
          <View style={Styles.campo}>
            <Text style={Styles.label}>Síntomas</Text>
            <TextInput
              style={[Styles.input, Styles.sintomasInput]}
              placeholder="Síntomas Paciente"
              placeholderTextColor="#666"
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={Styles.btnNuevaCita} onPress={handleCita}>
            <Text style={Styles.btnNuevaCitaTexto}>
              {pacienteObj.id ? 'Editar' : 'Agregar'} paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6d28d9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 10,
    backgroundColor: '#5827a4',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827a4',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 16,
  },
});

export default Formulario;
