import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import Header from '../../components/shared/Header'
import SubCategoryItem from '../../components/sell/SubCategoryItem'
import { useTranslation } from 'react-i18next'

const SubCategories = ({navigation, route}: {navigation: any, route: any}) => {

  const { category } = route.params
  const subCategories = category.children || []

  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  
  const displayName = isArabic && category.name_l1 ? category.name_l1 : (category.nameShort || category.name)

  const handleSubCategoryPress = (item: any) => {
    if (item.children && item.children.length > 0) {
      navigation.push('SubCategories', { category: item });
    } else {
      navigation.navigate('AdDetails', { category: item });
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={displayName} />
      
      <FlatList
        data={subCategories}
        renderItem={({ item }) => <SubCategoryItem item={item} onPress={handleSubCategoryPress} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default SubCategories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
  },
  listContainer: {
    paddingVertical: 4,
    gap: 22
  },
})