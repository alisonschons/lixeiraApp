import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';

import Data from './src/Data';
import NewRepo from './src/NewData';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      id: '0',
      data: [],
      refreshing: false,
    };
  }

  delete = () => {
    this.setState({data: []});
    this.ambilData();
  }

  ambilData(){
    fetch("http://localhost:3000/auth/getAllControle")
    .then((response) => response.json())
    .then((responseJson) => {
      for (let index = 0; index < responseJson.length; index++) {
        const lixeira = {
          id: responseJson[index]['id'],
          lixeira: responseJson[index]['lixeira'],
          estado: responseJson[index]['estado'],
        };
        
        this.setState({data:[
          ...this.state.data,
          lixeira,
        ],
      id: responseJson[index]['id'],});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  componentDidMount() {
    this.ambilData();
  }

  _onRefresh() {
    this.setState({refreshing: true,data:[]});
    this.componentDidMount();
    setTimeout(()=>this.setState({refreshing: false}),2000);
  }

  _addLixeira = (newRepoText) => {
    lixeira = {
      id: ++this.state.id,
      lixeira: newRepoText,
      estado: '',
      data_: '',
      hora: '',
    };

    const URL_TO_FETCH = 'http://localhost:3000/auth/registerControle';
    fetch(URL_TO_FETCH,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: lixeira.id,
        lixeira: lixeira.lixeira,
        data_: lixeira.data_,
        hora: lixeira.hora,
        estado: lixeira.estado,
      }),
    })
    .catch((error) => {
      console.warn(error);
    });
    this.setState({
      data: [
        ...this.state.data,
        lixeira,
      ],
      modalVisible: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lixeira Inteligentes</Text>
          <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
            <Text style={styles.buttonHeader}>+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>
        }>
          {this.state.data.map(data => <Data key={data.id} delete={this.delete} info={data}/>) }        
        </ScrollView>
        <NewRepo 
          onCancel={()=>this.setState({modalVisible: false})} 
          onAdd={this._addLixeira}
          visible={this.state.modalVisible}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },

  header: {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },

  buttonHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  scroll: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },  
});
