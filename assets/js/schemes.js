/**
 * Health Schemes Eligibility Checker
 * Rule-based eligibility calculation
 */

// Scheme definitions
const schemes = {
    pmjay: {
        id: 'pmjay',
        name: 'Ayushman Bharat / PM-JAY',
        description: 'Free health insurance coverage up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
        icon: 'fas fa-shield-alt',
        color: 'blue'
    },
    jsy: {
        id: 'jsy',
        name: 'Janani Suraksha Yojana (JSY)',
        description: 'Cash assistance scheme for pregnant women and institutional deliveries to reduce maternal and infant mortality.',
        icon: 'fas fa-baby',
        color: 'pink'
    },
    indradhanush: {
        id: 'indradhanush',
        name: 'Mission Indradhanush',
        description: 'Universal child vaccination scheme ensuring full immunization coverage for children and pregnant women.',
        icon: 'fas fa-syringe',
        color: 'green'
    },
    abdm: {
        id: 'abdm',
        name: 'Digital Health Mission (ABDM)',
        description: 'Digital Health ID and linked health records for all citizens. Access your health records anytime, anywhere.',
        icon: 'fas fa-id-card',
        color: 'purple'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const eligibilityForm = document.getElementById('eligibilityForm');
    
    if (eligibilityForm) {
        eligibilityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            checkEligibility();
        });
    }
});

/**
 * Check eligibility based on form data
 */
function checkEligibility() {
    // Get form values
    const age = parseInt(document.getElementById('age').value) || 0;
    const gender = document.getElementById('gender').value;
    const income = document.getElementById('income').value;
    const location = document.getElementById('location').value;
    const pregnant = document.getElementById('pregnant').value;
    const disability = document.getElementById('disability').value;
    const chronicDiseases = Array.from(document.querySelectorAll('input[name="chronicDiseases"]:checked')).map(cb => cb.value);
    
    // Validate required fields
    if (!age || !gender || !income || !location) {
        showError('Please fill in all required fields (Age, Gender, Income, Location).');
        return;
    }
    
    const eligibleSchemes = [];
    
    // Rule 1: PM-JAY - Low income families (BPL or low income)
    if ((income === 'bpl' || income === 'low') && age >= 0) {
        eligibleSchemes.push('pmjay');
    }
    
    // Rule 2: JSY - Pregnant women, especially BPL/low income
    if (pregnant === 'yes' && gender === 'female' && (income === 'bpl' || income === 'low' || income === 'medium')) {
        eligibleSchemes.push('jsy');
    }
    
    // Rule 3: Mission Indradhanush - Children (0-5 years) and pregnant women
    if ((age >= 0 && age <= 5) || (pregnant === 'yes' && age >= 18)) {
        eligibleSchemes.push('indradhanush');
    }
    
    // Rule 4: ABDM - Available for all citizens
    if (age >= 0) {
        eligibleSchemes.push('abdm');
    }
    
    // Display results
    displayResults(eligibleSchemes);
}

/**
 * Display eligible schemes
 */
function displayResults(eligibleSchemeIds) {
    const resultsContainer = document.getElementById('eligibilityResults');
    if (!resultsContainer) return;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (eligibleSchemeIds.length === 0) {
        resultsContainer.innerHTML = `
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center fade-in">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 dark:text-gray-400 text-lg mb-2">No schemes found</p>
                <p class="text-gray-500 dark:text-gray-500 text-sm">Based on your information, you may not be eligible for the listed schemes at this time.</p>
                <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">Please contact your local health center for more information.</p>
            </div>
        `;
        return;
    }
    
    // Create result cards
    eligibleSchemeIds.forEach((schemeId, index) => {
        const scheme = schemes[schemeId];
        if (!scheme) return;
        
        const colorClasses = {
            blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
            pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
            green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
            purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
        };
        
        const iconColors = {
            blue: 'text-blue-600 dark:text-blue-400',
            pink: 'text-pink-600 dark:text-pink-400',
            green: 'text-green-600 dark:text-green-400',
            purple: 'text-purple-600 dark:text-purple-400'
        };
        
        const card = document.createElement('div');
        card.className = `scheme-result-card border-2 rounded-2xl p-6 mb-4 ${colorClasses[scheme.color]} fade-in`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="text-4xl ${iconColors[scheme.color]} flex-shrink-0">
                    <i class="${scheme.icon}"></i>
                </div>
                <div class="flex-1">
                    <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">${scheme.name}</h4>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${scheme.description}</p>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-check-circle text-green-500"></i>
                        <span class="text-sm font-semibold text-green-600 dark:text-green-400">You are eligible!</span>
                    </div>
                </div>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Show error message
 */
function showError(message) {
    const resultsContainer = document.getElementById('eligibilityResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 fade-in">
            <div class="flex items-center space-x-3">
                <i class="fas fa-exclamation-circle text-red-500 text-2xl"></i>
                <p class="text-red-700 dark:text-red-400">${message}</p>
            </div>
        </div>
    `;
}

