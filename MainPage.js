'use strict'
 
var React = require('react-native');
var LoginPage = require('./LoginPage');
var SearchPage = require('./SearchPage');
var rcscrapper = require('./rcscrapper');
 
var {
  Component,
} = React;
 
var allpeople = [];
 
exports.allPeople = function() {
  var flattened = allpeople.reduceRight(function(a, b) {
    return a.concat(b);
  }, []);
  //console.log(allpeople.length)
  return flattened;
}
 
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
    this.setState({token: token});
    setTimeout(()=> {
      this.props.navigator.resetTo({
        title: 'Search',
        component: SearchPage,
        passProps: {token: token}
      });
      rcscrapper();
      this._executeQuery(token);
    }, 200)
  }
 
  _executeQuery(token) {
    var x = 19
    while (x > 0) {
    fetch('https://www.recurse.com//api/v1/batches/'+x+'/people?access_token='+token)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error => {
        console.log('error: ' + error)
    });
      x--;
    }
  }
 
  _handleResponse(response) {
  allpeople.push(response);
  //console.log(allPeople[0]);
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