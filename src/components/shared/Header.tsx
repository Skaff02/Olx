import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

const Header = ({ navigation, title }: { navigation: any, title: string }) => {

  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <SvgXml xml={ArrowLeftIcon} height={17} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text_dark,
  },

  backButton: {
    width: 10,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})

const ArrowLeftIcon = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 15.75L0.75 8.25L8.25 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;