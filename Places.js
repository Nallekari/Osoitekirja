import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, FlatList, Alert, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button, ListItem   } from'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

export default function Places({ navigation }) {


    
    const [address, setAddress] = useState('');
    const [addresses, setAdresses] = useState([]);


    const db = SQLite.openDatabase('coursedb.db');


    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists addressTable (id integer primary key not null, address text);');
        }, null, updateList); 
    }, []);
    
    const saveAddress = () => {
        db.transaction(tx => {
            tx.executeSql('insert into addressTable (address) values (?);', [address]);    
          }, null, updateList
        )
      }

    const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from addressTable;', [], (_, { rows }) =>
            setAdresses(rows._array)
          ); 
        });
    }
    
    const deleteAddress = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from addressTable where id = ?;`, [id]);
          }, null, updateList
        )    
    }
    
    


    return (
        <View style={styles.container}>
            <Input   placeholder='Type in address' label='PLACEFINDER'  onChangeText={address => setAddress(address)} value={address} />
      <Button raised containerStyle={{
                width: '100%',
                marginHorizontal: 50,
                marginVertical: 10,
            }}
              buttonStyle={{backgroundColor: '#808080'}}  icon={{ name: 'save', color: 'white' }} onPress={saveAddress} title="SAVE" /> 
      <FlatList 
        style={{width: '100%'}}
        data={addresses} 
        keyExtractor={item => item.id.toString()} 
        renderItem={({ item }) =>
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title 
                    onPress={() => navigation.navigate('Map', { data: item.address })}
                    onLongPress={() => deleteAddress(item.id)}>{item.address}
                </ListItem.Title>
            </ListItem.Content>
                <Button type='clear'
                    titleStyle={{ color: 'gray' }}
                    title="show on map"
                    icon={{ name: 'login', color: 'gray', backgroundColor: 'white' }}
                    iconPosition="right" 
                    onPress={() => navigation.navigate('Map', { data: item.address })}
                    onLongPress={() => deleteAddress(item.id)}
                /> 
          </ListItem>
        }
      />
        </View>
    );
  
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: "100%",
      height: "100%"
    }
  });