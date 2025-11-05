import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import Header from '../components/home/Header';
import Carousel from '../components/home/Carousel';
import SectionHeader from '../components/home/SectionHeader';
import Categories from '../components/home/Categories';

const Home = () => {
    const insets = useSafeAreaInsets();

    const [location, setLocation] = useState<string>('Lebanon');
    const [categories, setCategories] = useState<{ id: string, name: string, image: string }[]>([
        { id: '1', name: 'Vehicles', image: 'https://www.olx.com.lb/assets/vehicles.74fb4e1f768784288a0c358372fe3f8b.png' },
        { id: '2', name: 'Properties', image: 'https://www.olx.com.lb/assets/property.d5813812616778f179963565f8a533ca.png' },
        { id: '3', name: 'Mobiles & Accessories', image: 'https://www.olx.com.lb/assets/mobile-phones-accessories.fa686c4b6a528d5dba5fcaf4216669fd.png' },
        { id: '4', name: 'Electronics & Appliances djhsjdhs', image: 'https://www.olx.com.lb/assets/electronics-home-appliances.2a32a75df439dfc0d7e1d8b99826d41c.png' },
        { id: '5', name: 'Furniture & Decor', image: 'https://www.olx.com.lb/assets/home-furniture-decor.fbc166b0b12e9d5f8f739be50194ad25.png' },
        { id: '6', name: 'Businesses & Industrial', image: 'https://www.olx.com.lb/assets/business-industrial.5ce4bde7ea9273b407f7ad46505a5cc5.png' },
        { id: '7', name: 'Pets', image: 'https://www.olx.com.lb/assets/pets.1a36a96ea593ace65f6b95fd57e7f21a.png' },
        { id: '8', name: 'Kids & Babies', image: 'https://www.olx.com.lb/assets/kids-babies.bcfd4ede63f7c505cb04023ba00cea33.png' },
        { id: '9', name: 'Sports & Equipment', image: 'https://www.olx.com.lb/assets/sports-equipment.3dd8e635faf78e841a0e37cf1efd839c.png' },
        { id: '10', name: 'Hobbies', image: 'https://www.olx.com.lb/assets/hobbies-music-art-books.41b9abcabd86f9245dffed53b2662909.png' },
        { id: '11', name: 'jobs', image: 'https://www.olx.com.lb/assets/jobs.d998b37fb9610644be7854e07eebcc57.png' },
        { id: '12', name: 'Fashion & Beauty', image: 'https://www.olx.com.lb/assets/fashion-beauty.e7680669aee4a534134043be9a312daa.png' },
        { id: '13', name: 'Services', image: 'https://www.olx.com.lb/assets/services.500ad9620e19c68ff07a413734bdd6f9.png' },
    ]);

    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
        }]}>
            <Header location={location} />
            <Carousel />
            <Categories categories={categories} /> 
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background_dark,
    },
})