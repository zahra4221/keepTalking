import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SafeView from './SafeView';

const MemoryGame = () => {
  const [screenNumber, setScreenNumber] = useState('');
  const [buttons, setButtons] = useState(['1', '1', '1', '1']);
  const [results, setResults] = useState([]);
  const [step, setStep] = useState(1);
  const [goPressed, setGoPressed] = useState(false);

  const handleGo = () => {
    let result = { position: 0, value: 0 };
    const screen = parseInt(screenNumber);
    const btns = buttons.map(b => parseInt(b));

    switch (step) {
      case 1:
        if (screen === 1 || screen === 2) result = { position: 2, value: btns[1] };
        else if (screen === 3) result = { position: 3, value: btns[2] };
        else if (screen === 4) result = { position: 4, value: btns[3] };
        break;
      case 2:
        if (screen === 1) result = { position: btns.indexOf(4) + 1, value: 4 };
        else if (screen === 2 || screen === 4) {
          const firstStepPosition = results[0].position;
          const firstStepValue = results[0].value;
          result = { position: firstStepPosition, value: btns[firstStepPosition - 1] };
        } else if (screen === 3) result = { position: 1, value: btns[0] };
        break;
        case 3:
          if (screen === 1) {
            const secondStepValue = results[1].value;
            result = { position: btns.indexOf(secondStepValue) + 1, value: secondStepValue };
          } else if (screen === 2) {
            const firstStepValue = results[0].value;
            result = { position: btns.indexOf(firstStepValue) + 1, value: firstStepValue };
          } else if (screen === 3) {
            result = { position: 3, value: btns[2] };
          } else if (screen === 4) {
            result = { position: btns.indexOf(4) + 1, value: 4 };
          }
          break;
          case 4:
        if (screen === 1) {
          const firstStepPosition = results[0].position;
          result = { position: firstStepPosition, value: btns[firstStepPosition - 1] };
        } else if (screen === 2) {
          result = { position: 1, value: btns[0] };
        } else if (screen === 3 || screen === 4) {
          const secondStepPosition = results[1].position;
          result = { position: secondStepPosition, value: btns[secondStepPosition - 1] };
        }
        break;
        case 5:
        if (screen === 1) {
          const firstStepValue = results[0].value;
          result = { position: btns.indexOf(firstStepValue) + 1, value: firstStepValue };
        } else if (screen === 2) {
          const secondStepValue = results[1].value;
          result = { position: btns.indexOf(secondStepValue) + 1, value: secondStepValue };
        } else if (screen === 3) {
          const fourthStepValue = results[3].value;
          result = { position: btns.indexOf(fourthStepValue) + 1, value: fourthStepValue };
        } else if (screen === 4) {
          const thirdStepValue = results[2].value;
          result = { position: btns.indexOf(thirdStepValue) + 1, value: thirdStepValue };
        }
        break;
    }

    const newResults = [...results];
    newResults[step - 1] = result;
    setResults(newResults);
    setGoPressed(true);
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      setScreenNumber('');
      setButtons(['1', '1', '1', '1']);
      setGoPressed(false);
    }
  };

  const handleRestart = () => {
    setScreenNumber('');
    setButtons(['1', '1', '1', '1']);
    setResults([]);
    setStep(1);
    setGoPressed(false);
  };

  const isGoDisabled = !screenNumber || buttons.some(button => button === '');

  return (
    <SafeView>

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Memory Game - Étape {step}</Text>
      <Text style={styles.label}>Numéro de l'écran :</Text>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4].map(num => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberButton,
              screenNumber === num.toString() && styles.selectedNumberButton,
            ]}
            onPress={() => setScreenNumber(num.toString())}
          >
            <Text style={styles.numberButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Numéros des boutons :</Text>
      <View style={styles.pickerContainer}>
        {buttons.map((btn, index) => (
          <View key={index} style={styles.pickerWrapper}>
            <Picker
              selectedValue={btn}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newButtons = [...buttons];
                newButtons[index] = itemValue;
                setButtons(newButtons);
              }}
            >
              {[1, 2, 3, 4].map(num => (
                <Picker.Item key={num} label={`${num}`} value={num.toString()} />
              ))}
            </Picker>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.goButton, isGoDisabled && styles.goButtonDisabled]}
        onPress={handleGo}
        disabled={isGoDisabled}
      >
        <Text style={styles.goButtonText}>Go</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.nextButton, !goPressed && styles.goButtonDisabled]}
        onPress={handleNextStep}
        disabled={!goPressed}
      >
        <Text style={styles.goButtonText}>Étape suivante</Text>
      </TouchableOpacity>
      {results.map((result, index) => (
        <Text key={index} style={styles.result}>
          Étape {index + 1} : Appuyez sur le chiffre {result?.value} (position {result?.position})
        </Text>
      ))}
      {step > 4 && (
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartButtonText}>Recommencer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  numberButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 50,
  },
  selectedNumberButton: {
    backgroundColor: 'gray',
  },
  numberButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 120,
    width: '100%',
  },
  goButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    marginBottom: 20,
  },
  goButtonDisabled: {
    backgroundColor: 'lightgray',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  nextButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    marginBottom: 20,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  restartButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MemoryGame;
