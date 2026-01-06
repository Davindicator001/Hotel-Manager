/**
 * Evergreen Grand Hotel - Main JavaScript
 * Version: 1.0.0
 * Author: Evergreen Development Team
 */

document.addEventListener("DOMContentLoaded", () => {
    // ======================================
    // Navigation Menu Toggle
    // ======================================
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")
  
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        menuToggle.setAttribute("aria-expanded", navMenu.classList.contains("active") ? "true" : "false")
      })
  
      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          menuToggle.setAttribute("aria-expanded", "false")
        }
      })
    }
  
    // ======================================
    // Hero Slider
    // ======================================
    const slides = document.querySelectorAll(".slide")
    const prevBtn = document.querySelector(".hero-controls .prev")
    const nextBtn = document.querySelector(".hero-controls .next")
    let currentSlide = 0
    let slideInterval
  
    function showSlide(n) {
      slides.forEach((slide) => slide.classList.remove("active"))
      currentSlide = (n + slides.length) % slides.length
      slides[currentSlide].classList.add("active")
    }
  
    function startSlideshow() {
      slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000)
    }
  
    function stopSlideshow() {
      clearInterval(slideInterval)
    }
  
    if (prevBtn && nextBtn && slides.length > 0) {
      prevBtn.addEventListener("click", () => {
        stopSlideshow()
        showSlide(currentSlide - 1)
        startSlideshow()
      })
  
      nextBtn.addEventListener("click", () => {
        stopSlideshow()
        showSlide(currentSlide + 1)
        startSlideshow()
      })
  
      // Pause slideshow when hovering over slider
      const heroSlider = document.querySelector(".hero-slider")
      if (heroSlider) {
        heroSlider.addEventListener("mouseenter", stopSlideshow)
        heroSlider.addEventListener("mouseleave", startSlideshow)
      }
  
      // Start slideshow if there are multiple slides
      if (slides.length > 1) {
        startSlideshow()
      }
    }
  
    // ======================================
    // Testimonial Slider
    // ======================================
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialPrevBtn = document.querySelector(".testimonial-controls .prev")
    const testimonialNextBtn = document.querySelector(".testimonial-controls .next")
    let currentTestimonial = 0
    let testimonialInterval
  
    function showTestimonial(n) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length
      testimonialSlides[currentTestimonial].classList.add("active")
    }
  
    function startTestimonialSlideshow() {
      testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 6000)
    }
  
    function stopTestimonialSlideshow() {
      clearInterval(testimonialInterval)
    }
  
    if (testimonialPrevBtn && testimonialNextBtn && testimonialSlides.length > 0) {
      testimonialPrevBtn.addEventListener("click", () => {
        stopTestimonialSlideshow()
        showTestimonial(currentTestimonial - 1)
        startTestimonialSlideshow()
      })
  
      testimonialNextBtn.addEventListener("click", () => {
        stopTestimonialSlideshow()
        showTestimonial(currentTestimonial + 1)
        startTestimonialSlideshow()
      })
  
      // Pause slideshow when hovering over slider
      const testimonialSlider = document.querySelector(".testimonial-slider")
      if (testimonialSlider) {
        testimonialSlider.addEventListener("mouseenter", stopTestimonialSlideshow)
        testimonialSlider.addEventListener("mouseleave", startTestimonialSlideshow)
      }
  
      // Start slideshow if there are multiple slides
      if (testimonialSlides.length > 1) {
        startTestimonialSlideshow()
      }
    }
  
    // ======================================
    // Booking Modal
    // ======================================
    const bookNowBtns = document.querySelectorAll(".btn")
    const modal = document.getElementById("booking-modal")
    const closeModal = document.querySelector(".close-modal")
  
    function openModal() {
      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  
        // Set focus to first input in modal for accessibility
        const firstInput = modal.querySelector("input, select, button")
        if (firstInput) {
          firstInput.focus()
        }
      }
    }
  
    function closeModalFunc() {
      if (modal) {
        modal.style.display = "none"
        document.body.style.overflow = "" // Restore scrolling
      }
    }
  
    bookNowBtns.forEach((btn) => {
      if (btn.textContent.includes("Book") || btn.textContent.includes("Reserve")) {
        btn.addEventListener("click", (e) => {
          e.preventDefault()
          openModal()
        })
      }
    })
  
    if (closeModal) {
      closeModal.addEventListener("click", closeModalFunc)
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModalFunc()
      }
    })
  
    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.style.display === "block") {
        closeModalFunc()
      }
    })
  
    // ======================================
    // Cookie Consent
    // ======================================
    const cookieConsent = document.querySelector(".cookie-consent")
    const acceptCookies = document.querySelector(".accept-cookies")
  
    if (cookieConsent && !localStorage.getItem("cookiesAccepted")) {
      setTimeout(() => {
        cookieConsent.style.display = "block"
      }, 2000)
    }
  
    if (acceptCookies) {
      acceptCookies.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true")
        cookieConsent.style.display = "none"
      })
    }
  
    // ======================================
    // Smooth Scrolling
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
  
        if (href !== "#" && href.startsWith("#")) {
          e.preventDefault()
  
          const targetElement = document.querySelector(href)
          if (targetElement) {
            // Offset for fixed header
            const headerOffset = 80
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
  
            // Update URL without page jump
            history.pushState(null, null, href)
          }
        }
      })
    })
  
    // ======================================
    // Scroll to Top Button
    // ======================================
    const scrollTopBtn = document.createElement("button")
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
    scrollTopBtn.className = "scroll-top"
    scrollTopBtn.setAttribute("aria-label", "Scroll to top")
    document.body.appendChild(scrollTopBtn)
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = "flex"
      } else {
        scrollTopBtn.style.display = "none"
      }
    })
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
    function formatDateToYMD(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
    // ======================================
    // Form Validation
    // ======================================
    const bookingForm = document.querySelector(".booking-form")
  
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic validation
        let isValid = true
        const requiredFields = bookingForm.querySelectorAll("[required]")
  
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false
            field.classList.add("error")
          } else {
            field.classList.remove("error")
          }
        })
  
        // Check-in date must be before check-out date
        const checkInDate = new Date(document.getElementById("check-in").value)
        const checkOutDate = new Date(document.getElementById("check-out").value)
  
        if (checkInDate >= checkOutDate) {
          isValid = false
          document.getElementById("check-out").classList.add("error")
          alert("Check-out date must be after check-in date")
        }
        const adults = document.getElementById('adults').value
        const children = document.getElementById('children').value
        const room_type = document.getElementById('room-type').value
        if (isValid) {
          // Here you would normally submit the form or make an API call
          window.location.href = `https://wa.me/2349041606302?text=I+would+like+to+book+a+room+with+the+following+details
          \ncheck-in-date:+${formatDateToYMD(checkInDate)}
          \ncheck-out-date:+${formatDateToYMD(checkOutDate)}
          \nadults:+${adults}
          \nchildren:+${children}
          \nRoom-Type:+${room_type}`
          closeModalFunc()
          bookingForm.reset()
        }
      })
    }
  
    // ======================================
    // Newsletter Form
    // ======================================
    const newsletterForm = document.querySelector(".newsletter-form")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const emailInput = newsletterForm.querySelector("input[type='email']")
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
        if (emailInput && emailPattern.test(emailInput.value)) {
          // Here you would normally submit the form or make an API call
          alert("Thank you for subscribing to our newsletter!")
          newsletterForm.reset()
        } else if (emailInput) {
          emailInput.classList.add("error")
          alert("Please enter a valid email address")
        }
      })
    }
  
    // ======================================
    // Sticky Navigation
    // ======================================
    const nav = document.querySelector("nav")
    const headerHeight = document.querySelector(".header-top")?.offsetHeight || 0
  
    function handleScroll() {
      if (window.scrollY > headerHeight) {
        nav.classList.add("sticky")
      } else {
        nav.classList.remove("sticky")
      }
    }
  
    if (nav) {
      window.addEventListener("scroll", handleScroll)
      // Call once on page load
      handleScroll()
    }
  
    // ======================================
    // Image Lazy Loading
    // ======================================
    if ("loading" in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img[loading="lazy"]')
      images.forEach((img) => {
        img.src = img.dataset.src
      })
    } else {
      // Fallback for browsers that don't support lazy loading
      const lazyImages = document.querySelectorAll("img[data-src]")
  
      if (lazyImages.length > 0) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target
              lazyImage.src = lazyImage.dataset.src
              lazyImageObserver.unobserve(lazyImage)
            }
          })
        })
  
        lazyImages.forEach((lazyImage) => {
          lazyImageObserver.observe(lazyImage)
        })
      }
    }
  
    // ======================================
    // Animations on Scroll
    // ======================================
    const animatedElements = document.querySelectorAll(".fade-in, .slide-up, .slide-in")
  
    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animated")
              animationObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
  
      animatedElements.forEach((element) => {
        animationObserver.observe(element)
      })
    } else {
      // Fallback for browsers without IntersectionObserver
      animatedElements.forEach((element) => {
        element.classList.add("animated")
      })
    }
  
    console.log("Evergreen Grand Hotel - Scripts initialized successfully")
  })
  
