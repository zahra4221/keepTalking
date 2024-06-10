import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import SafeView from './SafeView';

const symbolColumns = [
  ['symbol1', 'symbol2', 'symbol3', 'symbol4', 'symbol5', 'symbol6', 'symbol7'],
  ['symbol8', 'symbol1', 'symbol7', 'symbol9', 'symbol10', 'symbol6', 'symbol11']
];

const symbolImages = {
  'symbol7': require('../assets/symbols/symbol7.jpeg'),
  'symbol8': require('../assets/symbols/symbol8.jpeg'),
  'symbol1': require('../assets/symbols/symbol1.jpeg'),
  'symbol6': require('../assets/symbols/symbol6.jpeg'),
  'symbol2': require('../assets/symbols/symbol2.jpeg'),
  'symbol4': require('../assets/symbols/symbol4.jpeg'),
  'symbol9': require('../assets/symbols/symbol9.jpeg'),
  'symbol5': require('../assets/symbols/symbol5.jpeg'),
  'symbol10': require('../assets/symbols/symbol10.jpeg'),
  'symbol3': require('../assets/symbols/symbol3.jpeg'),
  'symbol11': require('../assets/symbols/symbol11.jpeg'),
};

const symbolKeys = Object.keys(symbolImages);

const SymbolPage = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [orderedSymbols, setOrderedSymbols] = useState([]);

  const handleSymbolSelect = (symbol) => {
    if (selectedSymbols.includes(symbol)) {
      const newSelectedSymbols = selectedSymbols.filter(item => item !== symbol);
      setSelectedSymbols(newSelectedSymbols);
    } else if (selectedSymbols.length < 4) {
      const newSelectedSymbols = selectedSymbols.concat(symbol);
      setSelectedSymbols(newSelectedSymbols);
    }
  };

  const handleGoButtonClick = () => {
    const orderedSymbolsList = [];
    const uniqueSelectedSymbols = Array.from(new Set(selectedSymbols)); 
    for (let col of symbolColumns) {
      for (let symbol of col) {
        if (uniqueSelectedSymbols.includes(symbol) && !orderedSymbolsList.includes(symbol)) {
          orderedSymbolsList.push(symbol);
        }
      }
    }
    setOrderedSymbols(orderedSymbolsList);
  };

  useEffect(() => {
    if (selectedSymbols.length !== 4) {
      setOrderedSymbols([]);
    }
  }, [selectedSymbols]);

  return (
    <SafeView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Symboles</Text>
        <View style={styles.grid}>
          {symbolKeys.map((symbol, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageContainer,
                selectedSymbols.includes(symbol) && styles.selectedImageContainer,
              ]}
              onPress={() => handleSymbolSelect(symbol)}
            >
              <Image source={symbolImages[symbol]} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        {selectedSymbols.length === 4 && (
          <Button title="Go" onPress={handleGoButtonClick} />
        )}
        {orderedSymbols.length > 0 && (
          <View style={styles.orderedContainer}>
            <Text style={styles.orderedTitle}>Ordre</Text>
            <View style={styles.orderedGrid}>
              {orderedSymbols.map((symbol, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={symbolImages[symbol]} style={styles.image} />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedImageContainer: {
    borderColor: 'green',
    borderWidth: 3,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  orderedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  orderedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default SymbolPage;
