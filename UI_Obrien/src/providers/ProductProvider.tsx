import { message } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '~/interfaces/IProduct'
import { addProduct, deleteProduct, getProducts, updateProduct } from '~/services/api/product'

const ProductProvider = () => {
  const navigate = useNavigate()
  // GET CATEGORIES
  const [products, setProducts] = useState<IProduct[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keywords, setKeywords] = useState('')
  const [sortInfo, setSortInfo] = useState('createdAt-desc')
  const [reload, setReload] = useState(false)
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getProducts(currentPage, keywords, sortInfo)
        const { products } = data
        setProducts(products.docs)
        setTotalPages(products.totalPages)
      } catch (error: any) {
        console.error(error)
        // if ((error.response.data.message = "Couldn't find any products in the list!")) {
        //   message.error(error.response.data.message)
        // }
      }
    })()
  }, [currentPage, keywords, sortInfo, reload])

  // xử lý khi chuyển trang( next hoặc prev)
  const onChangePage = (page: number) => {
    setCurrentPage(page)
  }

  // ADD CATEGORY
  const onHandleAdd = async (category: IProduct) => {
    try {
      const { data } = await addProduct(category)
      setProducts([...products, data.product])
      await setReload(!reload)
      message.success(`Create new product successfully!`)
      navigate('/admin/products')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // // UPDATE CATEGORY
  const onHandleUpdate = async (product: IProduct) => {
    try {
      const { data } = await updateProduct(product)
      const productUpdated = data.product
      setProducts(products.map((product) => (product._id === productUpdated._id ? productUpdated : product)))
      message.success(`Product update successfully!`)
      navigate('/admin/products')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // DELETE PRODUCT
  const onHandleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p._id !== id))
      await setReload(!reload)
      message.success(`Product delete successfully!`)
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  return {
    products,
    onAdd: onHandleAdd,
    onUpdate: onHandleUpdate,
    onDelete: onHandleDelete,
    currentPage,
    totalPages,
    onChangePage,
    setKeywords,
    setSortInfo
  }
}

export default ProductProvider
