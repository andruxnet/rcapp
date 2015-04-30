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
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.results)
    };
  }

  rowPressed(peopleid) {
    var people = this.props.results.filter(prop => prop.id === peopleid)[0];

    //console.log(people)
   
    this.props.navigator.push({
      title: "People",
      component: PeopleView,
      passProps: {people: people}
    });
  }
  

  renderRow(rowData, sectionID, rowID) {
     return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.image }} />
          <View  style={styles.textContainer}>
            <Text style={styles.price}>{rowData.first_name} {rowData.last_name}</Text>
            <Text style={styles.title} 
                  numberOfLines={1}>{rowData.batch.name}</Text>
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