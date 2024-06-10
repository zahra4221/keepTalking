import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SafeView from './SafeView';

const Homepage = () => {
  return (
    <SafeView> 
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.firstStepZone}>
          <Text style={styles.header}>Cliquer sur le bouton et relacher immédatement</Text>
          <View style={styles.firstCase}>
            <View style={styles.easyCase}>
              <View style={styles.condition}>
                <Text>Si</Text>
              </View>
              <View style={[styles.button, styles.red]}>
                <Text>Maintenir</Text>
              </View>
            </View>
            <View style={styles.pilesCase}>
              <View style={styles.else}>
                <Text>Ou</Text>
              </View>
              <View>
                <Text style={styles.explose}>"Exploser" et 3 Piles ou +</Text>
                <Text style={styles.frk}>FRK et 2 Piles ou +</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondStepZone}>
          <Text style={styles.header}>Restez appuyé sur le bouton et relacher quand le numéro correspondant est affiché dans le chrono</Text>
          <View style={styles.cases}>
            <View style={[styles.case, styles.blueCase]}>
              <View style={[styles.colorTag, styles.colorTagBlue]}>
                <Text>bleu</Text>
              </View>
              <View style={styles.value}>
                <Text>4</Text>
              </View>
            </View>
            <View style={[styles.case, styles.yellowCase]}>
              <View style={[styles.colorTag, styles.colorTagYellow]}>
                <Text>jaune</Text>
              </View>
              <View style={styles.value}>
                <Text>5</Text>
              </View>
            </View>
            <View style={[styles.case, styles.elseCase]}>
              <View style={[styles.colorTag, styles.colorTagOther]}>
                <Text>autre</Text>
              </View>
              <View style={styles.value}>
                <Text>1</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  firstStepZone: {
    marginBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  firstCase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  easyCase: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  condition: {
    marginRight: 8,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  red: {
    backgroundColor: 'red',
  },
  pilesCase: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  else: {
    marginBottom: 8,
  },
  explose: {
    marginBottom: 4,
  },
  frk: {
    marginBottom: 4,
  },
  secondStepZone: {
    marginTop: 24,
  },
  cases: {
    flexDirection: 'column',
  },
  case: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorTag: {
    padding: 4,
    borderRadius: 3,
    marginRight: 8,
  },
  colorTagBlue: {
    backgroundColor: 'blue',
  },
  colorTagYellow: {
    backgroundColor: 'yellow',
  },
  colorTagOther: {
    backgroundColor: 'gray',
  },
  value: {
    fontSize: 18,
  },
});

export default Homepage;
