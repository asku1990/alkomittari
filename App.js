import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useCallback } from 'react';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottle, setBottle] = useState(0);
  const [time, setTime] = useState(0);
  const [bloodLevel, setBloodLevel] = useState(0);
  const [gender, setGender] = useState('male');

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  const [times, setTimes] = useState([
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
  ]);

  const [bottles, setBottles] = useState([
    {label: '1kpl', value: 1},
    {label: '2kpl', value: 2},
    {label: '3kpl', value: 3},
    {label: '4kpl', value: 4},
    {label: '5kpl', value: 5},
    {label: '6kpl', value: 6},
    {label: '7kpl', value: 7},
    {label: '8kpl', value: 8},
    {label: '9kpl', value: 9},
    {label: '10kpl', value: 10},
  ]);

  function calculate() {
      let result = 0
      let litres = 0
      let grams = 0
      let burning = 0
      let gramsLeft = 0

      console.log(bottle, "bottle")
      console.log(time, "time")
      console.log(weight, "weight")

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
      const onOpen = useCallback(() => {
        setOpen1(false);
      }, []);
      const onOpen1 = useCallback(() => {
        setOpen(false);
      }, []);
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text>Weight:</Text>
      <TextInput onChangeText={text => setWeight(text.replace(',','.'))}  style={styles.field} keyboardType='decimal-pad'placeholder='Syötä paino'/>

      <Text>Botles:</Text>
      <View style={styles.DropDownPicker}>
        <DropDownPicker
        open={open}
        onOpen={onOpen}
        value={bottle}
        items={bottles}
        setOpen={setOpen}
        setValue={setBottle}
        setItems={setBottles}

        dropDownStyle={{backgroundColor: '#00ffff'}}
        itemStyle={{justifyContent: 'flex-start|flex-end|center'}}
        
        />
      </View>

      <Text>Time:</Text>    
      <View style={styles.DropDownPicker}>
        <DropDownPicker
        open={open1}
        onOpen={onOpen1}
        value={time}
        items={times}
        setOpen={setOpen1}
        setValue={setTime}
        setItems={setTimes}
        />
      </View>

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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffff',
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  DropDownPicker:{
    width: 150,
    flex: 1,
    backgroundColor: '#00ffff',
    marginTop: 10,
    zIndex: 10,
  },
});
