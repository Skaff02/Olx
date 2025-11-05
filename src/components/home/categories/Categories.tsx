import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SectionHeader from '../shared/SectionHeader'
import CategoryItem from './CategoryItem'

const Categories = ({ categories }: { categories: { id: string, name: string, image: string }[] }) => {
    
  return (
    <View>
        <SectionHeader title="All Categories" />  
        <View style={{marginTop: 16}}>
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryItem category={item} />}
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

export default Categories

const styles = StyleSheet.create({
    contentContainer: { 
        gap: 16,
        paddingHorizontal: 16,
    }
})