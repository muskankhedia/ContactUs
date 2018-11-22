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
  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.heading}>
          Contact Us
        </Text>
      <View style={{flex:1, flexDirection:'column'}}>
        <View>
          <View style={{flex:1, flexDirection:'row'}}>
              <View >
                 <Text style={styles.text}>Name</Text>
              </View>
              <View>
                  <TextInput style={styles.inputBox1} 
                    underlineColorAndroid='transparent' 
                    placeholder="Enter Name"
                    placeholderTextColor = "white"
                    selectionColor="black"
                    onSubmitEditing={()=> this.password.focus()}
                    onChangeText = {(name) => this.setState({name})}
                    value = {this.state.name}
                    />  
              </View>
          </View>
          <View style={{flex:1, flexDirection:'row', marginVertical:70}}>
              <View >
                 <Text style={styles.text}>Email</Text>
              </View>
              <View>
                  <TextInput style={styles.inputBox2} 
                    underlineColorAndroid='transparent' 
                    placeholder="Enter Email Id"
                    placeholderTextColor = "white"
                    selectionColor="white"
                    keyboardType="email-address"
                    ref = {(input) => this.password = input}
                    onSubmitEditing={()=> this.subject.focus()}
                    onChangeText = {(emailid) => this.setState({emailid})}
                    value = {this.state.emailid}
                    />
              </View>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
              <View >
                 <Text style={styles.text}>Subject</Text>
              </View>
              <View>
                <TextInput style={styles.inputBox3} 
                  underlineColorAndroid='transparent' 
                  placeholder="Enter Subject"
                  placeholderTextColor = "white"
                  selectionColor="white"
                  ref = {(input) => this.subject = input}
                  onChangeText = {(subject) => this.setState({subject})}
                  value = {this.state.subject}
                  />
              </View>
          </View>
          <View style={{flex:1, flexDirection:'row', marginVertical:70}}>
              <View >
                 <Text style={styles.text}>Contents</Text>
              </View>
              <View>
                  <Textarea 
                    containerStyle={styles.textareaContainer}
                    style= {styles.feedback}
                    onChangeText={(contents) => this.setState({contents})}
                    defaultValue={this.state.text}
                    maxLength={400}
                    placeholder={'Write the feedback'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                  /> 
              </View>
          </View>
        </View>
        

        <TouchableOpacity style={styles.button} onPress={this.send} >
             <Text style={styles.buttonText}>Send Mail</Text>
          </TouchableOpacity>

          <Display enable={this.state.showMessageCheck} >
            <Text style={styles.messages}>{this.state.showMessage}</Text>
          </Display> 
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
    backgroundColor:'#004976',
    height:800
  },
  text:{
    fontSize:18,
    paddingVertical:15,
    paddingHorizontal:15,
    color:'white'
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
    paddingVertical:5,
    color:'white'
  },
  inputBox1:{
    width:300,
    backgroundColor:'#377EAC',
    borderColor:'black',
    borderRadius: 0,
    paddingHorizontal:10,
    fontSize:18,
    color:'white',
    marginVertical: 10,
    height:40,
    alignItems:'center',
    marginHorizontal:24

  },  
  inputBox2:{
    width:300,
    backgroundColor:'#377EAC',
    borderColor:'black',
    borderRadius: 0,
    paddingHorizontal:10,
    fontSize:18,
    color:'white',
    marginVertical: 10,
    height:40,
    alignItems:'center',
    marginHorizontal:29

  },  
  inputBox3:{
    width:300,
    backgroundColor:'#377EAC',
    borderColor:'black',
    borderRadius: 0,
    paddingHorizontal:10,
    fontSize:18,
    color:'white',
    marginVertical: 10,
    height:40,
    alignItems:'center',
    marginHorizontal:14

  },  
  textareaContainer:{
    height:180,
    width:300,
    alignContent:'center',
    backgroundColor:'#377EAC',
    },

  contents:{
    paddingVertical:10,
    margin:20,
    fontSize:30
  },
  button:{
    width:300,
    backgroundColor:'#377EAC',
    borderRadius: 0,
    marginTop: 160,
    paddingVertical: 13,
    alignItems:'center',
    marginHorizontal:60

  },
  buttonText:{
    fontSize:16,
    fontWeight:'500',
    color:'white',
    textAlign:'center'

  },
  messages:{
    color:'#377EAC',
    textAlign:'center',
    backgroundColor:'#ffffff',
    borderRadius:0,
    paddingTop:7,
    fontSize:20,
    width:300,
    height:40,
    marginHorizontal:60,
    marginBottom:5,
    marginTop:30,
  },
});



