import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import RPLTextInput from './RPLTextInput';
import assets from '../assets';
import RPLText from './RPLText';
import { RPLFontMediumBold } from '../commonStyles';
import { useNavigation } from '@react-navigation/native';
import { RPLScreenName } from '../types';

interface ComponentProps {
  value?: string;
  onChange?: (text: string) => void;
  homeScreen?: boolean;
  title?: string;
  showSearch?: boolean;
}

const RPLScreenHeader = ({
  value,
  onChange = () => {},
  homeScreen,
  title = '',
  showSearch,
}: ComponentProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: moderateScale(12),
        borderBottomWidth: 1,
        borderColor: assets.colors.grey,
      }}
    >
      {homeScreen ? (
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RPLTextInput
              value={value ?? ''}
              onChange={onChange}
              placeholder={assets.strings.searchProduct}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: moderateScale(5),
            }}
            onPress={() => navigation.navigate(RPLScreenName.Wishlist)}
          >
            <Image
              source={assets.images.heart}
              style={{
                height: moderateScale(26),
                width: moderateScale(26),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: moderateScale(12),
              paddingRight: moderateScale(10),
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={assets.images.back}
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <RPLText
            text={title}
            style={RPLFontMediumBold}
            viewStyle={{ flex: 0.9 }}
          />
          {showSearch && (
            <TouchableOpacity
              style={{
                paddingVertical: moderateScale(12),
                paddingRight: moderateScale(10),
                flex: 0.1,
                alignItems: 'flex-end',
              }}
            >
              <Image
                source={assets.images.search}
                style={{
                  height: moderateScale(20),
                  width: moderateScale(20),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default RPLScreenHeader;
