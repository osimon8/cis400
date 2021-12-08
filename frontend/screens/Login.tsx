import * as React from 'react';

import { Text, View, StyleSheet , TextInput, Button, SafeAreaView} from 'react-native';

export default function LoginScreen({navigation}: {navigation: any}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin =()=>{
    if (username && password) {
      navigation.navigate('Map', { name: 'Daniel' })
    }
  }
  const handleRegistration = ()=>{
    navigation.navigate('Registration', { name: 'Arnaud'})
  }
  return (
    <View style={styles.container}>
      <TextInput  
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}/> 
      <TextInput 
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}/> 
      <Text style={styles.text}>
        Don't have an account? <Text style={styles.hyperlink} onPress={handleRegistration}>Sign up here.</Text>
      </Text>
      <Button 
        title="Login"
        onPress= {handleLogin}> hello</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    marginVertical: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10, 
  },
 
  text:{
    fontWeight: "bold",
    paddingBottom: 5
  },
  
  hyperlink:{
    color: "blue",
    textDecorationLine: "underline"
  }
});
