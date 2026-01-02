const ADMIN_URL = '/admin' as const

export const ADMIN_ROUTES = {
  PRODUCTS: {
    name: 'Продукты',
    path: `${ADMIN_URL}/products`,
  },
  CATEGORIES: {
    name: 'Категории',
    path: `${ADMIN_URL}/categories`,
  },
  STYLES: {
    name: 'Стили',
    path: `${ADMIN_URL}/styles`,
  },
  MATERIALS: {
    name: 'Материалы',
    path: `${ADMIN_URL}/materials`,
  },
  SALES: {
    name: 'Акции',
    path: `${ADMIN_URL}/sales`,
  },
  PROMOTIONS: {
    name: 'Спецпредложения',
    path: `${ADMIN_URL}/promotions`,
  }

} as const