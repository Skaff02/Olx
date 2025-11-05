import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import CategoryFieldsService from '../../service/CategoryFieldsService'
import TextInput from '../../components/sell/form/TextInput'
import SelectInput from '../../components/sell/form/SelectInput'
import HorizontalChoice from '../../components/sell/form/HorizontalChoice'
import Header from '../../components/shared/Header'
import { SvgXml } from 'react-native-svg'

const AdDetails = ({ navigation, route }: { navigation: any, route: any }) => {
  const { category } = route.params
  const [categoryFields, setCategoryFields] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    fetchCategoryFields()
  }, [])

  const fetchCategoryFields = async () => {
    setLoading(true)
    try {
      // Build category slugs from the category path
      const categorySlug = category.slug || ''
      
      const response = await CategoryFieldsService.getCategoryFields(categorySlug)
      
      if (response.status === 200) {
        console.log('==========================================')
        console.log('API Response:', response.data)
        
        // The response is keyed by category ID, extract the fields
        const categoryId = category.id
        const fieldsData = response.data[categoryId]
        
        console.log('Category ID:', categoryId)
        console.log('Fields Data:', fieldsData)
        console.log('Has flatFields?', !!fieldsData?.flatFields)
        console.log('flatFields length:', fieldsData?.flatFields?.length)
        console.log('==========================================')
        
        setCategoryFields(fieldsData)
      }
    } catch (error) {
      console.error('Error fetching category fields:', error)
    } finally {
      setLoading(false)
    }
  }

  const shouldShowField = (field: any) => {
    // Filter out fields explicitly excluded from post ad form
    const excludeRoles = ['hidden', 'auto_assigned', 'exclude_from_post_an_ad']
    const hasExcludedRole = field.roles?.some((role: string) => excludeRoles.includes(role))
    
    if (hasExcludedRole) return false
    
    // Exclude specific attributes that are search-only or auto-determined
    const excludeAttributes = ['price_type', 'payment_option']
    if (excludeAttributes.includes(field.attribute)) return false
    
    // Filter out discount/promo fields (these are just tags, not real form fields)
    const isPromoField = field.attribute?.includes('save_') || 
                         field.attribute?.includes('_collection') ||
                         field.attribute === 'new' ||
                         field.attribute === 'hot' ||
                         field.attribute === 'verified' ||
                         field.attribute === 'zero_km' ||
                         field.attribute === 'discounted' ||
                         field.attribute === 'black_friday' ||
                         field.attribute === 'holidays' ||
                         field.attribute === 'ramadan' ||
                         field.attribute === 'weekly_finds' ||
                         field.attribute === 'highlights' ||
                         field.attribute === 'summer' ||
                         field.attribute === 'autumn'
    
    return !isPromoField
  }

  const handleNavigateToChoices = (field: any) => {
    navigation.navigate('ChoiceSelection', {
      choices: field.choices || [],
      fieldName: field.name,
      selectedValue: formData[field.attribute] || '',
      onSelect: (value: string) => {
        setFormData({ ...formData, [field.attribute]: value })
      }
    })
  }

  const renderField = (field: any) => {
    const { id, valueType, attribute, name, choices, roles, filterType } = field
    const isRequired = roles?.includes('required')

    switch (valueType) {
      case 'string':
        return (
          <TextInput
            key={id}
            label={name}
            value={formData[attribute] || ''}
            onChangeText={(value) => setFormData({ ...formData, [attribute]: value })}
            placeholder={`Enter ${name.toLowerCase()}`}
            required={isRequired}
          />
        )
      
      case 'float':
      case 'integer':
        return (
          <TextInput
            key={id}
            label={name}
            value={formData[attribute] || ''}
            onChangeText={(value) => setFormData({ ...formData, [attribute]: value })}
            placeholder={`Enter ${name.toLowerCase()}`}
            keyboardType="decimal-pad"
            required={isRequired}
          />
        )
      
      case 'enum_multiple':
        // Multi-select field (like amenities/features)
        const selectedValues = formData[attribute] || []
        const selectedLabels = selectedValues
          .map((val: string) => choices?.find((c: any) => c.value === val)?.label)
          .filter(Boolean)
        
        // Format display text
        let displayText = `Select ${name.toLowerCase()}`
        if (selectedLabels.length > 0) {
          if (selectedLabels.length <= 2) {
            displayText = selectedLabels.join(', ')
          } else {
            const firstTwo = selectedLabels.slice(0, 2).join(', ')
            const remaining = selectedLabels.length - 2
            displayText = `${firstTwo}, +${remaining} more`
          }
        }
        
        return (
          <View key={id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>
              {name}
              {isRequired && <Text style={styles.required}> *</Text>}
            </Text>
            <TouchableOpacity
              style={styles.multipleChoiceButton}
              onPress={() => navigation.navigate('ChoiceSelection', {
                choices: choices || [],
                fieldName: name,
                selectedValues: selectedValues,
                multiSelect: true,
                onSelect: (values: string[]) => {
                  setFormData({ ...formData, [attribute]: values })
                }
              })}
              activeOpacity={0.8}
            >
              <Text 
                style={[
                  styles.multipleChoiceText,
                  selectedValues.length === 0 && styles.placeholderText
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {displayText}
              </Text>
              <SvgXml xml={ArrowRightIcon} height={14} />
            </TouchableOpacity>
          </View>
        )
      
      case 'enum':
        const choicesCount = choices?.length || 0
        
        // If 2-3 choices, display as horizontal buttons
        if (choicesCount >= 2 && choicesCount <= 3) {
          return (
            <HorizontalChoice
              key={id}
              label={name}
              value={formData[attribute] || ''}
              onValueChange={(value) => setFormData({ ...formData, [attribute]: value })}
              choices={choices || []}
              required={isRequired}
            />
          )
        }
        
        // Check if it's multiple_choice filter type (many options)
        if (filterType === 'multiple_choice' || choicesCount > 3) {
          // Navigate to full screen selection
          const selectedChoice = choices?.find((c: any) => c.value === formData[attribute])
          return (
            <View key={id} style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                {name}
                {isRequired && <Text style={styles.required}> *</Text>}
              </Text>
              <TouchableOpacity
                style={styles.multipleChoiceButton}
                onPress={() => handleNavigateToChoices(field)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.multipleChoiceText,
                  !selectedChoice && styles.placeholderText
                ]}>
                  {selectedChoice ? selectedChoice.label : `Select ${name.toLowerCase()}`}
                </Text>
                <SvgXml xml={ArrowRightIcon} height={14} />
              </TouchableOpacity>
            </View>
          )
        }
        
        // Regular dropdown (shouldn't reach here but as fallback)
        return (
          <SelectInput
            key={id}
            label={name}
            value={formData[attribute] || ''}
            onValueChange={(value) => setFormData({ ...formData, [attribute]: value })}
            choices={choices || []}
            placeholder={`Select ${name.toLowerCase()}`}
            required={isRequired}
          />
        )
      
      default:
        return null
    }
  }

  const renderForm = () => {
    console.log('==========================================')
    console.log('renderForm called')
    console.log('categoryFields:', categoryFields)
    console.log('Has flatFields?', categoryFields?.flatFields)
    console.log('==========================================')
    
    if (!categoryFields || !categoryFields.flatFields) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No form fields available</Text>
          <Text style={styles.debugInfo}>categoryFields: {categoryFields ? 'exists' : 'null'}</Text>
          <Text style={styles.debugInfo}>flatFields: {categoryFields?.flatFields ? 'exists' : 'missing'}</Text>
        </View>
      )
    }

    // Filter and sort fields by displayPriority
    const visibleFields = categoryFields.flatFields
      .filter(shouldShowField)
      .sort((a: any, b: any) => {
        // Sort by displayPriority first
        if (a.displayPriority !== b.displayPriority) {
          return a.displayPriority - b.displayPriority
        }
        // Then by isMandatory (mandatory first)
        if (a.isMandatory !== b.isMandatory) {
          return b.isMandatory ? 1 : -1
        }
        // Then by id
        return a.id - b.id
      })
    
    console.log('==========================================')
    console.log('Total fields:', categoryFields.flatFields.length)
    console.log('Visible fields:', visibleFields.length)
    console.log('Fields to display:')
    visibleFields.forEach((field: any) => {
      console.log(`- ${field.attribute} (${field.name}) - priority: ${field.displayPriority}, mandatory: ${field.isMandatory}`)
    })
    console.log('==========================================')

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Ad Details</Text>
        {visibleFields.map(renderField)}
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={category.nameShort || category.name} />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={category.nameShort || category.name} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderForm()}
        
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default AdDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formContainer: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text_dark,
    marginBottom: 24,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text_gray,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.background_dark,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.text_dark,
    marginBottom: 8,
  },
  required: {
    color: colors.secondary,
  },
  multipleChoiceButton: {
    backgroundColor: colors.background_dark,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  multipleChoiceText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text_dark,
    flex: 1,
  },
  placeholderText: {
    color: '#fff',
  },
  debugInfo: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.text_gray,
    marginTop: 8,
  },
})

const ArrowRightIcon = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L8.25 8.25L0.75 15.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
