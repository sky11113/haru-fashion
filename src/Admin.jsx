import { useMemo, useState } from 'react'
import { supabase } from './supabase'

const emptyForm = {
  name: '',
  price: '',
  category: '',
  description: '',
}

function getFilePath(file, folder) {
  const extension = file.name.split('.').pop()
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .slice(0, 48)

  return `${folder}/${Date.now()}-${safeName || 'upload'}.${extension}`
}

async function uploadPublicFile(bucket, file, folder) {
  if (!file) {
    return ''
  }

  const filePath = getFilePath(file, folder)
  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    contentType: file.type,
  })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return data.publicUrl
}

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)

  const activeCount = useMemo(
    () => products.filter((product) => product.is_active !== false).length,
    [products],
  )

  const loadProducts = async () => {
    setLoading(true)
    setError('')

    const { data, error: loadError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (loadError) {
      setError(loadError.message)
    } else {
      setProducts(data || [])
    }

    setLoading(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoginError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      setLoginError(signInError.message)
      return
    }

    setIsAuthed(true)
    setEmail('')
    setPassword('')
    await loadProducts()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthed(false)
    resetForm()
    setProducts([])
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingProduct(null)
    setImageFile(null)
    setVideoFile(null)
  }

  const startEdit = (product) => {
    setEditingProduct(product)
    setForm({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      description: product.description || '',
    })
    setImageFile(null)
    setVideoFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const imageUrl = imageFile
        ? await uploadPublicFile('product-images', imageFile, 'products')
        : editingProduct?.image_url || ''
      const videoUrl = videoFile
        ? await uploadPublicFile('product-videos', videoFile, 'products')
        : editingProduct?.video_url || ''

      if (!imageUrl) {
        throw new Error('请上传商品图片')
      }

      const payload = {
        name: String(form.name).trim(),
        price: String(form.price).trim(),
        category: String(form.category).trim(),
        description: String(form.description).trim(),
        image_url: imageUrl,
        video_url: videoUrl || null,
      }

      if (editingProduct) {
        const { error: updateError } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id)

        if (updateError) {
          throw updateError
        }

        setMessage('商品已更新')
      } else {
        const { error: insertError } = await supabase.from('products').insert({
          ...payload,
          is_active: true,
        })

        if (insertError) {
          throw insertError
        }

        setMessage('商品已新增')
      }

      resetForm()
      await loadProducts()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (product) => {
    const isActive = product.is_active !== false
    const actionText = isActive ? '下架' : '上架'

    if (!window.confirm(`确认${actionText}“${product.name}”？`)) {
      return
    }

    setError('')
    setMessage('')

    const { error: updateError } = await supabase
      .from('products')
      .update({ is_active: !isActive })
      .eq('id', product.id)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setMessage(`商品已${actionText}`)
    await loadProducts()
  }

  if (!isAuthed) {
    return (
      <div className="admin-page admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <p className="eyebrow">Admin</p>
          <h1>后台登录</h1>
          <label>
            邮箱
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="请输入管理员邮箱"
            />
          </label>
          <label>
            密码
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="请输入密码"
            />
          </label>
          {loginError && <p className="admin-error">{loginError}</p>}
          <button type="submit">进入后台</button>
          <a href="/">返回前台</a>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>商品后台管理</h1>
          <p>共 {products.length} 件商品，{activeCount} 件上架中</p>
        </div>
        <div className="admin-header-actions">
          <a href="/">返回前台</a>
          <button type="button" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </header>

      <main className="admin-layout">
        <section className="admin-panel">
          <h2>{editingProduct ? '编辑商品' : '新增商品'}</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              商品名称
              <input
                name="name"
                required
                value={form.name}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              价格
              <input
                name="price"
                required
                value={form.price}
                onChange={handleFieldChange}
                placeholder="例如 ¥269"
              />
            </label>
            <label>
              分类
              <input
                name="category"
                required
                value={form.category}
                onChange={handleFieldChange}
              />
            </label>
            <label className="admin-form-wide">
              描述
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              商品图片
              <input
                type="file"
                accept="image/*"
                required={!editingProduct}
                onChange={(event) => setImageFile(event.target.files[0] || null)}
              />
            </label>
            <label>
              AI视频（可选）
              <input
                type="file"
                accept="video/*"
                onChange={(event) => setVideoFile(event.target.files[0] || null)}
              />
            </label>
            <div className="admin-form-actions">
              <button type="submit" disabled={saving}>
                {saving ? '保存中...' : editingProduct ? '保存修改' : '新增商品'}
              </button>
              {editingProduct && (
                <button type="button" className="admin-secondary-button" onClick={resetForm}>
                  取消编辑
                </button>
              )}
            </div>
          </form>
          {message && <p className="admin-message">{message}</p>}
          {error && <p className="admin-error">{error}</p>}
        </section>

        <section className="admin-panel">
          <div className="admin-list-heading">
            <h2>商品列表</h2>
            <button type="button" onClick={loadProducts} disabled={loading}>
              {loading ? '刷新中...' : '刷新'}
            </button>
          </div>

          <div className="admin-product-list">
            {products.map((product) => {
              const isActive = product.is_active !== false

              return (
                <article
                  className={`admin-product-row ${isActive ? '' : 'is-inactive'}`}
                  key={product.id}
                >
                  <img src={product.image_url} alt={product.name} />
                  <div className="admin-product-main">
                    <h3>{product.name}</h3>
                    <p>{product.price} · {product.category}</p>
                    <span>{product.video_url ? '有视频' : '无视频'}</span>
                  </div>
                  <div className="admin-product-status">
                    {isActive ? '上架' : '已下架'}
                  </div>
                  <div className="admin-product-actions">
                    <button type="button" onClick={() => startEdit(product)}>
                      编辑
                    </button>
                    <button type="button" onClick={() => toggleActive(product)}>
                      {isActive ? '下架' : '上架'}
                    </button>
                  </div>
                </article>
              )
            })}
            {!loading && products.length === 0 && <p>暂无商品</p>}
          </div>
        </section>
      </main>
    </div>
  )
}
