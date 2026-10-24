// =========================================================================
// CONFIGURASI NOMOR WHATSAPP (Ubah nomor di bawah ini sesuai kebutuhan)
// Gunakan kode negara tanpa tanda '+', contoh: '6281234567890'
// =========================================================================
const TELEPHONE_WA = '6287756510552';

document.addEventListener('DOMContentLoaded', () => {
    const displayEl = document.getElementById('displayWaContact');
    if (displayEl && TELEPHONE_WA) {
        const localNumber = TELEPHONE_WA.startsWith('62')
            ? '0' + TELEPHONE_WA.substring(2)
            : TELEPHONE_WA;
        displayEl.innerText = localNumber;
    }
});

// --- HANDLER FORM SUBMIT DIRECT KE WHATSAPP ---
document.getElementById('joinForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const ageErrorAlert = document.getElementById('ageErrorAlert');
    ageErrorAlert.classList.add('hidden');

    const nama = document.getElementById('formNama').value.trim();
    const usiaRaw = document.getElementById('formUsia').value.trim();
    const usia = parseInt(usiaRaw, 10);
    const rtRw = document.getElementById('formRtRw').value.trim();
    const hp = document.getElementById('formHp').value.trim();
    const minat = document.getElementById('formMinat').value;
    const pesan = document.getElementById('formPesan').value.trim();

    if (isNaN(usia) || usia < 18) {
        ageErrorAlert.classList.remove('hidden');
        document.getElementById('formUsia').focus();
        return;
    }

    const rawMessage =
`Halo Pengurus Karang Taruna *Cakra Muda RT 02 / RW 03*,

Saya ingin mendaftarkan diri menjadi anggota baru. Berikut data diri saya:

👤 *Nama Lengkap:* ${nama}
🎂 *Usia:* ${usia} Tahun
🏠 *Domisili RT/RW:* ${rtRw}
📱 *No. WhatsApp/HP:* ${hp}
🎯 *Minat / Bidang:* ${minat}
💬 *Alasan / Harapan:* ${pesan}

Terima kasih! Mohon info arahan selanjutnya.`;

    const encodedMessage = encodeURIComponent(rawMessage);
    const waUrl = `https://api.whatsapp.com/send?phone=${TELEPHONE_WA}&text=${encodedMessage}`;
    window.open(waUrl, '_blank');
});

// --- 1. AMBIENT DRIFT CANVAS PARTICLES ---
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = `rgba(100, 227, 194, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 25), 45);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// --- 2. SCROLL PROGRESS INDICATOR ---
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
});

// --- 3. MOBILE MENU TOGGLE ---
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- 4. GENTLE SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// --- 5. SMOOTH COUNTER UP ---
let countersAnimated = false;
const statsSection = document.getElementById('statsSection');
const counters = document.querySelectorAll('.counter');

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 40;
        const update = () => {
            const count = +counter.innerText;
            const inc = Math.ceil(target / speed);
            if (count < target) {
                counter.innerText = Math.min(count + inc, target);
                setTimeout(update, 35);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
}

const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        startCounters();
    }
}, { threshold: 0.3 });
if (statsSection) counterObserver.observe(statsSection);

// --- 6. FILTER GALERI ---
function filterGallery(category, button) {
    const btns = document.querySelectorAll('.gallery-filter-btn');
    btns.forEach(btn => {
        btn.classList.remove('bg-emerald-500', 'text-[#031915]', 'font-bold');
        btn.classList.add('glass-card', 'text-slate-200');
    });
    button.classList.add('bg-emerald-500', 'text-[#031915]', 'font-bold');
    button.classList.remove('glass-card', 'text-slate-200');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.display = category === 'all' || item.classList.contains(category) ? 'block' : 'none';
    });
}

document.querySelectorAll('.gallery-filter-btn').forEach(button => {
    button.addEventListener('click', () => filterGallery(button.dataset.galleryFilter, button));
});

// --- 7. LIGHTBOX POP-UP ---
function openLightbox(imgUrl, caption) {
    document.getElementById('lightboxImg').src = imgUrl;
    document.getElementById('lightboxCaption').innerText = caption;
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('opacity-100'), 10);
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('opacity-100');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        openLightbox(item.dataset.lightboxSrc, item.dataset.lightboxCaption);
    });
});

const lightboxModal = document.getElementById('lightboxModal');
lightboxModal.addEventListener('click', (event) => {
    if (event.target === lightboxModal || event.target.closest('[data-lightbox-close]')) {
        closeLightbox();
    }
});
