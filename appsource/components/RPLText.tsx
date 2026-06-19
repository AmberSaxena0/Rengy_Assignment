import { View, Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import React, { useState } from 'react';

interface ComponentProps {
  text: any;
  style?: TextStyle;
  viewStyle?: ViewStyle;
  onPress?: () => void;
  numberOfLines?: number;
}

const RPLText: React.FC<ComponentProps> = ({
  text,
  style,
  viewStyle,
  onPress,
  numberOfLines = 1,
}) => {
  const [showFullText, setShowFullText] = useState<boolean>(false);
  return (
    <View style={viewStyle}>
      <Text
        style={style}
        onPress={onPress ? onPress : () => setShowFullText(!showFullText)}
        numberOfLines={showFullText ? Infinity : numberOfLines}
      >
        {String(text)}
      </Text>
    </View>
  );
};

export default RPLText;
