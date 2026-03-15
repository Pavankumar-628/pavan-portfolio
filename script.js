
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-target') === id);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function navigateTo(id) {
    showSection(id);
}
document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        showSection(target);
    });
});
document.querySelectorAll('[data-reveal]').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        card.classList.toggle('expanded');
    });
});
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
const themePreview = document.getElementById('themePreview');
const themeThumbs = document.querySelectorAll('.theme-thumb');
function setThemeBackground(theme) {
    if (theme === 'tech') {
        themePreview.style.backgroundImage = "linear-gradient(135deg, rgba(123,47,247,0.6), rgba(0,212,255,0.4)), url('tech-theme.jpg')";
    } else if (theme === 'code') {
        themePreview.style.backgroundImage = "linear-gradient(135deg, rgba(123,47,247,0.6), rgba(0,0,0,0.6)), url('code-theme.jpg')";
    } else if (theme === 'city') {
        themePreview.style.backgroundImage = "linear-gradient(135deg, rgba(123,47,247,0.6), rgba(255,255,255,0.1)), url('city-theme.jpg')";
    } else {
        themePreview.style.backgroundImage = "linear-gradient(135deg, rgba(123,47,247,0.4), rgba(9,9,121,0.4))";
    }
}
themeThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        themeThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const theme = thumb.getAttribute('data-theme');
        setThemeBackground(theme);
    });
});
setThemeBackground('gradient');
const certModalBackdrop = document.getElementById('certModalBackdrop');
const certModalClose = document.getElementById('certModalClose');
const certModalTitle = document.getElementById('certModalTitle');
const certModalIssuer = document.getElementById('certModalIssuer');
const certModalDetails = document.getElementById('certModalDetails');
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        const data = card.getAttribute('data-cert');
        if (!data) return;
        const parsed = JSON.parse(data);
        certModalTitle.textContent = parsed.title || '';
        certModalIssuer.textContent = parsed.issuer ? "Issuer: " + parsed.issuer : '';
        certModalDetails.textContent = parsed.details || '';
        certModalBackdrop.classList.add('active');
    });
});
certModalClose.addEventListener('click', () => {
    certModalBackdrop.classList.remove('active');
});
certModalBackdrop.addEventListener('click', e => {
    if (e.target === certModalBackdrop) {
        certModalBackdrop.classList.remove('active');
    }
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";

    emailjs.sendForm("service_wfpl1qm", "template_ia8cmw8", this)
        .then(() => {
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        })
        .catch(() => {
            formStatus.textContent = "Failed to send message. Try again later.";
        });
});



