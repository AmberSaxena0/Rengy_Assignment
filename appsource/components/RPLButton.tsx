import { TouchableOpacity, Text, Image, View } from 'react-native';
import React from 'react';
import assets from '../assets';
import { moderateScale } from 'react-native-size-matters';
import RPLText from './RPLText';
import {
  RPLFontMedium,
  RPLFontMediumBold,
  RPLFontNormalBold,
} from '../commonStyles';

interface ComponentProps {
  title: string;
  isTransparent?: boolean;
  showLeftIcon?: boolean;
  onPress: () => void;
  titleColor?: string;
  leftIcon?: any;
}

const RPLButton = ({
  title,
  onPress,
  isTransparent = false,
  showLeftIcon = false,
  titleColor = assets.colors.white,
  leftIcon,
}: ComponentProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isTransparent
          ? assets.colors.white
          : assets.colors.blue,
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
        borderWidth: 1,
        borderColor: isTransparent ? assets.colors.grey : assets.colors.blue,
        flexDirection: 'row',
        flex: 1,
      }}
    >
      <View style={{ flex: 0.2 }}>
        <Image
          source={leftIcon}
          style={{
            height: moderateScale(20),
            width: moderateScale(20),
            resizeMode: 'contain',
          }}
        />
      </View>
      <RPLText
        text={title}
        style={{
          ...RPLFontNormalBold,
          color: isTransparent ? assets.colors.black : titleColor,
          alignItems: 'center',
        }}
        viewStyle={{ flex: 0.6, alignItems: 'center' }}
      />
      <View style={{ flex: 0.2 }} />
    </TouchableOpacity>
  );
};

export default RPLButton;
