// Sample data for testing - this will be replaced by URL parameters from n8n
const sampleData = {
    scores: {
        function: 3.2,
        trust: 4.1,
        capabilities: 2.8,
        management: 3.7,
        leadership: 3.5
    },
    email: null,
    name: null
};

// Chart configuration
let maturityChart;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Get data from URL parameters or use sample data
    const urlData = getDataFromURL() || sampleData;
    
    // Update scores display
    updateScores(urlData.scores);
    
    // Generate insights
    generateInsights(urlData.scores);
    
    // Create radar chart
    createRadarChart(urlData.scores);
    
    // Handle email form
    setupEmailForm();
});

// Parse URL parameters to get survey results
function getDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (!urlParams.has('scores')) {
        return null; // Use sample data
    }
    
    try {
        const scores = JSON.parse(decodeURIComponent(urlParams.get('scores')));
        return {
            scores: scores,
            email: urlParams.get('email'),
            name: urlParams.get('name')
        };
    } catch (e) {
        console.error('Error parsing URL parameters:', e);
        return null;
    }
}

// Update score displays
function updateScores(scores) {
    document.getElementById('score-function').textContent = scores.function.toFixed(1);
    document.getElementById('score-trust').textContent = scores.trust.toFixed(1);
    document.getElementById('score-capabilities').textContent = scores.capabilities.toFixed(1);
    document.getElementById('score-management').textContent = scores.management.toFixed(1);
    document.getElementById('score-leadership').textContent = scores.leadership.toFixed(1);
}

// Generate personalized insights based on scores
function generateInsights(scores) {
    const categories = {
        function: { name: 'Data Function', score: scores.function },
        trust: { name: 'Trusted Data', score: scores.trust },
        capabilities: { name: 'Capabilities', score: scores.capabilities },
        management: { name: 'Management', score: scores.management },
        leadership: { name: 'Leadership', score: scores.leadership }
    };
    
    // Find lowest and highest scoring categories
    const sortedCategories = Object.entries(categories)
        .sort((a, b) => a[1].score - b[1].score);
    
    const lowestCategory = sortedCategories[0][1];
    const highestCategory = sortedCategories[sortedCategories.length - 1][1];
    const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;
    
    let title, description;
    
    if (averageScore >= 4.0) {
        title = "Strong Data Maturity Foundation";
        description = `Excellent work! Your organization shows strong performance across most areas, with ${highestCategory.name} being your strongest area. Focus on elevating ${lowestCategory.name} to achieve data excellence.`;
    } else if (averageScore >= 3.0) {
        title = "Good Progress with Growth Opportunities";
        description = `Your organization is making good progress in data maturity. ${highestCategory.name} is your strength, while ${lowestCategory.name} presents the biggest opportunity for improvement.`;
    } else {
        title = "Early Stage with High Growth Potential";
        description = `Your organization is in the early stages of data maturity, which means tremendous growth potential. Starting with ${lowestCategory.name} improvements could unlock significant value.`;
    }
    
    document.getElementById('insight-title').textContent = title;
    document.getElementById('insight-description').textContent = description;
}

// Create the radar chart
function createRadarChart(scores) {
    const ctx = document.getElementById('maturityChart').getContext('2d');
    
    maturityChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Data Function',
                'Trusted Data', 
                'Capabilities',
                'Management',
                'Leadership'
            ],
            datasets: [{
                label: 'Your Maturity Level',
                data: [
                    scores.function,
                    scores.trust,
                    scores.capabilities,
                    scores.management,
                    scores.leadership
                ],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 0.8)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    min: 0,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#374151'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.2
                }
            }
        }
    });
}

// Setup email form handling
function setupEmailForm() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (!email) return;
        
        // Here we'll trigger the n8n webhook to send the report
        submitEmailForReport(email);
    });
}

// Submit email to n8n webhook for report delivery
function submitEmailForReport(email) {
    const button = document.querySelector('.email-form button');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Get current scores for the webhook
    const currentScores = {
        function: parseFloat(document.getElementById('score-function').textContent),
        trust: parseFloat(document.getElementById('score-trust').textContent),
        capabilities: parseFloat(document.getElementById('score-capabilities').textContent),
        management: parseFloat(document.getElementById('score-management').textContent),
        leadership: parseFloat(document.getElementById('score-leadership').textContent)
    };
    
    // Prepare data for n8n webhook
    const webhookData = {
        email: email,
        scores: currentScores,
        timestamp: new Date().toISOString(),
        source: 'results-page'
    };
    
    // TODO: Replace with actual n8n webhook URL
    const webhookURL = 'https://your-n8n-instance.com/webhook/report-request';
    
    // For now, simulate the request
    setTimeout(() => {
        // Success feedback
        button.textContent = 'Report Sent! ✓';
        button.style.background = '#10b981';
        
        // Show success message
        alert('Great! Your personalized report is on its way to your inbox. Check your email in the next few minutes.');
        
        // Reset after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            document.getElementById('emailInput').value = '';
        }, 3000);
    }, 2000);
    
    /* Uncomment when n8n webhook is ready:
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
    })
    .then(response => response.json())
    .then(data => {
        button.textContent = 'Report Sent! ✓';
        button.style.background = '#10b981';
        alert('Great! Your personalized report is on its way to your inbox.');
    })
    .catch(error => {
        console.error('Error:', error);
        button.textContent = 'Try Again';
        alert('Something went wrong. Please try again.');
    })
    .finally(() => {
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    });
    */
}

// Utility function to generate shareable URL
function generateShareableURL(scores, email = null, name = null) {
    const baseURL = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    params.append('scores', JSON.stringify(scores));
    if (email) params.append('email', email);
    if (name) params.append('name', name);
    
    return `${baseURL}?${params.toString()}`;
} 