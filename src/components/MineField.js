import React from "react";
import { View, StyleSheet } from "react-native";
import Field from "./Field";

const MineField = (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => (
      <Field
        key={c}
        opened={field.opened}
        flagged={field.flagged}
        exploded={field.exploded}
      >
        {field.nearMines}
      </Field>
    ));
    return <View key={r}>{columns}</View>;
  });

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EEE",
  },
});

export default MineField;
