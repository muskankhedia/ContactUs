import React, {Component} from 'react';
import { StyleSheet, Text, View, AppRegistry,TextInput,TouchableOpacity } from 'react-native';
import Textarea from 'react-native-textarea';
import {Button } from 'react-native-elements';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      enable:true,
      name: '',
      emailid: '',
      contents:''
    };
  }

  render() {
    return (
      <View style = {styles.container} > 
        <Text style = {styles.heading}>
          Contact Us
        </Text>
        <View>
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='transparent' 
                placeholder="EnterName"
                placeholderTextColor = "black"
                selectionColor="white"
                onSubmitEditing={()=> this.password.focus()}
                onChangeText = {(name) => this.setState({name})}
                value = {this.state.name}
                />          
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='transparent' 
                placeholder="Email"
                placeholderTextColor = "black"
                selectionColor="white"
                keyboardType="email-address"
                ref = {(input) => this.password = input}
                onChangeText = {(emailid) => this.setState({emailid})}
                value = {this.state.emailid}
                />
          <View style={styles.contents}>
          <Textarea 
                containerStyle={styles.textareaContainer}
                style= {styles.feedback}
                onChangeText={(contents) => this.setState({contents})}
                defaultValue={this.state.text}
                maxLength={400}
                placeholder={'Write the feedback'}
                placeholderTextColor={'black'}
                underlineColorAndroid={'transparent'}
              /> 
          </View>
          {/* <Button
            onPress={this.send}
            title="Send Mail"
            color="white"
            accessibilityLabel="Send Mail"
          /> */}
          <Button
            icon={{name: '', size: 32}}
            buttonStyle={{backgroundColor: '#7f77ef', borderRadius: 10,height:45}}
            textStyle={{textAlign: 'center', fontWeight:"700"}}
            titleStyle={{fontWeight: "200"}}
            title={`Send Mail`}
          />      
        </View>
      </View>
    );
  }

  send = () =>{
    console.log(Hiii);
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#7f77ef',
    height:800
  },
  heading:{
    marginTop:50,
    fontSize: 40,
    color:'white',
    textAlign:'center',
    marginBottom:20,
  },
  feedback:{
    fontSize:20,
    paddingHorizontal:10,
    paddingVertical:5
  },
  inputBox:{
    width:350,
    backgroundColor:'white',
    borderColor:'black',
    borderRadius: 0,
    paddingHorizontal:16,
    fontSize:18,
    color:'black',
    marginVertical: 10,
    height:45,
    alignItems:'center',
    marginHorizontal:30

  },  
  textareaContainer:{
    height:180,
    width:350,
    alignContent:'center',
    backgroundColor:'white',
    marginHorizontal:10
    },

  contents:{
    paddingVertical:10,
    margin:20,
    fontSize:30
  },
  button:{
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    alignItems:'center',
    marginHorizontal:20

  },
  buttonText:{
    fontSize:16,
    fontWeight:'500',
    color:'white',
    textAlign:'center'

  },
});
