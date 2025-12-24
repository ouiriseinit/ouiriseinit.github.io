window.addEventListener('load', function() {
    const contactButton = document.getElementById('contact-button');
    const form = document.getElementById('form');
    
    contactButton.onclick = () => {
        // This toggles just the 'hidden' class without wiping out other classes
        form.classList.toggle('hidden');
        
        // Smooth scroll to form if it's being shown
        if (!form.classList.contains('hidden')) {
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }
});