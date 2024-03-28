import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import { MonoText } from '../../components/StyledText';
import { Input, SearchBar, ButtonGroup } from 'react-native-elements';
import { fetchWeather } from '../../actions/weather';
import {
  LineChart,
} from 'react-native-chart-kit'
import _ from 'lodash'
import SearchBarHeader from '../../components/SearchBarHeader'
import styles from './styles'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather App',
    headerStyle: {
     backgroundColor: '#0F4B9F',
   },
   headerTintColor: '#fff',
   headerTitleStyle: {
     fontWeight: 'bold',
     fontSize: 25,
   },
  };
  static tabBarOptions: {
    style: {
       backgroundColor: '#0F4B9F',
     }
   }

  constructor(props){
    super(props);
    this.state={
      inputText: '',
      selectedIndex: 0,
      selectedData: [],
      celsius: true,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  componentWillReceiveProps(nextProps){
      if ((this.props.temperature !== nextProps.temperature)  &&  nextProps.temperature){
        // Kelvin to Celsius
        const selectedData =  nextProps.temperature ? nextProps.temperature.map(temp => temp - 273.15) : [];
        this.setState({selectedData});
      }
  }

  updateIndex = (selectedIndex) => {
    let selectedData;
    switch (selectedIndex) {
      case 0:
              // Kelvin to Celsius
              selectedData = this.props.temperature.map(temp => temp - 273.15);
              break;
      case 1:
              selectedData = this.props.humidity;
              break;
      case 2:
              selectedData = this.props.pressure;
              break;
      default:

    }
    this.setState({selectedIndex, selectedData});
  }

  onChangeText = (text) => {
    this.setState({inputText: text})
  }

  onSearch = (text) => {
    this.props.fetchWeather(this.state.inputText);
  }

  onSwitch = () => {
    let selectedData;
    const celsius = !this.state.celsius;
    if (celsius) {
      // Kelvin to Celsius
      selectedData = this.props.temperature.map(temp => temp - 273.15);
    } else {
      selectedData = this.state.selectedData;
      // Celsius to Fahrenheit
      selectedData = selectedData.map(temp => temp * 9/5 + 32);
    }
    this.setState({celsius, selectedData});
  }

  render() {
    const buttons = ['Temp.', 'Humidity', 'Pressure'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <SearchBarHeader  onChangeText={(text) => this.onChangeText(text)} onSearch={()=> this.onSearch()} input={this.state.input}/>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          { this.props.weather &&
            <View>
              <Text style={styles.cityName}>
                {this.props.weather ? this.props.weather.city.name : ''}
              </Text>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 30}}
              />
              { this.state.selectedIndex == 0 &&
                <View style={styles.switchContainer}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>°F/°C</Text>
                  <Switch
                    trackColor={{false: 'blue', true: 'red'}}
                    ios_backgroundColor='blue'
                    onValueChange={()=> this.onSwitch()}
                    value={this.state.celsius}
                  />
                </View>
              }
              <LineChart
                data={{
                  labels: this.props.days ? this.props.days.map(day => day.getMonth() + '/' +  day.getDay() + ' ' + day.getHours() + 'hs') : [] ,
                  datasets: [{
                    data: this.state.selectedData
                  }]
                }}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
              <Text style={styles.descriptionText}>
                Description: {this.props.weather ? this.props.weather.list[0].weather[0].description : ''}
              </Text>
          </View>
          }
          { this.props.notFound &&
            <View>
              <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Seems like the city was not found, Try Again!</Text>
              </View>
            </View>
          }

            <View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require('../../assets/images/snow.png')
                    : require('../../assets/images/snow.png')
                }
                style={styles.welcomeImage}
              />
            </View>

        </ScrollView>
      </View>
    );
  }
}

const jsCoreDateCreator = (dateString) => {
  // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
  let dateParam = dateString.split(/[\s-:]/)
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()
  return new Date(...dateParam)
}


const mapStateToProps = state => {
  const temperature = state.weatherData.weather ? state.weatherData.weather.list.map(listItem => listItem.main.temp) : null;
  const humidity = state.weatherData.weather ? state.weatherData.weather.list.map(listItem => listItem.main.humidity): null;
  const pressure = state.weatherData.weather ? state.weatherData.weather.list.map(listItem => listItem.main.pressure): null;
  const days = state.weatherData.weather ? state.weatherData.weather.list.map(listItem => jsCoreDateCreator(listItem.dt_txt)): null;
  const propsFromState =
  {
    weather: state.weatherData.weather,
    temperature:  state.weatherData.weather ?  _.take(temperature, 5) : null,
    humidity:   state.weatherData.weather ? _.take(humidity, 5) : null,
    pressure:  state.weatherData.weather ?  _.take(pressure, 5) : null,
    days:  state.weatherData.weather ? _.take(days, 5) : null,
    notFound: state.weatherData.notFound,
  };
  return propsFromState;
};

const mapDispatchToProps = dispatch => ({
  fetchWeather: city => dispatch(fetchWeather(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
