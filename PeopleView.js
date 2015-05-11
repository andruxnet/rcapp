'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Image, 
  View,
  Text,
  ListView,
  LinkingIOS,
  ScrollView,
  TouchableHighlight,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
  },
  link: {
    fontSize: 18,
    margin: 5,
    color: '#0000EE'
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    flex: 1,
    color: '#656565'
  }
});

class PeopleView extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.people)
    };
  }

  onEmailPressed() {
    LinkingIOS.openURL("mailto:"+this.props.people.email);
  }

  onTelPressed() {
    LinkingIOS.openURL("sms:"+this.props.people.phone_number);
    // LinkingIOS.openURL("tel:"+this.props.people.phone_number);
  }
  
  render() {
    var people = this.props.people;
    var number = (people.phone_number ? people.phone_number : '');
    console.log('!!!!!!')

    return (
      <ScrollView
        horizontal={true}
        alwaysBounceHorizontal={true}
        contentInset={{top: -75, right: -70}}
        style={[styles.ScrollView, styles.horizontalScrollView]}>
      <View style={styles.container}>
        <Image style={styles.image} 
            source={{uri: people.image}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{people.first_name} {people.last_name}</Text>
          <Text style={styles.title}>{people.batch.name}</Text>
          <View style={styles.separator}/>
        </View>
        <TouchableHighlight
          style={styles.link}
          underlayColor='#99d9f4'
          onPress={this.onEmailPressed.bind(this)}
        >
        <Text style={styles.link}>Email: {people.email}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.link}
          underlayColor='#99d9f4'
          onPress={this.onTelPressed.bind(this)}
        >
        <Text style={styles.link}>Tel: {number}</Text>
        </TouchableHighlight>
        <Text style={styles.description}>Job: {people.job}</Text>
        <Text style={styles.description}>Skills: {people.skills}</Text>
        <Text style={styles.description}>Bio: {people.bio}</Text>
      </View>
      </ScrollView>
    );
  }
 
  // render() {
  //   return (
  //     <ListView
  //       dataSource={this.state.dataSource}
  //       renderRow={this.renderRow.bind(this)}/>
  //   );
  // }
}

module.exports = PeopleView;