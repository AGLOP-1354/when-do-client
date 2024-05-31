/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { initializeKakaoSDK } from '@react-native-kakao/core';

import App from './App';
import {name as appName} from './app.json';

void initializeKakaoSDK('686b13e2d48f2fb15632463ac3e0055b');
AppRegistry.registerComponent(appName, () => App);
