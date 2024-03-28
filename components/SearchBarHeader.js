import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import { Input, SearchBar, ButtonGroup, Text } from 'react-native-elements';
import styles from './styles';

const SearchBarHeader = (props) => {
  const {
    onChangeText,
    onSearch,
    input,
  } = props;
  return (
    <View style={styles.searchBarContainer}>
      <SearchBar
        containerStyle={{backgroundColor: '#FFF', borderBottomWidth: 0,}}
        inputStyle={styles.input}
        blurOnSubmit
        searchIcon={null}
        defaultValue={input}
        onChangeText={text => onChangeText(text)}
        placeholder="City, e.g Miami"
        ref={search => this.search = search}
        textInputRef="textSearch"
        returnKeyType="search"
        lightTheme
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.buttonSearch}
        onPress={() =>
          {
            this.search.blur();
            onSearch();
          }
        }
      >
        <Text style={styles.textButton}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  )
}


export default SearchBarHeader;
