import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import FastImage from '@d11/react-native-fast-image';
import RPLText from './RPLText';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { moderateScale } from 'react-native-size-matters';
import { RPLFontMediumBold, RPLFontNormalBold } from '../commonStyles';
import assets from '../assets';
import { Product } from '../types';
import RPLQuantitySelector from './RPLQuantitySelector';
import RPLButton from './RPLButton';
import useCartStore from '../store/useCartStore';

interface ComponentProps {
  item: Product;
  onPress?: (item: Product) => void;
  showQuantityBtn?: boolean;
  showHearIcon?: boolean;
  showFooterBtn?: boolean;
  onPressDecreaseQty?: () => void;
  onPressIncreaseQty?: () => void;
}

const RPLProductItemComponent: React.FC<ComponentProps> = ({
  item,
  onPress,
  showQuantityBtn = false,
  showFooterBtn = false,
  onPressDecreaseQty = () => {},
  onPressIncreaseQty = () => {},
}) => {
  const addPrductToWishlist = useCartStore(state => state.addProductToWishlist);
  const wishlist = useCartStore(state => state.wishListItems);
  const isLikedStatus = useCartStore(state => state.getStatusOfLikedProducts);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const addToCart = useCartStore(state => state.addToCart);
  const onMoveToWishlistpress = () => {
    addPrductToWishlist(item);
  };

  const isLiked = () => {
    const stattus = isLikedStatus(item.id);
    if (stattus === -1) return false;
    return true;
  };

  const onRemoveItemPress = () => {
    removeFromCart(item.id);
  };
  const onAddToCartPress = () => {
    addToCart(item);
  };
  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.imageWrapper}>
        <FastImage
          source={{
            uri: item.thumbnail,
            priority: FastImage.priority.high,
          }}
          style={styles.productImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <RPLText
        text={item.title}
        style={styles.productTitle}
        numberOfLines={1}
      />

      <StarRatingDisplay
        rating={item.rating}
        maxStars={5}
        starSize={15}
        style={styles.ratingStyle}
      />

      <RPLText
        text={`$ ${item.price}`}
        style={styles.priceText}
        numberOfLines={1}
      />

      {showQuantityBtn && (
        <RPLQuantitySelector
          onPressDecreaseQty={onPressDecreaseQty}
          onPressIncreaseQty={onPressIncreaseQty}
          qty={String(item.quantity)}
        />
      )}

      {showFooterBtn && (
        <View
          style={{
            flexDirection: 'row',
            gap: moderateScale(5),
            paddingVertical: moderateScale(12),
          }}
        >
          <RPLText
            text={
              isLiked()
                ? assets.strings.removeFromWishlist
                : assets.strings.moveToWishlist
            }
            onPress={onMoveToWishlistpress}
            style={RPLFontNormalBold}
            viewStyle={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <View
            style={{ borderRightWidth: 1, borderColor: assets.colors.grey }}
          />
          <RPLText
            text={
              showQuantityBtn
                ? assets.strings.removeFromCart
                : assets.strings.addToCart
            }
            onPress={showQuantityBtn ? onRemoveItemPress : onAddToCartPress}
            style={RPLFontNormalBold}
            viewStyle={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(RPLProductItemComponent);

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(4),
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  productImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginBottom: moderateScale(8),
  },
  productTitle: {
    ...RPLFontMediumBold,
  },
  ratingStyle: {
    width: 15,
    paddingLeft: 0,
    paddingVertical: moderateScale(5),
  },
  priceText: {
    ...RPLFontMediumBold,
    color: assets.colors.blue,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
