<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-custom fixed-top" role="navigation" aria-label="Главная навигация">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-currency-bitcoin me-2" style="font-size: 1.5rem; color: var(--primary-color);"></i>
        <span class="fw-bold">CryptoExchange</span>
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/trade" active-class="active">Торговля</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/markets" active-class="active">Рынки</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/portfolio" active-class="active">Портфель</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active">О нас</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/support" active-class="active">Поддержка</router-link>
          </li>
        </ul>
        
        <div class="d-flex align-items-center gap-3">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-wallet2"></i>
            <span class="text-success-custom fw-bold">$0.00</span>
          </div>
          <router-link to="/portfolio" class="btn btn-outline-light btn-sm me-2">
            <i class="bi bi-wallet2 me-1"></i>
            Портфель
          </router-link>
          <button class="btn btn-primary btn-sm" @click="openLogin">
            <i class="bi bi-box-arrow-in-right me-1"></i>
            Войти
          </button>
        </div>
      </div>
    </div>
    
    <!-- Модальные окна входа и регистрации -->
    <AuthModal ref="authModal" />
  </nav>
</template>

<script>
import AuthModal from './AuthModal.vue'

export default {
  name: 'Navbar',
  components: {
    AuthModal
  },
  methods: {
    openLogin() {
      this.$refs.authModal.openLogin()
    }
  }
}
</script>

<style scoped>
.navbar {
  background: var(--bg-card) !important;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  backdrop-filter: blur(10px);
  z-index: 1030 !important;
}

.navbar-brand {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav-link {
  color: var(--text-secondary) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 0.5rem;
}

.nav-link:hover {
  color: var(--primary-color) !important;
}

.nav-link.active {
  color: var(--primary-color) !important;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
  border-radius: 2px;
}

.bg-dark-custom {
  background-color: var(--bg-card) !important;
}

@media (max-width: 991px) {
  .navbar-collapse {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .navbar-nav {
    margin-bottom: 1rem;
  }

  .nav-item {
    margin: 0.25rem 0;
  }

  .d-flex.align-items-center.gap-3 {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 0.75rem !important;
    width: 100%;
  }

  .d-flex.align-items-center.gap-3 .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 0.75rem 0;
  }

  .navbar-brand {
    font-size: 1.1rem;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
}
</style>

