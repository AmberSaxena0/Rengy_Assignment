import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import RPLText from './RPLText';
import { moderateScale } from 'react-native-size-matters';
import { RPLFontMediumBold } from '../commonStyles';
import assets from '../assets';

interface ComponentProps {
  onPressDecreaseQty: () => void;
  onPressIncreaseQty: () => void;
  qty: string;
}

const RPLQuantitySelector = ({
  onPressDecreaseQty,
  onPressIncreaseQty,
  qty,
}: ComponentProps) => {
  return (
    <View style={styles.quantityRow}>
      <TouchableOpacity
        onPress={onPressDecreaseQty}
        style={styles.quantityButton}
      >
        <RPLText text="-" style={styles.quantityButtonText} />
      </TouchableOpacity>
      <RPLText text={qty} style={styles.quantityText} />
      <TouchableOpacity
        onPress={onPressIncreaseQty}
        style={styles.quantityButton}
      >
        <RPLText text="+" style={styles.quantityButtonText} />
      </TouchableOpacity>
    </View>
  );
};

export default RPLQuantitySelector;

const styles = StyleSheet.create({
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginTop: moderateScale(14),
    marginBottom: moderateScale(12),
  },
  quantityButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: assets.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    ...RPLFontMediumBold,
    color: assets.colors.white,
  },
  quantityText: {
    ...RPLFontMediumBold,
    minWidth: moderateScale(20),
    textAlign: 'center',
  },
});
