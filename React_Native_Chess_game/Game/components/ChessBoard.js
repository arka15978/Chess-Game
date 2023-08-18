import React, {useState} from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Image} from 'react-native'
const ChessBoard = () => {
    
    const [greenSquares, setGreenSquares] = useState(Array(64).fill(false))
    const [blueSquares, setBlueSquares] = useState(Array(64).fill(false))
    const [redSquares, setRedSquares] = useState(Array(64).fill(false))
    const squareTexts = ['BR','BK','BB','BQ','BKG','BB','BK','BR','BP','WP','WR','WK','WB','WQ','WKG','WB','WK','WR']
    const[texts,setTexts] = useState(squareTexts.slice(0,8).concat(Array(8).fill('BP'),Array(32).fill(''),Array(8).fill('WP'),squareTexts.slice(10,19)))
    const squareModifier = (possibleMoves,squareIndex)=>{
      
      if(possibleMoves.length != 0){setBlueSquares((prevState)=>{
        let updatedState = [...prevState]
        updatedState[squareIndex] = true
        return updatedState

      })
      setGreenSquares((prevState)=>{
        let updatedState = [...prevState]
        possibleMoves.forEach((index) => {
          updatedState[index] = true
          
        })
        return updatedState
      })}
      else{setRedSquares((prevState)=>{
        let updatedState = [...prevState]
        updatedState[squareIndex] = true
        return updatedState
      })
        

      }

    }
    const renderSquares = () => {
      const squares = []
      let i = 0
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const isDarkSquare = (row + col) % 2 === 1;
          let squareColor = isDarkSquare ? '#eeeed2' : '#769656'
          const textColor = isDarkSquare ? '#769656':'#eeeed2'
          const squareIndex = i
          if(greenSquares[squareIndex]){
            squareColor = 'green'
          }
          else if(blueSquares[squareIndex]){
            squareColor = 'blue'
          }
          else if(redSquares[squareIndex]){
            squareColor = 'red'
          }
          else{
            squareColor = squareColor
          }
          
          
          
          

          
          squares.push(
            <TouchableOpacity
              key={`${row}-${col}`}
              style={[styles.square, { backgroundColor: squareColor}]} onPress={()=>{
                if(greenSquares[squareIndex]){
                  console.log("A")
                  
                  const blue_index = blueSquares.indexOf(true)
                  console.log("B",blue_index)
                  setTexts((prevState)=>{
                    let updatedState = [...prevState]
                    updatedState[squareIndex] = prevState[blue_index]
                    updatedState[blue_index] = ''
                    return updatedState
                  })
                  
                  setGreenSquares(Array(64).fill(false))
                  setBlueSquares(Array(64).fill(false))

                }
                else{
                setGreenSquares(Array(64).fill(false))
                setBlueSquares(Array(64).fill(false))
                setRedSquares(Array(64).fill(false))
                
                let possibleMoves = []

                switch(texts[squareIndex]){
                  case 'WP':
                    console.log("P",squareIndex)
                    possibleMoves = []
                    if(parseInt(squareIndex/8) == 6 && texts[squareIndex - 16] == ''){
                      possibleMoves.push(squareIndex - 16)
                      
                    }
                    
                    if(squareIndex - 8 >= 0){

                    if(texts[squareIndex - 8] == ''){
                      
                      possibleMoves.push(squareIndex - 8)
                      }
                      if(parseInt((squareIndex - 9)/8) == parseInt((squareIndex - 8)/8) && texts[squareIndex - 9].startsWith('B')){
                        
                        possibleMoves.push(squareIndex - 9)
                        }
                      if(parseInt((squareIndex - 7)/8) == parseInt((squareIndex - 8)/8) && texts[squareIndex - 7].startsWith('B')){
                        
                        possibleMoves.push(squareIndex - 7)
                        }
                      }
                    
                    squareModifier(possibleMoves,squareIndex)
                    break;

                  case 'WR':
                    console.log("KL",squareIndex)
                    possibleMoves = []
                    
                    for(let j = squareIndex; j < 64; j += 8 ){
                      if (texts[j] != '' && j != squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      }

                    
                    for(let j = squareIndex; j>=0; j -= 8 ){
                      if (texts[j] != '' && j != squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(j != squareIndex){
                        possibleMoves.push(j)}}
                    for(let j = squareIndex; j<64; j+=1){
                      
                      if (texts[j] != '' && j != squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(parseInt((j+1)/8) != parseInt(j/8)){
                        if(j!= squareIndex){
                          possibleMoves.push(j)
                        break}
                        else{
                          break
                        }
    
                          }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                    }
                    for(let j = squareIndex; j>=0; j-=1){
                    
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(parseInt((j-1)/8) != parseInt(j/8)){
                        if(j!= squareIndex){
                          possibleMoves.push(j)
                        break}
                        else{
                          break
                        }
    
                          }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                      
                    }

                    squareModifier(possibleMoves,squareIndex)
                    break;
                  case 'WK':
                    console.log("KL",squareIndex,(squareIndex + 1)/8)
                    
                    possibleMoves = []
                    if(parseInt((squareIndex + 1)/8) == parseInt((squareIndex)/8) && squareIndex - 15 >=0 && (texts[squareIndex - 15].startsWith('B') || texts[squareIndex - 15] == '')){
                      possibleMoves.push(squareIndex - 15)

                    }
                    if(parseInt((squareIndex + 1)/8) == parseInt((squareIndex)/8) && squareIndex + 17 < 64 && (texts[squareIndex + 17].startsWith('B') || texts[squareIndex + 17] == '') ){
                      possibleMoves.push(squareIndex + 17)

                    }
                    if(parseInt((squareIndex  - 1)/8) == parseInt((squareIndex)/8) && squareIndex - 17 >= 0 && (texts[squareIndex - 17].startsWith('B') || texts[squareIndex - 17] == '') ){
                      possibleMoves.push(squareIndex - 17)

                    }
                    if(parseInt((squareIndex  - 1)/8) == parseInt((squareIndex)/8) && squareIndex + 15 < 64 && (texts[squareIndex + 15].startsWith('B') || texts[squareIndex + 15] == '') ){
                      possibleMoves.push(squareIndex + 15)

                    }
                    if(parseInt((squareIndex + 2)/8) == parseInt((squareIndex)/8) && squareIndex + 10 < 64 && (texts[squareIndex + 10].startsWith('B') || texts[squareIndex + 10] == '') ){
                      possibleMoves.push(squareIndex + 10)

                    }
                    if(parseInt((squareIndex + 2)/8) == parseInt((squareIndex)/8) && squareIndex - 6 >= 0 && (texts[squareIndex - 6].startsWith('B') || texts[squareIndex - 6] == '') ){
                      possibleMoves.push(squareIndex - 6)

                    }
                    if(parseInt((squareIndex - 2)/8) == parseInt((squareIndex)/8) && squareIndex - 10 >= 0 && (texts[squareIndex - 10].startsWith('B') || texts[squareIndex - 10] == '') ){
                      possibleMoves.push(squareIndex - 10)

                    }
                    if(parseInt((squareIndex - 2)/8) == parseInt((squareIndex)/8) && squareIndex + 6 < 64 && (texts[squareIndex + 6].startsWith('B') || texts[squareIndex + 6] == '') ){
                      possibleMoves.push(squareIndex + 6)

                    }
                    squareModifier(possibleMoves,squareIndex)
                    break
                  case 'WB':
                    console.log("KL",squareIndex)
                    possibleMoves = []
                    
                    for(let j = squareIndex; (j >= 0); j -= 7){
                      
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j-7)/8) == parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                        
                    }
                    for(let j = squareIndex; (j < 64); j += 9){
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j+9)/8) - parseInt(j/8) == 2){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                    }
                    for(let j = squareIndex; (j >= 0); j -= 9){
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j-9)/8) - parseInt(j/8) == -2){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                    }
                    for(let j = squareIndex; (j < 64); j += 7){
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j+7)/8) == parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                    }
                    squareModifier(possibleMoves,squareIndex)
                    break
                  case 'WQ':
                    console.log("KL",squareIndex)
                    possibleMoves = []
                    for(let j = squareIndex; j < 64; j += 8 ){
                      if (texts[j] != '' && j != squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      }

                    
                    for(let j = squareIndex; j>=0; j -= 8 ){
                      if (texts[j] != '' && j != squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(j != squareIndex){
                        possibleMoves.push(j)}}
                    for(let j = squareIndex; j<64; j+=1){
                      
                      if (texts[j] != '' && j != squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(parseInt((j+1)/8) != parseInt(j/8)){
                        if(j!= squareIndex){
                          possibleMoves.push(j)
                        break}
                        else{
                          break
                        }
    
                          }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                    }
                    for(let j = squareIndex; j>=0; j-=1){
                    
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                        break}
                        else{
                          break}}
                      if(parseInt((j-1)/8) != parseInt(j/8)){
                        if(j!= squareIndex){
                          possibleMoves.push(j)
                        break}
                        else{
                          break
                        }
    
                          }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                      
                    }
                    for(let j = squareIndex; (j >= 0); j -= 7){
                      
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j-7)/8) == parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                        
                    }
                    for(let j = squareIndex; (j < 64); j += 9){
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j+9)/8) - parseInt(j/8) == 2){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                    }
                    for(let j = squareIndex; (j >= 0); j -= 9){
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j-9)/8) - parseInt(j/8) == -2){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                    }
                    for(let j = squareIndex; (j < 64); j += 7){
                      if (texts[j] != '' && j!=squareIndex){
                        if(texts[j].startsWith('B')){
                          possibleMoves.push(j)
                          break}
                        else{
                          break}}
                        if(parseInt((j+7)/8) == parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                            break}
                            else{
                              break
                            }
        
                              }
                      if(j != squareIndex){
                        possibleMoves.push(j)}
                      
                    }
                    
                    squareModifier(possibleMoves,squareIndex)
                    break
                  case 'WKG':
                    console.log("KL",squareIndex)
                    console.log("T",texts[squareIndex-8])
                    possibleMoves = []
                    if(squareIndex - 8 >= 0 && (texts[squareIndex - 8].startsWith('B') || texts[squareIndex - 8] == '')){
                      possibleMoves.push(squareIndex - 8)

                    }
                    if(squareIndex + 8 < 64 && (texts[squareIndex + 8].startsWith('B') || texts[squareIndex + 8] == '')){
                      possibleMoves.push(squareIndex + 8)

                    }
                    if(squareIndex + 1 < 64 && parseInt((squareIndex + 1)/8) == parseInt(squareIndex/8) && (texts[squareIndex + 1].startsWith('B') || texts[squareIndex + 1] == '')) {
                      possibleMoves.push(squareIndex + 1)

                    }
                    if(squareIndex - 1 >= 0 && parseInt((squareIndex - 1)/8) == parseInt(squareIndex/8) && (texts[squareIndex - 1].startsWith('B') || texts[squareIndex - 1] == '')) {
                      possibleMoves.push(squareIndex - 1)

                    }
                    if(squareIndex - 7 >= 0 && parseInt((squareIndex-7)/8) != parseInt((squareIndex/8))  && (texts[squareIndex - 7].startsWith('B') || texts[squareIndex - 7] == '')){
                      possibleMoves.push(squareIndex-7)
                    }
                    if(squareIndex + 9 < 64 && parseInt((squareIndex + 9)/8) - parseInt(squareIndex/8) != 2  && (texts[squareIndex + 9].startsWith('B') || texts[squareIndex + 9] == '')){
                      possibleMoves.push(squareIndex + 9)
                    }
                    if(squareIndex + 7 < 64 && parseInt((squareIndex + 7)/8) != parseInt(squareIndex/8)  && (texts[squareIndex + 7].startsWith('B') || texts[squareIndex + 7] == '')){
                      possibleMoves.push(squareIndex + 7)
                    }
                    if(squareIndex - 9 >= 0 && parseInt((squareIndex - 9)/8) - parseInt(squareIndex/8) != 2  && (texts[squareIndex - 9].startsWith('B') || texts[squareIndex - 9] == '')){
                      possibleMoves.push(squareIndex - 9)
                    }
                    squareModifier(possibleMoves,squareIndex)
                    break
                    case 'BP':
                      console.log("P",squareIndex)
                      possibleMoves = []
                      if(parseInt(squareIndex/8) == 1 && texts[squareIndex + 16] == ''){
                        possibleMoves.push(squareIndex + 16)
                      }
                      
                      if(squareIndex + 8 < 64){
  
                      if(texts[squareIndex + 8] == ''){
                        
                        possibleMoves.push(squareIndex + 8)
                        }
                        if(parseInt((squareIndex + 9)/8) == parseInt((squareIndex + 8)/8) && texts[squareIndex + 9].startsWith('W')){
                          
                          possibleMoves.push(squareIndex + 9)
                          }
                        if(parseInt((squareIndex + 7)/8) == parseInt((squareIndex + 8)/8) && texts[squareIndex + 7].startsWith('W')){
                          
                          possibleMoves.push(squareIndex + 7)
                          }
                        }
                      
                      squareModifier(possibleMoves,squareIndex)
                      break;
  
                    case 'BR':
                      console.log("KL",squareIndex)
                      possibleMoves = []
                      
                      for(let j = squareIndex; j < 64; j += 8 ){
                        if (texts[j] != '' && j != squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        }
  
                      
                      for(let j = squareIndex; j>=0; j -= 8 ){
                        if (texts[j] != '' && j != squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(j != squareIndex){
                          possibleMoves.push(j)}}
                      for(let j = squareIndex; j<64; j+=1){
                        
                        if (texts[j] != '' && j != squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(parseInt((j+1)/8) != parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                          break}
                          else{
                            break
                          }
      
                            }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                      }
                      for(let j = squareIndex; j>=0; j-=1){
                      
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(parseInt((j-1)/8) != parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                          break}
                          else{
                            break
                          }
      
                            }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                        
                      }
  
                      squareModifier(possibleMoves,squareIndex)
                      break;
                    case 'BK':
                      console.log("KL",squareIndex,(squareIndex + 1)/8)
                      
                      possibleMoves = []
                      if(parseInt((squareIndex + 1)/8) == parseInt((squareIndex)/8) && squareIndex - 15 >=0 && (texts[squareIndex - 15].startsWith('W') || texts[squareIndex - 15] == '')){
                        possibleMoves.push(squareIndex - 15)
  
                      }
                      if(parseInt((squareIndex + 1)/8) == parseInt((squareIndex)/8) && squareIndex + 17 < 64 && (texts[squareIndex + 17].startsWith('W') || texts[squareIndex + 17] == '') ){
                        possibleMoves.push(squareIndex + 17)
  
                      }
                      if(parseInt((squareIndex  - 1)/8) == parseInt((squareIndex)/8) && squareIndex - 17 >= 0 && (texts[squareIndex - 17].startsWith('W') || texts[squareIndex - 17] == '') ){
                        possibleMoves.push(squareIndex - 17)
  
                      }
                      if(parseInt((squareIndex  - 1)/8) == parseInt((squareIndex)/8) && squareIndex + 15 < 64 && (texts[squareIndex + 15].startsWith('W') || texts[squareIndex + 15] == '') ){
                        possibleMoves.push(squareIndex + 15)
  
                      }
                      if(parseInt((squareIndex + 2)/8) == parseInt((squareIndex)/8) && squareIndex + 10 < 64 && (texts[squareIndex + 10].startsWith('W') || texts[squareIndex + 10] == '') ){
                        possibleMoves.push(squareIndex + 10)
  
                      }
                      if(parseInt((squareIndex + 2)/8) == parseInt((squareIndex)/8) && squareIndex - 6 >= 0 && (texts[squareIndex - 6].startsWith('W') || texts[squareIndex - 6] == '') ){
                        possibleMoves.push(squareIndex - 6)
  
                      }
                      if(parseInt((squareIndex - 2)/8) == parseInt((squareIndex)/8) && squareIndex - 10 >= 0 && (texts[squareIndex - 10].startsWith('W') || texts[squareIndex - 10] == '') ){
                        possibleMoves.push(squareIndex - 10)
  
                      }
                      if(parseInt((squareIndex - 2)/8) == parseInt((squareIndex)/8) && squareIndex + 6 < 64 && (texts[squareIndex + 6].startsWith('W') || texts[squareIndex + 6] == '') ){
                        possibleMoves.push(squareIndex + 6)
  
                      }
                      squareModifier(possibleMoves,squareIndex)
                      break
                    case 'BB':
                      console.log("KL",squareIndex)
                      possibleMoves = []
                      
                      for(let j = squareIndex; (j >= 0); j -= 7){
                        
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j-7)/8) == parseInt(j/8)){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                          
                      }
                      for(let j = squareIndex; (j < 64); j += 9){
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j+9)/8) - parseInt(j/8) == 2){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                      }
                      for(let j = squareIndex; (j >= 0); j -= 9){
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j-9)/8) - parseInt(j/8) == -2){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                      }
                      for(let j = squareIndex; (j < 64); j += 7){
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j+7)/8) == parseInt(j/8)){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                      }
                      squareModifier(possibleMoves,squareIndex)
                      break
                    case 'BQ':
                      console.log("KL",squareIndex)
                      possibleMoves = []
                      for(let j = squareIndex; j < 64; j += 8 ){
                        if (texts[j] != '' && j != squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        }
  
                      
                      for(let j = squareIndex; j>=0; j -= 8 ){
                        if (texts[j] != '' && j != squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(j != squareIndex){
                          possibleMoves.push(j)}}
                      for(let j = squareIndex; j<64; j+=1){
                        
                        if (texts[j] != '' && j != squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(parseInt((j+1)/8) != parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                          break}
                          else{
                            break
                          }
      
                            }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                      }
                      for(let j = squareIndex; j>=0; j-=1){
                      
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                          break}
                          else{
                            break}}
                        if(parseInt((j-1)/8) != parseInt(j/8)){
                          if(j!= squareIndex){
                            possibleMoves.push(j)
                          break}
                          else{
                            break
                          }
      
                            }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                        
                      }
                      for(let j = squareIndex; (j >= 0); j -= 7){
                        
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j-7)/8) == parseInt(j/8)){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                          
                      }
                      for(let j = squareIndex; (j < 64); j += 9){
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j+9)/8) - parseInt(j/8) == 2){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                      }
                      for(let j = squareIndex; (j >= 0); j -= 9){
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j-9)/8) - parseInt(j/8) == -2){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                      }
                      for(let j = squareIndex; (j < 64); j += 7){
                        if (texts[j] != '' && j!=squareIndex){
                          if(texts[j].startsWith('W')){
                            possibleMoves.push(j)
                            break}
                          else{
                            break}}
                          if(parseInt((j+7)/8) == parseInt(j/8)){
                            if(j!= squareIndex){
                              possibleMoves.push(j)
                              break}
                              else{
                                break
                              }
          
                                }
                        if(j != squareIndex){
                          possibleMoves.push(j)}
                        
                      }
                      
                      squareModifier(possibleMoves,squareIndex)
                      break
                    case 'BKG':
                      console.log("KL",squareIndex)
                      console.log("T",texts[squareIndex-8])
                      possibleMoves = []
                      if(squareIndex - 8 >= 0 && (texts[squareIndex - 8].startsWith('W') || texts[squareIndex - 8] == '')){
                        possibleMoves.push(squareIndex - 8)
  
                      }
                      if(squareIndex + 8 < 64 && (texts[squareIndex + 8].startsWith('W') || texts[squareIndex + 8] == '')){
                        possibleMoves.push(squareIndex + 8)
  
                      }
                      if(squareIndex + 1 < 64 && parseInt((squareIndex + 1)/8) == parseInt(squareIndex/8) && (texts[squareIndex + 1].startsWith('W') || texts[squareIndex + 1] == '')) {
                        possibleMoves.push(squareIndex + 1)
  
                      }
                      if(squareIndex - 1 >= 0 && parseInt((squareIndex - 1)/8) == parseInt(squareIndex/8) && (texts[squareIndex - 1].startsWith('W') || texts[squareIndex - 1] == '')) {
                        possibleMoves.push(squareIndex - 1)
  
                      }
                      if(squareIndex - 7 >= 0 && parseInt((squareIndex-7)/8) != parseInt((squareIndex/8))  && (texts[squareIndex - 7].startsWith('W') || texts[squareIndex - 7] == '')){
                        possibleMoves.push(squareIndex-7)
                      }
                      if(squareIndex + 9 < 64 && parseInt((squareIndex + 9)/8) - parseInt(squareIndex/8) != 2  && (texts[squareIndex + 9].startsWith('W') || texts[squareIndex + 9] == '')){
                        possibleMoves.push(squareIndex + 9)
                      }
                      if(squareIndex + 7 < 64 && parseInt((squareIndex + 7)/8) != parseInt(squareIndex/8)  && (texts[squareIndex + 7].startsWith('W') || texts[squareIndex + 7] == '')){
                        possibleMoves.push(squareIndex + 7)
                      }
                      if(squareIndex - 9 >= 0 && parseInt((squareIndex - 9)/8) - parseInt(squareIndex/8) != 2  && (texts[squareIndex - 9].startsWith('W') || texts[squareIndex - 9] == '')){
                        possibleMoves.push(squareIndex - 9)
                      }
                      squareModifier(possibleMoves,squareIndex)
                      break
                    default:
                      console.log("JK")
                    }
                
    
              }}}>
            <Text style = {{color : textColor}}>{texts[squareIndex]}</Text>
              {texts[squareIndex]?(<Image source = {require(`../assets/${texts[squareIndex]}.png`)} />):(<View></View>)}
            </TouchableOpacity>
          )
          i++
        }
      }
      return squares;
    }
    
    
  
    return (
      <View style={styles.container}>
        {renderSquares()}
      </View>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      height : 300,
      width : 300
    },
    square: {
      height : '12.5%',
      width: '12.5%',
      aspectRatio: 1,
    },
  });
  export default ChessBoard
  