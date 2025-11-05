import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { useNavigation } from '@react-navigation/native'
import CategoryService from '../../service/CategoryService'
import CategoryItem from '../../components/sell/CategoryItem'
import CategorySectionHeader from '../../components/sell/CategorySectionHeader'

// Category images mapping
const CATEGORY_IMAGES: { [key: string]: string } = {
  'Vehicles': 'https://www.olx.com.lb/assets/vehicles.74fb4e1f768784288a0c358372fe3f8b.png',
  'Cars for Sale': 'https://www.olx.com.lb/assets/vehicles.74fb4e1f768784288a0c358372fe3f8b.png',
  'Properties': 'https://www.olx.com.lb/assets/property.d5813812616778f179963565f8a533ca.png',
  'Properties for Sale': 'https://www.olx.com.lb/assets/property.d5813812616778f179963565f8a533ca.png',
  'Properties for Rent': 'https://www.olx.com.lb/assets/property.d5813812616778f179963565f8a533ca.png',
  'Mobiles & Accessories': 'https://www.olx.com.lb/assets/mobile-phones-accessories.fa686c4b6a528d5dba5fcaf4216669fd.png',
  'Mobile Phones': 'https://www.olx.com.lb/assets/mobile-phones-accessories.fa686c4b6a528d5dba5fcaf4216669fd.png',
  'Electronics & Appliances': 'https://www.olx.com.lb/assets/electronics-home-appliances.2a32a75df439dfc0d7e1d8b99826d41c.png',
  'Furniture & Decor': 'https://www.olx.com.lb/assets/home-furniture-decor.fbc166b0b12e9d5f8f739be50194ad25.png',
  'Businesses & Industrial': 'https://www.olx.com.lb/assets/business-industrial.5ce4bde7ea9273b407f7ad46505a5cc5.png',
  'Pets': 'https://www.olx.com.lb/assets/pets.1a36a96ea593ace65f6b95fd57e7f21a.png',
  'Kids & Babies': 'https://www.olx.com.lb/assets/kids-babies.bcfd4ede63f7c505cb04023ba00cea33.png',
  'Sports & Equipment': 'https://www.olx.com.lb/assets/sports-equipment.3dd8e635faf78e841a0e37cf1efd839c.png',
  'Hobbies': 'https://www.olx.com.lb/assets/hobbies-music-art-books.41b9abcabd86f9245dffed53b2662909.png',
  'jobs': 'https://www.olx.com.lb/assets/jobs.d998b37fb9610644be7854e07eebcc57.png',
  'Jobs': 'https://www.olx.com.lb/assets/jobs.d998b37fb9610644be7854e07eebcc57.png',
  'Fashion & Beauty': 'https://www.olx.com.lb/assets/fashion-beauty.e7680669aee4a534134043be9a312daa.png',
  'Services': 'https://www.olx.com.lb/assets/services.500ad9620e19c68ff07a413734bdd6f9.png',
};

const CreateAd = () => {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCategoryImage = (name: string, nameShort?: string) => {
    return CATEGORY_IMAGES[nameShort || ''] || CATEGORY_IMAGES[name] || 'https://www.olx.com.lb/assets/services.500ad9620e19c68ff07a413734bdd6f9.png';
  };

  const getCategories = async () => {
    setLoading(true);
    CategoryService.getCategories().then((response) => {
      if(response.status === 200) {
        console.log(response.data);
        setCategories(response.data);
      } else {
        console.log('Error fetching categories');
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const popularCategories = categories.slice(0, 4);
  const otherCategories = categories.slice(4);

  const handleCategoryPress = (item: any) => {
    navigation.navigate('SubCategories', { category: item });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>What are you offering?</Text>
      </View>
      
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={[
            { type: 'section' as const, title: 'Popular' },
            ...popularCategories.map(cat => ({ type: 'item' as const, data: cat })),
            { type: 'section' as const, title: 'Others' },
            ...otherCategories.map(cat => ({ type: 'item' as const, data: cat })),
          ]}
          renderItem={({ item }: any) => {
            if (item.type === 'section') {
              return <CategorySectionHeader title={item.title} />;
            }
            return <CategoryItem item={item.data} onPress={handleCategoryPress} getCategoryImage={getCategoryImage} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default CreateAd

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_dark,
    gap: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 24,
    color: colors.text_dark,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text_dark,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingVertical: 8,
    paddingBottom: 20
  },
})