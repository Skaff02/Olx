import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SectionHeader from '../shared/SectionHeader'
import CategoryItem from './CategoryItem'
import { useTranslation } from 'react-i18next'

const Categories = ({ categories }: { categories: { id: string, name: string, image: string }[] }) => {
    const { t } = useTranslation()
    
  return (
    <View>
        <SectionHeader title={t('home.categories')} />  
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