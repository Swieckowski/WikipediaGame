import React from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { connect } from "react-redux";
import { loadStartAndEnd, addTurn, loadLinks, currentArticle } from './reducers/gameReducer';
import store from './store';

class GameStart extends React.Component {
    static navigationOptions = ({navigation}) =>{
        if(navigation.state.params){
            return {
                title: navigation.state.params.title,
                headerTitleStyle: {fontSize: 10}
            }
        }

    }
    render(){
        console.log("PROPS",this.props)
        
        if(!this.props.turns.length){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Start: {this.props.start}</Text>
                    <Button
                        onPress={() => this.props.startEndLoader()}
                        title="Reroll"
                    />
                    <Button
                        onPress={() => {
                            this.props.navigation.setParams({title: this.props.start});
                            this.props.currentArticleTitleSetter(this.props.start);
                            this.props.loadLinks(this.props.start);
                            this.props.turnAdder(this.props.start);
                        }}
                        title="Play"
                    />
                    <Text>End: {this.props.end}</Text>
                </View>
            )
        } else if(this.props.end === this.props.currentArticleTitle){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>YOU WIN!!!!</Text>
                    <Text>Number of links clicked: {this.props.turns.length -1}</Text>
                    <Text>Link History:</Text>
                    {
                        this.props.turns.map((turn, i)=><Text key={i}>{turn}</Text>)
                    }
                </View>
            )
        } 
        else return (
            <ScrollView>
                {
                    this.props.links.map((linkObj, i) => {
                        return(
                            <Button
                                key={i}
                                onPress={() => {
                                    this.props.currentArticleTitleSetter(linkObj.title);
                                    this.props.navigation.setParams({title: linkObj.title});
                                    this.props.turnAdder(linkObj.title);
                                    this.props.loadLinks(linkObj.title);
                                }}
                                title={linkObj.title}
                            />
                        )
                    })
                }
            </ScrollView>
        )
    }
};

const mapStateToProps = (state) => ({
    start: state.Game.start,
    end: state.Game.end,
    turns: state.Game.turns,
    links: state.Game.currentLinks,
    currentArticleTitle: state.Game.currentArticleTitle
});

const mapDispatchToProps = (dispatch) => ({
    startEndLoader() {
        dispatch(loadStartAndEnd());
    },
    turnAdder(articleTitle){
        dispatch(addTurn(articleTitle));
    },
    loadLinks(currentArticleTitle){
        dispatch(loadLinks(currentArticleTitle));
    },
    currentArticleTitleSetter(articleTitle){
        dispatch(currentArticle(articleTitle))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);