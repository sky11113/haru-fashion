import { useEffect, useState } from 'react'
import './App.css'
import About from './About'
import Admin from './Admin'
import ProductDetail from './ProductDetail'
import brandLogo from './assets/brand-logo.svg'
import { fallbackProducts, fetchProductsFromSupabase } from './products'

function App() {
  const isAdminPage = window.location.pathname === '/admin'
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dataSource, setDataSource] = useState('fallback')
  const [activeCategory, setActiveCategory] = useState('全部')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    if (isAdminPage) {
      return undefined
    }

    let isMounted = true

    async function loadProducts() {
      try {
        const result = await fetchProductsFromSupabase()

        if (isMounted) {
          setProducts(result.products)
          setDataSource(result.source)
          setError(result.error)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError)
          setProducts(fallbackProducts)
          setDataSource('fallback')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [isAdminPage])

  useEffect(() => {
    if (error) {
      console.error('商品加载失败：', error)
    }
  }, [error])

  const categories = [
    '全部',
    ...Array.from(new Set(products.map((product) => product.category).filter(Boolean))),
  ]
  const newArrivalProducts = products.slice(0, 6)
  const filteredProducts =
    activeCategory === '全部'
      ? products
      : products.filter((product) => product.category === activeCategory)
  const dataSourceText = error
    ? `Supabase错误：${error.message}`
    : `数据来源：${dataSource === 'supabase' ? 'Supabase' : '本地备用数据'}`

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setSelectedProductId(null)
    setSelectedProduct(null)
  }

  const handleSelectProduct = (product) => {
    setSelectedProductId(product.id)
    setSelectedProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (event, sectionId) => {
    event.preventDefault()

    const section = document.getElementById(sectionId)
    const navbar = document.querySelector('.navbar')

    if (!section) {
      return
    }

    const navbarHeight = navbar?.offsetHeight ?? 0
    const targetTop = section.getBoundingClientRect().top + window.scrollY
    const spacing = 18

    window.scrollTo({
      top: Math.max(targetTop - navbarHeight - spacing, 0),
      behavior: 'smooth',
    })
  }

  const showHome = () => {
    setCurrentPage('home')
    setSelectedProductId(null)
    setSelectedProduct(null)
  }

  const showAbout = () => {
    setCurrentPage('about')
    setSelectedProductId(null)
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isAdminPage) {
    return <Admin />
  }

  if (selectedProductId) {
    return (
      <div className="site">
        <header className="navbar">
          <a className="brand" href="#" onClick={showHome}>
            <img className="brand-logo" src={brandLogo} alt="" />
            漾漾的服装店
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#" onClick={showHome}>
              返回首页
            </a>
          </nav>
        </header>

        <main>
          <section className="products-section">
            <ProductDetail
              product={selectedProduct}
              productId={selectedProductId}
              products={products}
              onBack={() => {
                setSelectedProductId(null)
                setSelectedProduct(null)
              }}
            />
          </section>
        </main>

        <footer className="footer">Haru Campus © 2026</footer>
      </div>
    )
  }

  if (currentPage === 'about') {
    return (
      <div className="site">
        <header className="navbar">
          <a className="brand" href="#" onClick={showHome}>
            <img className="brand-logo" src={brandLogo} alt="" />
            漾漾的服装店
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#" onClick={showHome}>首页</a>
            <a href="#about" onClick={showAbout}>关于我们</a>
          </nav>
        </header>

        <main>
          <About />
        </main>

        <footer className="footer">Haru Campus © 2026</footer>
      </div>
    )
  }

  return (
    <div className="site">
      <header className="navbar">
        <a className="brand" href="#" onClick={showHome}>
          <img className="brand-logo" src={brandLogo} alt="" />
          漾漾的服装店
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#" onClick={showHome}>首页</a>
          <a href="#new-arrivals" onClick={(event) => scrollToSection(event, 'new-arrivals')}>新品</a>
          <a href="#category-products" onClick={(event) => scrollToSection(event, 'category-products')}>分类</a>
          <a href="#about" onClick={showAbout}>关于我们</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Spring Campus Style</p>
            <h1>日系韩系校园女装穿搭</h1>
            <p className="hero-subtitle">
              展示校园风穿搭、服装图片和AI穿搭视频
            </p>
            <div className="hero-actions">
              <a
                className="hero-button"
                href="#new-arrivals"
                onClick={(event) => scrollToSection(event, 'new-arrivals')}
              >
                查看新品
              </a>
              <a
                className="hero-button hero-button-secondary"
                href="#category-products"
                onClick={(event) => scrollToSection(event, 'category-products')}
              >
                查看分类
              </a>
            </div>
          </div>
        </section>

        <section className="products-section new-arrivals-section" id="new-arrivals">
          <div className="section-heading">
            <p className="eyebrow">New Arrivals</p>
            <h2>新品展示</h2>
            <p>{dataSourceText}</p>
          </div>

          <div className="product-grid product-grid-compact">
            {loading ? (
              <p>商品加载中...</p>
            ) : (
              newArrivalProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="products-section category-products-section" id="category-products">
          <div className="section-heading">
            <p className="eyebrow">Browse By Category</p>
            <h2>分类浏览</h2>
          </div>

          <div className="category-tabs" aria-label="商品分类">
            {categories.map((category) => (
              <button
                className={`category-tab ${activeCategory === category ? 'is-active' : ''}`}
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {loading ? (
              <p>商品加载中...</p>
            ) : (
              filteredProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">Haru Campus © 2026</footer>
    </div>
  )
}

export default App
