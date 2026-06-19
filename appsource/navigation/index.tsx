import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { RPLScreenName } from '../types';
import DashboardScreen from '../screens/DashboardScreen';
import ProductDetailScreens from '../screens/ProductDetailScreens';
import WishlistScreen from '../screens/WishlistScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={RPLScreenName.Login}
      >
        <Stack.Screen name={RPLScreenName.Login} component={LoginScreen} />
        <Stack.Screen
          name={RPLScreenName.Dashboard}
          component={DashboardScreen}
        />
        <Stack.Screen
          name={RPLScreenName.ProductDetail}
          component={ProductDetailScreens}
        />
        <Stack.Screen
          name={RPLScreenName.Wishlist}
          component={WishlistScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
