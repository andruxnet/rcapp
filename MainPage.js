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
      isLoading: false,
      token: null,
      message: ''
    };
  }
 
  obtainToken(token) {
    console.log('here', token);
    this.setState({token: token});
    this.props.navigator.resetTo({
      title: 'Search',
      component: SearchPage,
      passProps: {token: this.state.token}
    });
    this._executeQuery(this.state.token);
  }

  _executeQuery(token) {
    this.setState({ message: '' });
    fetch('https://www.recurse.com/api/v1/people/me?access_token='+token)
      .then(response => console.log(response))
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => {
        console.log('error: ' + error)
    });  
  }

  _handleResponse(response) {
  console.log('!!!!!!!!'); 
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