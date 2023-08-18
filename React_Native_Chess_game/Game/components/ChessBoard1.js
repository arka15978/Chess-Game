import React from 'react'
import { View, StyleSheet,Text } from 'react-native'

const ChessBoard = ()=>{
    return (
        <View>
            
        
        <View style={styles.container}>
            <View
              //key={`${row}-${col}`}
              style={styles.square}/>
                
          
    </View> 
    </View>
    
      )
}

const styles = StyleSheet.create({
    container: {
      width : 400,
      height : 400,
      flexDirection: 'row',
      flexWrap: 'wrap'
      
    },
    square: {

      height : '12.5%', 
      width: '12.5%',
      aspectRatio: 1,
      backgroundColor : 'red'
    },
  });
export default ChessBoard
