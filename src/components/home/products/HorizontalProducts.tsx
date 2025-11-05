import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SectionHeader from '../shared/SectionHeader'
import ProductItem from './ProductItem'

const HorizontalProducts = ({ data, title }: { data: { id: string, name: string, price: number, currency: string, year?: number, mileage?: number, bedrooms?: number, bathrooms?: number, space?: number, location: { country: string, city: string, area: string }, created_at: string, images: string[] }[], title: string }  ) => {
  return (
    <View style={styles.container}>
      <SectionHeader title={title} />
      <View style={{marginTop: 16}}>
        <FlatList
            data={data}
            renderItem={({ item }) => <ProductItem product={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            bounces={false}
        />
      </View>
    </View>
  )
}

export default HorizontalProducts

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    container: {
        marginTop: 16,
    }
})