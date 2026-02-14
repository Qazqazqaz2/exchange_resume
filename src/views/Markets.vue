<template>
  <div class="markets-page">
    <div class="container pt-4 pb-2">
      <Breadcrumbs />
    </div>
    <div class="container">
      <div class="row mb-4">
        <div class="col-md-6">
          <h2 class="mb-0 fade-in">Рынки криптовалют</h2>
        </div>
        <div class="col-md-6">
          <div class="input-group fade-in" style="animation-delay: 0.1s;">
            <span class="input-group-text bg-card border-custom">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Поиск по названию или символу..."
              v-model="searchQuery"
            >
          </div>
        </div>
      </div>
      
      <!-- Фильтры -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex gap-2 flex-wrap fade-in" style="animation-delay: 0.2s;">
            <button 
              v-for="filter in filters" 
              :key="filter"
              class="btn btn-sm"
              :class="activeFilter === filter ? 'btn-primary' : 'btn-outline-secondary'"
              @click="activeFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Таблица рынков -->
      <div class="card fade-in" style="animation-delay: 0.3s;">
        <div class="table-responsive">
          <table class="table table-dark mb-0">
            <thead>
              <tr>
                <th @click="sortBy('name')" style="cursor: pointer;">
                  Название
                  <i class="bi bi-arrow-down-up ms-1"></i>
                </th>
                <th @click="sortBy('price')" style="cursor: pointer;">
                  Цена
                  <i class="bi bi-arrow-down-up ms-1"></i>
                </th>
                <th @click="sortBy('change')" style="cursor: pointer;">
                  24ч изменение
                  <i class="bi bi-arrow-down-up ms-1"></i>
                </th>
                <th @click="sortBy('volume')" style="cursor: pointer;">
                  24ч объем
                  <i class="bi bi-arrow-down-up ms-1"></i>
                </th>
                <th @click="sortBy('marketCap')" style="cursor: pointer;">
                  Рыночная капитализация
                  <i class="bi bi-arrow-down-up ms-1"></i>
                </th>
                <th>График</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(market, index) in filteredMarkets" 
                :key="market.id"
                class="market-row"
                :style="`animation-delay: ${index * 0.02}s`"
              >
                <td>
                  <div class="d-flex align-items-center">
                    <div class="coin-icon-large me-3">{{ market.symbol[0] }}</div>
                    <div>
                      <strong>{{ market.name }}</strong>
                      <br>
                      <small class="text-secondary">{{ market.symbol }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <strong>${{ market.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 }) }}</strong>
                </td>
                <td :class="market.change >= 0 ? 'text-success-custom' : 'text-danger-custom'">
                  <i :class="market.change >= 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                  {{ market.change >= 0 ? '+' : '' }}{{ market.change.toFixed(2) }}%
                </td>
                <td>${{ market.volume.toLocaleString() }}</td>
                <td>${{ market.marketCap.toLocaleString() }}</td>
                <td>
                  <div class="mini-chart">
                    <canvas :ref="`chart-${market.id}`" width="100" height="30"></canvas>
                  </div>
                </td>
                <td>
                  <router-link :to="`/trade?pair=${market.symbol}/USDT`" class="btn btn-primary btn-sm" @click="scrollToTop">
                    Торговать
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Пагинация -->
      <div class="d-flex justify-content-center mt-4">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage--">Предыдущая</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="currentPage++">Следующая</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import Breadcrumbs from '../components/Breadcrumbs.vue'

Chart.register(...registerables)

export default {
  name: 'Markets',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      searchQuery: '',
      activeFilter: 'Все',
      filters: ['Все', 'Избранное', 'USDT', 'BTC', 'BNB', 'Новые'],
      sortField: 'marketCap',
      sortDirection: 'desc',
      currentPage: 1,
      itemsPerPage: 20,
      markets: [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 43250.00, change: 2.45, volume: 1200000000, marketCap: 850000000000 },
        { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2650.00, change: -1.23, volume: 850000000, marketCap: 320000000000 },
        { id: 3, name: 'Binance Coin', symbol: 'BNB', price: 315.50, change: 0.89, volume: 320000000, marketCap: 48000000000 },
        { id: 4, name: 'Solana', symbol: 'SOL', price: 98.75, change: 5.12, volume: 450000000, marketCap: 45000000000 },
        { id: 5, name: 'Cardano', symbol: 'ADA', price: 0.52, change: -0.45, volume: 180000000, marketCap: 18500000000 },
        { id: 6, name: 'Polkadot', symbol: 'DOT', price: 7.25, change: 1.23, volume: 95000000, marketCap: 9500000000 },
        { id: 7, name: 'Polygon', symbol: 'MATIC', price: 0.89, change: -2.15, volume: 120000000, marketCap: 8500000000 },
        { id: 8, name: 'Chainlink', symbol: 'LINK', price: 14.50, change: 3.45, volume: 150000000, marketCap: 8500000000 },
        { id: 9, name: 'Litecoin', symbol: 'LTC', price: 72.30, change: 0.67, volume: 180000000, marketCap: 5400000000 },
        { id: 10, name: 'Uniswap', symbol: 'UNI', price: 6.25, change: -1.89, volume: 75000000, marketCap: 3800000000 },
        { id: 11, name: 'Avalanche', symbol: 'AVAX', price: 36.80, change: 4.12, volume: 220000000, marketCap: 14000000000 },
        { id: 12, name: 'Cosmos', symbol: 'ATOM', price: 10.45, change: -0.23, volume: 65000000, marketCap: 4000000000 },
        { id: 13, name: 'Algorand', symbol: 'ALGO', price: 0.18, change: 2.34, volume: 45000000, marketCap: 1500000000 },
        { id: 14, name: 'Filecoin', symbol: 'FIL', price: 5.20, change: -3.45, volume: 85000000, marketCap: 2800000000 },
        { id: 15, name: 'Tezos', symbol: 'XTZ', price: 1.05, change: 0.89, volume: 35000000, marketCap: 1000000000 }
      ]
    }
  },
  computed: {
    filteredMarkets() {
      let filtered = this.markets
      
      // Поиск
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(m => 
          m.name.toLowerCase().includes(query) || 
          m.symbol.toLowerCase().includes(query)
        )
      }
      
      // Сортировка
      filtered.sort((a, b) => {
        const aVal = a[this.sortField]
        const bVal = b[this.sortField]
        return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      })
      
      // Пагинация
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return filtered.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.markets.length / this.itemsPerPage)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMiniCharts()
    })
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'desc'
      }
    },
    initMiniCharts() {
      this.$nextTick(() => {
        this.filteredMarkets.forEach(market => {
          const refs = this.$refs[`chart-${market.id}`]
          const canvas = Array.isArray(refs) ? refs[0] : refs
          if (canvas) {
            const ctx = canvas.getContext('2d')
            const data = Array.from({ length: 20 }, () => Math.random() * 10 + (market.change >= 0 ? 50 : 40))
            
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: Array.from({ length: 20 }, () => ''),
                datasets: [{
                  data: data,
                  borderColor: market.change >= 0 ? '#4ade80' : '#f87171',
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  pointRadius: 0,
                  tension: 0.4
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  x: { display: false },
                  y: { display: false }
                }
              }
            })
          }
        })
      })
    }
  },
  watch: {
    filteredMarkets() {
      this.$nextTick(() => {
        this.initMiniCharts()
      })
    }
  }
}
</script>

<style scoped>
.markets-page {
  min-height: calc(100vh - 200px);
  padding-top: 0;
}

.coin-icon-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #d4af37);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  opacity: 0.9;
}

.market-row {
  animation: fadeIn 0.4s ease-out;
  animation-fill-mode: both;
  transition: background 0.2s ease;
}

.market-row:hover {
  background: rgba(184, 154, 63, 0.04);
}

.mini-chart {
  width: 100px;
  height: 30px;
}

.pagination .page-link {
  background: var(--bg-card);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.pagination .page-link:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

.pagination .page-item.active .page-link {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

@media (max-width: 768px) {
  .markets-page .row.mb-4 {
    flex-direction: column;
  }

  .markets-page .col-md-6 {
    margin-bottom: 1rem;
  }

  .markets-page .d-flex.gap-2 {
    flex-wrap: wrap;
  }

  .markets-page .btn-sm {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }

  .mini-chart {
    width: 80px;
    height: 25px;
  }

  .coin-icon-large {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .markets-page h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .table th,
  .table td {
    font-size: 0.7rem;
    padding: 0.4rem 0.2rem;
  }

  .table th:nth-child(5),
  .table td:nth-child(5),
  .table th:nth-child(6) {
    display: none;
  }

  .mini-chart {
    display: none;
  }

  .coin-icon-large {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
    margin-right: 0.5rem !important;
  }

  .pagination {
    font-size: 0.85rem;
  }

  .pagination .page-link {
    padding: 0.3rem 0.5rem;
  }
}
</style>

