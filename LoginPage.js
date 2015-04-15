'use strict'

var React = require('react-native');

var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Image,
	Component
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

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userString: 'Username',
			passString: 'Password',
			isLoading: false
		};
	}

	onLoginTextChanged(event) {
		console.log('onLoginchanged');
		this.setState({ searchString: event.nativeEvent.text});
		console.log(this.state.searchString);
	}

	_executeLogin(login) {
		console.log(login);
		this.setState({ isLoading: true });
	}

	onLoginPressed() {
		var login = urlForLogin(this.state.userString, this.state.passString);
		this._executeLogin(login);
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
	      <View style={styles.flowRight}>
		  <TextInput
			    style={styles.searchInput}
		        value={this.state.searchString}
		        onChange={this.onLoginTextChanged.bind(this)}
		        placeholder='Username.'/>
			</View>
			<View style={styles.flowRight}>
		  <TextInput
			    style={styles.searchInput}
		        value={this.state.searchString}
		        onChange={this.onLoginTextChanged.bind(this)}
		        placeholder='Password'/>
			</View>
			<View style={styles.flowRight}>
			<TouchableHighlight style={styles.button}
			      underlayColor='#99d9f4'
	          	  onPress={this.onLoginPressed.bind(this)}>
			    <Text style={styles.buttonText}>Login</Text>
			  </TouchableHighlight>
			</View>
			{spinner}
	      </View>
	    );
	  }
	}

module.exports = LoginPage;



