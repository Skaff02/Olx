import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Sample carousel images - replace with your actual images
const CAROUSEL_DATA = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
  }
];

const Carousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % CAROUSEL_DATA.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );
    setCurrentIndex(slideIndex);
  };

  const renderItem = ({item}: {item: {id: string; image: string}}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.image}} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(() => resolve(undefined), 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingBottom: 16
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});