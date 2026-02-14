<template>
  <Teleport to="body">

  <!-- Модальное окно входа -->
  <div 
    class="modal fade" 
    id="loginModal" 
    tabindex="-1" 
    aria-labelledby="loginModalLabel" 
    aria-hidden="true"
    data-bs-backdrop="true"
    data-bs-keyboard="true"
    ref="loginModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom border-custom">
          <h5 class="modal-title" id="loginModalLabel">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Вход в аккаунт
          </h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="modal" 
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="loginEmail" 
                v-model="loginForm.email"
                placeholder="your@email.com"
                required
              >
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Пароль</label>
              <div class="input-group">
                <input 
                  :type="showLoginPassword ? 'text' : 'password'" 
                  class="form-control" 
                  id="loginPassword" 
                  v-model="loginForm.password"
                  placeholder="Введите пароль"
                  required
                >
                <button 
                  class="btn btn-outline-secondary" 
                  type="button"
                  @click="showLoginPassword = !showLoginPassword"
                >
                  <i :class="showLoginPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>
            <div class="mb-3 form-check">
              <input 
                type="checkbox" 
                class="form-check-input" 
                id="rememberMe"
                v-model="loginForm.remember"
              >
              <label class="form-check-label" for="rememberMe">
                Запомнить меня
              </label>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary btn-lg">
                Войти
              </button>
              <button 
                type="button" 
                class="btn btn-link text-decoration-none text-secondary"
                @click="switchToRegister"
              >
                Нет аккаунта? Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно регистрации -->
  <div 
    class="modal fade" 
    id="registerModal" 
    tabindex="-1" 
    aria-labelledby="registerModalLabel" 
    aria-hidden="true"
    data-bs-backdrop="true"
    data-bs-keyboard="true"
    ref="registerModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom border-custom">
          <h5 class="modal-title" id="registerModalLabel">
            <i class="bi bi-person-plus me-2"></i>
            Регистрация
          </h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="modal" 
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="registerName" class="form-label">Имя</label>
              <input 
                type="text" 
                class="form-control" 
                id="registerName" 
                v-model="registerForm.name"
                placeholder="Ваше имя"
                required
              >
            </div>
            <div class="mb-3">
              <label for="registerEmail" class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="registerEmail" 
                v-model="registerForm.email"
                placeholder="your@email.com"
                required
              >
            </div>
            <div class="mb-3">
              <label for="registerPassword" class="form-label">Пароль</label>
              <div class="input-group">
                <input 
                  :type="showRegisterPassword ? 'text' : 'password'" 
                  class="form-control" 
                  id="registerPassword" 
                  v-model="registerForm.password"
                  placeholder="Минимум 8 символов"
                  required
                  minlength="8"
                >
                <button 
                  class="btn btn-outline-secondary" 
                  type="button"
                  @click="showRegisterPassword = !showRegisterPassword"
                >
                  <i :class="showRegisterPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label for="registerPasswordConfirm" class="form-label">Подтвердите пароль</label>
              <input 
                :type="showRegisterPassword ? 'text' : 'password'" 
                class="form-control" 
                id="registerPasswordConfirm" 
                v-model="registerForm.passwordConfirm"
                placeholder="Повторите пароль"
                required
              >
            </div>
            <div class="mb-3 form-check">
              <input 
                type="checkbox" 
                class="form-check-input" 
                id="agreeTerms"
                v-model="registerForm.agreeTerms"
                required
              >
              <label class="form-check-label" for="agreeTerms">
                Я согласен с <a href="#" class="text-primary">условиями использования</a> и <a href="#" class="text-primary">политикой конфиденциальности</a>
              </label>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary btn-lg">
                Зарегистрироваться
              </button>
              <button 
                type="button" 
                class="btn btn-link text-decoration-none text-secondary"
                @click="switchToLogin"
              >
                Уже есть аккаунт? Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script>
export default {
  name: 'AuthModal',
  data() {
    return {
      showLoginPassword: false,
      showRegisterPassword: false,
      loginForm: {
        email: '',
        password: '',
        remember: false
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreeTerms: false
      },
      loginModalInstance: null,
      registerModalInstance: null
    }
  },
  mounted() {
    // Инициализация после монтирования
    this.$nextTick(() => {
      this.initModals()
    })
  },
  methods: {
    getBootstrap() {
      // Получаем Bootstrap из глобального объекта
      if (typeof window !== 'undefined') {
        return window.bootstrap || window.Bootstrap
      }
      return null
    },
    initModals() {
      // Ждем загрузки Bootstrap
      const bootstrap = this.getBootstrap()
      if (bootstrap && bootstrap.Modal) {
        this.loginModalInstance = new bootstrap.Modal(this.$refs.loginModal, {
          backdrop: true,
          keyboard: true
        })
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerModal, {
          backdrop: true,
          keyboard: true
        })
      } else {
        // Если Bootstrap еще не загружен, ждем
        setTimeout(() => this.initModals(), 50)
      }
    },
    openLogin() {
      this.$nextTick(() => {
        const bootstrap = this.getBootstrap()
        const modalElement = this.$refs.loginModal
        
        if (!modalElement) {
          console.error('Login modal element not found')
          return
        }
        
        if (bootstrap && bootstrap.Modal) {
          try {
            if (!this.loginModalInstance) {
              this.loginModalInstance = new bootstrap.Modal(modalElement, {
                backdrop: true,
                keyboard: true
              })
            }
            this.loginModalInstance.show()
          } catch (error) {
            console.error('Error opening login modal:', error)
            this.showModalFallback(modalElement)
          }
        } else {
          this.showModalFallback(modalElement)
        }
      })
    },
    showModalFallback(element) {
      // Fallback: используем нативный способ
      element.classList.add('show', 'fade')
      element.style.display = 'block'
      element.style.zIndex = '9999'
      element.style.position = 'fixed'
      element.style.top = '0'
      element.style.left = '0'
      element.style.width = '100%'
      element.style.height = '100%'
      element.setAttribute('aria-hidden', 'false')
      element.setAttribute('aria-modal', 'true')
      element.style.paddingRight = '0px'
      document.body.classList.add('modal-open')
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
      
      // Создаем backdrop
      let backdrop = document.querySelector('.modal-backdrop')
      if (!backdrop) {
        backdrop = document.createElement('div')
        backdrop.className = 'modal-backdrop fade show'
        backdrop.style.zIndex = '9998'
        backdrop.style.position = 'fixed'
        backdrop.style.top = '0'
        backdrop.style.left = '0'
        backdrop.style.width = '100vw'
        backdrop.style.height = '100vh'
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.body.appendChild(backdrop)
      }
      
      // Анимация появления
      setTimeout(() => {
        element.classList.add('show')
      }, 10)
    },
    openRegister() {
      this.$nextTick(() => {
        const bootstrap = this.getBootstrap()
        const modalElement = this.$refs.registerModal
        
        if (!modalElement) {
          console.error('Register modal element not found')
          return
        }
        
        if (bootstrap && bootstrap.Modal) {
          try {
            if (!this.registerModalInstance) {
              this.registerModalInstance = new bootstrap.Modal(modalElement, {
                backdrop: true,
                keyboard: true
              })
            }
            this.registerModalInstance.show()
          } catch (error) {
            console.error('Error opening register modal:', error)
            this.showModalFallback(modalElement)
          }
        } else {
          this.showModalFallback(modalElement)
        }
      })
    },
    switchToRegister() {
      this.hideModal(this.loginModalInstance, this.$refs.loginModal)
      setTimeout(() => {
        this.openRegister()
      }, 300)
    },
    switchToLogin() {
      this.hideModal(this.registerModalInstance, this.$refs.registerModal)
      setTimeout(() => {
        this.openLogin()
      }, 300)
    },
    hideModal(instance, element) {
      const bootstrap = this.getBootstrap()
      if (instance) {
        instance.hide()
      } else if (element) {
        if (bootstrap && bootstrap.Modal) {
          const modalInstance = bootstrap.Modal.getInstance(element)
          if (modalInstance) {
            modalInstance.hide()
          } else {
            try {
              const newModal = new bootstrap.Modal(element)
              newModal.hide()
            } catch (error) {
              this.hideModalFallback(element)
            }
          }
        } else {
          this.hideModalFallback(element)
        }
      }
    },
    hideModalFallback(element) {
      // Fallback: закрываем вручную с анимацией
      element.classList.remove('show')
      setTimeout(() => {
        element.style.display = 'none'
        element.setAttribute('aria-hidden', 'true')
        element.setAttribute('aria-modal', 'false')
        document.body.classList.remove('modal-open')
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        // Удаляем backdrop
        const backdrops = document.querySelectorAll('.modal-backdrop')
        backdrops.forEach(bd => bd.remove())
      }, 150)
    },
    handleLogin() {
      // В реальном приложении здесь была бы отправка данных на сервер
      console.log('Login attempt:', this.loginForm)
      alert('Вход выполнен успешно! (демо-версия)')
      this.hideModal(this.loginModalInstance, this.$refs.loginModal)
      this.resetLoginForm()
    },
    handleRegister() {
      // В реальном приложении здесь была бы отправка данных на сервер
      if (this.registerForm.password !== this.registerForm.passwordConfirm) {
        alert('Пароли не совпадают')
        return
      }
      console.log('Registration attempt:', this.registerForm)
      alert('Регистрация выполнена успешно! (демо-версия)')
      this.hideModal(this.registerModalInstance, this.$refs.registerModal)
      this.resetRegisterForm()
    },
    resetLoginForm() {
      this.loginForm = {
        email: '',
        password: '',
        remember: false
      }
    },
    resetRegisterForm() {
      this.registerForm = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreeTerms: false
      }
    }
  },
  beforeUnmount() {
    // Очистка при размонтировании
    if (this.loginModalInstance) {
      this.loginModalInstance.dispose()
    }
    if (this.registerModalInstance) {
      this.registerModalInstance.dispose()
    }
  }
}
</script>

<style>
/* Глобальные стили для модальных окон (без scoped для правильного применения) */
.modal {
  z-index: 9999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  outline: 0 !important;
}

.modal.show {
  display: block !important;
}

.modal.fade {
  opacity: 0;
  transition: opacity 0.15s linear;
}

.modal.fade.show {
  opacity: 1;
}

.modal-backdrop {
  z-index: 9998 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  pointer-events: auto !important;
}

.modal-backdrop.fade {
  opacity: 0;
}

.modal-backdrop.show {
  opacity: 1;
}

.modal-dialog {
  z-index: 10000 !important;
  position: relative !important;
  width: auto !important;
  margin: 1.75rem auto !important;
  pointer-events: none !important;
  max-width: 500px;
}

.modal-dialog-centered {
  display: flex !important;
  align-items: center !important;
  min-height: calc(100% - 3.5rem);
}

.modal-content {
  position: relative !important;
  pointer-events: auto !important;
  background: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-primary) !important;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 10000 !important;
}

.modal-header {
  background: transparent !important;
  border-bottom: 1px solid var(--border-color) !important;
  padding: 1rem 1.5rem;
}

.modal-title {
  color: var(--text-primary) !important;
  font-weight: 600;
}

.modal-title i {
  color: var(--primary-color) !important;
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
  opacity: 1;
}

.form-label {
  color: var(--text-primary) !important;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.modal-body .form-control {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-primary) !important;
}

.modal-body .form-control:focus {
  background: var(--bg-card) !important;
  border-color: var(--primary-color) !important;
  color: var(--text-primary) !important;
  box-shadow: 0 0 0 0.2rem rgba(184, 154, 63, 0.15) !important;
}

.modal-body .form-control::placeholder {
  color: var(--text-secondary) !important;
  opacity: 0.6;
}

.modal-body .form-check-label {
  color: var(--text-secondary) !important;
  font-size: 0.9rem;
}

.form-check-input {
  background-color: var(--bg-card) !important;
  border-color: var(--border-color) !important;
}

.form-check-input:checked {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

.btn-link {
  color: var(--text-secondary) !important;
  font-size: 0.9rem;
}

.btn-link:hover {
  color: var(--primary-color) !important;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  border-top: 1px solid var(--border-color);
  padding: 1rem 1.5rem;
}

@media (max-width: 576px) {
  .modal-dialog {
    margin: 0.5rem;
    max-width: calc(100% - 1rem);
  }

  .modal-content {
    border-radius: 6px;
  }

  .modal-header {
    padding: 0.75rem 1rem;
  }

  .modal-body {
    padding: 1rem !important;
  }

  .modal-title {
    font-size: 1.1rem;
  }
}
</style>

