import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import RPLText from '../components/RPLText';
import { moderateScale } from 'react-native-size-matters';
import assets from '../assets';
import useCartStore from '../store/useCartStore';
import {
  RPLContainer,
  RPLFontMedium,
  RPLFontMediumBold,
  RPLFontLargeBold,
} from '../commonStyles';
import RPLProductItemComponent from '../components/RPLProductItemComponent';
import { Product } from '../types';

const CartScreen = () => {
  const cartItems = useCartStore(state => state.cartItems);
   const setItemQuantity = useCartStore(state => state.setItemQuantity);
   const getCartTotal = useCartStore(state => state.getCartTotal);

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <RPLProductItemComponent
      item={item}
      showQuantityBtn
      onPressDecreaseQty={() => setItemQuantity(item.id, item.quantity - 1)}
      onPressIncreaseQty={() => setItemQuantity(item.id, item.quantity + 1)}
      showFooterBtn
    />
  );

  return (
    <View style={RPLContainer}>
      <View style={styles.header}>
        <RPLText text={assets.strings.yourCart} style={styles.headerTitle} />
        <RPLText
          text={`${cartItems.length} ${
            cartItems.length === 1 ? 'item' : 'items'
          }`}
          style={styles.headerSubtitle}
        />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <RPLText text="Your cart is empty." style={styles.emptyText} />
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.footer}>
        <RPLText text={assets.strings.totalPrice} style={styles.totalLabel} />
        <RPLText
          text={`$ ${getCartTotal().toFixed(2)}`}
          style={styles.totalValue}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: assets.colors.grey,
  },
  headerTitle: {
    ...RPLFontLargeBold,
    color: assets.colors.dark,
  },
  headerSubtitle: {
    ...RPLFontMedium,
    color: assets.colors.grey,
    marginTop: moderateScale(6),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(24),
  },
  emptyText: {
    ...RPLFontMedium,
    color: assets.colors.grey,
  },
  listContent: {
    padding: moderateScale(12),
    gap: moderateScale(12),
  },
  cartItem: {
    backgroundColor: assets.colors.white,
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: assets.colors.grey,
    gap: moderateScale(12),
  },
  itemDetails: {
    gap: moderateScale(6),
  },
  itemTitle: {
    ...RPLFontMediumBold,
    color: assets.colors.dark,
  },
  itemPrice: {
    ...RPLFontMedium,
    color: assets.colors.blue,
  },

  removeButton: {
    paddingVertical: moderateScale(8),
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    ...RPLFontMediumBold,
    color: assets.colors.red,
  },
  footer: {
    padding: moderateScale(16),
    borderTopWidth: 1,
    borderTopColor: assets.colors.grey,
    backgroundColor: assets.colors.white,
  },
  totalLabel: {
    ...RPLFontMedium,
    color: assets.colors.grey,
  },
  totalValue: {
    ...RPLFontLargeBold,
    color: assets.colors.dark,
    marginTop: moderateScale(6),
  },
});
