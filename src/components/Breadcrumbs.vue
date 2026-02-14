<template>
  <nav v-if="showBreadcrumbs" aria-label="breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <router-link to="/" class="text-decoration-none">
          <i class="bi bi-house-door"></i> Главная
        </router-link>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item" :class="{ active: index === crumbs.length - 1 }">
        <router-link v-if="index < crumbs.length - 1" :to="crumb.path" class="text-decoration-none">
          {{ crumb.label }}
        </router-link>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    showBreadcrumbs() {
      return this.$route.path !== '/'
    },
    crumbs() {
      const path = this.$route.path
      const paths = path.split('/').filter(p => p)
      const crumbs = []
      
      let currentPath = ''
      paths.forEach((segment, index) => {
        currentPath += '/' + segment
        const label = this.getLabel(segment)
        crumbs.push({
          path: currentPath,
          label: label
        })
      })
      
      return crumbs
    }
  },
  methods: {
    getLabel(segment) {
      const labels = {
        'trade': 'Торговля',
        'markets': 'Рынки',
        'portfolio': 'Портфель',
        'about': 'О нас',
        'support': 'Поддержка'
      }
      return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    }
  }
}
</script>

<style scoped>
.breadcrumb-nav {
  padding: 1rem 0;
  background: transparent;
}

.breadcrumb {
  background: transparent;
  padding: 0;
}

.breadcrumb-item a {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
  color: var(--primary-color);
}

.breadcrumb-item.active span {
  color: var(--text-primary);
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  color: var(--text-secondary);
  padding: 0 0.5rem;
}

@media (max-width: 576px) {
  .breadcrumb-nav {
    padding: 0.5rem 0;
  }

  .breadcrumb {
    font-size: 0.85rem;
  }

  .breadcrumb-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }
}
</style>

