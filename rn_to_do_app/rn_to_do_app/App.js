import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions,
Platform, ScrollView, AsyncStorage
} from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo] = useState("");
  const [loadedToDOs, setLoadedToDOs] = useState(false);
  const [toDos, setToDos] = useState({});
  
  useEffect(() => {
    loadToDos();
  }, []);
  
  const controlNewToDo = (text) => {
    setNewToDo(text);
  };

  const loadToDos = async () => {
    try{
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      setLoadedToDOs(true);
      setToDos(parsedToDos);
    } catch (err) {
      console.error(err);
    }
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
      saveToDos(tempToDos);
    }
  };

  const deleteToDo = (id) => {
    delete toDos[id]; 
    setToDos({
      ...toDos
    });
    saveToDos({...toDos});
  };

  const uncompleteToDo = (id) => {
    toDos[id].isCompleted = false;
    setToDos({
      ...toDos
    });
    saveToDos({...toDos});
  };

  const completeToDo = (id) => {
    toDos[id].isCompleted = true;
    setToDos({
      ...toDos
    });
    saveToDos({...toDos});
  };

  const updateToDo = (id, text) => {
    toDos[id].text = text;
    setToDos({
      ...toDos
    });

    saveToDos({...toDos});
  };

  const saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };

  return (
    <> 
    {
      loadedToDOs ? 
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
            {Object.values(toDos).reverse().map(toDo => 
            <ToDo key={toDo.id} {...toDo} 
            updateToDo={updateToDo}
            deleteToDo={deleteToDo} 
            completeToDo={completeToDo}
            uncompleteToDo={uncompleteToDo}
            />)}
          </ScrollView>
        </View>
      </View>
    :
      <AppLoading />      
    }
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
