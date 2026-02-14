<template>
  <div id="app">
    <Navbar />
    <main class="main-content" role="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useSEO } from './composables/useSEO'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const route = useRoute()
    const { updateMeta } = useSEO()

    // Инициализация SEO при монтировании и при смене маршрута
    onMounted(() => {
      updateMeta(route.meta)
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 70px;
  }
}

@media (max-width: 576px) {
  .main-content {
    padding-top: 60px;
  }
}
</style>

