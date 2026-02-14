<template>
  <footer class="footer mt-auto py-5" role="contentinfo">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-3">
          <h5 class="mb-3">
            <i class="bi bi-currency-bitcoin me-2" style="color: var(--primary-color);"></i>
            CryptoExchange
          </h5>
          <p class="text-secondary">Современная платформа для торговли криптовалютами с лучшими условиями и безопасностью.</p>
          <div class="d-flex gap-3 mt-3">
            <a href="#" class="text-secondary"><i class="bi bi-twitter"></i></a>
            <a href="#" class="text-secondary"><i class="bi bi-telegram"></i></a>
            <a href="#" class="text-secondary"><i class="bi bi-discord"></i></a>
            <a href="#" class="text-secondary"><i class="bi bi-github"></i></a>
          </div>
        </div>
        
        <div class="col-md-3">
          <h6 class="mb-3">Торговля</h6>
          <ul class="list-unstyled">
            <li><router-link to="/trade" class="text-secondary text-decoration-none">Спотовая торговля</router-link></li>
            <li><router-link to="/markets" class="text-secondary text-decoration-none">Рынки</router-link></li>
            <li><a href="#" class="text-secondary text-decoration-none">Фьючерсы</a></li>
            <li><a href="#" class="text-secondary text-decoration-none">P2P</a></li>
          </ul>
        </div>
        
        <div class="col-md-3">
          <h6 class="mb-3">Информация</h6>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="text-secondary text-decoration-none">О нас</router-link></li>
            <li><router-link to="/support" class="text-secondary text-decoration-none">Поддержка</router-link></li>
            <li><a href="#" class="text-secondary text-decoration-none">API</a></li>
            <li><a href="#" class="text-secondary text-decoration-none">Безопасность</a></li>
          </ul>
        </div>
        
        <div class="col-md-3">
          <h6 class="mb-3">Подписка</h6>
          <p class="text-secondary">Получайте последние новости и обновления</p>
          <div class="input-group">
            <input type="email" class="form-control" placeholder="Email">
            <button class="btn btn-primary" type="button">
              <i class="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
      
      <hr class="my-4 border-secondary">
      
      <div class="row">
        <div class="col-md-6">
          <p class="text-secondary mb-0">&copy; 2024 CryptoExchange. Все права защищены.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <a href="#" class="text-secondary text-decoration-none me-3">Политика конфиденциальности</a>
          <a href="#" class="text-secondary text-decoration-none">Условия использования</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.footer a:hover {
  color: var(--primary-color) !important;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 !important;
  }

  .footer .col-md-3 {
    margin-bottom: 2rem;
  }

  .footer h5,
  .footer h6 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .footer .input-group {
    flex-direction: column;
  }

  .footer .input-group .form-control {
    margin-bottom: 0.5rem;
  }

  .footer .input-group .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 1.5rem 0 !important;
    font-size: 0.9rem;
  }

  .footer .col-md-3 {
    margin-bottom: 1.5rem;
  }

  .footer .row:last-child {
    flex-direction: column;
    text-align: center;
  }

  .footer .text-md-end {
    text-align: center !important;
    margin-top: 1rem;
  }
}
</style>

