import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import { RPLScreenName } from '../types';
import { Image } from 'react-native';
import assets from '../assets';
import { moderateScale } from 'react-native-size-matters';
import useCartStore from '../store/useCartStore';

const DashboardScreen = () => {
  const BottomTab = createBottomTabNavigator();

  const cartItemCount = useCartStore(state => state.getCartItemCount());

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name={RPLScreenName.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={assets.images.home}
              style={{ height: moderateScale(20), width: moderateScale(20) }}
              tintColor={focused ? assets.colors.blue : assets.colors.grey}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={RPLScreenName.Cart}
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={assets.images.cart}
              style={{ height: moderateScale(20), width: moderateScale(20) }}
              tintColor={focused ? assets.colors.blue : assets.colors.grey}
            />
          ),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default DashboardScreen;
