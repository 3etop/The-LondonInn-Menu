// London Inn Menu - JS organizado y limpio
// Funciones: filtrado, animación, modal, carrusel, rating

document.addEventListener('DOMContentLoaded', () => {
  // --- Filtrado y animación de tarjetas ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product');
  const menu = document.querySelector('.menu');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      let visibleIndex = 0;
      // Lógica especial para comidas
      if (category === 'comidas') {
        menu.classList.add('comidas-horizontal');
      } else {
        menu.classList.remove('comidas-horizontal');
      }
      products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
          product.style.display = 'block';
          product.style.animation = 'none';
          product.offsetHeight;
          product.style.animation = `fadeInUp 0.7s cubic-bezier(.23,1.02,.32,1) both`;
          product.style.animationDelay = (visibleIndex * 0.08) + 's';
          visibleIndex++;
        } else {
          product.style.display = 'none';
          product.style.animation = 'none';
        }
      });
    });
  });

  // --- Modal para zoom de imágenes ---
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.product img, .carousel-image').forEach(img => {
    img.addEventListener('click', e => {
      imageModal.style.display = 'block';
      modalImage.src = img.src;
      e.stopPropagation();
    });
  });
  closeBtn.addEventListener('click', () => imageModal.style.display = 'none');
  imageModal.addEventListener('click', e => { if (e.target === imageModal) imageModal.style.display = 'none'; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') imageModal.style.display = 'none'; });

  // --- Carrusel de imágenes ---
  document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;
    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      if (images[index]) images[index].classList.add('active');
    }
    if (prevBtn && nextBtn && images.length > 0) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 3000);
    }
  });

  // --- Estrellas de puntuación ---
  document.querySelectorAll('.rating-stars').forEach(starBlock => {
    const productKey = starBlock.getAttribute('data-product');
    const stars = starBlock.querySelectorAll('.star');
    let saved = localStorage.getItem('rating-' + productKey);
    if (saved) fillStars(stars, parseInt(saved));
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const val = parseInt(this.getAttribute('data-value'));
        localStorage.setItem('rating-' + productKey, val);
        fillStars(stars, val);
      });
      star.addEventListener('mouseenter', function() {
        fillStars(stars, parseInt(this.getAttribute('data-value')));
      });
      star.addEventListener('mouseleave', function() {
        let current = localStorage.getItem('rating-' + productKey);
        fillStars(stars, current ? parseInt(current) : 0);
      });
    });
  });
  function fillStars(stars, val) {
    stars.forEach(star => {
      if (parseInt(star.getAttribute('data-value')) <= val) {
        star.classList.add('filled');
      } else {
        star.classList.remove('filled');
      }
    });
  }
});