import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { createAppContainer, TabBarBottom } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DetailsScreen from './Detail'

class FlatListItem extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 4 }}>
                <Image style={{ flex: 1 }} source={{ uri: 'https://react-native-btl.000webhostapp.com/' + this.props.item.anh }} style={{ width: Dimensions.get("window").width/2, height: Dimensions.get("window").width / 2 }} />
                <Text style={{ flex: 1,color:'red', textAlign: 'center', padding: 2 }}>{this.props.item.ten}</Text>
            </View>
        );
    }
}

class AllScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        this.getData(0);
    }
    async getData(params) {
        const url = 'https://react-native-btl.000webhostapp.com/na/get.php';
        let res = await fetch(url);
        let resJson = await res.json();
        this.setState({
            data: resJson.data,
        })
    }
    render() {
        return (
            <FlatList numColumns={2} style={{ flex: 1, flexDirection: 'column' }} data={this.state.data} renderItem={({ item, index }) => {
                return (<TouchableOpacity onPress={() => this.props.navigation.navigate("Details", {
                    item: item,
                })}><FlatListItem item={item} index={index} /></TouchableOpacity>)
            }} />
        );
    }
}

class IphoneScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        this.getData(1);
    }
    async getData(params) {
        const url = 'https://react-native-btl.000webhostapp.com/na/get.php?id='+params;
        let res = await fetch(url);
        let resJson = await res.json();
        this.setState({
            data: resJson.data,
        })
    }
    render() {
        return (
            <FlatList numColumns={2} style={{ flex: 1, flexDirection: 'column' }} data={this.state.data} renderItem={({ item, index }) => {
                return (<TouchableOpacity onPress={() => this.props.navigation.navigate("Details", {
                    item: item,
                })}><FlatListItem item={item} index={index} /></TouchableOpacity>)
            }} />
        );
    }
}
class SamsungScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        this.getData(2);
    }
    async getData(params) {
        const url = 'https://react-native-btl.000webhostapp.com/na/get.php?id='+params;
        let res = await fetch(url);
        let resJson = await res.json();
        this.setState({
            data: resJson.data,
        })
    }
    render() {
        return (
            <FlatList numColumns={2} style={{ flex: 1, flexDirection: 'column' }} data={this.state.data} renderItem={({ item, index }) => {
                return (<TouchableOpacity onPress={() => this.props.navigation.navigate("Details", {
                    item: item,
                })}><FlatListItem item={item} index={index} /></TouchableOpacity>)
            }} />
        );
    }
}
const AllStack = createStackNavigator({
    All: { screen: AllScreen },
    Details: { screen: DetailsScreen },
});
const IphoneStack = createStackNavigator({
    All: { screen: IphoneScreen },
    Details: { screen: DetailsScreen },
});
const SamsungStack = createStackNavigator({
    All: { screen: SamsungScreen },
    Details: { screen: DetailsScreen },
});

const TabNavigator = createBottomTabNavigator({
    All: {
        screen: AllStack,
        navigationOptions:{
            tabBarLabel:"Tất cả",
        }
    },
    Iphone: IphoneStack,
    Samsung: SamsungStack,
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    justifyContent: 'center',
    alignItems: 'center',
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'black',
        labelStyle: {
            fontSize: 17,
            top:-10,
        },
        tabStyle: {
        },
        activeBackgroundColor: '#ebed4e',
        style: {
            backgroundColor: '#f7fdfb',
        },
    },
}
);
const App = createAppContainer(TabNavigator);
export default App;