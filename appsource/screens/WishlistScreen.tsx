import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import useCartStore from '../store/useCartStore';
import RPLScreenHeader from '../components/RPLScreenHeader';
import assets from '../assets';
import RPLText from '../components/RPLText';
import RPLProductItemComponent from '../components/RPLProductItemComponent';
import { Product } from '../types';
import { RPLContainer, RPLFontMedium } from '../commonStyles';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

const WishlistScreen = () => {
  const WishlistedProduct = useCartStore(state => state.wishListItems);
  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <RPLProductItemComponent item={item} showFooterBtn />
  );
  return (
    <SafeAreaView style={RPLContainer}>
      <RPLScreenHeader title={assets.strings.favoriteProduct} />
      {WishlistedProduct.length === 0 ? (
        <View style={styles.emptyState}>
          <RPLText text="Your cart is empty." style={styles.emptyText} />
        </View>
      ) : (
        <FlatList
          data={WishlistedProduct}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          style={{ paddingBottom: moderateScale(50) }}
        />
      )}
    </SafeAreaView>
  );
};

export default WishlistScreen;
const styles = StyleSheet.create({
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
});
