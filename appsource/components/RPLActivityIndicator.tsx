import { View, Text, Modal, ActivityIndicator } from 'react-native';
import React from 'react';
import assets from '../assets';
import { moderateScale } from 'react-native-size-matters';
import RPLText from './RPLText';
import { RPLFontExtraLarge, RPLFontExtraLargeBold } from '../commonStyles';
import LottieView from 'lottie-react-native';

const RPLActivityIndicator = () => {
  return (
    <Modal transparent visible={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: assets.colors.black80,
          paddingHorizontal: moderateScale(12),
        }}
      >
        <LottieView
          loop
          source={require('../assets/lotti/loading.json')}
          style={{ width: 200, height: 200 }}
          autoPlay
          speed={1.5}
        />
      </View>
    </Modal>
  );
};

export default RPLActivityIndicator;
