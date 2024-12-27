import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, Image, PermissionsAndroid, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { deviceHeight, deviceWidth } from '../styling/mixin';
import { CROSS_BLACK, SPLASH_IMAGE } from '../sharedImages';
import TextComponent from '../common/TextComponent';
import DeviceInfo from 'react-native-device-info';
import { getEssentials, navigateScreen, resetScreen } from '../utility';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Dashboard = () => {
    const isfocused = useIsFocused()
    const [redirectUrl, setRedirectUrl] = useState<any>('https://shribalajimehandipur.org/balaji/login');
    const [previousUrl, setPreviousUrl] = useState<any>('');
    const [deviceUniqueId, setDeviceUniqueId] = useState<any>('');
    const { navigation, theme } = getEssentials();
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [isModalVisible, setIsModalVisible] = useState(false);
    const [qrScannerLink, setQRScannerLink] = useState<any>('');
    const qrScannerRef: any = useRef(null);
    let viewShotRef = useRef<any>()
    const webviewRef = useRef<any>(null)
    // console.log("Dddddddddddddddddddd", url);
    // console.log("22222222222222222", redirectUrl);

    useEffect(() => {
        (async () => {
            await DeviceInfo.getUniqueId().then((uniqueId) => {
                setDeviceUniqueId(uniqueId)
            });
        })();
    }, []);



    const onSuccess = async (e: any) => {
        console.log("tetettetete",e);
        
        // if (e?.data?.includes("https://carecargoforwarders.com/crm")) {
        //     console.log("11111111", e?.data);
        //     setIsModalVisible(false)
        //     await setRedirectUrl(e?.data)
        // } else {
            await setIsModalVisible(false)
            await setRedirectUrl(e?.data)
        // }
    }

    const onShouldStartLoadWithRequest = (event: any) => {
        console.log("eeeeeeeeeeeeeeeeeee",event);
    
        if (event?.url?.includes("kitchen-start-scan")) {
            (async () => {
                await setIsModalVisible(true);
            })();
            return false;
        }else if (event?.url?.includes("sawamani-gate-guard-start-scan")) {
            (async () => {
                await setIsModalVisible(true);
            })();
            return false;
        } else {
            (async () => {
                await setRedirectUrl(event?.url);
            })();
            return false;
        }
        return true;
    }


    return (
        <View style={{ flex: 1, }}>
            {isModalVisible && <TouchableOpacity
                onPress={() => {
                    setIsModalVisible(false)
                    setRedirectUrl(redirectUrl)
                }
                }
                style={{
                    alignItems: "flex-end", marginTop: 20, marginRight: 10,
                    alignSelf: 'flex-end', justifyContent: "center",
                    width: 25, height: 25,
                }}>
                <Image resizeMode={'contain'}
                    tintColor={'#000000'}
                    source={CROSS_BLACK}
                    height={20} width={20}
                />
            </TouchableOpacity>}
            {!isModalVisible ?
                    <WebView
                        // ref={webViewRef}
                        bounces={true}
                        // onOpenWindow
                        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        // scalesPageToFit={true}
                        // cacheEnabled={false}
                        // renderLoading={() =>
                        //     <ActivityIndicator style={{
                        //         flex: 1, alignItems: 'center',
                        //         justifyContent: 'center'
                        //     }} size="large" />}
                        // onNavigationStateChange={(webViewState) => onNavigationStateChange(webViewState)}
                        javaScriptEnabled
                        source={{ uri: redirectUrl }} style={{ flex: 1 }} />
                :
                <View style={{
                    flex: 1,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                   <QRCodeScanner
                        ref={qrScannerRef}
                        onRead={onSuccess}
                        fadeIn
                        showMarker
                        reactivate
                        // cameraTimeout={3000}
                        // containerStyle={{}}
                        // topViewStyle={{ backgroundColor: 'black' }}
                        // containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        // cameraContainerStyle={{ backgroundColor: 'pink', }}
                        // cameraStyle={{ backgroundColor: 'yellow' }}
                        // cameraType=''
                        flashMode={RNCamera.Constants.FlashMode.auto}
                    // checkAndroid6Permissions
                    // permissionDialogMessage=''
                    // topContent={
                    //     <TouchableOpacity /* onPress={() => setRedirectUrl(qrScannerLink)} */>
                    //         <TextComponent fontSize={20} color='black' value={qrScannerLink} />
                    //     </TouchableOpacity>
                    // }
                    // bottomContent={
                    //     <TouchableOpacity onPress={(e) => navigateScreen(navigation, S_Dashboard)}>
                    //         <TextComponent fontSize={25} color='black' value={'EXIT'} />
                    //     </TouchableOpacity>
                    // }
                    />
                </View>
            }
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

export default Dashboard;