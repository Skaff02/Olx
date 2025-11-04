import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import fonts from '../theme/fonts';
import colors from '../theme/colors';

const Home = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
        }]}>
            
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