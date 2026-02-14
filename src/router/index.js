import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Trade from '../views/Trade.vue'
import Markets from '../views/Markets.vue'
import Portfolio from '../views/Portfolio.vue'
import About from '../views/About.vue'
import Support from '../views/Support.vue'

/**
 * Маршруты приложения
 * Каждый маршрут содержит мета-информацию для SEO
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'CryptoExchange - Торговая платформа для криптовалют',
      description: 'Современная платформа для торговли криптовалютами с низкими комиссиями, высокой скоростью и максимальной безопасностью.',
      keywords: 'криптовалютная биржа, торговля криптовалютами, Bitcoin, Ethereum'
    }
  },
  {
    path: '/trade',
    name: 'Trade',
    component: Trade,
    meta: {
      title: 'Торговля криптовалютами - CryptoExchange',
      description: 'Торгуйте криптовалютами на профессиональной платформе. Графики в реальном времени, стакан заявок, быстрая торговля.',
      keywords: 'торговля криптовалютами, криптотрейдинг, Bitcoin торговля'
    }
  },
  {
    path: '/markets',
    name: 'Markets',
    component: Markets,
    meta: {
      title: 'Рынки криптовалют - CryptoExchange',
      description: 'Список всех доступных криптовалют для торговли. Актуальные цены, объемы торговли, изменения за 24 часа.',
      keywords: 'рынки криптовалют, список криптовалют, цены криптовалют'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: {
      title: 'Мой портфель - CryptoExchange',
      description: 'Управляйте своим криптовалютным портфелем. Отслеживайте баланс, активы и историю транзакций.',
      keywords: 'криптовалютный портфель, управление портфелем, баланс криптовалют'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'О нас - CryptoExchange',
      description: 'Узнайте больше о CryptoExchange - современной платформе для торговли криптовалютами. Наша миссия, команда и история.',
      keywords: 'о криптобирже, команда CryptoExchange, история компании'
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
    meta: {
      title: 'Поддержка - CryptoExchange',
      description: 'Центр поддержки CryptoExchange. FAQ, контакты, помощь по торговле и работе с платформой.',
      keywords: 'поддержка криптобиржи, FAQ, помощь, контакты поддержки'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Плавная прокрутка к началу страницы при навигации
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router


