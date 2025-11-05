import axios from 'axios'

class CategoryFieldsService {
  static url = 'https://www.olx.com.lb/api'

  static async getCategoryFields(
    categorySlugs: string,
    includeChildCategories: boolean = true,
    splitByCategoryIDs: boolean = true,
    flatChoices: boolean = true,
    groupChoicesBySection: boolean = true,
    flat: boolean = true
  ) {
    try {
      const response = await axios.get(`${this.url}/categoryFields`, {
        params: {
          categorySlugs,
          includeChildCategories,
          splitByCategoryIDs,
          flatChoices,
          groupChoicesBySection,
          flat,
        },
      })
      return response
    } catch (error) {
      console.error('Error fetching category fields:', error)
      throw error
    }
  }
}

export default CategoryFieldsService

