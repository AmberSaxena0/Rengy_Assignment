import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import FastImage from '@d11/react-native-fast-image';
import assets from '../assets';
import { moderateScale } from 'react-native-size-matters';

interface ComponentProps {
  imageSrc: string[];
}

const RPLImageCarousel = ({ imageSrc }: ComponentProps) => {
  const [openCarousel, setOpenCarousel] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const flatListRef = useRef<FlatList<string>>(null);

  const renderImages: ListRenderItem<string> = useCallback(
    ({ item, index }) => {
      console.log(item, 'itemitemitem');
      return (
        <FastImage
          source={{ uri: item, priority: FastImage.priority.high }}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
    },
    [],
  );

  const scrollToIndex = (index: number) => {
    setCurrentIdx(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIdx(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <>
      <TouchableOpacity
        style={{ height: moderateScale(300) }}
        onPress={() => setOpenCarousel(true)}
        activeOpacity={0.9}
      >
        <FastImage
          source={{ uri: imageSrc?.[0], priority: FastImage.priority.high }}
          style={{ height: '100%', width: '100%' }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>

      <Modal visible={openCarousel} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: assets.colors.white }}>
          <TouchableOpacity
            onPress={() => setOpenCarousel(false)}
            style={{
              height: 35,
              width: 35,
              backgroundColor: assets.colors.grey,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: moderateScale(14),
              right: 10,
              borderRadius: moderateScale(50),
              zIndex: 999,
            }}
          >
            <Image
              source={assets.images.close}
              style={{
                height: 15,
                width: 15,
              }}
              tintColor={assets.colors.white}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={imageSrc}
            horizontal
            renderItem={renderImages}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />

          <View style={{ position: 'absolute', bottom: 10 }}>
            <FlatList
              data={imageSrc}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => scrollToIndex(index)}
                    style={{
                      marginHorizontal: moderateScale(5),
                      borderRadius: moderateScale(5),
                      borderWidth: 1.5,
                      borderColor:
                        currentIdx === index
                          ? assets.colors.blue
                          : assets.colors.black,
                    }}
                  >
                    <FastImage
                      source={{ uri: item, priority: FastImage.priority.high }}
                      style={{
                        width: moderateScale(70),
                        height: moderateScale(70),
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RPLImageCarousel;

const styles = StyleSheet.create({});
