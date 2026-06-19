import {
  View,
  TextInput,
  KeyboardType,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import assets from '../assets';
import RPLText from './RPLText';
import { RPLFontNormal } from '../commonStyles';

interface ComponentProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  iconName?: any;
  showLeftIcon?: boolean;
  showHideForPassword?: boolean;
  keyboardType?: KeyboardType;
}

const RPLTextInput: React.FC<ComponentProps> = ({
  value,
  onChange,
  iconName,
  showHideForPassword = false,
  showLeftIcon = false,
  placeholder,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <View
      style={{
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(6),
        borderWidth: 1,
        borderColor: isFocused ? assets.colors.blue : assets.colors.grey,
        borderRadius: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
      }}
    >
      {showLeftIcon && (
        <Image
          source={iconName}
          style={{
            height: moderateScale(20),
            width: moderateScale(20),
            resizeMode: 'contain',
            tintColor: isFocused ? assets.colors.blue : assets.colors.black,
          }}
        />
      )}
      <View style={{ flex: 1 }}>
        {value.length <= 0 && (
          <RPLText
            text={placeholder}
            style={RPLFontNormal}
            viewStyle={{
              position: 'absolute',
              top: moderateScale(10),
              left: moderateScale(5),
            }}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          style={{
            fontFamily: assets.fonts.semiBold,
            fontSize: moderateScale(14),
            color: assets.colors.black,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={showPass}
        />
      </View>
      {showHideForPassword && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Image
            source={showPass ? assets.images.eyeOpen : assets.images.eyeClosed}
            style={{
              height: moderateScale(25),
              width: moderateScale(25),
              resizeMode: 'contain',
              tintColor: assets.colors.black,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RPLTextInput;
