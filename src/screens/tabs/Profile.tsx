import { StyleSheet, Text, View, TouchableOpacity, Alert, I18nManager } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../../i18n/config'
import RNRestart from 'react-native-restart'

type Language = {
  code: string
  name: string
  nativeName: string
}

const Profile = () => {
  const insets = useSafeAreaInsets()
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language)

  const languages: Language[] = [
    { code: 'en', name: t('profile.english'), nativeName: 'English' },
    { code: 'ar', name: t('profile.arabic'), nativeName: 'العربية' },
  ]

  useEffect(() => {
    setSelectedLanguage(i18n.language)
  }, [i18n.language])

  const handleLanguageChange = async (code: string) => {
    if (code === selectedLanguage) return

    const isRTL = code === 'ar'
    const needsRestart = I18nManager.isRTL !== isRTL

    if (needsRestart) {
      Alert.alert(
        code === 'ar' ? 'تغيير اللغة' : 'Change Language',
        code === 'ar' 
          ? 'سيتم إعادة تشغيل التطبيق لتطبيق تغيير اللغة'
          : 'The app will restart to apply the language change',
        [
          {
            text: code === 'ar' ? 'إلغاء' : 'Cancel',
            style: 'cancel'
          },
          {
            text: code === 'ar' ? 'موافق' : 'OK',
            onPress: async () => {
              try {
                await changeLanguage(code)
                setSelectedLanguage(code)
                // Restart the app to apply RTL changes
                RNRestart.restart()
              } catch (error) {
                console.error('Error changing language:', error)
              }
            }
          }
        ]
      )
    } else {
      await changeLanguage(code)
      setSelectedLanguage(code)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
          <Text style={styles.sectionSubtitle}>{t('profile.selectLanguage')}</Text>
          
          <View style={styles.languageList}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  selectedLanguage === language.code && styles.languageItemSelected
                ]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageNativeName}>{language.nativeName}</Text>
                </View>
                {selectedLanguage === language.code && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_dark,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.text_dark,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    color: colors.text_dark,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text_gray,
    marginBottom: 20,
  },
  languageList: {
    gap: 12,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.border_dark,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.border_dark,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text_dark,
    marginBottom: 4,
    textAlign: 'left',
  },
  languageNativeName: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text_gray,
    textAlign: 'left',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.background_dark,
    textAlign: 'left',
  },
})