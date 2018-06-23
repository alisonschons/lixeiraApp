import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

import lixeiraImg from './imagens/lixeira.png';

export default class data extends Component {

    mensagem = (cb) => {
        Alert.alert(
            'Aviso!',
            'Deseja deletar a lixeira ' + this.props.info.lixeira + ' ?',
            [
              {text: 'Sim', onPress: () => {
                const URL_TO_FETCH = 'http://localhost:3000/auth/deleteControle/' + this.props.info.id;
                fetch(URL_TO_FETCH,{
                    method: 'DELETE',
                    headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                });
                cb();
            
              }, 
             // 
            },
              {text: 'Não', onPress: () => {}},
            ],
          )
    }

    render() {
        return (
            <View style={styles.repo}>
                <Image style={styles.repoImage} source={lixeiraImg} />
                <View style={styles.dataInfo}>
                    <Text style={styles.nome}>Sala: {this.props.info.lixeira}</Text>
                    <Text style={styles.id}>id: {this.props.info.id}</Text>
                    <Text style={styles.id}>Estado: {this.props.info.estado}</Text>
                </View>
                <TouchableOpacity
                    style={styles.delButton}
                    onPress={()=>this.mensagem(this.props.delete)}>
                    <Text style={styles.delText}>Deletar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    repo: {
        padding: 20,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 5,
        alignItems: 'center',
    },

    repoImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    dataInfo: {
        marginLeft: 10,
        marginRight: 100
    },

    nome: {
        fontWeight: 'bold',
        color: '#333',
    },

    id: {
        fontSize: 12,
        color: '#999',
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#E25F5F',
        padding: 10,
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
    },

    delButton: {
        borderRadius: 100,
        backgroundColor: 'red',
        padding: 10,
    },

    delText: {
        color: 'white',
        fontWeight: 'bold',
    }
});