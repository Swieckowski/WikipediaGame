import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from "react-redux";
import { loadStartAndEnd, stateClearer } from './reducers/gameReducer';
import { Provider } from 'react-redux'
import store from './store';

const HomeScreen = (props, { navigation }) => {
    const buttonTitle = titleDecider(props.turns)
    if (props.turns.length) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    onPress={() => {
                        props.navigation.navigate('GameStart');
                    }}
                    title="Return to Game"
                />
                <Button
                    onPress={() => {
                        props.newGame();
                        props.startEndLoader();
                        props.navigation.navigate('GameStart');
                    }}
                    title="New Game"
                />
            </View>
        )
    }else return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => {
                    if (props.start.length && props.end.length) {
                        props.navigation.navigate('GameStart');
                    } else {
                        props.startEndLoader();
                        props.navigation.navigate('GameStart');
                    }
                }}
                title="Start New Game"
            />
        </View>
    )
};

const titleDecider = (arr) =>{
    if(arr.length) return "Return to Game";
    else return "Start New Game";
}

const mapStateToProps = (state) => ({
    start: state.Game.start,
    end: state.Game.end,
    turns: state.Game.turns
});

const mapDispatchToProps = (dispatch) => ({
    startEndLoader() {
        dispatch(loadStartAndEnd());
    },
    newGame(){
        dispatch(stateClearer())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);