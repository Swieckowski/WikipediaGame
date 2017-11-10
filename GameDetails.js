import React from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { connect } from "react-redux";

const GameDetails = (props) => {
    return (
        <ScrollView>
            <Text>Starting Article: {props.start}</Text>
            <Text>Target Article: {props.target}</Text>
            <Text>Current Article: {props.current}</Text>
            <Text>History thus far: </Text>
            {
                props.history.map((turn, i) => <Text key={i}>{turn}</Text>)
            }
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    start: state.Game.start,
    target: state.Game.end,
    current: state.Game.currentArticleTitle,
    history: state.Game.turns
})

export default connect(mapStateToProps)(GameDetails)