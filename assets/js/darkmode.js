/**
 * Dark Mode Toggle Functionality
 * Saves preference to localStorage
 */

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved mode or system preference
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        html.classList.add('dark');
        updateDarkModeIcon(true);
    } else {
        html.classList.remove('dark');
        updateDarkModeIcon(false);
    }
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
            updateDarkModeIcon(isDark);
        });
    }
});

/**
 * Update dark mode icon
 */
function updateDarkModeIcon(isDark) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDark ? '🌞' : '🌙';
        darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

