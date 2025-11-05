import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@app_language';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

// Get saved language from AsyncStorage
const getStoredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return savedLanguage || 'en';
  } catch (error) {
    console.error('Error loading saved language:', error);
    return 'en';
  }
};

// Initialize i18n
const initI18n = async () => {
  const savedLanguage = await getStoredLanguage();
  
  // Set RTL based on saved language
  const isRTL = savedLanguage === 'ar';
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

// Initialize on startup
initI18n();

export const changeLanguage = async (language: string) => {
  const isRTL = language === 'ar';
  
  // Save language preference
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
  
  // Only reload the app if RTL direction needs to change
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
  }
  
  await i18n.changeLanguage(language);
};

export default i18n;

