import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';
import Cell from './src/components/Cell';

const emptyMap = [
  ['','',''], // 1st row
  ['','',''], // 2nd row
  ['','',''], // 3rd row
]

export default function App() {
  const [map, setMap] = useState(emptyMap);
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

    // change player turn 'x -> o' or 'o -> x'
    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');
    const winner =getWinner();
    if (winner){
      gameWon(winner)
    } else {
      checkTieState();
    }
  };

  const getWinner = () => {
    // check rows
    for (let i = 0; i< 3; i++){
      const isRowXWinning = map[i].every((cell) => cell === 'x');
      const isRowOWinning = map[i].every((cell) => cell === 'o');

      if(isRowXWinning){
        return 'X';
      }
      if(isRowOWinning){
        return 'O';
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
      
      if(isColumnXWinning){
        return 'X';
      }
      if(isColumnOWinning){
       return 'O';
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
    if (isDiagonal1OWinning || isDiagonal2OWinning){
      return 'O';
      // Alert.alert('O won. Diagonal');
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning){
      return 'X'
      // Alert.alert('X won. Diagonal');
    }
  }; 

  const checkTieState = () => {
    if(!map.some((row) => row.some((cell) => cell === ""))){
      Alert.alert(`Too bad`,`it's Tie`, [
        {
          text: 'Restart',
          onPress:resetGame
        },
      ]);
    }
  };

  const gameWon = (player) => {
    Alert.alert(`Nice!`, `Player ${player} won`, [
      {
        text: 'Restart',
        onPress:resetGame,
      },
    ]);
  };

  const resetGame = () => {
    setMap([
      ['','',''], // 1st row
      ['','',''], // 2nd row
      ['','',''], // 3rd row
    ]);
    setCurrentTurn("x");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text style={styles.textTurn}>
          Current Turn : {currentTurn}
        </Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) =>(
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) =>(
                <Cell 
                  key={`row-${rowIndex}-col-${columnIndex}`}
                  cell={cell} 
                  onPress={() => onPress(rowIndex, columnIndex)} 
                />
              ))}
            </View>
          ))}
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
  textTurn:{
    fontSize: 24,
    color: "white",
    top: 50,
    position: "absolute",
  },
  map:{
    width:'80%',
    aspectRatio:1,
  },
  row:{
    flex:1,
    flexDirection:'row',
  },
  
});
