import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import bg from './assets/bg.jpeg';

export default function App() {
  const [map, setMap] = useState([
    ['o','','o'], // 1st row
    ['x','x',''], // 2nd row
    ['o','',''], // 3rd row
  ]);
  
  const onPress= (rowIndex, columnIndex) => {
    console.warn("hello", rowIndex, columnIndex);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {map.map((row, rowIndex) =>(
            <View style={styles.row}>
              {row.map((cell, columnIndex) =>(
                <Pressable onPress={() => onPress(rowIndex,columnIndex)} style={styles.cell}>
                  {cell === 'o' && <View style={styles.circle} />}
                  {cell === 'x' && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine}/>  
                      <View style={[styles.crossLine, styles.crossLineReverse]} />
                  </View>
                  )}
                </Pressable>
              ))}
            </View>
            
          ))}


          {/* <View style={styles.circle} />

          <View style={styles.cross}>
            <View style={styles.crossLine}/>  
            <View style={[styles.crossLine, styles.crossLineReverse]} />
          </View> */}
        </View>
         
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242D34',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  bg:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:15,
  },
  map:{
    borderWidth:1,
    borderColor:'white',
    width:'80%',
    aspectRatio:1,
  },
  row:{
    flex:1,
    flexDirection:'row',
  },
  cell:{
    width:100,
    height:100,
    flex:1,

    borderColor:'white',
    borderWidth:1,
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
