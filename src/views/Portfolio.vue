<template>
  <div class="portfolio-page">
    <div class="container pt-4 pb-2">
      <Breadcrumbs />
    </div>
    <div class="container">
      <h2 class="mb-4 fade-in">Мой портфель</h2>
      
      <!-- Общая статистика -->
      <div class="row g-4 mb-4">
        <div class="col-md-4 fade-in">
          <div class="card h-100 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-secondary">Общий баланс</span>
              <i class="bi bi-wallet2" style="font-size: 1.5rem; color: var(--primary-color);"></i>
            </div>
            <h3 class="gradient-text mb-0">${{ totalBalance.toLocaleString() }}</h3>
            <small class="text-success-custom">
              <i class="bi bi-arrow-up"></i> +{{ totalChange.toFixed(2) }}% (24ч)
            </small>
          </div>
        </div>
        
        <div class="col-md-4 fade-in" style="animation-delay: 0.1s;">
          <div class="card h-100 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-secondary">Доступно</span>
              <i class="bi bi-check-circle" style="font-size: 1.5rem; color: var(--success);"></i>
            </div>
            <h3 class="mb-0">${{ availableBalance.toLocaleString() }}</h3>
            <small class="text-secondary">Готово к торговле</small>
          </div>
        </div>
        
        <div class="col-md-4 fade-in" style="animation-delay: 0.2s;">
          <div class="card h-100 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-secondary">В ордерах</span>
              <i class="bi bi-hourglass-split" style="font-size: 1.5rem; color: var(--primary-color);"></i>
            </div>
            <h3 class="mb-0">${{ inOrders.toLocaleString() }}</h3>
            <small class="text-secondary">Активные ордера</small>
          </div>
        </div>
      </div>
      
      <!-- График портфеля -->
      <div class="card mb-4 fade-in" style="animation-delay: 0.3s;">
        <div class="card-header bg-transparent border-bottom border-custom">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">История портфеля</h5>
            <div class="d-flex gap-2">
              <button 
                v-for="period in periods" 
                :key="period"
                class="btn btn-sm"
                :class="selectedPeriod === period ? 'btn-primary' : 'btn-outline-secondary'"
                @click="selectedPeriod = period"
              >
                {{ period }}
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="portfolio-chart">
            <canvas ref="portfolioChart"></canvas>
          </div>
        </div>
      </div>
      
      <!-- Активы -->
      <div class="row">
        <div class="col-lg-8">
          <div class="card fade-in" style="animation-delay: 0.4s;">
            <div class="card-header bg-transparent border-bottom border-custom">
              <h5 class="mb-0">Мои активы</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-dark mb-0">
                  <thead>
                    <tr>
                      <th>Актив</th>
                      <th>Баланс</th>
                      <th>Цена</th>
                      <th>Стоимость</th>
                      <th>24ч изменение</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(asset, index) in assets" :key="asset.symbol" :style="`animation-delay: ${index * 0.05}s`" class="fade-in">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="coin-icon me-2">{{ asset.symbol[0] }}</div>
                          <div>
                            <strong>{{ asset.name }}</strong>
                            <br>
                            <small class="text-secondary">{{ asset.symbol }}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{{ asset.balance.toFixed(8) }}</strong>
                      </td>
                      <td>${{ asset.price.toLocaleString() }}</td>
                      <td>
                        <strong>${{ (asset.balance * asset.price).toLocaleString() }}</strong>
                      </td>
                      <td :class="asset.change >= 0 ? 'text-success-custom' : 'text-danger-custom'">
                        {{ asset.change >= 0 ? '+' : '' }}{{ asset.change.toFixed(2) }}%
                      </td>
                      <td>
                        <div class="d-flex gap-2">
                          <button class="btn btn-success btn-sm" @click="showDepositModal">Пополнить</button>
                          <router-link :to="`/trade?pair=${asset.symbol}/USDT`" class="btn btn-primary btn-sm">
                            Торговать
                          </router-link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <!-- Распределение портфеля -->
          <div class="card mb-3 fade-in" style="animation-delay: 0.5s;">
            <div class="card-header bg-transparent border-bottom border-custom">
              <h5 class="mb-0">Распределение</h5>
            </div>
            <div class="card-body">
              <div class="allocation-chart">
                <canvas ref="allocationChart"></canvas>
              </div>
              <div class="mt-3">
                <div v-for="asset in assets" :key="asset.symbol" class="d-flex justify-content-between align-items-center mb-2">
                  <div class="d-flex align-items-center">
                    <div class="coin-icon-small me-2">{{ asset.symbol[0] }}</div>
                    <span>{{ asset.symbol }}</span>
                  </div>
                  <span class="fw-bold">{{ ((asset.balance * asset.price / totalBalance) * 100).toFixed(1) }}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- История транзакций -->
          <div class="card fade-in" style="animation-delay: 0.6s;">
            <div class="card-header bg-transparent border-bottom border-custom">
              <h5 class="mb-0">Последние транзакции</h5>
            </div>
            <div class="card-body p-0">
              <div class="transactions-list">
                <div v-for="(tx, index) in transactions" :key="index" class="transaction-item p-3 border-bottom border-custom">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <div class="d-flex align-items-center mb-1">
                        <i :class="tx.type === 'deposit' ? 'bi bi-arrow-down-circle text-success-custom' : 'bi bi-arrow-up-circle text-danger-custom'"></i>
                        <strong class="ms-2">{{ tx.type === 'deposit' ? 'Пополнение' : 'Вывод' }}</strong>
                      </div>
                      <small class="text-secondary">{{ tx.amount }} {{ tx.symbol }}</small>
                    </div>
                    <div class="text-end">
                      <small class="text-secondary">{{ tx.date }}</small>
                      <br>
                      <span :class="tx.status === 'completed' ? 'text-success-custom' : 'text-warning'">
                        {{ tx.status === 'completed' ? 'Завершено' : 'В обработке' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import Breadcrumbs from '../components/Breadcrumbs.vue'

Chart.register(...registerables)

export default {
  name: 'Portfolio',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      selectedPeriod: '7D',
      periods: ['24H', '7D', '30D', '90D', '1Y', 'ALL'],
      totalBalance: 125430.50,
      totalChange: 5.23,
      availableBalance: 98500.00,
      inOrders: 26930.50,
      assets: [
        { name: 'Bitcoin', symbol: 'BTC', balance: 1.5, price: 43250.00, change: 2.45 },
        { name: 'Ethereum', symbol: 'ETH', balance: 15.2, price: 2650.00, change: -1.23 },
        { name: 'Binance Coin', symbol: 'BNB', balance: 50.0, price: 315.50, change: 0.89 },
        { name: 'Solana', symbol: 'SOL', balance: 200.0, price: 98.75, change: 5.12 },
        { name: 'Tether', symbol: 'USDT', balance: 5000.0, price: 1.00, change: 0.00 }
      ],
      transactions: [
        { type: 'deposit', amount: '1.5', symbol: 'BTC', date: '2024-01-15', status: 'completed' },
        { type: 'withdraw', amount: '5000', symbol: 'USDT', date: '2024-01-14', status: 'completed' },
        { type: 'deposit', amount: '15.2', symbol: 'ETH', date: '2024-01-13', status: 'completed' },
        { type: 'deposit', amount: '200', symbol: 'SOL', date: '2024-01-12', status: 'completed' }
      ]
    }
  },
  mounted() {
    this.initPortfolioChart()
    this.initAllocationChart()
  },
  methods: {
    showDepositModal() {
      alert('Функция пополнения будет доступна после авторизации')
    },
    initPortfolioChart() {
      const ctx = this.$refs.portfolioChart
      if (!ctx) return
      
      const data = Array.from({ length: 30 }, (_, i) => 100000 + Math.random() * 30000 + i * 500)
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => ''),
          datasets: [{
            label: 'Баланс портфеля',
            data: data,
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
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#848e9c'
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#848e9c',
                callback: function(value) {
                  return '$' + value.toLocaleString()
                }
              }
            }
          }
        }
      })
    },
    initAllocationChart() {
      const ctx = this.$refs.allocationChart
      if (!ctx) return
      
      const colors = ['#b89a3f', '#4ade80', '#f87171', '#60a5fa', '#a78bfa']
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.assets.map(a => a.symbol),
          datasets: [{
            data: this.assets.map(a => a.balance * a.price),
            backgroundColor: colors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.portfolio-page {
  min-height: calc(100vh - 200px);
  padding-top: 0;
}

.portfolio-chart {
  height: 300px;
  position: relative;
}

.allocation-chart {
  height: 200px;
  position: relative;
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

.coin-icon-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  opacity: 0.9;
}

.transactions-list {
  max-height: 400px;
  overflow-y: auto;
}

.transaction-item {
  transition: background 0.2s ease;
}

.transaction-item:hover {
  background: rgba(184, 154, 63, 0.04);
}

.btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .portfolio-page .row.g-4 {
    margin-bottom: 1rem;
  }

  .portfolio-chart {
    height: 250px;
  }

  .allocation-chart {
    height: 180px;
  }

  .portfolio-page .col-lg-8,
  .portfolio-page .col-lg-4 {
    margin-bottom: 1.5rem;
  }

  .d-flex.gap-2 {
    flex-direction: column;
    gap: 0.5rem !important;
  }

  .d-flex.gap-2 .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .portfolio-page h2 {
    font-size: 1.5rem;
  }

  .portfolio-chart {
    height: 200px;
  }

  .allocation-chart {
    height: 150px;
  }

  .table th,
  .table td {
    font-size: 0.75rem;
    padding: 0.5rem 0.3rem;
  }

  .table th:nth-child(3),
  .table td:nth-child(3),
  .table th:nth-child(4),
  .table td:nth-child(4) {
    display: none;
  }

  .transactions-list {
    max-height: 300px;
  }
}
</style>

