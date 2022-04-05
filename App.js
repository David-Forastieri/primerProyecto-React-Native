import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  View, 
  TextInput, 
  Button, 
  FlatList,
  Modal
  } from 'react-native';

export default function App() {

  const [textInput, setTextInput] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [counterId, setCounterId] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [selecItem, setSelecItem] = useState({});
  
  const HandleChange = (e) =>setTextInput(e);

  const AddItem = () => {
    if(textInput!=="") {
      setItemsList( currenItems => 
        [...currenItems, {id: counterId, value: textInput}]        
      )
      setTextInput('');
      setCounterId(counterId + 1);
    }
  }

  const closeModal = () => {
    setModalShow(!modalShow);
  }

  const onHandlerModal = (id) => {
    setSelecItem(itemsList.filter(e => e.id === id)[0]);
    setModalShow(!modalShow);
  } 

  const onHandlerDelete = (id) => { 
    setItemsList( currenItems => currenItems.filter( item => item.id !== id ));
    setSelecItem({});
    setModalShow(!modalShow);
  }

  const renderItems = (data) =>
    <View style={styles.wrapperListItems}>
      <Text style={styles.itemsText}>- {data.item.value}</Text>
      <Text style={styles.closeModalButton} onPress={onHandlerModal.bind(this, data.item.id)}>X</Text>
    </View>

  return (
    <View style={styles.container}>
      <View style={styles.addInputContainer}>
        <TextInput style={styles.inputStyle} onChangeText={HandleChange} />
        <Button title='agregar' onPress={AddItem} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
            data={itemsList}
            renderItem={renderItems}
            keyExtractor={ items => items.id }
          />
      </View>

      <Modal
        transparent={true}
        animationType='slide'
        visible={modalShow}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
        <View style={styles.modalBody}>
          <View style={styles.closeModalContainer}>
            <Text style={styles.closeModalButton} onPress={closeModal.bind(this)}>X</Text>
          </View>
          <View>
            <Text style={styles.modalText}>¿Queres borrar este articulo?</Text>
          </View>
          <View>
            <Text style={styles.modalselecItem}>{selecItem.value}</Text>
          </View>
        </View>
          <View>
            <Text>
              <Button title='Confirmar' onPress={onHandlerDelete.bind(this, selecItem.id)} />
            </Text>  
          </View>
        
        </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#484656',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addInputContainer: {
    backgroundColor: '#ffae82',
    marginTop: '30px',
    padding: '10px',
  },
  inputStyle: {
    width: '100%',
    backgroundColor: 'white',
    fontSize: '25px',
    padding: '10px',
    marginBottom: '20px',
  },
  listContainer: {
    backgroundColor: '#c8bfff',
    borderRadius: '10px',
    margin: '10px',
    padding: '20px',
    width: '90%',
    flex: '1',
  },
  itemsText: {
    fontSize: '30px',
    fontWeight: '700',
    color: '#fff',
    alignItems: 'flex-start',
    textShadowColor: 'rgba(8, 1, 10, 1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  wrapperListItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#5b5b5b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#b5b5b5',
    paddingTop: '10px',
    paddingBottom: '10px',
    alignItems: 'center',
    width: '100%',
  },
  modalBody: {
    width: 'auto',
    height: '200px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    alignItems: 'center',
  },
  modalText: {
    fontSize: '25px',
    margin: '10px',
  },
  modalselecItem: {
    textDecorationLine: 'underline',
    fontSize: '30px',
    fontWeight: '700',
    color: '#000',
    alignItems: 'flex-start',
  },
  closeModalContainer: {
    margin: '5px',
    paddingRight: '3px',
    alignSelf: 'flex-end',
  },
  closeModalButton: {
    backgroundColor: 'red',
    borderRadius: '100px',
    color: 'white',
    fontSize: '25px',
  }
});
