import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import Header from '../components/home/Header';
import Carousel from '../components/home/Carousel';

const Home = () => {

    const insets = useSafeAreaInsets();

    const [location, setLocation] = useState<string>('Lebanon');

    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
        }]}>
            <Header location={location} />
            <Carousel />
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