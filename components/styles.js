import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchBarContainer:{
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    paddingBottom: 5
  },
  input: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonSearch: {
    marginTop: 0,
    backgroundColor: '#0c4086',
    borderRadius: 4,
    width: 90,
    height: 30,
    alignSelf: 'flex-end',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default styles;
