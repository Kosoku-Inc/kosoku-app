import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import { App } from './src/app/presentation/app.component';
import { logger } from './src/core/utils/logger.utils';

logger.configure();

AppRegistry.registerComponent(appName, () => App);
