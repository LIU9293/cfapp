const React = require('react');
const {
  View,
  Image,
  StyleSheet,
  Dimensions,
} = require('react-native');
const window = Dimensions.get('window');

export default Loading = (props) => {
  return(
    <View style={[styles.container, props.style]}>
      <Image style={styles.image} source={require('../../../images/logo/loading4.gif')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    height: 80,
    width: 80,
    marginTop: -20,
  }
})
