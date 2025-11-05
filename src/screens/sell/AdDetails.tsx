import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import CategoryFieldsService from '../../service/CategoryFieldsService'
import TextInput from '../../components/sell/form/TextInput'
import SelectInput from '../../components/sell/form/SelectInput'
import HorizontalChoice from '../../components/sell/form/HorizontalChoice'
import Header from '../../components/shared/Header'
import { SvgXml } from 'react-native-svg'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const AdDetails = ({ navigation, route }: { navigation: any, route: any }) => {
  const { category } = route.params
  const [categoryFields, setCategoryFields] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState<any>({})
  const [showImageOptions, setShowImageOptions] = useState<boolean>(false)
  const [selectedImages, setSelectedImages] = useState<any[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const [imageToDelete, setImageToDelete] = useState<number | null>(null)

  useEffect(() => {
    fetchCategoryFields()
  }, [])

  const fetchCategoryFields = async () => {
    setLoading(true)
    try {
      const categorySlug = category.slug || ''
      
      const response = await CategoryFieldsService.getCategoryFields(categorySlug)
      
      if (response.status === 200) {
        
        const categoryId = category.id
        const fieldsData = response.data[categoryId]
        
        setCategoryFields(fieldsData)
      }
    } catch (error) {
      console.error('Error fetching category fields:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTakePhoto = async () => {
    setShowImageOptions(false)
    
    // Add delay to let modal fully close before launching camera
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300))
    
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
    })
    
    if (result.assets && result.assets.length > 0) {
      setSelectedImages([...selectedImages, ...result.assets])
    }
  }

  const handlePickFromGallery = async () => {
    setShowImageOptions(false)
    
    // Add delay to let modal fully close before launching gallery
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300))
    
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
      selectionLimit: 10 - selectedImages.length, // Allow up to 10 images total
    })
    
    if (result.assets && result.assets.length > 0) {
      setSelectedImages([...selectedImages, ...result.assets])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImageToDelete(index)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteImage = () => {
    if (imageToDelete !== null) {
      const newImages = selectedImages.filter((_, i) => i !== imageToDelete)
      setSelectedImages(newImages)
    }
    setShowDeleteConfirm(false)
    setImageToDelete(null)
  }

  const cancelDeleteImage = () => {
    setShowDeleteConfirm(false)
    setImageToDelete(null)
  }

  const shouldShowField = (field: any) => {
    const excludeRoles = ['hidden', 'auto_assigned', 'exclude_from_post_an_ad']
    const hasExcludedRole = field.roles?.some((role: string) => excludeRoles.includes(role))
    
    if (hasExcludedRole) return false
    
    const excludeAttributes = ['price_type', 'payment_option']
    if (excludeAttributes.includes(field.attribute)) return false
    
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
        const selectedValues = formData[attribute] || []
        const selectedLabels = selectedValues
          .map((val: string) => choices?.find((c: any) => c.value === val)?.label)
          .filter(Boolean)
        
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
        if (filterType === 'multiple_choice' || choicesCount > 3) {
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
    
    if (!categoryFields || !categoryFields.flatFields) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No form fields available</Text>
          <Text style={styles.debugInfo}>categoryFields: {categoryFields ? 'exists' : 'null'}</Text>
          <Text style={styles.debugInfo}>flatFields: {categoryFields?.flatFields ? 'exists' : 'missing'}</Text>
        </View>
      )
    }

    const visibleFields = categoryFields.flatFields
      .filter(shouldShowField)
      .sort((a: any, b: any) => {
        if (a.displayPriority !== b.displayPriority) {
          return a.displayPriority - b.displayPriority
        }
        if (a.isMandatory !== b.isMandatory) {
          return b.isMandatory ? 1 : -1
        }
        return a.id - b.id
      })

    return (
      <View style={styles.formContainer}>
        <View style={[
          styles.imageUploadContainer,
          selectedImages.length > 0 && styles.imageUploadContainerWithImages
        ]}>
          {selectedImages.length === 0 ? (
            // Show upload button when no images
            <>
              <TouchableOpacity 
                style={styles.addImagesButton}
                activeOpacity={0.8}
                onPress={() => setShowImageOptions(true)}
              >
                <Text style={styles.addImagesButtonText}>Add Images</Text>
              </TouchableOpacity>
              <Text style={styles.imageUploadHint}>
                5MB maximum file size accepted in the following formats: .jpg, .jpeg, .png, .gif
              </Text>
            </>
          ) : (
            // Show images grid when images are selected
            <>
              <View style={styles.imagesGrid}>
                {selectedImages.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.imageItem}
                    onPress={() => handleRemoveImage(index)}
                    activeOpacity={0.8}
                  >
                    <Image 
                      source={{ uri: image.uri }} 
                      style={styles.imagePreview}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
                
                {/* Add more images button */}
                {selectedImages.length < 10 && (
                  <TouchableOpacity
                    style={styles.addMoreImagesButton}
                    onPress={() => setShowImageOptions(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addMoreImagesText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <Text style={styles.deleteImageHint}>
                To delete an image press on it
              </Text>
            </>
          )}
        </View>
        
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
      <Header navigation={navigation} title={'Ad Details'} />
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

      {/* Image Options Modal */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowImageOptions(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Image</Text>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handleTakePhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handlePickFromGallery}
              activeOpacity={0.8}
            >
              <Text style={styles.modalOptionText}>Pick from Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, styles.modalCancelOption]}
              onPress={() => setShowImageOptions(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.modalOptionText, styles.modalCancelText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDeleteImage}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={cancelDeleteImage}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Image</Text>
            <Text style={styles.deleteConfirmText}>
              Are you sure you want to delete this image?
            </Text>
            
            <TouchableOpacity 
              style={[styles.modalOption, styles.deleteButton]}
              onPress={confirmDeleteImage}
              activeOpacity={0.8}
            >
              <Text style={styles.modalOptionText}>Delete</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, styles.modalCancelOption]}
              onPress={cancelDeleteImage}
              activeOpacity={0.8}
            >
              <Text style={[styles.modalOptionText, styles.modalCancelText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  imageUploadContainer: {
    minHeight: 200,
    backgroundColor: colors.background_dark,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageUploadContainerWithImages: {
    minHeight: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  addMoreImagesButton: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  addMoreImagesText: {
    fontSize: 40,
    fontFamily: fonts.semiBold,
    color: '#fff',
  },
  addImagesButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  addImagesButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.background_dark,
  },
  imageUploadHint: {
    fontSize: 11,
    fontFamily: fonts.regular,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
  },
  deleteImageHint: {
    fontSize: 11,
    fontFamily: fonts.regular,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background_dark,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text_dark,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  modalCancelOption: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 8,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.background_dark,
  },
  modalCancelText: {
    color: '#fff',
  },
  deleteConfirmText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
})

const ArrowRightIcon = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L8.25 8.25L0.75 15.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
