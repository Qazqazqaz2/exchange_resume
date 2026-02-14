<template>
  <div class="support-page">
    <div class="container pt-4 pb-2">
      <Breadcrumbs />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="text-center mb-5 fade-in">
            <h1 class="display-5 fw-bold mb-3">
              Центр <span class="gradient-text">поддержки</span>
            </h1>
            <p class="lead text-secondary">
              Мы здесь, чтобы помочь вам. Найдите ответы на часто задаваемые вопросы или свяжитесь с нами.
            </p>
          </div>

          <!-- Поиск -->
          <div class="card mb-5 fade-in" style="animation-delay: 0.1s;">
            <div class="card-body p-4">
              <div class="input-group input-group-lg">
                <span class="input-group-text bg-card border-custom">
                  <i class="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Поиск по вопросам..."
                  v-model="searchQuery"
                >
              </div>
            </div>
          </div>

          <!-- Категории -->
          <div class="row g-4 mb-5">
            <div class="col-md-4" v-for="(category, index) in categories" :key="index" :class="'fade-in'" :style="`animation-delay: ${index * 0.1}s`">
              <div class="card h-100 p-4 text-center category-card">
                <i :class="category.icon" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h5 class="mb-3">{{ category.title }}</h5>
                <p class="text-secondary small mb-0">{{ category.description }}</p>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="mb-5 fade-in" style="animation-delay: 0.4s;">
            <h2 class="mb-4">Часто задаваемые вопросы</h2>
            <div class="accordion" id="faqAccordion">
              <div 
                v-for="(faq, index) in filteredFaqs" 
                :key="index" 
                class="accordion-item bg-card border-custom mb-2"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button collapsed bg-card text-white" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    :data-bs-target="`#faq${index}`"
                  >
                    {{ faq.question }}
                  </button>
                </h2>
                <div 
                  :id="`faq${index}`" 
                  class="accordion-collapse collapse" 
                  :data-bs-parent="'#faqAccordion'"
                >
                  <div class="accordion-body text-secondary">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Контакты -->
          <div class="row g-4 mb-5">
            <div class="col-md-6 fade-in" style="animation-delay: 0.5s;">
              <div class="card h-100 p-4">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-envelope" style="font-size: 2rem; color: var(--primary-color); margin-right: 1rem;"></i>
                  <div>
                    <h5 class="mb-0">Email поддержка</h5>
                    <p class="text-secondary mb-0 small">support@cryptoexchange.com</p>
                  </div>
                </div>
                <p class="text-secondary small">Отвечаем в течение 24 часов</p>
              </div>
            </div>
            
            <div class="col-md-6 fade-in" style="animation-delay: 0.6s;">
              <div class="card h-100 p-4">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-chat-dots" style="font-size: 2rem; color: var(--primary-color); margin-right: 1rem;"></i>
                  <div>
                    <h5 class="mb-0">Онлайн чат</h5>
                    <p class="text-secondary mb-0 small">Доступен 24/7</p>
                  </div>
                </div>
                <button class="btn btn-primary">Начать чат</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue'

export default {
  name: 'Support',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      searchQuery: '',
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      categories: [
        {
          icon: 'bi bi-person-circle',
          title: 'Аккаунт',
          description: 'Регистрация, вход, настройки профиля'
        },
        {
          icon: 'bi bi-graph-up-arrow',
          title: 'Торговля',
          description: 'Как торговать, типы ордеров, комиссии'
        },
        {
          icon: 'bi bi-wallet2',
          title: 'Пополнение и вывод',
          description: 'Методы пополнения и вывода средств'
        },
        {
          icon: 'bi bi-shield-check',
          title: 'Безопасность',
          description: 'Защита аккаунта, двухфакторная аутентификация'
        },
        {
          icon: 'bi bi-credit-card',
          title: 'Платежи',
          description: 'Способы оплаты и обработка транзакций'
        },
        {
          icon: 'bi bi-question-circle',
          title: 'Общие вопросы',
          description: 'Другие часто задаваемые вопросы'
        }
      ],
      faqs: [
        {
          question: 'Как зарегистрировать аккаунт?',
          answer: 'Для регистрации нажмите кнопку "Войти" в правом верхнем углу, затем выберите "Зарегистрироваться". Вам потребуется указать email, создать пароль и подтвердить email адрес.',
          category: 'account'
        },
        {
          question: 'Какие комиссии взимаются за торговлю?',
          answer: 'Комиссия за спотовую торговлю составляет 0.1% для мейкеров и 0.1% для тейкеров. Для VIP пользователей комиссии могут быть снижены в зависимости от объема торговли.',
          category: 'trading'
        },
        {
          question: 'Как пополнить баланс?',
          answer: 'Вы можете пополнить баланс через банковскую карту, банковский перевод или криптовалютой. Перейдите в раздел "Портфель" и нажмите "Пополнить", затем выберите удобный способ.',
          category: 'deposit'
        },
        {
          question: 'Сколько времени занимает вывод средств?',
          answer: 'Время вывода зависит от метода. Криптовалютные переводы обычно обрабатываются в течение 30 минут. Банковские переводы могут занять 1-3 рабочих дня.',
          category: 'withdraw'
        },
        {
          question: 'Как защитить свой аккаунт?',
          answer: 'Рекомендуем включить двухфакторную аутентификацию (2FA), использовать сильный уникальный пароль, не делиться учетными данными и регулярно проверять активность аккаунта.',
          category: 'security'
        },
        {
          question: 'Поддерживается ли мобильное приложение?',
          answer: 'Да, у нас есть мобильные приложения для iOS и Android. Вы можете скачать их из App Store или Google Play Store.',
          category: 'general'
        },
        {
          question: 'Какие криптовалюты поддерживаются?',
          answer: 'Мы поддерживаем более 500 криптовалют, включая Bitcoin, Ethereum, Binance Coin, Solana и многие другие популярные токены.',
          category: 'trading'
        },
        {
          question: 'Что делать, если я забыл пароль?',
          answer: 'На странице входа нажмите "Забыли пароль?", введите ваш email и следуйте инструкциям в письме для восстановления доступа.',
          category: 'account'
        }
      ]
    }
  },
  computed: {
    filteredFaqs() {
      if (!this.searchQuery) return this.faqs
      const query = this.searchQuery.toLowerCase()
      return this.faqs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      )
    }
  },
  mounted() {
    // Добавление структурированных данных для FAQ
    this.addFAQStructuredData()
  },
  methods: {
    addFAQStructuredData() {
      const faqData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': this.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }

      let script = document.querySelector('script[type="application/ld+json"]#faq-schema')
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'faq-schema'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(faqData)
    }
  }
}
</script>

<style scoped>
.support-page {
  min-height: calc(100vh - 200px);
  padding-top: 0;
}

.category-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px var(--shadow-soft);
}

.accordion-button:not(.collapsed) {
  background: var(--bg-card);
  color: var(--primary-color);
}

.accordion-button:focus {
  box-shadow: none;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .support-page .display-5 {
    font-size: 2rem;
  }

  .support-page .lead {
    font-size: 1rem;
  }

  .category-card {
    margin-bottom: 1rem;
  }

  .category-card i {
    font-size: 2.5rem !important;
  }

  .input-group-lg .form-control {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .support-page .display-5 {
    font-size: 1.75rem;
  }

  .support-page .col-md-4,
  .support-page .col-md-6 {
    margin-bottom: 1rem;
  }

  .category-card i {
    font-size: 2rem !important;
  }

  .category-card h5 {
    font-size: 1rem;
  }

  .accordion-button {
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
  }

  .accordion-body {
    font-size: 0.85rem;
    padding: 1rem;
  }
}
</style>

