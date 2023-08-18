import React from 'react'
import {ImageBackground,View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native'
//import SvgUri from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRouter} from 'expo-router'

const HomeScreen =() =>{
    router = useRouter()
    
    return (
        <ImageBackground
        source = {require('../assets/ChessSet1.jpg')}
        style={styles.backgroundImage}>
            <View style={styles.container}>
        <TouchableOpacity style={styles.button}  onPress={()=>{
            router.push("/player_computer_screen")

        }}>
        <View style={styles.iconContainer}>
          <Icon name="star" size={20} color="black" />
        </View>


          <Text style={styles.buttonText}>Play vs Computer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{
            router.push("/player_computer_screen")

        }} >
        <View style={styles.iconContainer}>
          <Icon name="star" size={20} color="black" />
        </View>
        
          <Text style={styles.buttonText}>2 Players</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Icon name="star" size={20} color="black" />
        </View>
        
          <Text style={styles.buttonText}>Puzzles</Text>
        </TouchableOpacity>
      </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    width: 200,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginBottom: 10,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 20,
    marginLeft : 10
  },
  buttonText: {
    
    fontSize: 16,
    fontWeight: 'bold',
  }
})
export default HomeScreen