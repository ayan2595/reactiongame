import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import firebase from 'firebase/app'
import "firebase/database";

//var firebase = require('firebase/app')

var firebaseConfig = {
  apiKey: "AIzaSyDl2ltBYxpvyEgisr0s0QSPT228PW2u8Ws",
  authDomain: "games-ac549.firebaseapp.com",
  projectId: "games-ac549",
  storageBucket: "games-ac549.appspot.com",
  messagingSenderId: "490029486538",
  appId: "1:490029486538:web:36590b14bdf78b563d7f33"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default class App extends React.Component {

state={
  colourarray:[["aqua", "yellow", "green"],
                    ["teal", "olive", "red"],
                    ["navy", "maroon", "white"],
                    ["black", "gray", "purple"]],
  row:Math.floor(Math.random() * 3),
  column:Math.floor(Math.random() * 3),
  time:0,
  clicks:0,
  totaltime:0,
  isClicked:false,
  name:'',
  datad:"",
  scores:[]
}

componentDidMount(){
  var recentPostsRef = firebase.database().ref('/users')
  recentPostsRef.orderByChild("score").limitToFirst(10).once('value').then((snapshot) => {
    let values = [];
    snapshot.forEach((child) => {
      values.push(child.val());
    });
    this.setState({scores:values})
    console.log("array", values);
  });
}

reset(){
  firebase.database()
  .ref('users/').push()
  .set({
    score: ((this.state.totaltime)/10).toFixed(3),
  })
  .then(() => console.log('Data set.'));
  this.setState({row:Math.floor(Math.random() * 3), column:Math.floor(Math.random() * 3), clicks:0, time:0, totaltime:0})
}

shuffleArray(array, start) {
  this.setState({clicks:this.state.clicks+1})
  this.setState({time: new Date().getTime() - start})
  this.setState({totaltime:this.state.totaltime + (this.state.time)/1000})

        for (var i = array.length - 1; i > 0; i--) {
            for(var j = array[i].length-1; j > 0; j--){
                var y = Math.floor(Math.random() * (j + 1));
                var x = Math.floor(Math.random() * (i + 1));
                var temp1 = array[i][j];
                array[i][j] = array[x][y];
                array[x][y] = temp1;
            }
        //set the row and column in a different function, that function generates the new colour and sets the new start time
         this.setState({colourarray:array})
         this.setState({row:Math.floor(Math.random() * 3)}) 
         this.setState({column:Math.floor(Math.random() * 3)}) 
        }
    }

    render(){
      var start = new Date().getTime()
      if(this.state.isClicked===false){
      return(
          <View style={{flex:0.5, justifyContent:'center', alignItems:'center', marginTop:50}}>
              <Button 
                  style ={styles.button}
                  onPress={()=>{this.setState({isClicked:true})}}
                  title="START GAME"
                  color="#841584"
              /> 
          </View>

      );
      }
      else if(this.state.isClicked===true && this.state.clicks<=10)
        return(
            <View style ={styles.container}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Text>Press the "{this.state.colourarray[this.state.row][this.state.column]}" </Text>
              <View style = {styles.tiles, {backgroundColor: this.state.colourarray[this.state.row][this.state.column], marginHorizontal: 10, marginVertical: 10, height:25, width:25, borderWidth:2, borderRadius: 20, borderColor: "black"}}/>
              <Text>box </Text>
              </View>
              <Text>reaction time = {(this.state.time)/1000} seconds</Text>
            </View>
                <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[0][0]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[0][0], marginHorizontal: 10, marginVertical: 10, height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity>

                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[0][1]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[0][1], marginHorizontal: 10, marginVertical: 10, height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity>
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[0][2]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>   
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[0][2], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                </View>
                <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[1][0]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[1][0], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[1][1]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[1][1], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[1][2]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[1][2], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                </View>
                <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[2][0]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[2][0], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[2][1]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[2][1], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[2][2]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[2][2], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                </View>
                <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[3][0]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[3][0], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity>
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[3][1]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[3][1], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                      <TouchableOpacity
                            disabled = {this.state.colourarray[this.state.row][this.state.column]===this.state.colourarray[3][2]?false:true}
                            onPress={()=>this.shuffleArray(this.state.colourarray, start)}>
                            <View style = {styles.tile, {backgroundColor: this.state.colourarray[3][2], marginHorizontal: 10, marginVertical: 10,  height:75, width:75, borderWidth:4, borderColor: "black", borderRadius: 50}}/>
                      </TouchableOpacity> 
                </View>
            </View>
        )
    else if(this.state.isClicked===true && this.state.clicks>10)
        return(
            <View style ={styles.container}>
            <View style={{flex:0.6, justifyContent:'space-between', alignItems:'center', marginTop:50}}>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 1</Text>
                  <Text>{this.state.scores[0].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 2</Text>
                  <Text>{this.state.scores[1].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 3</Text>
                  <Text>{this.state.scores[2].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 4</Text>
                  <Text>{this.state.scores[3].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 5</Text>
                  <Text>{this.state.scores[4].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 6</Text>
                  <Text>{this.state.scores[5].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 7</Text>
                  <Text>{this.state.scores[6].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 8</Text>
                  <Text>{this.state.scores[7].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 9</Text>
                  <Text>{this.state.scores[8].score}</Text>
                  </View>
            </View>
            <View>
                  <View style={styles.ranking}>
                  <Text>Rank 10</Text>
                  <Text>{this.state.scores[9].score}</Text>
                  </View>
            </View>
            {((this.state.totaltime)/10)<=this.state.scores[9].score? <Text>Congratulations! You're in the Top 10.</Text>: <Text>Unfortunately you did not make it into the Top 10. Click 'RESET GAME' to try again.</Text>}
            </View>
            <View style={{alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flex:0.4, alignItems:'center', justifyContent:'space-between', marginVertical:10}}>
              <Text> Your Average Reaction Time for this session is: {((this.state.totaltime)/10).toFixed(2)}</Text>
              <View style={{marginTop:10}}>
                  <Button
                        style ={styles.button}
                        onPress={()=>this.reset()}
                        title="RESET GAME"
                        color="#841584"
                  /> 
              </View>
              </View>
            </View>
            </View>
        );
  }
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems:'center',
      paddingHorizontal: 10
    },
    button:{
      width: 200,
      height:50,
      borderRadius:10
    },
    tile:{
      flex:0.9,
      marginHorizontal:10,
      marginVertical:10,
      paddingHorizontal: 10,
      paddingVertical:10,
    },
    ranking:{
      width:100,
      flexDirection:'row', 
      justifyContent:'space-between', 
      alignItems:'center'
      }
          
  });

