import { View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import assets from '../assets';
import { moderateScale } from 'react-native-size-matters';
import {
  RPLContainer,
  RPLFontLarge,
  RPLFontLargeBold,
  RPLFontNormalBold,
} from '../commonStyles';
import RPLText from '../components/RPLText';
import RPLTextInput from '../components/RPLTextInput';
import { loginCreds, RPLScreenName } from '../types';
import RPLButton from '../components/RPLButton';

const LoginScreen = ({ navigation }: any) => {
  const [loginCreds, setLoginCreds] = useState<loginCreds>({
    email: '',
    password: '',
  });

  const handleOnChangeTextInput = (value: string, field: keyof loginCreds) => {
    setLoginCreds(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOnSignInPress = () => {
    navigation.navigate(RPLScreenName.Dashboard);
  };
  const handleGooglePress = () => {};
  const handleFacebookPress = () => {};

  return (
    <SafeAreaView style={[RPLContainer]}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ gap: moderateScale(12) }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: moderateScale(20),
          }}
        >
          <Image
            source={assets.images.logo}
            style={{
              resizeMode: 'contain',
              height: moderateScale(150),
              width: moderateScale(150),
            }}
          />
        </View>
        <View
          style={{
            gap: moderateScale(12),
            paddingHorizontal: moderateScale(12),
          }}
        >
          <RPLText
            text={assets.strings.welcomeToLafyuu}
            style={RPLFontLargeBold}
            viewStyle={{ alignItems: 'center' }}
          />
          <RPLText
            text={assets.strings.signInToContinue}
            style={RPLFontLarge}
            viewStyle={{
              alignItems: 'center',
              paddingBottom: moderateScale(24),
            }}
          />

          <RPLTextInput
            placeholder={assets.strings.yourEmail}
            value={loginCreds.email}
            onChange={val => handleOnChangeTextInput(val, 'email')}
            showLeftIcon
            iconName={assets.images.mail}
          />
          <RPLTextInput
            placeholder={assets.strings.password}
            value={loginCreds.password}
            onChange={val => handleOnChangeTextInput(val, 'password')}
            showLeftIcon
            iconName={assets.images.password}
            showHideForPassword
          />

          <RPLButton
            title={assets.strings.signIn}
            onPress={handleOnSignInPress}
          />

          <RPLText
            text={assets.strings.or}
            style={{ ...RPLFontLargeBold, textAlign: 'center' }}
          />
          <RPLButton
            title={assets.strings.loginWithGoogle}
            onPress={handleGooglePress}
            isTransparent
            leftIcon={assets.images.google}
          />
          <RPLButton
            title={assets.strings.loginWithFacebook}
            onPress={handleFacebookPress}
            isTransparent
            leftIcon={assets.images.facebook}
          />
          <RPLText
            text={assets.strings.forgotPassword}
            style={{
              ...RPLFontNormalBold,
              textAlign: 'center',
              color: assets.colors.blue,
              marginTop: moderateScale(12),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <RPLText
              text={assets.strings.dontHaveAnAccount}
              style={{
                ...RPLFontNormalBold,
                textAlign: 'center',
                color: assets.colors.black,
              }}
            />
            <RPLText
              text={` ${assets.strings.register}`}
              style={{
                ...RPLFontNormalBold,
                textAlign: 'center',
                color: assets.colors.blue,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
