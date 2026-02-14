/**
 * Composable для управления SEO мета-тегами
 * Динамически обновляет title, description и другие мета-теги для каждой страницы
 */
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const defaultMeta = {
  title: 'CryptoExchange - Торговая платформа для криптовалют',
  description: 'Современная платформа для торговли криптовалютами с низкими комиссиями, высокой скоростью и максимальной безопасностью.',
  keywords: 'криптовалютная биржа, торговля криптовалютами, Bitcoin, Ethereum',
  ogImage: 'https://cryptoexchange.com/og-image.jpg'
}

const pageMeta = {
  Home: {
    title: 'CryptoExchange - Торговая платформа для криптовалют',
    description: 'Современная платформа для торговли криптовалютами с низкими комиссиями, высокой скоростью и максимальной безопасностью. Торгуйте Bitcoin, Ethereum и более 500 криптовалют.',
    keywords: 'криптовалютная биржа, торговля криптовалютами, Bitcoin, Ethereum, криптообменник'
  },
  Trade: {
    title: 'Торговля криптовалютами - CryptoExchange',
    description: 'Торгуйте криптовалютами на профессиональной платформе. Графики в реальном времени, стакан заявок, быстрая торговля.',
    keywords: 'торговля криптовалютами, криптотрейдинг, Bitcoin торговля, Ethereum торговля'
  },
  Markets: {
    title: 'Рынки криптовалют - CryptoExchange',
    description: 'Список всех доступных криптовалют для торговли. Актуальные цены, объемы торговли, изменения за 24 часа.',
    keywords: 'рынки криптовалют, список криптовалют, цены криптовалют, криптовалютные пары'
  },
  Portfolio: {
    title: 'Мой портфель - CryptoExchange',
    description: 'Управляйте своим криптовалютным портфелем. Отслеживайте баланс, активы и историю транзакций.',
    keywords: 'криптовалютный портфель, управление портфелем, баланс криптовалют'
  },
  About: {
    title: 'О нас - CryptoExchange',
    description: 'Узнайте больше о CryptoExchange - современной платформе для торговли криптовалютами. Наша миссия, команда и история.',
    keywords: 'о криптобирже, команда CryptoExchange, история компании'
  },
  Support: {
    title: 'Поддержка - CryptoExchange',
    description: 'Центр поддержки CryptoExchange. FAQ, контакты, помощь по торговле и работе с платформой.',
    keywords: 'поддержка криптобиржи, FAQ, помощь, контакты поддержки'
  }
}

export function useSEO() {
  const route = useRoute()

  const updateMeta = (meta) => {
    const pageName = route.name || 'Home'
    const pageData = pageMeta[pageName] || defaultMeta
    const finalMeta = { ...pageData, ...meta }

    // Обновление title
    if (document.title !== finalMeta.title) {
      document.title = finalMeta.title
    }

    // Обновление или создание meta-тегов
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Основные мета-теги
    updateMetaTag('description', finalMeta.description)
    updateMetaTag('keywords', finalMeta.keywords)

    // Open Graph
    updateMetaTag('og:title', finalMeta.title, true)
    updateMetaTag('og:description', finalMeta.description, true)
    updateMetaTag('og:url', window.location.href, true)
    updateMetaTag('og:image', finalMeta.ogImage || defaultMeta.ogImage, true)

    // Twitter Card
    updateMetaTag('twitter:title', finalMeta.title, true)
    updateMetaTag('twitter:description', finalMeta.description, true)
    updateMetaTag('twitter:image', finalMeta.ogImage || defaultMeta.ogImage, true)
  }

  // Автоматическое обновление при смене маршрута
  watch(
    () => route.name,
    () => {
      updateMeta()
    },
    { immediate: true }
  )

  return {
    updateMeta
  }
}

