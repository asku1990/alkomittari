import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { useState } from 'react';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottle, setBottle] = useState(0);
  const [time, setTime] = useState(0);
  const [bloodLevel, setBloodLevel] = useState(0);
  const [gender, setGender] = useState('male');

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]

  const times = [
    {label: '1h', value: 1},
    {label: '2h', value: 2},
    {label: '3h', value: 3},
    {label: '4h', value: 4},
    {label: '5h', value: 5},
    {label: '6h', value: 6},
    {label: '7h', value: 7},
    {label: '8h', value: 8},
    {label: '9h', value: 9},
    {label: '10h', value: 10},
  ]

  const bottles = [
    {label: '1kpl', value: 1},
    {label: '2kpl', value: 2},
    {label: '3kpl', value: 3},
    {label: '4kpl', value: 4},
    {label: '5kpl', value: 5},
    {label: '6kpl', value: 6},
    {label: '7kpl', value: 7},
    {label: '8kpl', value: 8},
    {label: '9kpl', value: 9},
    {label: '1kpl', value: 10},
  ]

  function calculate() {
      let result = 0
      let litres = 0
      let grams = 0
      let burning = 0
      let gramsLeft = 0

      litres = bottle * 0.33
      grams = litres * 8 * 4.5  
      burning = weight / 10;
      gramsLeft = grams - (burning * time);

      if (gender === 'male'){
        result = gramsLeft / (weight * 0.7)
      } else {
        result = gramsLeft / (weight * 0.6)
      }
      if (result > 0){
        setBloodLevel(result)
      } else{
        setBloodLevel(0)
      }      
      //testitesti
  }

  return (
    <View style={styles.container}>
      <Text>Weight:</Text>
      <TextInput onChangeText={text => setWeight(text.replace(',','.'))}  style={styles.field} keyboardType='decimal-pad'placeholder='Syötä paino'/>

      <Text>Botles:</Text>
      <Picker selectedValue={bottle} onValueChange={(itemValue) => setBottle(itemValue)} >
      {
        bottles.map((bottles, index) => {
          return <Picker.Item key={index} label={bottles.label} value={bottles.value} />
      })
    }  
    </Picker>

      <Text>Time:</Text>     
      <Picker selectedValue={time} onValueChange={(itemValue) => setTime(itemValue)} >
      {
        //ylemmässä pikkerissä on aaltosulut jotka vaativat return käskyn, alemmassa on normaalit sulut
        times.map((times, index) => (
          <Picker.Item key={index} label={times.label} value={times.value} />
        ))
    } 
    </Picker>

      <Text>Gender</Text>
      <RadioForm
      buttonSize={10}
      radio_props={genders}
      initial={0}
      onPress={(value) => setGender(value)}
      />

      <Text  >Blood alcohol level</Text>
      <Text  >{bloodLevel.toFixed(2)}%</Text>
     
      <Button title="Calculate" onPress={calculate}/>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
});
