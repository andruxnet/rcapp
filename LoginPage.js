'use strict'
 
var React = require('react-native');
var SearchPage = require('./SearchPage');
var LoginWebView = require('./LoginWebView')
 
 
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Image,
	Component,
	LinkingIOS
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
 
class LoginPage extends Component {
 
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			isLoading: false,
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
 
	_executeLogin(login) {
		console.log(login);
		this.setState({ isLoading: true, authCodeRequested: true });
	}
 
	onLoginPressed() {
		this.setState({authCodeRequested: true})
		this.props.navigator.push({
			title: 'WebView',
			component: LoginWebView,
			passProps: { onCodeObtain: this.props.onTokenGet }
		})
	}
 
 
	render() {
	    console.log('SearchPage.render');
 
	    var spinner = this.state.isLoading ?
	    ( <ActivityIndicatorIOS
	        hidden='true'
	        size='large'/> ) :
	    ( <View/>);
 
	    return (
 			<View style={styles.container}><Image source={require('image!rclogo')} style={styles.image}/>
        <Text style={styles.description}>
          Recurse Center!
        </Text>
				<TouchableHighlight
				  style={styles.button}
				  underlayColor='#99d9f4'
		      onPress={this.onLoginPressed.bind(this)}
		    	>
				  <Text style={styles.buttonText}>Login</Text>
				</TouchableHighlight>
				{spinner}
			</View>
		);
	}
}
 
module.exports = LoginPage;