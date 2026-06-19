import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import assets from '../assets';
import { moderateScale } from 'react-native-size-matters';

export const RPLFontNormal: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.regular,
  fontSize: moderateScale(14),
};

export const RPLFontNormalBold: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.bold,
  fontSize: moderateScale(14),
};

export const RPLFontMedium: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.regular,
  fontSize: moderateScale(16),
};

export const RPLFontMediumBold: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.bold,
  fontSize: moderateScale(16),
};

export const RPLFontLarge: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.regular,
  fontSize: moderateScale(18),
};

export const RPLFontLargeBold: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.bold,
  fontSize: moderateScale(18),
};

export const RPLFontExtraLarge: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.regular,
  fontSize: moderateScale(20),
};

export const RPLFontExtraLargeBold: TextStyle = {
  color: assets.colors.black,
  fontFamily: assets.fonts.bold,
  fontSize: moderateScale(20),
};

export const RPLContainer: StyleProp<ViewStyle> = {
  flex: 1,
  backgroundColor: assets.colors.white,
};
