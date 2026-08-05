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
  PROMOTIONS: {
    name: 'Спецпредложения',
    path: `${ADMIN_URL}/promotions`,
  },
  REVIEWS: {
    name: 'Отзывы',
    path: `${ADMIN_URL}/reviews`,
  }

} as const

export const ROUTES = {
  MAIN: {
    name: 'Главная',
    path: '/'
  },
  CATALOG: {
    name: 'Каталог',
    path: '/catalog',
  },
  PROMOS: {
    name: 'Готовые решения',
    path: '/sales',
  },
  CONTACTS: {
    name: 'Контакты',
    path: '/contacts',
  },
  REVIEWS: {
    name: 'Отзывы',
    path: '/reviews',
  },
  ABOUT: {
    name: 'О компании',
    path: '/about',
  },
  HOWTO: {
    name: 'Как совершить заказ',
    path: '/howto',
  }
} as const
