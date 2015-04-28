'use strict';
 
var React = require('react-native');
var MainPage = require('./MainPage');
 
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
          component: MainPage
        }}/>
    );
  }
}
 
React.AppRegistry.registerComponent('rcapp', function() { return RecurseCenterApp });