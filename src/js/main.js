/**
 * Main JavaScript file for Ana Belén's portfolio website
 * Organized with a module pattern for better maintainability
 */

// Main app namespace
const App = {
  // Initialize all functionality when DOM is ready
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.Navigation.init();
      this.ScrollEffects.initProgressBar();
      this.ScrollEffects.initAnimations();
      this.Projects.init();
      this.SmoothScroll.init();
    });
  },

  // Navigation functionality
  Navigation: {
    init() {
      const navToggle = document.getElementById('nav-toggle');
      const navMenu = document.getElementById('nav-menu');
      
      if (!navToggle || !navMenu) return;
      
      // Toggle menu on button click
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInside && !navMenu.classList.contains('hidden')) {
          navMenu.classList.add('hidden');
        }
      });
    }
  },

  // Scroll-related effects
  ScrollEffects: {
    // Progress bar at the top of the page
    initProgressBar() {
      const progressBar = document.getElementById('progress-bar');
      
      if (!progressBar) return;
      
      const updateProgressBar = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
      };
      
      window.addEventListener('scroll', updateProgressBar);
    },
    
    // Fade-in animations using Intersection Observer
    initAnimations() {
      const animatedElements = document.querySelectorAll('.animate-fadeInUp');
      
      if (animatedElements.length === 0) return;
      
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
  },

  // Project details functionality
  Projects: {
    init() {
      this.initDetailButtons();
      this.initCloseButtons();
    },
    
    initDetailButtons() {
      const detailButtons = document.querySelectorAll('.project-details-btn');
      
      if (detailButtons.length === 0) return;
      
      detailButtons.forEach(button => {
        button.addEventListener('click', function() {
          const detailsId = this.getAttribute('data-project');
          const detailsElement = document.getElementById(detailsId);
          
          if (!detailsElement) return;
          
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
        });
      });
    },
    
    initCloseButtons() {
      const closeButtons = document.querySelectorAll('.project-close-btn');
      
      if (closeButtons.length === 0) return;
      
      closeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const detailsElement = this.closest('[id$="-details"]');
          if (detailsElement) {
            detailsElement.classList.add('hidden');
          }
        });
      });
    }
  },

  // Smooth scrolling for anchor links
  SmoothScroll: {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = anchor.getAttribute('href');
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
    }
  }
};

// Initialize the application
App.init();
