'use strict';

var React = require('react-native');
var LoginPage = require('./LoginPage');
var WebView = require('./WebView')

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class RecurseCenterApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'RC Finder',
          backButtonTitle: 'Back',
          rightButtonTitle: 'Home',
          component: WebView
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('rcapp', function() { return RecurseCenterApp });