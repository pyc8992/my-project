import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions,
Platform, ScrollView
} from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo] = useState("");
  const [loadedToDOs, setLoadedToDOs] = useState(true);
  const [toDos, setToDos] = useState({});
  
  const controlNewToDo = (text) => {
    setNewToDo(text);
  };

  const loadToDos = () => {
    setLoadedToDOs(true);
  };

  const addToDo = () => {
    if(newToDo !== ""){

      const ID = uuidv1();
      let tempToDos = toDos;
      tempToDos[ID] = {
        id: ID,
        isCompleted: false,
        text: newToDo,
        createdAt: Date.now()
      };
      setToDos(tempToDos);
      setNewToDo("");
    }
  };

  const deleteToDo = (id) => {
    delete toDos[id];
    setToDos({
      ...toDos
    });
  };

  return (
    <>    
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Clone To Do</Text>
      <View style={styles.card}>
        <TextInput 
        style={styles.input} 
        placeholder={"New To Do"} 
        value={newToDo} 
        onChangeText={controlNewToDo} 
        placeholderTextColor={"#999"}
        returnKeyType={"done"}
        autoCorrect={false}
        onSubmitEditing={addToDo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} deleteToDo={deleteToDo} />)}
        </ScrollView>
      </View>
    </View>
    {/* {
      loadedToDOs ? 
    :
      <AppLoading />
      
    } */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center'
  },
  title: {
    color:"white",
    fontSize: 30,
    marginTop:50,
    fontWeight:"200",
    marginBottom: 30
  },
  card:{
    backgroundColor:"white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor:"rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius:5,
        shadowOffset:{
          hegiht:-1,
          width:0
        }
      },
      android:{
        elevation: 3
      }
    })
  },
  input:{
    padding: 20,
    borderBottomColor:"#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos:{
    alignItems:"center"
  }
});
