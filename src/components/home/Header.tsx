import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'
import fonts from '../../theme/fonts'
import colors from '../../theme/colors'

const Header = () => {
  return (
    <View style={styles.container}>
        <View style={styles.upperContainer}>
            <TouchableOpacity style={styles.locationContainer} activeOpacity={0.8}>
                <SvgXml xml={Pin} height={18} />
                <Text style={styles.locationText}>
                    Lebanon
                </Text>
                <SvgXml xml={ArrowDown} height={8} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
                <SvgXml xml={Bell} height={20} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchContainer} activeOpacity={0.8}>
            <SvgXml xml={SearchIcon} height={20} />
            <Text style={styles.searchText}>What are you looking for?</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        gap: 10,
    },
    upperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.text_dark,
    },
    searchContainer: { 
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: colors.background_dark,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border_dark,
        gap: 10,
        paddingHorizontal: 22,
        flexDirection: 'row',
    },
    searchText: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: colors.text_dark,
    }
})

const Pin = `<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 8.25C11.25 9.04565 10.9339 9.80871 10.3713 10.3713C9.80871 10.9339 9.04565 11.25 8.25 11.25C7.45435 11.25 6.69129 10.9339 6.12868 10.3713C5.56607 9.80871 5.25 9.04565 5.25 8.25C5.25 7.45435 5.56607 6.69129 6.12868 6.12868C6.69129 5.56607 7.45435 5.25 8.25 5.25C9.04565 5.25 9.80871 5.56607 10.3713 6.12868C10.9339 6.69129 11.25 7.45435 11.25 8.25Z" stroke="#FCDE68" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 8.25C15.75 15.392 8.25 19.5 8.25 19.5C8.25 19.5 0.75 15.392 0.75 8.25C0.75 6.26088 1.54018 4.35322 2.9467 2.9467C4.35322 1.54018 6.26088 0.75 8.25 0.75C10.2391 0.75 12.1468 1.54018 13.5533 2.9467C14.9598 4.35322 15.75 6.26088 15.75 8.25Z" stroke="#FCDE68" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const ArrowDown = `<svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 0.75L8.25 8.25L0.75 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const Bell = `<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.919 14.832C13.7822 14.6114 15.6129 14.1717 17.373 13.522C15.8824 11.8708 15.0587 9.7245 15.062 7.5V6.75C15.062 5.1587 14.4299 3.63258 13.3046 2.50736C12.1794 1.38214 10.6533 0.75 9.062 0.75C7.4707 0.75 5.94458 1.38214 4.81936 2.50736C3.69414 3.63258 3.062 5.1587 3.062 6.75V7.5C3.06502 9.72463 2.24099 11.871 0.75 13.522C2.483 14.162 4.31 14.607 6.205 14.832M11.919 14.832C10.021 15.0571 8.10301 15.0571 6.205 14.832M11.919 14.832C12.0631 15.2819 12.0989 15.7594 12.0236 16.2257C11.9482 16.692 11.7638 17.134 11.4854 17.5156C11.2069 17.8972 10.8423 18.2076 10.4212 18.4216C10.0001 18.6356 9.53438 18.7472 9.062 18.7472C8.58962 18.7472 8.12392 18.6356 7.70281 18.4216C7.28169 18.2076 6.91707 17.8972 6.63862 17.5156C6.36017 17.134 6.17576 16.692 6.10041 16.2257C6.02506 15.7594 6.0609 15.2819 6.205 14.832" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const SearchIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.7508 18.7508L13.5538 13.5538M13.5538 13.5538C14.9604 12.1472 15.7506 10.2395 15.7506 8.25028C15.7506 6.26108 14.9604 4.35336 13.5538 2.94678C12.1472 1.54021 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.54021 2.94678 2.94678C1.54021 4.35336 0.75 6.26108 0.75 8.25028C0.75 10.2395 1.54021 12.1472 2.94678 13.5538C4.35336 14.9604 6.26108 15.7506 8.25028 15.7506C10.2395 15.7506 12.1472 14.9604 13.5538 13.5538Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;