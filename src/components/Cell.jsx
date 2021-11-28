import React from 'react';
import { View, StyleSheet, Pressable } from "react-native";
import Cross from './Cross';
const Cell = (props) => {
    const {cell, onPress} = props;
    return (
        <Pressable 
            onPress={() => onPress()} 
            style={styles.cell}
        >
            {cell === 'o' && <View style={styles.circle} />}
            {cell === 'x' && <Cross />}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cell:{
        width:100,
        height:100,
        flex:1,
      },
    circle:{
        flex:1,
        width:75,
        height:75,
        borderRadius: 50,
        borderWidth:10,
        borderColor:'white',
        margin:10,
      },
});

export default Cell;