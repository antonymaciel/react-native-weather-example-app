import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 5,
  },
  cityName: {
    fontSize: 30,
    textAlign: 'center'
  },
  switchContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center'
  },
  notFoundContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});

export default styles;
