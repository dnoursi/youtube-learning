const defaultTopics = [
    'tennis',
    'boxing',
    'basketball',
    'cooking',
    'sleep',
    'carpentry',
    'robotics',
    'architectural photography',
    'warren buffet',
    'meditation',
    'olympic weightlifting',
    'the renaissance',
    'human evolution',
    'human anatomy',
    'impressionism',
    'gardening',
    'chess',
    'nutrition',
    'physics',
    'math',
    'writing',
    'macroeconomics',
    'philosophy',
    'architecture history',
    'music theory',
    'dance',
    'DIY',
    'home repair',
    'car maintenance',
    'first aid',
    'off grid living',
    'space exploration'
];

let educationalTopics = [];
let currentTopic = '';

// Education content classifiers to enhance YouTube search
const educationContentClassifiers = [
    'learning',
    'facts',
    'documentary',
    'introduction',
    'explained',
    'guide',
    'for beginners',
    'tutorial',
    'crash course',
    'basics'
];

let currentClassifier = '';

function getRandomClassifier() {
    const idx = Math.floor(Math.random() * educationContentClassifiers.length);
    return educationContentClassifiers[idx];
}

function updateClassifierDisplay() {
    const classifierDiv = document.getElementById('currentClassifier');
    if (classifierDiv) {
        classifierDiv.textContent = `Classifier: "${currentClassifier}"`;
    }
}

function getNewClassifier() {
    let newClassifier;
    do {
        newClassifier = getRandomClassifier();
    } while (educationContentClassifiers.length > 1 && newClassifier === currentClassifier);
    currentClassifier = newClassifier;
    updateClassifierDisplay();
}

// Initialize topics from localStorage or use defaults
function initializeTopics() {
    const savedTopics = localStorage.getItem('youtubeEduTopics');
    if (savedTopics) {
        try {
            educationalTopics = JSON.parse(savedTopics);
        } catch (e) {
            console.error('Error parsing saved topics:', e);
            educationalTopics = [...defaultTopics];
        }
    } else {
        educationalTopics = [...defaultTopics];
    }
}

function saveTopicsToStorage() {
    localStorage.setItem('youtubeEduTopics', JSON.stringify(educationalTopics));
}

function getRandomTopic() {
    if (educationalTopics.length === 0) {
        document.getElementById('currentTopic').textContent = '⚠️ No topics available! Add some topics first.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * educationalTopics.length);
    currentTopic = educationalTopics[randomIndex];
    document.getElementById('currentTopic').textContent = `"${currentTopic}"`;
    // Do not change classifier here
    // Auto-redirect if checkbox is checked
    if (document.getElementById('autoRedirect').checked) {
        setTimeout(() => {
            goToYouTube();
        }, 1500);
    }
}

function goToYouTube() {
    if (!currentTopic) {
        getRandomTopic();
        setTimeout(() => {
            goToYouTube();
        }, 100);
        return;
    }
    // Use the current classifier
    const searchQuery = encodeURIComponent(currentTopic + ' ' + currentClassifier);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    window.open(youtubeUrl, '_blank');
}

// Topic Management Functions
function showTopicManager() {
    document.getElementById('topicModal').style.display = 'block';
    document.getElementById('topicTextarea').value = educationalTopics.join('\n');
    updateTopicCount();
}

function hideTopicManager() {
    document.getElementById('topicModal').style.display = 'none';
}

function updateTopicCount() {
    document.getElementById('topicCount').textContent = educationalTopics.length;
}

function saveTopics() {
    const textarea = document.getElementById('topicTextarea');
    const topics = textarea.value
        .split('\n')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0);
    
    educationalTopics = topics;
    saveTopicsToStorage();
    updateTopicCount();
    
    if (topics.length === 0) {
        alert('⚠️ No topics saved! Your list is empty.');
    } else {
        alert(`✅ Saved ${topics.length} topics successfully!`);
    }
}

function uploadTopics() {
    document.getElementById('fileInput').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const topics = content
            .split('\n')
            .map(topic => topic.trim())
            .filter(topic => topic.length > 0);
        
        document.getElementById('topicTextarea').value = topics.join('\n');
        alert(`📁 Loaded ${topics.length} topics from file. Click "Save Topics" to apply them.`);
    };
    reader.readAsText(file);
}

function downloadTopics() {
    const content = educationalTopics.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube-edu-topics.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function resetToDefaults() {
    if (confirm('🔄 Reset to default topics? This will overwrite your custom topics.')) {
        educationalTopics = [...defaultTopics];
        saveTopicsToStorage();
        document.getElementById('topicTextarea').value = educationalTopics.join('\n');
        updateTopicCount();
        alert('✅ Reset to default topics successfully!');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('topicModal');
    if (event.target === modal) {
        hideTopicManager();
    }
}

// Initialize everything when page loads
initializeTopics();
currentClassifier = getRandomClassifier();
updateClassifierDisplay();
getRandomTopic(); 