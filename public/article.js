// Dedicated Article Page Reader (article.js)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Spotlight Glow
  const spotlight = document.querySelector('.spotlight-overlay');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // 2. Reading Progress Indicator
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // 3. Extract Article ID from URL (?id=... or hash #...)
  const urlParams = new URLSearchParams(window.location.search);
  let articleId = urlParams.get('id') || window.location.hash.substring(1);

  // If no ID provided, default to the first article
  if (!articleId && typeof articles !== 'undefined' && articles.length > 0) {
    articleId = articles[0].id;
  }

  // 4. Populate Article Data
  const articleContainer = document.getElementById('article-content-container');
  const notFoundState = document.getElementById('not-found-state');

  if (typeof articles === 'undefined') return;

  const currentIndex = articles.findIndex(a => a.id === articleId);
  const article = articles[currentIndex];

  if (!article) {
    if (articleContainer) articleContainer.classList.add('hidden');
    if (notFoundState) notFoundState.classList.remove('hidden');
    document.title = 'Article Not Found | Tashriq Maharaj';
    return;
  }

  // Update Page Title and Metadata
  document.title = `${article.title} | Tashriq Maharaj`;
  const descTag = document.getElementById('page-description');
  if (descTag) descTag.setAttribute('content', article.summary);

  // Populate Header Elements
  const titleEl = document.getElementById('article-title');
  const categoryEl = document.getElementById('article-category');
  const dateEl = document.getElementById('article-date');
  const readTimeEl = document.getElementById('article-readtime');
  const bodyEl = document.getElementById('article-body');
  const tagsEl = document.getElementById('article-tags');

  if (titleEl) titleEl.textContent = article.title;
  if (categoryEl) categoryEl.textContent = article.category;
  if (dateEl) dateEl.textContent = article.date;
  if (readTimeEl) readTimeEl.textContent = article.readTime;
  if (bodyEl) bodyEl.innerHTML = article.content;
  if (tagsEl) {
    tagsEl.innerHTML = article.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join(' ');
  }

  // 5. Populate Next / Previous Article Navigation
  const navContainer = document.getElementById('article-nav');
  if (navContainer) {
    const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

    let navHtml = '';

    if (prevArticle) {
      navHtml += `
        <a href="article.html?id=${prevArticle.id}" class="portfolio-card block group p-4 border border-slate-800 hover:border-teal-500/30 transition-all rounded-lg">
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1 group-hover:text-teal-400">
            <span>← Previous</span>
          </div>
          <div class="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition-colors line-clamp-1">
            ${prevArticle.title}
          </div>
        </a>
      `;
    } else {
      navHtml += `<div></div>`; // Spacer
    }

    if (nextArticle) {
      navHtml += `
        <a href="article.html?id=${nextArticle.id}" class="portfolio-card block group p-4 border border-slate-800 hover:border-teal-500/30 transition-all rounded-lg text-right">
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-end gap-1 group-hover:text-teal-400">
            <span>Next →</span>
          </div>
          <div class="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition-colors line-clamp-1">
            ${nextArticle.title}
          </div>
        </a>
      `;
    }

    navContainer.innerHTML = navHtml;
  }

  // 6. Share / Copy Link Handler
  const copyBtn = document.getElementById('copy-article-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Article link copied to clipboard!');
      }).catch(() => {
        showToast('Link ready to share!');
      });
    });
  }

  // 7. Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
