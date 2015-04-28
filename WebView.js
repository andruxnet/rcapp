'use strict'
 
var React = require('react-native');
var SearchPage = require('./SearchPage');
 
 
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  Component,
  LinkingIOS,
  WebView
} = React;
 
var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  web_view_container: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
    image: {
    width: 110,
    height: 130
  },
});
 
var auth = {
  client_id: 'b203868ed8d57486a3806dffff75729aff20e01a264121fd6de24a45d2f5246b',
  client_secret: 'b3c5a9991f9f3d4b5b20870a60d3abd4f7debdf4d98e407cd341a008f854bfb2',
  redirect_uri: 'rcapp://complete'
}
 
class WebView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoading: false,
      authCode: null,
      authCodeRequested: false
    };
  }
 
  componentDidMount() {
    LinkingIOS.addEventListener('url', this._handleOpenURL);
  }
 
  onUserTextChanged(event) {
    console.log('onLoginchanged');
    this.setState({ userString: event.nativeEvent.text});
    console.log(this.state.userString);
  }
  
  onWebViewChange(param){
    var codeReg = new RegExp(/rcapp:\/\/complete\?code=(.+)$/);
    var codeMatch = param.url.match(codeReg)
    if (codeMatch) {
      console.log('YOUR CODE: '+ codeMatch[1])
      this.setState({authCode: codeMatch[1]})
    }
    return _onViewChange(this.state.authCode)
  }

  _onViewChange(authCode) {
    this.props.navigator.push({
      title: 'Search Page',
      component: SearchPage,
      passProps: authCode
    })
  }
 
  render() {
      console.log('WebView.render');
 
      return (
          <View style={styles.web_view_container}>
            <WebView
              startInLoadingState={true}
              onNavigationStateChange={this.onWebViewChange.bind(this)}
              url={"https://www.recurse.com/oauth/authorize?response_type=code&client_id="+auth.client_id+"&redirect_uri="+auth.redirect_uri}
             />
          </View>)
  }
}    

module.exports = WebView;