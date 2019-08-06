import React, { Component } from 'react';
import {AsyncStorage, SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';

import HomeScreen from './screens/HomeScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';
import ReasonScreen from './screens/reasonScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from './components/NavigationService';

class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
    },
    this._bootstrapAsync();
  }

  _bootstrapAsync = async()=>{
        var user_id = await AsyncStorage.getItem('user_id');  

        this.props.navigation.navigate(user_id ? 'App' : 'Auth');
    }

  render() {
    return (
      <View style={[styles.MainContainer, {backgroundColor:'white'}]}>
          <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} />
      </View>
    );
  }
}

const VoteScreen = createStackNavigator(
  {
    Home: HomeScreen,
    Reason: ReasonScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions:{
      headerVisible: false,
      header: null
    }
  }
);

const NavigatorStack = createMaterialTopTabNavigator ({
  Vote: {
    screen: VoteScreen,
    navigationOptions:{
      tabBarIcon: ({tintColor}) => (
        <Icon name='md-happy' color={tintColor} size={24} />
        )
    }
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name='ios-today' color={tintColor} size={24} />
        )
    }
  }
},
  {
    initialRouteName: 'Vote',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',
        topBorderColor: 'grey',
        borderTopWidth: 0.3,
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true
    }
  }
)


const AuthStack = createStackNavigator({ 
  Login: LoginScreen 
},
{
  header: null,
  headerMode: 'none'
});
const HomeStack = createStackNavigator({ 
  NavigatorStack 
},
{
  header: null,
  headerMode: 'none'
});

const AppContainer = createAppContainer(createSwitchNavigator(
{
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: HomeStack
},
{
  initialRouteName: 'AuthLoading',
  headerMode: 'none',
  header: null
}
));

export default class App extends React.Component {

  async componentDidMount(){
    var server='192.168.1.15';
    await AsyncStorage.setItem('server', server);
    var s = await AsyncStorage.getItem('server');
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <AppContainer 
            ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create(
{
  ActivityIndicatorStyle:{
      
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  }
})

