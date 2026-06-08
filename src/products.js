import { supabase } from './supabase'

export const fallbackProducts = [
  {
    id: 1,
    name: '学院风针织开衫',
    price: '¥269',
    category: '上衣',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=640&h=800&q=80',
    description: '柔软针织面料，适合春季校园通勤和叠穿造型。',
    details: '米白色系，短款版型，搭配衬衫、百褶裙或直筒裤都很清爽。',
  },
  {
    id: 2,
    name: '百褶半身裙',
    price: '¥189',
    category: '裙子',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=640&h=800&q=80',
    description: '经典校园感百褶裙，轻盈利落，适合日常穿搭。',
    details: '高腰设计修饰比例，浅卡其色温柔耐看，可搭配针织衫或衬衫。',
  },
  {
    id: 3,
    name: '清爽白色衬衫',
    price: '¥219',
    category: '上衣',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=640&h=800&q=80',
    description: '干净利落的白衬衫，是校园风衣橱里的基础单品。',
    details: '微宽松剪裁，单穿或作为内搭都合适，适合搭配半身裙和外套。',
  },
  {
    id: 4,
    name: '短款西装外套',
    price: '¥329',
    category: '外套',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=640&h=800&q=80',
    description: '轻正式感短外套，让校园穿搭更有层次。',
    details: '短款比例显高，浅色内搭和直筒裤都能搭出温柔学院感。',
  },
  {
    id: 5,
    name: '温柔系连衣裙',
    price: '¥299',
    category: '裙子',
    image: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=640&h=800&q=80',
    description: '一件式穿搭省心，适合周末出行和校园拍照。',
    details: '柔和色调搭配自然腰线，外搭开衫或风衣都很协调。',
  },
  {
    id: 6,
    name: '校园通勤托特包',
    price: '¥159',
    category: '包包',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&h=800&q=80',
    description: '容量友好的托特包，适合上课、通勤和短途出行。',
    details: '简洁包型配浅色系服装很耐看，可放日常书本和随身物品。',
  },
  {
    id: 7,
    name: '浅卡其直筒裤',
    price: '¥239',
    category: '裤子',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&h=800&q=80',
    description: '直筒版型干净修身，适合打造轻松的校园通勤感。',
    details: '浅卡其色温柔百搭，上衣可选衬衫、针织背心或短外套。',
  },
  {
    id: 8,
    name: '奶油色卫衣套装',
    price: '¥399',
    category: '套装',
    image: 'https://images.unsplash.com/photo-1524255684952-d7185b509571?auto=format&fit=crop&w=640&h=800&q=80',
    description: '舒适休闲套装，适合自习、散步和周末出门。',
    details: '奶油色调柔和干净，成套穿省心，也可以拆开搭配其他单品。',
  },
  {
    id: 9,
    name: '复古乐福鞋',
    price: '¥289',
    category: '鞋子',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=640&h=800&q=80',
    description: '复古感乐福鞋，为校园穿搭增加一点精致感。',
    details: '适合搭配短袜、百褶裙、直筒裤，日常通勤也很实穿。',
  },
  {
    id: 10,
    name: '蝴蝶结发夹',
    price: '¥49',
    category: '配饰',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=640&h=800&q=80',
    description: '小巧甜美的发饰，让基础穿搭更有校园氛围。',
    details: '适合半扎发、低马尾和披发造型，搭配浅色系服装更柔和。',
  },
  {
    id: 11,
    name: '条纹针织背心',
    price: '¥179',
    category: '上衣',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=640&h=800&q=80',
    description: '条纹元素增加层次，适合叠穿白衬衫。',
    details: '学院感明显，春秋季可单穿，早晚微凉时适合作为内搭。',
  },
  {
    id: 12,
    name: '格纹A字短裙',
    price: '¥199',
    category: '裙子',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=640&h=800&q=80',
    description: '格纹短裙带来清新的校园气息，日常很好搭配。',
    details: 'A字版型修饰腿部线条，适合搭配短袜、乐福鞋和针织开衫。',
  },
  {
    id: 13,
    name: '宽松牛仔长裤',
    price: '¥259',
    category: '裤子',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=640&h=800&q=80',
    description: '轻松休闲的牛仔裤，适合日常上课和出街。',
    details: '宽松裤腿不紧绷，搭配短款上衣可以让比例更清爽。',
  },
  {
    id: 14,
    name: '学院感风衣外套',
    price: '¥459',
    category: '外套',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=640&h=800&q=80',
    description: '浅卡其风衣外套，适合春秋季校园穿搭。',
    details: '中长款剪裁温柔耐看，搭配裙装或裤装都能保持轻盈感。',
  },
  {
    id: 15,
    name: '衬衫背心两件套',
    price: '¥349',
    category: '套装',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=640&h=800&q=80',
    description: '省心的学院风两件套，适合快速完成日常造型。',
    details: '衬衫和背心可拆开搭配，适合与百褶裙、直筒裤组合。',
  },
  {
    id: 16,
    name: '帆布斜挎小包',
    price: '¥139',
    category: '包包',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=640&h=800&q=80',
    description: '轻便斜挎包，适合放手机、钥匙和日常小物。',
    details: '帆布材质休闲自然，和校园风穿搭的轻松感很协调。',
  },
  {
    id: 17,
    name: '米白帆布鞋',
    price: '¥189',
    category: '鞋子',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=640&h=800&q=80',
    description: '干净百搭的帆布鞋，适合日常步行和校园生活。',
    details: '米白色更柔和，搭配裙装、牛仔裤和卫衣套装都不突兀。',
  },
  {
    id: 18,
    name: '珍珠细链项链',
    price: '¥79',
    category: '配饰',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=640&h=800&q=80',
    description: '细致珍珠项链，为基础穿搭增加一点温柔光泽。',
    details: '适合搭配衬衫领口、针织开衫和连衣裙，轻盈不夸张。',
  },
]

export const products = fallbackProducts

const normalizeProduct = ({
  id,
  name,
  price,
  category,
  image_url,
  description,
  video_url,
  is_active,
}) => ({
  id,
  name,
  price,
  category,
  image: image_url,
  image_url,
  video_url,
  is_active,
  description,
  details: description,
})

export async function fetchProductsFromSupabase() {
  try {
    const activeQuery = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true })
    let data = activeQuery.data
    let error = activeQuery.error

    if (error?.message?.includes('is_active')) {
      const fallbackQuery = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      data = fallbackQuery.data
      error = fallbackQuery.error
    }

    console.log('Supabase data:', data)
    console.log('Supabase error:', error)

    if (error) {
      console.error('读取 Supabase 商品失败：', error)
      console.error('Supabase error message:', error.message)
      return {
        products: fallbackProducts,
        source: 'fallback',
        error,
      }
    }

    if (!data || data.length === 0) {
      console.warn('Supabase 返回空数据')
      return {
        products: fallbackProducts,
        source: 'fallback',
        error: new Error('Supabase products 表没有返回商品数据'),
      }
    }

    return {
      products: data.map(normalizeProduct),
      source: 'supabase',
      error: null,
    }
  } catch (error) {
    console.error('读取 Supabase 商品异常：', error)
    console.error('Supabase error message:', error.message)
    return {
      products: fallbackProducts,
      source: 'fallback',
      error,
    }
  }
}
