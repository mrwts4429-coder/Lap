// ========== قائمة الموبايل ==========
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

const updateMenuIcon = () => {
    menuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
};

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    updateMenuIcon();
});

menuBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navLinks.classList.toggle('active');
        updateMenuIcon();
    }
});

// إغلاق القائمة عند الضغط على رابط
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        updateMenuIcon();
    });
});

// ========== تمييز الرابط النشط أثناء التمرير ==========
const sections = document.querySelectorAll('section[id]');

const setActiveNavLink = () => {
    let currentId = 'home';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
            currentId = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${currentId}`);
    });
};

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// ========== تأثير الظهور عند التمرير (Reveal) ==========
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== تغيير خلفية الناف بار عند التمرير ==========
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
        nav.style.padding = '10px 0';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        nav.style.padding = '15px 0';
    }
});

// ========== نافذة عرض الصور (Lightbox) ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item img');

// فتح النافذة عند الضغط على أي صورة في المعرض
galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.getAttribute('src');
        lightboxImg.alt = img.getAttribute('alt') || 'صورة';
        document.body.style.overflow = 'hidden'; // منع السكرول لما النافذة مفتوحة
    });
});

// إغلاق النافذة بزر الإغلاق
lightboxClose.addEventListener('click', closeLightbox);

// إغلاق النافذة بالضغط على المساحة الفاضية حوالين الصورة
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// إغلاق النافذة بزر Escape من الكيبورد
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}