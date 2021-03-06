
import React from 'react';
import {
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    SectionList,
    ImageBackground,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

import { HPageViewHoc, TabView } from 'react-native-head-tab-view'
import { default as staticData } from '../configData/staticData.js'

const HScrollView = HPageViewHoc(ScrollView)
const HFlatList = HPageViewHoc(FlatList)
const HSectionList = HPageViewHoc(SectionList)

interface EState {
    tabs: Array<string>
}

const HEAD_HEIGHT = 180

export default class Example1 extends React.PureComponent<any, EState> {
    state = {
        tabs: ['ScrollView', 'FlatList', 'SectionList'],
    }

    private _renderScrollHeader = () => {
        return (
            <ImageBackground source={require('../resource/header_img.png')} resizeMode={'stretch'} style={{ backgroundColor: '#c44078', width: '100%', height: HEAD_HEIGHT }}>
                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert('123');
                }}>
                    <Image source={require('../resource/header_icon.png')} style={{ position: 'absolute', left: 35, top: 90, width: 100, height: 74 }} />
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }

    private _renderScene = (sceneProps: { item: string, index: number }) => {
        const { item } = sceneProps;
        if (item == 'ScrollView') {
            return <Page1 {...sceneProps} />
        } else if (item == 'FlatList') {
            return <Page2 {...sceneProps} />
        } else if (item == 'SectionList') {
            return <Page3 {...sceneProps} />
        }
        return null;
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <TabView
                    tabs={this.state.tabs}
                    renderScene={this._renderScene}
                    makeHeaderHeight={() => { return HEAD_HEIGHT }}
                    renderScrollHeader={this._renderScrollHeader}
                />
            </View>
        )
    }
}

class Page1 extends React.PureComponent {

    render() {
        return (
            <HScrollView {...this.props}>

                {staticData.Page1Data.map((item, index) => {
                    return (
                        <View style={{ width: '100%', alignItems: 'center' }} key={'Page1_' + index}>
                            <View style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                                <Text style={styles.sectionTitle}>{item.title}</Text>
                            </View>
                            <Image style={{ width: '100%', height: 200 }} resizeMode={'cover'} source={item.image} />
                        </View>
                    )
                })}
            </HScrollView>
        )
    }
}


interface IState {
    data: Array<any>,
    loading: boolean
}

interface FlatListItemInfo {
    image: any;
    height: number;
    text: string;
    directory: string;
    imgSize: number;
}

class Page2 extends React.PureComponent<any, IState> {

    private renderItem = (itemInfo: { item: FlatListItemInfo }) => {
        const { item } = itemInfo
        return (
            <View style={[styles.flatItem, { height: item.height }]}>
                {item.image ? <Image style={{ width: item.imgSize, height: item.imgSize, marginRight: 10, borderRadius: 5 }} source={item.image} /> : null}
                <Text>{item.text}</Text>
            </View>
        )
    }

    render() {
        return (
            <HFlatList
                {...this.props}
                data={staticData.Page2Data}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}

class Page3 extends React.PureComponent {

    private renderItem = (itemInfo: { item: string }) => {
        const { item } = itemInfo;
        return (
            <View style={[styles.sectionItem, { backgroundColor: '#FFF' }]}>
                <Text style={styles.titleStyle}>{item}</Text>
            </View>
        )
    }
    private renderSectionHeader = (sectionInfo: { section: any }) => {
        const { section } = sectionInfo;
        const { title } = section;
        return (
            <View style={[styles.sectionItem, { backgroundColor: '#EEE' }]}>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
        )
    }
    private getItemLayout = (data: any, index: number) => {
        return { length: 50, offset: index * 50, index };
    }
    render() {
        return (
            <HSectionList
                {...this.props}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                stickySectionHeadersEnabled={false}
                sections={staticData.Page3Data}
                keyExtractor={(item, index) => item + index}
                getItemLayout={this.getItemLayout}
            />
        )
    }
}


const styles = StyleSheet.create({
    titleStyle: {
        color: '#333',
        fontSize: 14
    },
    sectionTitle: {
        color: '#4D4D4D',
        fontSize: 15,
    },
    flatItem: {
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionItem: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    }
});

