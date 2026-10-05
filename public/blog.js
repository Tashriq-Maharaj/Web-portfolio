// Interactive logic for Blog Catalogue Page (blog.html)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Spotlight Glow
  const spotlight = document.querySelector('.spotlight-overlay');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // 2. Render Articles & Filter State
  const articlesContainer = document.getElementById('articles-container');
  const searchInput = document.getElementById('article-search');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const countBadge = document.getElementById('article-count');
  const emptyState = document.getElementById('empty-state');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  let activeCategory = 'all';
  let searchQuery = '';

  function renderArticles() {
    if (!articlesContainer || typeof articles === 'undefined') return;

    const filtered = articles.filter(article => {
      const matchesCategory = (activeCategory === 'all') || (article.category.toLowerCase() === activeCategory.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${articles.length} article${articles.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      articlesContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    articlesContainer.innerHTML = filtered.map(article => `
      <a href="article.html?id=${article.id}" class="portfolio-card block group transition-all text-inherit no-underline">
        <!-- Top Metadata Row -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-3 text-xs font-mono">
            <span class="text-teal-400 bg-teal-950/70 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
              ${article.category}
            </span>
            <span class="text-slate-500">${article.date}</span>
            <span class="text-slate-500">·</span>
            <span class="text-slate-500">${article.readTime}</span>
          </div>

          ${article.featured ? `
            <span class="text-[10px] font-mono tracking-wider uppercase font-semibold text-teal-300 bg-teal-950/90 border border-teal-500/40 px-2 py-0.5 rounded-full">
              FEATURED
            </span>
          ` : ''}
        </div>

        <!-- Article Title & Arrow -->
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
            ${article.title}
          </h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon text-slate-400 shrink-0 mt-1">
            <path d="M7 7h10v10"/>
            <path d="M7 17 17 7"/>
          </svg>
        </div>

        <!-- Excerpt / Summary -->
        <p class="mt-3 text-sm text-slate-400 leading-relaxed">
          ${article.summary}
        </p>

        <!-- Tags and Read More -->
        <div class="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
          <div class="flex flex-wrap gap-2">
            ${article.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <span class="text-xs font-semibold text-teal-400 group-hover:text-teal-300 inline-flex items-center gap-1">
            Read article →
          </span>
        </div>
      </a>
    `).join('');
  }

  // 3. Search and Category Filter Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderArticles();
    });
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      activeCategory = btn.getAttribute('data-category');
      renderArticles();
    });
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      activeCategory = 'all';
      categoryButtons.forEach(b => {
        if (b.getAttribute('data-category') === 'all') {
          b.click();
        }
      });
      renderArticles();
    });
  }

  // Initial render
  renderArticles();
});
