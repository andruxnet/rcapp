'use strict'

var React = require('react-native');
var PeopleView = require('./PeopleView');

var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Component
} = React;

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.results)
    };
  }

  rowPressed(peopleGuid) {
    var people = this.props.listings.filter(prop => prop.guid === peopleGuid)[0];
   
    this.props.navigator.push({
      title: "Property",
      component: PropertyView,
      passProps: {people: people}
    });
  }
  

  renderRow(rowData, sectionID, rowID) {
     return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.image }} />
          <View  style={styles.textContainer}>
            <Text style={styles.title}>{this.props.results.first_name}</Text>
            <Text style={styles.batch} 
                  numberOfLines={1}>{rowData.batch}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
  );
  }
 
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}

module.exports = SearchResults;