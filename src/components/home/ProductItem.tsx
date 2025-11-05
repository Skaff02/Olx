import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import { SvgXml } from 'react-native-svg'
import fonts from '../../theme/fonts'
import moment from 'moment'

const ProductItem = ({ product }: { product: { id: string, name: string, price: number, currency: string, year?: number, mileage?: number, location: { country: string, city: string, area: string }, created_at: string, images: string[] }  }   ) => {
  return (
    <View style={styles.container}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        <View style={styles.priceSection}>
            <Text style={styles.priceText}>USD {product.price}</Text>
            <TouchableOpacity activeOpacity={0.8}>
                <SvgXml xml={HeartIcon} height={15} />
            </TouchableOpacity>
        </View>
        <Text style={styles.nameText} numberOfLines={1}>{product.name}</Text>
        {
            product.year && product.mileage && (
                <View style={styles.yearMileageSection}>
                    <Text style={styles.yearText}>{product.year} - {product.mileage} km</Text>
                </View>
            )
        }
        <View style={styles.locationSection}>
            <Text style={styles.locationText}>{product.location.area}, {product.location.city}</Text>
        </View>
        <Text style={styles.timeText}>{moment(product.created_at).fromNow()}</Text>
    </View>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container: { 
        width: 220,
        backgroundColor: colors.background_dark,
        borderRadius: 5,
        borderColor: colors.border_dark,
        borderWidth: 1,
        paddingBottom: 6,
    },
    image: {
        height: 100,
        width: '100%',
        resizeMode: 'cover',
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
    },
    priceSection: { 
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    priceText: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: colors.secondary,
    },
    nameText: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.text_dark,
        paddingHorizontal: 5,
    },
    yearMileageSection: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 4,
        gap: 8,
    },
    yearText: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.text_gray,
    },
    locationSection: { 
        paddingVertical: 6
    },
    locationText: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.text_gray,
        paddingHorizontal: 5,
    },
    timeText: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.text_gray,
        paddingHorizontal: 5,
    }
    
})

const HeartIcon = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 5.25C18.75 2.765 16.651 0.75 14.062 0.75C12.127 0.75 10.465 1.876 9.75 3.483C9.035 1.876 7.373 0.75 5.437 0.75C2.85 0.75 0.75 2.765 0.75 5.25C0.75 12.47 9.75 17.25 9.75 17.25C9.75 17.25 18.75 12.47 18.75 5.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;