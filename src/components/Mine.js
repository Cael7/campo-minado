import React from "react";
import { View, StyleSheet } from "react-native";

export default (props) => {
  return (
    <View style={style.container}>
      <View style={style.coreMine} />
      <View style={style.line} />
      <View style={[style.line, { transform: [{ rotate: "45deg" }] }]} />
      <View style={[style.line, { transform: [{ rotate: "90deg" }] }]} />
      <View style={[style.line, { transform: [{ rotate: "135deg" }] }]} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  coreMine: {
    height: 14,
    width: 14,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    height: 3,
    width: 20,
    borderRadius: 3,
    backgroundColor: "black",
  },
});
