import {
  ScrollView,
  View,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RPLScreenHeader from '../components/RPLScreenHeader';
import assets from '../assets';
import { getProductDetail } from '../network/products';
import { Product } from '../types';
import {
  RPLContainer,
  RPLFontLargeBold,
  RPLFontMedium,
  RPLFontMediumBold,
  RPLFontNormal,
  RPLFontNormalBold,
} from '../commonStyles';
import RPLImageCarousel from '../components/RPLImageCarousel';
import RPLText from '../components/RPLText';
import { moderateScale } from 'react-native-size-matters';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { format } from 'date-fns';
import RPLActivityIndicator from '../components/RPLActivityIndicator';
import RPLButton from '../components/RPLButton';
import useCartStore from '../store/useCartStore';
import RPLQuantitySelector from '../components/RPLQuantitySelector';

const ProductDetailScreens = (props: any) => {
  const { id } = props.route.params;

  const [productDetail, setproductDetail] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [isLiked, setIsliked] = useState<boolean>(false);

  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const setItemQuantity = useCartStore(state => state.setItemQuantity);

  const getProductFromCart = useCartStore(state => state.getProductFromCart);
  const addPrductToWishlist = useCartStore(state => state.addProductToWishlist);
  const isLikedStatus = useCartStore(state => state.getStatusOfLikedProducts);

  useEffect(() => {
    getProductDetailFromAPI();
  }, []);

  const onMoveToWishlistpress = () => {
    addPrductToWishlist(productDetail);
    setIsliked(!isLiked);
  };

  const getProductDetailFromAPI = async () => {
    setLoading(true);
    const getproductFromCart = getProductFromCart(id);
    const status = isLikedStatus(id);
    if (getproductFromCart) {
      setproductDetail(getproductFromCart);
      setQuantity(getproductFromCart.quantity);
      if (status === -1) {
        setIsliked(false);
      } else {
        setIsliked(true);
      }
    }
    const data = await getProductDetail(id);
    setproductDetail(data);
    setLoading(false);
    if (status === -1) {
      setIsliked(false);
    } else {
      setIsliked(true);
    }
  };

  const handleQuantityChange = useCallback(
    (value: number) => {
      setQuantity(current => {
        const next = current + value;
        setItemQuantity(id, next);

        return next < 1 ? 1 : next;
      });
    },
    [setQuantity],
  );

  const handleAddToCart = useCallback(() => {
    setQuantity(1);
    if (!productDetail?.id) {
      return;
    }
    addToCart(productDetail, quantity === 0 ? 1 : quantity);
    Alert.alert('Success', `${productDetail.title} added to cart.`);
  }, [addToCart, productDetail, quantity]);

  const handleRemoveFromCart = useCallback(() => {
    setQuantity(0);
    removeFromCart(id);
    setItemQuantity(id, 0);
    Alert.alert('Success', `${productDetail.title} removed from cart.`);
  }, [addToCart, productDetail, quantity]);

  return (
    <>
      {loading && <RPLActivityIndicator />}
      <SafeAreaView style={RPLContainer}>
        <RPLScreenHeader title={assets.strings.productDetail} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {productDetail.images && productDetail.images.length && (
            <RPLImageCarousel imageSrc={productDetail.images} />
          )}
          <View style={{ paddingHorizontal: moderateScale(12) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RPLText
                text={productDetail.title}
                style={{ ...RPLFontLargeBold, color: assets.colors.dark }}
                viewStyle={{ flex: 1 }}
              />
              <TouchableOpacity onPress={onMoveToWishlistpress}>
                <Image
                  source={
                    isLiked ? assets.images.heartred : assets.images.heart
                  }
                  style={{
                    height: moderateScale(20),
                    width: moderateScale(20),
                    marginLeft: moderateScale(14),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <StarRatingDisplay
            rating={productDetail.rating}
            maxStars={5}
            starSize={moderateScale(25)}
            style={{
              paddingLeft: moderateScale(6),
              paddingTop: moderateScale(4),
            }}
          />
          <View
            style={{
              paddingHorizontal: moderateScale(12),
              paddingVertical: moderateScale(14),
            }}
          >
            <RPLText
              text={`$ ${productDetail.price}`}
              style={{
                ...RPLFontLargeBold,
                color: assets.colors.blue,
                marginBottom: moderateScale(12),
              }}
              numberOfLines={1}
            />
            {quantity !== 0 && (
              <RPLQuantitySelector
                onPressDecreaseQty={() => handleQuantityChange(-1)}
                onPressIncreaseQty={() => handleQuantityChange(1)}
                qty={String(quantity)}
              />
            )}
            <RPLButton
              title={
                quantity !== 0
                  ? assets.strings.removeFromCart
                  : assets.strings.addToCart
              }
              onPress={quantity !== 0 ? handleRemoveFromCart : handleAddToCart}
              isTransparent={quantity !== 0}
            />
          </View>

          <View style={{ padding: moderateScale(12), gap: moderateScale(5) }}>
            <RPLText
              text={assets.strings.specification}
              style={{ ...RPLFontLargeBold, color: assets.colors.dark }}
              numberOfLines={1}
            />
            <LeftRightValueComponent
              leftValue={assets.strings.category}
              rightValue={productDetail.category}
            />
            <LeftRightValueComponent
              leftValue={assets.strings.weight}
              rightValue={`${productDetail.weight} gm.`}
            />
            <LeftRightValueComponent
              leftValue={assets.strings.warranty}
              rightValue={productDetail.warrantyInformation}
            />
            <LeftRightValueComponent
              leftValue={assets.strings.availability}
              rightValue={productDetail.availabilityStatus}
            />
            <LeftRightValueComponent
              leftValue={assets.strings.returnPolicy}
              rightValue={productDetail.returnPolicy}
            />
            <RPLText
              text={productDetail.description}
              style={{
                ...RPLFontMedium,
                color: assets.colors.dark,
                marginVertical: moderateScale(4),
              }}
              numberOfLines={500}
            />
          </View>

          {productDetail.reviews && productDetail.reviews.length && (
            <>
              <View
                style={{ padding: moderateScale(12), gap: moderateScale(5) }}
              >
                <RPLText
                  text={assets.strings.reviewProduct}
                  style={{ ...RPLFontLargeBold, color: assets.colors.dark }}
                  numberOfLines={1}
                />
                {productDetail.reviews.map((item, index) => {
                  return (
                    <>
                      <View
                        style={{
                          gap: moderateScale(4),
                        }}
                      >
                        <RPLText
                          text={item.reviewerName}
                          style={RPLFontMediumBold}
                        />
                        <RPLText
                          text={item.reviewerEmail}
                          style={RPLFontNormal}
                        />
                        <StarRatingDisplay
                          rating={item.rating}
                          maxStars={5}
                          starSize={moderateScale(25)}
                          style={{
                            paddingVertical: moderateScale(4),
                          }}
                        />
                        <RPLText
                          text={item.comment}
                          style={RPLFontNormalBold}
                        />
                        <RPLText
                          text={format(item.date, 'MMM d, yyyy')}
                          style={RPLFontNormalBold}
                        />
                      </View>
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: assets.colors.grey,
                          marginVertical: moderateScale(4),
                        }}
                      />
                    </>
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProductDetailScreens;

const LeftRightValueComponent = ({
  leftValue,
  rightValue,
}: {
  leftValue: string;
  rightValue: string;
}) => {
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <RPLText
        text={leftValue}
        viewStyle={{ flex: 0.3 }}
        style={RPLFontMediumBold}
      />
      <RPLText
        text={rightValue}
        style={RPLFontMedium}
        viewStyle={{
          flex: 0.7,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      />
    </View>
  );
};
