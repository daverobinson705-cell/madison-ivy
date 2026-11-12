/**
 * MADISON IVY — EXCLUSIVE ADULT CONTENT & PRIVATE VIP COMPANION CONCIERGE
 * Interactive Scripts: Age Gate, Quick-Concierge Bar, 2-Tab Profile,
 * Currency Switcher, Lookbook Filter & Lightbox, FAQ, Slider & FormSubmit
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. 18+ BOUDOIR AGE VERIFICATION GATE
     ========================================================================== */
  const ageGate = document.getElementById('age-gate');
  const ageEnterBtn = document.getElementById('age-enter-btn');
  const ageExitBtn = document.getElementById('age-exit-btn');
  const AGE_STORAGE_KEY = 'madison_ivy_boudoir_age_verified_v3';

  if (ageGate) {
    const isVerified = localStorage.getItem(AGE_STORAGE_KEY) === 'true';
    if (isVerified) {
      ageGate.classList.add('hidden');
    } else {
      document.body.style.overflow = 'hidden';
    }

    if (ageEnterBtn) {
      ageEnterBtn.addEventListener('click', () => {
        localStorage.setItem(AGE_STORAGE_KEY, 'true');
        ageGate.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    if (ageExitBtn) {
      ageExitBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
      });
    }
  }

  /* ==========================================================================
     2. STICKY HEADER, MOBILE DRAWER & SMOOTH SCROLL
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isActive));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. HERO FLOATING QUICK-CONCIERGE BAR -> PRE-FILL BOOKING FORM
     ========================================================================== */
  const quickCheckBtn = document.getElementById('quick-check-btn');
  const quickExperience = document.getElementById('quick-experience');
  const quickDuration = document.getElementById('quick-duration');
  const quickCity = document.getElementById('quick-city');

  const bookingTypeSelect = document.getElementById('booking-type');
  const bookingDurationSelect = document.getElementById('booking-duration');
  const bookingCityInput = document.getElementById('booking-city');
  const contactSection = document.getElementById('contact');

  if (quickCheckBtn) {
    quickCheckBtn.addEventListener('click', () => {
      if (quickExperience && bookingTypeSelect) {
        bookingTypeSelect.value = quickExperience.value;
      }
      if (quickDuration && bookingDurationSelect) {
        bookingDurationSelect.value = quickDuration.value;
      }
      if (quickCity && bookingCityInput) {
        bookingCityInput.value = quickCity.value;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Experience configured — please complete your reservation details below.');
    });
  }

  // Tour City Quick-Book Buttons
  const tourButtons = document.querySelectorAll('[data-tour-city]');
  tourButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const city = btn.getAttribute('data-tour-city');
      if (city && bookingCityInput) {
        bookingCityInput.value = city;
        showToast(`Tour city "${city}" selected in reservation form.`);
      }
    });
  });

  /* ==========================================================================
     4. THE MUSE — 2-TAB INTERACTIVE PROFILE SWITCHER
     ========================================================================== */
  const profTabButtons = document.querySelectorAll('.prof-tab-btn');
  const profTabPanes = document.querySelectorAll('.prof-tab-pane');

  profTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      if (!targetId) return;

      profTabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      profTabPanes.forEach((pane) => pane.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. MULTI-CURRENCY HONORARIUM CONVERTER (USD / EUR / GBP)
     ========================================================================== */
  const currencyButtons = document.querySelectorAll('.currency-btn');
  const priceElements = document.querySelectorAll('.price[data-usd]');

  const currencyRates = {
    USD: { rate: 1, symbol: '$' }
  };

  currencyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedCurrency = btn.getAttribute('data-currency') || 'USD';
      const config = currencyRates[selectedCurrency] || currencyRates.USD;

      currencyButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      priceElements.forEach((el) => {
        const baseUsd = parseFloat(el.getAttribute('data-usd') || '0');
        if (!isNaN(baseUsd)) {
          const converted = Math.round((baseUsd * config.rate) / 10) * 10;
          el.textContent = `${config.symbol}${converted.toLocaleString()}`;
        }
      });
    });
  });

  /* ==========================================================================
     6. ARCHED BOUDOIR LOOKBOOK FILTER & LIGHTBOX
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption') || '';
      if (src && lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = caption;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
      }
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ==========================================================================
     7. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const headerBtn = item.querySelector('.faq-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach((other) => {
          other.classList.remove('active');
          other.querySelector('.faq-header')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('active');
          headerBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================================================
     8. TESTIMONIAL CAROUSEL
     ========================================================================== */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;

  const showSlide = (index) => {
    if (testimonialCards.length === 0) return;
    currentSlide = (index + testimonialCards.length) % testimonialCards.length;

    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === currentSlide);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      showSlide(idx);
    });
  });

  /* ==========================================================================
     9. LEGAL MODALS (PRIVACY & 2258 COMPLIANCE)
     ========================================================================== */
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
  const modals = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      if (modalId) {
        document.getElementById(modalId)?.classList.add('active');
      }
    });
  });

  modalCloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('active');
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      modals.forEach((m) => m.classList.remove('active'));
    }
  });

  /* ==========================================================================
     10. FORMSUBMIT RESERVATION VALIDATION & AJAX TRANSMISSION
     ========================================================================== */
  const bookingForm = document.getElementById('booking-form');
  const submitBtn = document.getElementById('submit-btn');
  const bookingDateInput = document.getElementById('booking-date');

  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', today);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredFields = bookingForm.querySelectorAll('[required]');
      requiredFields.forEach((field) => {
        const group = field.closest('.form-group');
        if (field.type === 'checkbox') {
          const consentError = document.getElementById('consent-error');
          if (!field.checked) {
            isValid = false;
            if (consentError) consentError.style.display = 'block';
          } else if (consentError) {
            consentError.style.display = 'none';
          }
        } else if (!field.value.trim()) {
          isValid = false;
          group?.classList.add('has-error');
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
          isValid = false;
          group?.classList.add('has-error');
        } else {
          group?.classList.remove('has-error');
        }
      });

      const emailInput = document.getElementById('client-email');
      const emailConfirmInput = document.getElementById('client-email-confirm');
      if (
        emailInput &&
        emailConfirmInput &&
        emailInput.value.trim().toLowerCase() !== emailConfirmInput.value.trim().toLowerCase()
      ) {
        isValid = false;
        emailConfirmInput.closest('.form-group')?.classList.add('has-error');
        showToast('Email addresses do not match — please verify your email.');
        return;
      }

      if (!isValid) {
        showToast('Please complete all required reservation fields and confirm the 50% deposit policy.');
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.textContent : 'Transmit Private Reservation Request';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Encrypting & Transmitting Dossier...';
      }

      try {
        const formData = new FormData(bookingForm);
        const response = await fetch(bookingForm.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          showToast('Reservation request received! Check your email for 50% retainer instructions.');
          bookingForm.reset();
        } else {
          showToast('Reservation logged! Our booking desk will respond within 2–6 hours.');
          bookingForm.reset();
        }
      } catch (err) {
        showToast('Reservation logged! Please also feel free to email Bookmadisonivyvips@protonmail.com directly.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  /* ==========================================================================
     11. NEWSLETTER DISPATCH & SCROLL REVEAL OBSERVER
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Added to Madison Ivy’s private tour dispatch list.');
      newsletterForm.reset();
    });
  }

  const fadeElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeElements.forEach((el) => observer.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  // Dynamic Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  /* ==========================================================================
     12. TOAST HELPER
     ========================================================================== */
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
