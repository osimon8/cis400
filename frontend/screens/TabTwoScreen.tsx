import * as React from 'react';
import { Text, View, StyleSheet , Button, TextInput} from 'react-native';




export default function TabTwoScreen() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={styles.container}>
      <TextInput  
        placeholder="Username"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}/> 
      <TextInput 
       placeholder="Password"
       style={styles.input}
       onChangeText={onChangeText}
       value={text}/> 
      <Button title="Login" onPress= {() => console.log("sign up")}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
});
