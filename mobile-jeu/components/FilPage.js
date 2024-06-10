import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import SafeView from './SafeView';

const colors = ['red', 'white', 'blue', 'yellow', 'black'];

const Filpage = () => {
  const [numFils, setNumFils] = useState(3);
  const [filsColors, setFilsColors] = useState(Array(3).fill(''));
  const [lastDigitPair, setlastDigitPair] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    let redCount = 0;
    let blueCount = 0;
    let yellowCount = 0;
    let lastColor = filsColors[filsColors.length - 1];

    filsColors.forEach(color => {
      if (color === 'red') redCount++;
      if (color === 'blue') blueCount++;
      if (color === 'yellow') yellowCount++;
    });

    if (numFils === 3) {
      if (redCount === 0) {
        return 'Coupez le deuxième fil';
      } else if (lastColor === 'white') {
        return 'Coupez le dernier fil';
      } else if (blueCount > 1) {
        return 'Coupez le dernier fil bleu';
      } else {
        return 'Coupez le dernier fil';
      }
    } else if (numFils === 4) {
      if (redCount > 1 && lastDigitPair) {
        return 'Coupez le dernier fil rouge';
      } else if (lastColor === 'yellow' && redCount === 0) {
        return 'Coupez le premier fil';
      } else if (blueCount === 1) {
        return 'Coupez le premier fil';
      } else if (yellowCount > 1) {
        return 'Coupez le dernier fil';
      } else {
        return 'Coupez le deuxième fil';
      }
    }
  }, [filsColors, numFils, lastDigitPair]);

  const handleNumFilsChange = (num) => {
    setNumFils(num);
    setFilsColors(new Array(num).fill(''));
    setShowResult(false);
  };

  const handleColorChange = (index, color) => {
    const newColors = filsColors.slice();
    newColors[index] = color;
    setFilsColors(newColors);
    setShowResult(false);
  };

  const handleGoClick = () => {
    setShowResult(true);
  };

  return (
    <SafeView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Règle sur les fils</Text>
        <Text style={styles.instructions}>
          Un seul fil a besoin d'être coupé pour désarmer le module et les fils sont ordonnés de haut en bas.
        </Text>
        <Text style={styles.label}>Choisissez le nombre de fils:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.numFilsButton, numFils === 3 && styles.selectedButton]}
            onPress={() => handleNumFilsChange(3)}
          >
            <Text style={styles.buttonText}>3 Fils</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.numFilsButton, numFils === 4 && styles.selectedButton]}
            onPress={() => handleNumFilsChange(4)}
          >
            <Text style={styles.buttonText}>4 Fils</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filsContainer}>
          {filsColors.map((color, index) => (
            <View key={index} style={styles.fil}>
              <View style={[styles.filBox, { backgroundColor: color }]}>
                <Text style={styles.filText}>Fil {index + 1}</Text>
              </View>
              <View style={styles.colorButtons}>
                {colors.map((colorOption) => (
                  <TouchableOpacity
                    key={colorOption}
                    style={[styles.colorButton, { backgroundColor: colorOption }]}
                    onPress={() => handleColorChange(index, colorOption)}
                  >
                    <Text style={styles.colorButtonText}>{colorOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        <Button title="Go" onPress={handleGoClick} />
        {showResult && <Text style={styles.result}>Résultat: {result}</Text>}
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  numFilsButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  filsContainer: {
    marginBottom: 16,
  },
  fil: {
    marginBottom: 16,
  },
  filBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorButton: {
    padding: 8,
    borderRadius: 4,
  },
  colorButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Filpage;
