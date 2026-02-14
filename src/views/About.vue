<template>
  <div class="about-page">
    <div class="container pt-4 pb-2">
      <Breadcrumbs />
    </div>
    <!-- Hero Section -->
    <section class="hero-about py-5 mb-5">
      <div class="container text-center fade-in">
        <h1 class="display-4 fw-bold mb-4">
          О <span class="gradient-text">CryptoExchange</span>
        </h1>
        <p class="lead text-secondary col-lg-8 mx-auto">
          Мы создаем будущее цифровых активов, предоставляя безопасную, быструю и удобную платформу для торговли криптовалютами.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section py-5">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 fade-in">
            <h2 class="mb-4">Наша миссия</h2>
            <p class="text-secondary mb-4">
              Мы стремимся сделать торговлю криптовалютами доступной для всех, независимо от уровня опыта. 
              Наша платформа объединяет передовые технологии, безопасность и удобство использования.
            </p>
            <p class="text-secondary mb-4">
              Мы верим в децентрализованное будущее финансов и работаем над тем, чтобы каждый мог 
              участвовать в этой революции.
            </p>
            <div class="d-flex gap-3">
              <div class="stat-box">
                <h3 class="gradient-text">2M+</h3>
                <p class="text-secondary mb-0">Пользователей</p>
              </div>
              <div class="stat-box">
                <h3 class="gradient-text">500+</h3>
                <p class="text-secondary mb-0">Криптовалют</p>
              </div>
              <div class="stat-box">
                <h3 class="gradient-text">24/7</h3>
                <p class="text-secondary mb-0">Поддержка</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 fade-in" style="animation-delay: 0.2s;">
            <div class="card p-4">
              <div class="row g-4">
                <div class="col-6" v-for="(value, index) in values" :key="index">
                  <div class="value-card text-center p-3">
                    <i :class="value.icon" style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                    <h5>{{ value.title }}</h5>
                    <p class="text-secondary small mb-0">{{ value.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <h2 class="text-center mb-5 fade-in">Наши преимущества</h2>
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

    <!-- Team Section -->
    <section class="team-section py-5">
      <div class="container">
        <h2 class="text-center mb-5 fade-in">Команда</h2>
        <div class="row g-4">
          <div class="col-md-4" v-for="(member, index) in team" :key="index" :class="'fade-in'" :style="`animation-delay: ${index * 0.1}s`">
            <div class="card text-center p-4">
              <div class="team-avatar mb-3">
                <div class="avatar-circle">{{ member.initials }}</div>
              </div>
              <h5 class="mb-1">{{ member.name }}</h5>
              <p class="text-secondary mb-3">{{ member.role }}</p>
              <p class="small text-secondary">{{ member.bio }}</p>
              <div class="d-flex justify-content-center gap-2">
                <a href="#" class="text-secondary"><i class="bi bi-linkedin"></i></a>
                <a href="#" class="text-secondary"><i class="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section py-5">
      <div class="container">
        <h2 class="text-center mb-5 fade-in">Наша история</h2>
        <div class="timeline">
          <div v-for="(event, index) in timeline" :key="index" class="timeline-item fade-in" :style="`animation-delay: ${index * 0.1}s`">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="card p-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="mb-0">{{ event.title }}</h5>
                  <span class="badge bg-primary">{{ event.year }}</span>
                </div>
                <p class="text-secondary mb-0">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue'

export default {
  name: 'About',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      values: [
        {
          icon: 'bi bi-shield-check',
          title: 'Безопасность',
          description: 'Приоритет номер один'
        },
        {
          icon: 'bi bi-lightning-charge',
          title: 'Инновации',
          description: 'Передовые технологии'
        },
        {
          icon: 'bi bi-people',
          title: 'Сообщество',
          description: 'В центре внимания'
        },
        {
          icon: 'bi bi-graph-up-arrow',
          title: 'Рост',
          description: 'Постоянное развитие'
        }
      ],
      features: [
        {
          icon: 'bi bi-shield-lock',
          title: 'Многоуровневая защита',
          description: 'Холодное хранение, двухфакторная аутентификация и регулярные аудиты безопасности'
        },
        {
          icon: 'bi bi-speedometer2',
          title: 'Высокая производительность',
          description: 'Обработка миллионов транзакций в секунду с минимальной задержкой'
        },
        {
          icon: 'bi bi-globe',
          title: 'Глобальный охват',
          description: 'Доступность из любой точки мира с поддержкой множества языков'
        },
        {
          icon: 'bi bi-cash-stack',
          title: 'Низкие комиссии',
          description: 'Одни из самых конкурентных комиссий на рынке для всех типов операций'
        },
        {
          icon: 'bi bi-headset',
          title: 'Круглосуточная поддержка',
          description: 'Профессиональная команда поддержки готова помочь в любое время'
        },
        {
          icon: 'bi bi-graph-up',
          title: 'Профессиональная аналитика',
          description: 'Мощные инструменты для анализа рынка и принятия решений'
        }
      ],
      team: [
        {
          name: 'Александр Иванов',
          role: 'CEO & Основатель',
          initials: 'АИ',
          bio: 'Более 10 лет опыта в финансовых технологиях и блокчейне'
        },
        {
          name: 'Мария Петрова',
          role: 'CTO',
          initials: 'МП',
          bio: 'Эксперт в области распределенных систем и криптографии'
        },
        {
          name: 'Дмитрий Сидоров',
          role: 'Head of Security',
          initials: 'ДС',
          bio: 'Специалист по кибербезопасности с опытом работы в крупных компаниях'
        }
      ],
      timeline: [
        {
          year: '2020',
          title: 'Основание компании',
          description: 'CryptoExchange была основана с целью сделать торговлю криптовалютами доступной для всех.'
        },
        {
          year: '2021',
          title: 'Запуск платформы',
          description: 'Успешный запуск торговой платформы с поддержкой основных криптовалют.'
        },
        {
          year: '2022',
          title: 'Расширение функционала',
          description: 'Добавление фьючерсов, стейкинга и других продвинутых инструментов.'
        },
        {
          year: '2023',
          title: 'Глобальное расширение',
          description: 'Достижение отметки в 1 миллион пользователей и расширение на новые рынки.'
        },
        {
          year: '2024',
          title: 'Инновации и рост',
          description: 'Внедрение AI-аналитики и достижение 2 миллионов пользователей.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  min-height: calc(100vh - 200px);
  padding-top: 0;
}

.hero-about {
  background: linear-gradient(135deg, rgba(184, 154, 63, 0.03) 0%, rgba(0, 0, 0, 0) 100%);
}

.stat-box {
  text-align: center;
  padding: 1.5rem;
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  flex: 1;
}

.value-card {
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-2px);
}

.team-avatar {
  display: flex;
  justify-content: center;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #d4af37);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  opacity: 0.9;
}

.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
}

.timeline-item:nth-child(odd) {
  flex-direction: row;
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 4px solid var(--bg-dark);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-content {
  width: 45%;
  padding: 0 2rem;
}

.timeline-item:nth-child(odd) .timeline-content {
  text-align: right;
}

@media (max-width: 768px) {
  .about-page .hero-about {
    padding: 2rem 0;
  }

  .about-page .display-4 {
    font-size: 2rem;
  }

  .stat-box {
    padding: 1rem;
    margin-bottom: 0.5rem;
  }

  .stat-box h3 {
    font-size: 1.5rem;
  }

  .value-card {
    margin-bottom: 1rem;
  }

  .avatar-circle {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
  }

  .timeline::before {
    left: 20px;
  }
  
  .timeline-marker {
    left: 20px;
  }
  
  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px;
    text-align: left !important;
  }
  
  .timeline-item {
    flex-direction: row !important;
  }
}

@media (max-width: 576px) {
  .about-page .hero-about {
    padding: 1.5rem 0;
  }

  .about-page .display-4 {
    font-size: 1.75rem;
  }

  .stat-box {
    padding: 0.75rem;
  }

  .stat-box h3 {
    font-size: 1.25rem;
  }

  .value-card i {
    font-size: 2rem !important;
  }

  .avatar-circle {
    width: 60px;
    height: 60px;
    font-size: 1.25rem;
  }

  .timeline-content {
    width: calc(100% - 50px);
    margin-left: 50px;
    padding: 0 1rem;
  }
}
</style>

