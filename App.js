import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import params from "./src/params";
import MineField from "./src/components/MineField";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from "./src/function";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Perdeeeeu!", "Que Buuuuurro!", [
        { text: "Reiniciar", onPress: () => this.resetGame() },
      ]);
    }

    if (won) {
      Alert.alert("Parabens!", "Voce venceu!!!", [
        { text: "Reiniciar", onPress: () => this.resetGame() },
      ]);
    }

    this.setState({ board, lost, won });
  };

  resetGame = () => {
    this.setState(this.createState());
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Campo Minado!</Text>
        <Text style={styles.instructions}>
          Tamanho da Grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
        </View>
        <Button title="Começar Novamente" onPress={this.resetGame} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
