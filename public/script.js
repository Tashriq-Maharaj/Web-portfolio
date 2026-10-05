// Interactive features for Tashriq's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Spotlight Glow Effect
  const spotlight = document.querySelector('.spotlight-overlay');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // 2. Active Section Highlighting via IntersectionObserver (ScrollSpy)
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Smooth scroll for in-page hash links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL hash without jumping
          history.pushState(null, '', `#${targetId}`);
        }
      }
    });
  });

  // 3. Save CV / Print Functionality
  const saveCvBtn = document.getElementById('save-cv-btn');
  if (saveCvBtn) {
    saveCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening print dialog to Save / Export as PDF...');
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  // 4. Copy Email & Toast Notification
  const emailLinks = document.querySelectorAll('.email-trigger');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const email = link.getAttribute('data-email') || 'your-email@rickhomelab.co.za';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });

  // 5. Toast Notification System
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

  // 6. Interactive Project Modal Details
  const projectCards = document.querySelectorAll('[data-project]');
  const modalBackdrop = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalClose = document.getElementById('modal-close');

  const projectDetails = {
    'homelab': {
      title: 'Homelab Infrastructure',
      description: 'Self-hosted Ubuntu Server homelab running Docker-based services, including SQL Server for home development testing and learning and Plex Media server to host my collection of downloaded Movies, TV shows, and Music. Built a monitoring and reporting stack using Prometheus, Grafana, and Node Exporter, alongside Python automation for server health reporting and Telegram/email alerts.',
      tags: ['Ubuntu Server', 'Docker', 'Prometheus', 'Grafana', 'Portainer', 'Python']
    },
    'pipelines': {
      title: 'Job Failure Escalation Email Compiler',
      description: 'A lightweight Python and Flask tool designed to compile job failure details into structured escalation emails, helping standardise incident communication and reduce manual effort during batch operational failures.',
      tags: ['Python', 'Flask', 'PyInstaller', 'Email Escalation', 'IT Operations']
    },
    'desktop': {
      title: 'Python Automation & Utilities',
      description: 'Lightweight Python tools designed to automate repetitive tasks and simplify workflows. Includes operational email compilation, server reporting utilities, and scheduled task automation, with an emphasis on practical problem-solving, maintainable code, and reducing manual effort.',
      tags: ['Python', 'Automation', 'Workflow Optimization', 'Scripting', 'Task Scheduling']
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked directly on an external anchor with a valid href, let it open
      if (e.target.closest('a') && e.target.closest('a').getAttribute('href') !== '#') {
        return;
      }
      const projectId = card.getAttribute('data-project');
      const details = projectDetails[projectId];
      if (details && modalBackdrop) {
        modalTitle.textContent = details.title;
        modalDesc.textContent = details.description;
        modalTech.innerHTML = details.tags.map(t => `<span class="tech-tag">${t}</span>`).join(' ');
        modalBackdrop.classList.add('open');
      }
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        modalBackdrop.classList.remove('open');
      }
    });
  }
});
