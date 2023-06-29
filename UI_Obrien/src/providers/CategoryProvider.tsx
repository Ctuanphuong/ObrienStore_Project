import { message } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICategory } from '~/interfaces/ICategory'
import { addCategory, deleteCategory, getCategories, updateCategory } from '~/services/api/category'

const CategoryProvider = () => {
  const navigate = useNavigate()
  // GET CATEGORIES
  const [categories, setCategories] = useState<ICategory[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keywords, setKeywords] = useState('')

  // gọi lại hàm fetchCategories để get dữ liệu
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getCategories(currentPage, keywords)
        const { categories } = data
        setCategories(categories.docs)
        setTotalPages(categories.totalPages)
      } catch (error: any) {
        console.error(error)
      }
    })()
  }, [currentPage, keywords])

  // xử lý khi chuyển trang( next hoặc prev)
  const onChangePage = (page: number) => {
    setCurrentPage(page)
  }

  // ADD CATEGORY
  const onHandleAdd = async (category: ICategory) => {
    try {
      const { data } = await addCategory(category)
      setCategories([...categories, data.category])
      message.success(`Create new category successfully!`)
      navigate('/admin/categories')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // UPDATE CATEGORY
  const onHandleUpdate = async (category: ICategory) => {
    try {
      const { data } = await updateCategory(category)
      const categoryUpdated = data.category
      setCategories(categories.map((category) => (category._id === categoryUpdated._id ? categoryUpdated : category)))
      message.success(`Category update successfully!`)
      navigate('/admin/categories')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // DELETE CATEGORY
  const onHandleDelete = async (id: string) => {
    try {
      await deleteCategory(id)
      setCategories(categories.filter((c) => c._id !== id))
      message.success(`Category delete successfully!`)
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  return {
    categories,
    onAdd: onHandleAdd,
    onUpdate: onHandleUpdate,
    onDelete: onHandleDelete,
    currentPage,
    totalPages,
    onChangePage,
    setKeywords
  }
}

export default CategoryProvider
