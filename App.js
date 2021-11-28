import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';

export default function App() {
  const [map, setMap] = useState([
    ['','',''], // 1st row
    ['','',''], // 2nd row
    ['','',''], // 3rd row
  ]);
  const [currentTurn,setCurrentTurn] = useState("x");

  const onPress= (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== ""){
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap)=>{
      const updateMap = [...existingMap];
      updateMap[rowIndex][columnIndex] = currentTurn;
      return updateMap;
    });

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');
    checkWinningState();
  };

  const checkWinningState = () => {
    // check rows
    for (let i = 0; i< 3; i++){
      const isRowXWinning = map[i].every((cell) => cell === 'x');
      const isRowOWinning = map[i].every((cell) => cell === 'o');

      if(isRowXWinning){
        Alert.alert(`X won. Row: ${i}`);
      }
      if(isRowOWinning){
        Alert.alert(`O won. Row: ${i}`);
      }
    }

    // check columns

    for(let col = 0; col < 3; col++){
      let isColumnXWinning = true;
      let isColumnOWinning= true;

      for (let row = 0; row < 3; row++){
        if (map[row][col] !== 'x'){
          isColumnXWinning = false;
        }
        if (map[row][col] !== 'o'){
          isColumnOWinning = false;
        }
      }
      
      // message alert for column winning
      if(isColumnXWinning){
        Alert.alert(`X won. Col: ${col}`);
      }
      if(isColumnOWinning){
        Alert.alert(`O won. Col: ${col}`);
      }

    }

    // check diagonals
    
    let isDiagonal1OWinning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;
    
    for(let i = 0; i < 3; i++){

      // check diagonal no1: [0][0], [1][1], [2][2] if they're different, not win
      if (map[i][i] !== 'o'){
        isDiagonal1OWinning = false;
      }
      if (map[i][i] !== 'x'){
        isDiagonal1XWinning = false;
      }

      // check diagonal no2: [0][2], [1][1], [2][0] if they're different, not win
      if (map[i][2-i] !== 'o'){
        isDiagonal2OWinning = false;
      }
      if (map[i][2-i] !== 'x'){
        isDiagonal2XWinning = false;
      }
    }

    // message alert for diagonal winning
    if (isDiagonal1OWinning){
      Alert.alert('O won. Diagonal 1');
    }
    if (isDiagonal1XWinning){
      Alert.alert('X won. Diagonal 1');
    }
    if (isDiagonal2OWinning){
      Alert.alert('O won. Diagonal 2');
    }
    if (isDiagonal2XWinning){
      Alert.alert('X won. Diagonal 2');
    }
  } 


  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {map.map((row, rowIndex) =>(
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) =>(
                <Pressable key={`row-${rowIndex}-col-${columnIndex}`} onPress={() => onPress(rowIndex,columnIndex)} style={styles.cell}>
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
