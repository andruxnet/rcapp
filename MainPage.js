'use strict'
 
var React = require('react-native');
var LoginPage = require('./LoginPage');
var SearchPage = require('./SearchPage');
 
var {
  Component,
} = React;
 
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }
 
  obtainToken(token) {
    console.log('here', token);
    this.setState({token: token});
    this.props.navigator.resetTo({
      component: SearchPage,
      passProps: {token: this.state.token}
    });
  }
 
  render() {
    var currentRoute;
    var propsToPass = {};
 
    if (this.state.token) {
      currentRoute = <SearchPage />;
    } else {
      currentRoute = <LoginPage
                       onTokenGet={this.obtainToken.bind(this)}
                       navigator={this.props.navigator}
                      />;
    }
 
    return currentRoute;
  }
 
}
 
module.exports = MainPage;