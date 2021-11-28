import React from 'react';
import { View, StyleSheet } from "react-native";

const Cross = () => {
    return (
        <View style={styles.cross}>
            <View style={styles.crossLine}/>  
            <View style={[styles.crossLine, styles.crossLineReverse]} />
        </View>
    );
};

const styles = StyleSheet.create({
    cross:{
        flex:1,
    },
    crossLine:{
        position:'absolute',
        left:'45%',
        width:10,
        height:'100%',
        backgroundColor:'white',
        borderRadius:5,
        transform:[{
            rotate:'45deg',
        }],
    },
    crossLineReverse:{
        transform:[{
            rotate:'-45deg',
        }],
    },
});

export default Cross;