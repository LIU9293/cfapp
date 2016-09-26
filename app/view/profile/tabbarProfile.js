const React = require('react');
const ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} = ReactNative;
//const Button = require('./Button');
import Dimensions from 'Dimensions';

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    underlineHeight: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: '#8CBDD9',
      inactiveTextColor: 'white',
      underlineColor: '#8CBDD9',
      backgroundColor: null,
      underlineHeight: 2,
    };
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <TouchableOpacity
      style={{flex: 1}}
      key={page}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => this.props.goToPage(page)}
    >
      <View style={[styles.tab, this.props.tabStyle]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>;
  },

  render() {
    const containerWidth = 210;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 30,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: this.props.underlineColor,
      bottom: 10,
    };
    const windowWidth = Dimensions.get('window').width;

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return (
      <View style={{width: windowWidth,justifyContent:'center',alignItems:'center', backgroundColor:'#1F415C'}}>
        <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    width:210,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0,
  },
});

module.exports = DefaultTabBar;
