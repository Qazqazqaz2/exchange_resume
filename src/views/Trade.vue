<template>
  <div class="trade-page">
    <div class="container-fluid pt-4 pb-2">
      <Breadcrumbs />
    </div>
    <div class="container-fluid">
      <div class="row g-3">
        <!-- Левая панель - График -->
        <div class="col-lg-8">
          <div class="card mb-3">
            <div class="card-header bg-transparent border-bottom border-custom trade-header">
              <div class="trade-header-content">
                <div class="trade-pair-info">
                  <h5 class="mb-0 trade-pair-title">BTC/USDT</h5>
                  <span class="text-success-custom trade-pair-change">+2.45%</span>
                </div>
                <div class="trade-timeframes">
                  <button 
                    class="btn btn-sm btn-outline-secondary timeframe-btn" 
                    v-for="time in timeframes" 
                    :key="time" 
                    @click="selectedTimeframe = time" 
                    :class="{ active: selectedTimeframe === time }"
                  >
                    {{ time }}
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas ref="tradeChart"></canvas>
              </div>
            </div>
          </div>
          
          <!-- Ордера -->
          <div class="row g-3">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header bg-transparent border-bottom border-custom">
                  <h6 class="mb-0">Купить</h6>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label text-secondary">Цена (USDT)</label>
                    <input type="number" class="form-control" v-model="buyPrice" placeholder="0.00">
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-secondary">Количество (BTC)</label>
                    <input type="number" class="form-control" v-model="buyAmount" placeholder="0.00">
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-secondary">Итого</label>
                    <input type="number" class="form-control" :value="(buyPrice * buyAmount).toFixed(2)" readonly>
                  </div>
                  <button class="btn btn-success w-100" style="background: var(--success);">
                    Купить BTC
                  </button>
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="card">
                <div class="card-header bg-transparent border-bottom border-custom">
                  <h6 class="mb-0">Продать</h6>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label text-secondary">Цена (USDT)</label>
                    <input type="number" class="form-control" v-model="sellPrice" placeholder="0.00">
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-secondary">Количество (BTC)</label>
                    <input type="number" class="form-control" v-model="sellAmount" placeholder="0.00">
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-secondary">Итого</label>
                    <input type="number" class="form-control" :value="(sellPrice * sellAmount).toFixed(2)" readonly>
                  </div>
                  <button class="btn btn-danger w-100" style="background: var(--danger);">
                    Продать BTC
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Правая панель - Стакан и история -->
        <div class="col-lg-4">
          <!-- Стакан заявок -->
          <div class="card mb-3">
            <div class="card-header bg-transparent border-bottom border-custom">
              <h6 class="mb-0">Стакан заявок</h6>
            </div>
            <div class="card-body p-0">
              <div class="orderbook">
                <div class="orderbook-sell">
                  <div v-for="(order, index) in sellOrders" :key="'sell-' + index" class="orderbook-row sell-row">
                    <span class="text-danger-custom">{{ order.price.toFixed(2) }}</span>
                    <span>{{ order.amount.toFixed(4) }}</span>
                    <span>{{ (order.price * order.amount).toFixed(2) }}</span>
                  </div>
                </div>
                <div class="orderbook-spread">
                  <div class="spread-content">
                    <div class="spread-label">
                      <i class="bi bi-arrows-expand"></i>
                      <span>Спред</span>
                    </div>
                    <div class="spread-value">
                      ${{ spread.toFixed(2) }}
                    </div>
                  </div>
                </div>
                <div class="orderbook-buy">
                  <div v-for="(order, index) in buyOrders" :key="'buy-' + index" class="orderbook-row buy-row">
                    <span class="text-success-custom">{{ order.price.toFixed(2) }}</span>
                    <span>{{ order.amount.toFixed(4) }}</span>
                    <span>{{ (order.price * order.amount).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- История сделок -->
          <div class="card">
            <div class="card-header bg-transparent border-bottom border-custom">
              <h6 class="mb-0">Последние сделки</h6>
            </div>
            <div class="card-body p-0">
              <div class="trades-list">
                <div v-for="(trade, index) in recentTrades" :key="index" class="trade-item d-flex justify-content-between p-2 border-bottom border-custom">
                  <div>
                    <span :class="trade.type === 'buy' ? 'text-success-custom' : 'text-danger-custom'">
                      {{ trade.price.toFixed(2) }}
                    </span>
                  </div>
                  <div class="text-secondary">
                    {{ trade.amount.toFixed(4) }}
                  </div>
                  <div class="text-secondary small">
                    {{ trade.time }}
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
  name: 'Trade',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      selectedTimeframe: '1D',
      timeframes: ['1m', '5m', '15m', '1H', '4H', '1D', '1W'],
      buyPrice: 43250.00,
      buyAmount: 0,
      sellPrice: 43250.00,
      sellAmount: 0,
      spread: 2.50,
      priceUpdateInterval: null,
      chart: null,
      sellOrders: [
        { price: 43255.00, amount: 0.1250 },
        { price: 43254.50, amount: 0.0890 },
        { price: 43254.00, amount: 0.1560 },
        { price: 43253.50, amount: 0.2030 },
        { price: 43253.00, amount: 0.1780 }
      ],
      buyOrders: [
        { price: 43250.00, amount: 0.1450 },
        { price: 43249.50, amount: 0.1920 },
        { price: 43249.00, amount: 0.1670 },
        { price: 43248.50, amount: 0.1340 },
        { price: 43248.00, amount: 0.2110 }
      ],
      recentTrades: [
        { price: 43251.00, amount: 0.0234, type: 'buy', time: '10:23:45' },
        { price: 43250.50, amount: 0.0156, type: 'sell', time: '10:23:42' },
        { price: 43250.00, amount: 0.0345, type: 'buy', time: '10:23:38' },
        { price: 43249.50, amount: 0.0123, type: 'sell', time: '10:23:35' },
        { price: 43249.00, amount: 0.0289, type: 'buy', time: '10:23:30' }
      ]
    }
  },
  mounted() {
    this.initChart()
    this.updatePrices()
  },
  methods: {
    initChart() {
      const ctx = this.$refs.tradeChart
      if (!ctx) return
      
      const data = Array.from({ length: 100 }, () => Math.random() * 1000 + 42000)
      
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 100 }, (_, i) => ''),
          datasets: [{
            label: 'BTC/USDT',
            data: data,
            borderColor: '#b89a3f',
            backgroundColor: 'rgba(184, 154, 63, 0.08)',
            borderWidth: 2,
            fill: true,
            tension: 0.1,
            pointRadius: 0
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
              position: 'right',
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#848e9c'
              }
            }
          }
        }
      })
    },
    updatePrices() {
      // Симуляция обновления цен (в реальном приложении здесь был бы WebSocket)
      this.priceUpdateInterval = setInterval(() => {
        const change = (Math.random() - 0.5) * 10
        this.buyPrice = Math.max(43000, this.buyPrice + change)
        this.sellPrice = this.buyPrice
      }, 2000)
    }
  },
  beforeUnmount() {
    // Очистка ресурсов при размонтировании компонента
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval)
    }
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>

<style scoped>
.trade-page {
  min-height: calc(100vh - 200px);
  padding-top: 0;
}

.trade-header {
  padding: 0.75rem 1rem;
}

.trade-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.trade-pair-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.trade-pair-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.trade-pair-change {
  font-size: 0.9rem;
  font-weight: 500;
}

.trade-timeframes {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
  justify-content: flex-end;
}

.timeframe-btn {
  min-width: 40px;
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.timeframe-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.chart-container {
  height: 500px;
  position: relative;
}

.orderbook {
  max-height: 400px;
  overflow-y: auto;
}

.orderbook-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition: background 0.2s ease;
}

.orderbook-row:hover {
  background: rgba(184, 154, 63, 0.04);
}

.sell-row {
  text-align: right;
}

.buy-row {
  text-align: right;
}

.orderbook-spread {
  background: linear-gradient(135deg, rgba(184, 154, 63, 0.1) 0%, rgba(184, 154, 63, 0.05) 100%);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
  position: relative;
  overflow: hidden;
}

.orderbook-spread::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  opacity: 0.3;
}

.spread-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.spread-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
}

.spread-label i {
  font-size: 0.9rem;
  color: var(--primary-color);
  opacity: 0.8;
}

.spread-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.trades-list {
  max-height: 300px;
  overflow-y: auto;
}

.trade-item {
  font-size: 0.875rem;
  transition: background 0.2s ease;
}

.trade-item:hover {
  background: rgba(184, 154, 63, 0.04);
}

.btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .trade-page .row {
    margin: 0;
  }

  .trade-page .col-lg-8,
  .trade-page .col-lg-4 {
    margin-bottom: 1rem;
  }

  .trade-header {
    padding: 0.75rem;
  }

  .trade-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .trade-pair-info {
    width: 100%;
    justify-content: space-between;
  }

  .trade-pair-title {
    font-size: 1rem;
  }

  .trade-pair-change {
    font-size: 0.85rem;
  }

  .trade-timeframes {
    width: 100%;
    justify-content: flex-start;
    gap: 0.4rem;
  }

  .timeframe-btn {
    min-width: 36px;
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
    flex: 0 0 auto;
  }

  .chart-container {
    height: 300px;
  }

  .orderbook {
    max-height: 250px;
  }

  .trades-list {
    max-height: 200px;
  }

  .orderbook-row,
  .trade-item {
    font-size: 0.75rem;
    padding: 0.4rem 0.5rem;
  }

  .orderbook-spread {
    padding: 0.6rem 0.75rem;
  }

  .spread-label {
    font-size: 0.75rem;
  }

  .spread-label i {
    font-size: 0.8rem;
  }

  .spread-value {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .trade-header {
    padding: 0.6rem 0.75rem;
  }

  .trade-header-content {
    gap: 0.6rem;
  }

  .trade-pair-title {
    font-size: 0.95rem;
  }

  .trade-pair-change {
    font-size: 0.8rem;
  }

  .trade-timeframes {
    gap: 0.3rem;
    justify-content: space-between;
  }

  .timeframe-btn {
    min-width: 32px;
    padding: 0.25rem 0.4rem;
    font-size: 0.7rem;
    flex: 1 1 auto;
    max-width: calc(14% - 0.3rem);
  }

  .chart-container {
    height: 250px;
  }

  .orderbook-row {
    grid-template-columns: 1fr 1fr;
    font-size: 0.7rem;
  }

  .orderbook-row span:last-child {
    display: none;
  }

  .orderbook-spread {
    padding: 0.6rem 0.75rem;
    background: rgba(184, 154, 63, 0.08);
  }

  .spread-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .spread-label {
    font-size: 0.75rem;
    gap: 0.4rem;
  }

  .spread-label i {
    font-size: 0.8rem;
  }

  .spread-label span {
    display: none;
  }

  .spread-value {
    font-size: 0.9rem;
    font-weight: 700;
  }
}
</style>

