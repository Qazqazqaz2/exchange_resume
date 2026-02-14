<template>
  <div class="home-page">
    <Breadcrumbs />
    <!-- Hero Section -->
    <section class="hero-section pt-4" aria-label="Главная секция">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 fade-in">
            <h1 class="display-3 fw-bold mb-4">
              Торгуйте криптовалютами
              <span class="gradient-text">без границ</span>
            </h1>
            <p class="lead text-secondary mb-4">
              Современная платформа для торговли с низкими комиссиями, высокой скоростью и максимальной безопасностью.
            </p>
            <div class="d-flex gap-3 mb-5">
              <router-link to="/trade" class="btn btn-primary btn-lg">
                Начать торговлю
                <i class="bi bi-arrow-right ms-2"></i>
              </router-link>
              <router-link to="/about" class="btn btn-outline-light btn-lg">
                Узнать больше
              </router-link>
            </div>
            
            <!-- Статистика -->
            <div class="row g-4 mt-5">
              <div class="col-4">
                <div class="stat-card">
                  <h3 class="gradient-text mb-1">$2.5B+</h3>
                  <p class="text-secondary mb-0 small">Объем торговли</p>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-card">
                  <h3 class="gradient-text mb-1">500+</h3>
                  <p class="text-secondary mb-0 small">Криптовалют</p>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-card">
                  <h3 class="gradient-text mb-1">2M+</h3>
                  <p class="text-secondary mb-0 small">Пользователей</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6 fade-in" style="animation-delay: 0.2s;">
            <div class="hero-image">
              <div class="card p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="mb-0">BTC/USDT</h5>
                  <span class="text-success-custom">+2.45%</span>
                </div>
                <div class="chart-placeholder">
                  <canvas ref="heroChart"></canvas>
                </div>
                <div class="mt-3 d-flex justify-content-between">
                  <div>
                    <small class="text-secondary">Цена</small>
                    <p class="mb-0 fw-bold">$43,250.00</p>
                  </div>
                  <div>
                    <small class="text-secondary">24ч объем</small>
                    <p class="mb-0 fw-bold">$1.2B</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5" aria-label="Преимущества платформы">
      <div class="container">
        <h2 class="text-center mb-5 fade-in">Почему выбирают нас</h2>
        <div class="row g-4">
          <div class="col-md-4" v-for="(feature, index) in features" :key="index" :class="'fade-in'" :style="`animation-delay: ${index * 0.1}s`">
            <div class="card h-100 p-4 text-center">
              <div class="feature-icon mb-3">
                <i :class="feature.icon" style="font-size: 3rem; color: var(--primary-color);"></i>
              </div>
              <h4 class="mb-3">{{ feature.title }}</h4>
              <p class="text-secondary">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Markets Section -->
    <section class="markets-section py-5" aria-label="Популярные рынки">
      <div class="container">
        <h2 class="mb-4 fade-in">Популярные рынки</h2>
        <div class="card">
          <div class="table-responsive">
            <table class="table table-dark mb-0">
              <thead>
                <tr>
                  <th>Пара</th>
                  <th>Цена</th>
                  <th>24ч изменение</th>
                  <th>24ч объем</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(market, index) in topMarkets" :key="index" class="fade-in" :style="`animation-delay: ${index * 0.05}s`">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="coin-icon me-2">{{ market.symbol[0] }}</div>
                      <strong>{{ market.pair }}</strong>
                    </div>
                  </td>
                  <td>${{ market.price.toLocaleString() }}</td>
                  <td :class="market.change >= 0 ? 'text-success-custom' : 'text-danger-custom'">
                    {{ market.change >= 0 ? '+' : '' }}{{ market.change }}%
                  </td>
                  <td>${{ market.volume.toLocaleString() }}</td>
                  <td>
                    <router-link :to="`/trade?pair=${market.pair}`" class="btn btn-primary btn-sm">
                      Торговать
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import Breadcrumbs from '../components/Breadcrumbs.vue'

Chart.register(...registerables)

export default {
  name: 'Home',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      features: [
        {
          icon: 'bi bi-shield-check',
          title: 'Безопасность',
          description: 'Многоуровневая защита и холодное хранение средств'
        },
        {
          icon: 'bi bi-lightning-charge',
          title: 'Скорость',
          description: 'Мгновенное исполнение ордеров и высокая ликвидность'
        },
        {
          icon: 'bi bi-percent',
          title: 'Низкие комиссии',
          description: 'Одни из самых низких комиссий на рынке'
        },
        {
          icon: 'bi bi-globe',
          title: 'Доступность',
          description: 'Торговля 24/7 из любой точки мира'
        },
        {
          icon: 'bi bi-graph-up-arrow',
          title: 'Аналитика',
          description: 'Профессиональные инструменты для анализа рынка'
        },
        {
          icon: 'bi bi-headset',
          title: 'Поддержка',
          description: 'Круглосуточная поддержка на русском языке'
        }
      ],
      topMarkets: [
        { pair: 'BTC/USDT', symbol: 'BTC', price: 43250.00, change: 2.45, volume: 1200000000 },
        { pair: 'ETH/USDT', symbol: 'ETH', price: 2650.00, change: -1.23, volume: 850000000 },
        { pair: 'BNB/USDT', symbol: 'BNB', price: 315.50, change: 0.89, volume: 320000000 },
        { pair: 'SOL/USDT', symbol: 'SOL', price: 98.75, change: 5.12, volume: 450000000 },
        { pair: 'ADA/USDT', symbol: 'ADA', price: 0.52, change: -0.45, volume: 180000000 }
      ]
    }
  },
  mounted() {
    this.initHeroChart()
    this.addStructuredData()
  },
  methods: {
    initHeroChart() {
      const ctx = this.$refs.heroChart
      if (!ctx) return
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => ''),
          datasets: [{
            label: 'BTC/USDT',
            data: Array.from({ length: 30 }, () => Math.random() * 1000 + 42000),
            borderColor: '#b89a3f',
            backgroundColor: 'rgba(184, 154, 63, 0.08)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          }
        }
      })
    },
    addStructuredData() {
      // Добавление структурированных данных Schema.org для SEO
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        'name': 'CryptoExchange',
        'description': 'Современная платформа для торговли криптовалютами',
        'url': window.location.origin,
        'logo': `${window.location.origin}/logo.png`,
        'sameAs': [
          'https://twitter.com/cryptoexchange',
          'https://t.me/cryptoexchange',
          'https://github.com/cryptoexchange'
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '2500'
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'USD',
          'description': 'Торговля криптовалютами с низкими комиссиями'
        }
      }

      let script = document.querySelector('script[type="application/ld+json"]#home-schema')
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'home-schema'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }
  }
}
</script>

<style scoped>
.home-page {
  padding-top: 0;
}

.hero-section {
  background: linear-gradient(135deg, rgba(184, 154, 63, 0.03) 0%, rgba(0, 0, 0, 0) 100%);
  min-height: 90vh;
}

.hero-image {
  position: relative;
}

.chart-placeholder {
  height: 200px;
  position: relative;
}

.stat-card {
  text-align: center;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  background: rgba(184, 154, 63, 0.05);
}

.features-section {
  background: var(--bg-dark);
}

.coin-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 2rem 0;
  }

  .stat-card {
    margin-bottom: 1rem;
    padding: 0.75rem;
  }

  .stat-card h3 {
    font-size: 1.5rem;
  }

  .chart-placeholder {
    height: 150px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 1.5rem 0;
  }

  .d-flex.gap-3 {
    flex-direction: column;
    gap: 0.5rem !important;
  }

  .d-flex.gap-3 .btn {
    width: 100%;
  }

  .stat-card {
    padding: 0.5rem;
  }

  .stat-card h3 {
    font-size: 1.25rem;
  }

  .chart-placeholder {
    height: 120px;
  }
}
</style>

