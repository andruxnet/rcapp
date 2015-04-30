'use strict';
 
var React = require('react-native');
var SearchResults = require('./SearchResults');
var MainPage = require('./MainPage');
 
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
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
  }
});
 
class SearchPage extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      searchString: null,
      isLoading: false,
      message: '',
      results: null
    };
  }
 
  _handleResponse() {
    var searchStr = this.state.searchString;
    var Results = []
    this.setState({ isLoading: false });
    console.log(searchStr)
    MainPage.allPeople().forEach(function(people){
      //console.log(people)
      if (searchStr == people.first_name || searchStr == people.last_name || searchStr == people.job || searchStr == people.skills) {
          console.log('!!!!!!!')
          Results.push(people)
      }
    })
    this.setState({results: Results})
    console.log(Results)
    this.props.navigator.push({
      title: 'Results',
      component: SearchResults,
      passProps: {results: this.state.results}
    })
  }
 
  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }
 
  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }
 
  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);
 
    return (
      <View style={styles.container}>
        <Image source={require('image!rclogo')} style={styles.image}/>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search via companies, skills, projects etc.'
            value={this.props.searchString}
            onChange={this.onSearchTextChanged.bind(this)}/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this._handleResponse.bind(this)}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}
 
module.exports = SearchPage;