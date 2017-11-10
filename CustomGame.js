import React, { Component } from 'react';
import { View, Text, AppRegistry, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { startAndEndLoader } from './reducers/gameReducer';


class CustomGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starting: "",
            target: ""
        };
    }

    render() {
        return (
            <View>
                <Text>Starting Article</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(starting) => this.setState({ starting })}
                    value={this.state.starting}
                />
                <Text>Target Article</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(target) => this.setState({ target })}
                    value={this.state.target}
                />
                <Button
                    onPress={() => {

                        this.props.startEndLoader(this.state.starting, this.state.target);
                        this.props.navigation.navigate('GameStart');
                    }}
                    title="Submit"
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startEndLoader(start, end) {
        let startAndEnd = [{title: start}, {title: end}];
        dispatch(startAndEndLoader(startAndEnd));
    },
});

export default connect(null, mapDispatchToProps)(CustomGame)