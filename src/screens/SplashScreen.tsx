import React, { useEffect, useState } from 'react';

import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { deviceHeight, deviceWidth } from '../styling/mixin';
import { BALAGI_LOGO } from '../sharedImages';
import TextComponent from '../common/TextComponent';
import { getEssentials, resetScreen } from '../utility';
import { S_Dashboard } from '../constant/screenNameConstants';

const SplashScreen = () => {
    const { navigation, theme } = getEssentials();

    useEffect(() => {

        (async () => {
            setTimeout(() => { resetScreen(navigation, S_Dashboard,{ url: undefined}) }, 3000)
        })();

        return () => {
            console.log('unmont')
            // this now gets called when the component unmounts
        };

    }, []);

    return (
        <View style={{ height: deviceHeight, width: deviceWidth,
        backgroundColor:'white',justifyContent:'center',alignItems:'center' }}>
            <StatusBar backgroundColor={"#020202"} barStyle="light-content" />
            <Image

                resizeMode='cover'
                style={[
                    {
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        overflow: 'hidden'
                    }
                ]}
                source={BALAGI_LOGO}
            />
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: "center",
    },
});

export default SplashScreen;