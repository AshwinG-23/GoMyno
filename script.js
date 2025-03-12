// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const eventSlides = document.querySelectorAll('.event-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');
const teamCategoryBtns = document.querySelectorAll('.team-category-btn');
const teamGroups = document.querySelectorAll('.team-group');

// Sticky Header
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
    
    // Active Link on Scroll
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-bars"></i>' : 
        '<i class="fas fa-times"></i>';
    
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close menu when clicking on a link or outside
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

overlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
});

// Events Slider
let currentSlide = 0;

function showSlide(index) {
    if (index < 0) {
        currentSlide = eventSlides.length - 1;
    } else if (index >= eventSlides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    eventSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    eventSlides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Next and Previous buttons
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Indicators
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const index = parseInt(indicator.getAttribute('data-index'));
        showSlide(index);
    });
});

// Auto slide every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Team Category Toggle
teamCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Toggle active class on buttons
        teamCategoryBtns.forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        // Toggle team groups
        teamGroups.forEach(group => {
            group.classList.remove('active');
        });
        document.getElementById(category).classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Card flip on touch for mobile devices
const teamCards = document.querySelectorAll('.team-card');
        
teamCards.forEach(card => {
    card.addEventListener('touchstart', function() {
        const cardInner = this.querySelector('.card-inner');
        cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 
            'rotateY(0deg)' : 'rotateY(180deg)';
    });
});
