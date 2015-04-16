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
	LinkingIOS
} = React;

var styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
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

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: '',
			isLoading: false
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

	onPassTextChanged(event) {
		console.log('onLoginchanged');
		this.setState({ passString: event.nativeEvent.text});
		console.log(this.state.passString);
	}

	_executeLogin(login) {
		console.log(login);
		this.setState({ isLoading: true });
	}

	onLoginPressed() {
		fetch("https://www.hackerschool.com/oauth/authorize?response_type=code&client_id=("+auth.client_id+")&redirect_uri=("+auth.redirect_uri+")")
		  .then(response => console.log(response))
		  .catch(error => 
		     this.setState({
		      isLoading: false,
		      message: 'Something bad happened ' + error
		   }));
		LinkingIOS.openURL("https://www.hackerschool.com/oauth/authorize?response_type=code&client_id=("+auth.client_id+")&redirect_uri=("+auth.redirect_uri+")");
	}

	_handleResponse(response) {
	  console.log(response);
	}


	render() {
	    console.log('SearchPage.render');

	    var spinner = this.state.isLoading ?
	    ( <ActivityIndicatorIOS
	        hidden='true'
	        size='large'/> ) :
	    ( <View/>);

	    return (
	     <View style={styles.container}>
	      <Image source={require('image!rclogo')} style={styles.image}/>
	        <Text style={styles.description}>
	          Recurse Center!
	        </Text>	  
			<TouchableHighlight style={styles.button}
			      underlayColor='#99d9f4'
	          	  onPress={this.onLoginPressed.bind(this)}>
			    <Text style={styles.buttonText}>Login</Text>
			 </TouchableHighlight>
			{spinner}
			<Text style={styles.description}>{this.state.message}</Text>
	      </View>
	    );
	  }
	}

module.exports = LoginPage;



