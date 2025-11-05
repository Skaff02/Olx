import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import Carousel from '../../components/home/carousel/Carousel';
import SectionHeader from '../../components/home/shared/SectionHeader';
import Categories from '../../components/home/categories/Categories';
import HorizontalProducts from '../../components/home/products/HorizontalProducts';
import Header from '../../components/home/header/Header';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const [location, setLocation] = useState<string>(t('home.location'));
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

    const [mobilePhones, setMobilePhones] = useState<{ id: string, name: string, price: number, currency: string, location: { country: string, city: string, area: string }, created_at: string, images: string[] }[]>([
        {
            id: '0',
            name: "mi 13 ultra",
            price: 280,
            currency: "USD",
            location: { country: "Lebanon", city: "Saida", area: "Saida Downtown" },
            created_at: "2025-10-23T03:35:00Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15417411-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15417412-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15417413-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15417414-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15417415-800x600.webp"
            ]
        },
        {
            id: '1',
            name: "15 128gb used like new",
            price: 549,
            currency: "USD",
            location: { country: "Lebanon", city: "Beirut", area: "Sanayeh" },
            created_at: "2025-10-07T18:56:05Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15444883-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444884-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444885-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444886-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444887-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444888-800x600.webp"
            ]
        },
        {
            id: '2',
            name: "Samsung Galaxy Flip 7 FE (with free adapter)",
            price: 829,
            currency: "USD",
            location: { country: "Lebanon", city: "Metn", area: "Jal El Dib" },
            created_at: "2025-09-15T22:14:04Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15064411-800x600.webp"
            ]
        },
        {
            id: '3',
            name: "Samsung A17",
            price: 165,
            currency: "USD",
            location: { country: "Lebanon", city: "Metn", area: "Dekwaneh" },
            created_at: "2025-08-12T08:52:25Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15302318-800x600.webp"
            ]
        },
    ]);

    const [cars, setCars] = useState<{ id: string, name: string, price: number, currency: string, year: number, mileage: number, location: { country: string, city: string, area: string }, created_at: string, images: string[] }[]>([
        {
            id: '0',
            name: "Honda CR-V 2010",
            price: 10500,
            currency: "USD",
            year: 2010,
            mileage: 185000,
            location: { country: "Lebanon", city: "Akkar", area: "Halba" },
            created_at: "2025-10-03T12:50:43Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15460484-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460485-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460486-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460487-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460488-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460489-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460490-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460491-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460492-800x600.webp"
            ]
        },
        {
            id: '1',
            name: "Toyota Coaster 2003",
            price: 11000,
            currency: "USD",
            year: 2003,
            mileage: 185000,
            location: { country: "Lebanon", city: "Akkar", area: "Halba" },
            created_at: "2025-10-23T08:49:25Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15460261-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460262-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460263-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460264-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15460265-800x600.webp"
            ]
        },
        {
            id: '2',
            name: "Lexus GX-Series 2010",
            price: 35000,
            currency: "USD",
            year: 2010,
            mileage: 150000,
            location: { country: "Lebanon", city: "Akkar", area: "Halba" },
            created_at: "2025-10-17T21:44:25Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15408896-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408897-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408898-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408899-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408900-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408901-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408902-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408903-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15408904-800x600.webp"
            ]
        },
        {
            id: '3',
            name: "Nissan Rogue 2018",
            price: 16000,
            currency: "USD",
            year: 2018,
            mileage: 0,
            location: { country: "Lebanon", city: "Akkar", area: "Halba" },
            created_at: "2025-10-23T16:12:56Z",
            images: [
                "https://images.olx.com.lb/thumbnails/15444157-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444158-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444159-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444160-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444161-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444162-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444163-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444164-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444165-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444166-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444167-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444168-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444169-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444170-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444171-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444172-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444173-800x600.webp",
                "https://images.olx.com.lb/thumbnails/15444174-800x600.webp"
            ]
        }
    ]);

    const [properties, setProperties] = useState<{ id: string, name: string, price: number, currency: string, bedrooms: number, bathrooms: number, space: number, location: { country: string, city: string, area: string }, created_at: string, images: string[] }[]>([
        {
            id: '0',
            name: "Ballouneh 200m2 | Designer’s Signature | Furnished | Panoramic View | TO",
            price: 235000,
            currency: "USD",
            bedrooms: 3,
            bathrooms: 3,
            space: 200,
            location: { country: "Lebanon", city: "Keserouan", area: "Ballouneh" },
            created_at: "2025-02-14T18:55:30Z",
            images: [
              "https://images.olx.com.lb/thumbnails/15269319-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269320-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269321-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269322-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269323-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269324-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269325-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269326-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269327-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15269328-800x600.webp"
            ]
          },
          {
            id: '1',
            name: "L16787 - Exclusive! Apartment For Sale in Achrafieh, Sioufi",
            price: 1250000,
            currency: "USD",
            bedrooms: 4,
            bathrooms: 4,
            space: 380,
            location: { country: "Lebanon", city: "Beirut", area: "Achrafieh" },
            created_at: "2025-03-08T09:22:46Z",
            images: [
              "https://images.olx.com.lb/thumbnails/13993690-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993691-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993692-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993693-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993694-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993695-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993696-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993697-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993698-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993699-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993700-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993701-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993702-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993703-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993704-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993705-800x600.webp",
              "https://images.olx.com.lb/thumbnails/13993706-800x600.webp"
            ]
          },
          {
            id: '2',
            name: "Mansourieh Belle Vue 150M2 Underconstruction منصورية شقة قيد الإنشاء",
            price: 238000,
            currency: "USD",
            bedrooms: 3,
            bathrooms: 3,
            space: 150,
            location: { country: "Lebanon", city: "Metn", area: "Mansourieh" },
            created_at: "2025-06-05T00:25:36Z",
            images: [
              "https://images.olx.com.lb/thumbnails/14273208-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273008-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273009-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273010-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273011-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273012-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273013-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273014-800x600.webp",
              "https://images.olx.com.lb/thumbnails/14273007-800x600.webp"
            ]
          },

          {
            id: '3',
            name: "2 bedrooms apartment for sale ain el remmaneh شقة للبيع في عين الرمانة",
            price: 200000,
            currency: "USD",
            bedrooms: 2,
            bathrooms: 2,
            space: 100,
            location: { country: "Lebanon", city: "Beirut", area: "Ain El Remmaneh" },
            created_at: "2025-05-02T13:54:20Z",
            images: [
              "https://images.olx.com.lb/thumbnails/15116831-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116832-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116833-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116834-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116835-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116836-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116837-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116838-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116839-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116840-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116841-800x600.webp",
              "https://images.olx.com.lb/thumbnails/15116842-800x600.webp"
            ]
          }
    ]);

    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
        }]}>
            <Header location={location} />
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 16}} contentContainerStyle={{paddingBottom: 16}} bounces={false}>
                <Carousel />
                <Categories categories={categories} />
                <HorizontalProducts data={mobilePhones} title={t('home.mobilePhones')} />
                <View style={{ marginTop: 5 }}>
                    <HorizontalProducts data={cars} title={t('home.carsForSale')} />
                </View>
                <View style={{ marginTop: 5 }}>
                    <HorizontalProducts data={properties} title={t('home.propertiesForSale')} />
                </View>
            </ScrollView>
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