import React, {Component} from 'react';
import { StyleSheet, Text, View, AppRegistry,TextInput,TouchableOpacity } from 'react-native';
import Textarea from 'react-native-textarea';
import Display from 'react-native-display';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      emailid: '',
      subject:'',
      contents:'',
      showMessage:"",
      showMessageCheck:false
    };
    this.send = this.send.bind(this);
  }

  render() {
    return (
      <View style = {styles.container} > 
        <Text style = {styles.heading}>
          Contact Us
        </Text>
        <View>
        <Display enable={this.state.showMessageCheck} >
                <Text style={styles.messages}>{this.state.showMessage}</Text>
        </Display> 
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='transparent' 
                placeholder="Enter Name"
                placeholderTextColor = "black"
                selectionColor="white"
                onSubmitEditing={()=> this.password.focus()}
                onChangeText = {(name) => this.setState({name})}
                value = {this.state.name}
                />          
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='transparent' 
                placeholder="Enter Email Id"
                placeholderTextColor = "black"
                selectionColor="white"
                keyboardType="email-address"
                ref = {(input) => this.password = input}
                onSubmitEditing={()=> this.subject.focus()}
                onChangeText = {(emailid) => this.setState({emailid})}
                value = {this.state.emailid}
                />
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='transparent' 
                placeholder="Enter Subject"
                placeholderTextColor = "black"
                selectionColor="white"
                ref = {(input) => this.subject = input}
                onChangeText = {(subject) => this.setState({subject})}
                value = {this.state.subject}
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

          <TouchableOpacity style={styles.button} onPress={this.send} >
             <Text style={styles.buttonText}>Send Mail</Text>
          </TouchableOpacity> 

        </View>
      </View>
    );
  }

  send(){
    let name = this.state.name,
        email = this.state.emailid,
        subject = this.state.subject,
        contents = this.state.contents;
    fetch('https://contacus.herokuapp.com/send',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          subject:subject,
          text: "Hii, I am " + name + ". Email Id: " + email + ".  Contents:" + contents
      }),
    })
    .then(resData => resData)
    .then(res => {
      console.warn('Recieved as '+ res);
      this.setState({showMessage:'Mail Successfully Sent',
      showMessageCheck:true
      });
    })
    .catch(err => {
      this.setState({showMessage:"Failed to send the mail", showMessageCheck:true
     });
      throw(err)
      
    });
    this.setState({
      name:"",
      emailid:"",
      subject:"",
      text:""
    }) 
  }

}

console.disableYellowBox=true;

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
    backgroundColor:'white',
    borderRadius: 25,
    marginVertical: 30,
    paddingVertical: 13,
    alignItems:'center',
    marginHorizontal:60

  },
  buttonText:{
    fontSize:16,
    fontWeight:'500',
    color:'black',
    textAlign:'center'

  },
  messages:{
    color:'white',
    textAlign:'center',
    backgroundColor:'#7f77ef',
    borderRadius:6,
    fontSize:25,
    width:300,
    height:40,
    marginBottom:5,
    marginTop:5,
  },
});
