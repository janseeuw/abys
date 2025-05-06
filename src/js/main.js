/**
 * Main JavaScript file for Ana Belén's portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all common functionality
  initMobileNavigation();
  initProgressBar();
  initScrollAnimations();
  initProjectDetails();
});

/**
 * Mobile navigation toggle
 */
function initMobileNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
      
      if (!isClickInside && !navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden');
      }
    });
  }
}

/**
 * Progress bar at the top of the page
 */
function initProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  
  if (progressBar) {
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      progressBar.style.width = scrolled + '%';
    });
  }
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fadeInUp');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      element.style.opacity = 0;
      observer.observe(element);
    });
  }
}

/**
 * Project details toggle functionality
 */
function initProjectDetails() {
  const detailButtons = document.querySelectorAll('.project-details-btn');
  const closeButtons = document.querySelectorAll('.project-close-btn');
  
  if (detailButtons.length > 0) {
    detailButtons.forEach(button => {
      button.addEventListener('click', function() {
        const detailsId = this.getAttribute('data-project');
        const detailsElement = document.getElementById(detailsId);
        
        if (detailsElement) {
          // Close any open details first
          document.querySelectorAll('[id$="-details"]').forEach(el => {
            if (el.id !== detailsId) {
              el.classList.add('hidden');
            }
          });
          
          // Toggle the clicked details
          detailsElement.classList.toggle('hidden');
          
          // Scroll to the details if they're now visible
          if (!detailsElement.classList.contains('hidden')) {
            detailsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    });
  }
  
  if (closeButtons.length > 0) {
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const detailsElement = this.closest('[id$="-details"]');
        if (detailsElement) {
          detailsElement.classList.add('hidden');
        }
      });
    });
  }
}

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
