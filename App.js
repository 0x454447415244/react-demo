import React from 'react';
import { SafeAreaView, StyleSheet, Image, Alert, 
  Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      counter: 10,
      title: 'Timer',
      users: []
    }
  }

  async componentDidMount() {
  
    /*setInterval(() => {

      this.setState({ counter: this.state.counter - 1 })
      
    }, 500);*/

    const resp = await fetch('https://randomuser.me/api/?results=10');
    const data = await resp.json();
    const sorted = data.results.sort((a, b) => a.name.first.charCodeAt(0) - b.name.first.charCodeAt(0) );
    this.setState({users: sorted});
  }

  render() {

    const { counter, title, users } = this.state;


    return (
      <SafeAreaView style={{flex: 1, 
        //backgroundColor: 'green'
      }}>

        <View style={{
          backgroundColor: 'blue', 
          flexDirection: 'row',
          justifyContent: 'space-around', //Horizontal
          //alignItems: 'center',           //Vertical
          flex: 1
        }}>
          
          <View style={[styles.box, {backgroundColor: counter > 0 ? 'green' : 'red'}]}>
            <Text style={{
              fontSize: counter > 0 ? 30 : 20, fontWeight: '700',
              backgroundColor: 'white', 
              textAlign: 'center'
            }}>
              {
                counter > 0 
                  ? title
                  : `Problem!`
              }
            </Text>
          </View>

          <TouchableOpacity style={[styles.box, {backgroundColor: 'yellow'}]}
            onPress={() => {
              this.setState({ counter: counter - 1 })
          }}>
            <Text style={{
              fontSize: 30, fontWeight: '700',
              backgroundColor: 'white', 
              textAlign: 'center'
            }}>
              {
                counter
              }
            </Text>
          </TouchableOpacity>

        </View>

        <View style={{backgroundColor: '#ccc', flex: 1}}>
        {
          users.length > 0
          ?
          users.map((user, index) => 
            <TouchableOpacity key={index} style={{
              flexDirection: 'row',
              //justifyContent: 'center',
              alignItems: 'center',
              height: 60, borderWidth: 1, 
              marginTop: 10, backgroundColor: 'white'}}
              onPress={() => {
                Alert.alert(
                  "Profile",
                  `Name: ${user.name.first} ${user.name.last}`,
                  [
                    { text: "OK"}
                  ],
                  { cancelable: false }
                );
            }}>

            <Image style={{height: 40, width: 40, borderRadius: 20}}
              source={{ uri: user.picture.medium,
              }}
            />

              <Text style={{fontSize: 22, paddingLeft: 10}}>
                {`${user.name.first} ${user.name.last}`}
              </Text>
              
            </TouchableOpacity>
          )
          :
          <ActivityIndicator size="large" color="red" />
        }
        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    width: 100, 
    height: 100, 
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center'
  }
});

export default App;
