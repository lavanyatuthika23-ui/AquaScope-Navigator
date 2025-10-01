// Enhanced AquaScope Navigator Application
class AquaScopeApp {
    constructor() {
        this.currentLanguage = 'en';
        this.currentTheme = 'auto';
        this.isListening = false;
        this.recognition = null;
        this.charts = {};
        
        // Application data
        this.data = {
            marineStations: [
                {"name": "Mumbai High", "lat": 19.0760, "lng": 72.8777, "type": "Coastal", "temperature": 24.5, "salinity": 35.2, "windSpeed": 15, "waveHeight": 2.3},
                {"name": "Kochi", "lat": 9.9312, "lng": 76.2673, "type": "Port", "temperature": 26.1, "salinity": 34.8, "windSpeed": 12, "waveHeight": 1.8},
                {"name": "Chennai", "lat": 13.0827, "lng": 80.2707, "type": "Coastal", "temperature": 25.3, "salinity": 35.0, "windSpeed": 18, "waveHeight": 2.7},
                {"name": "Visakhapatnam", "lat": 17.6868, "lng": 83.2185, "type": "Port", "temperature": 24.8, "salinity": 34.9, "windSpeed": 14, "waveHeight": 2.1},
                {"name": "RAMA Buoy", "lat": 15.0, "lng": 90.0, "type": "Deep Sea", "temperature": 23.9, "salinity": 35.5, "windSpeed": 20, "waveHeight": 3.2}
            ],
            fishSpecies: [
                {"name": "Pomfret", "scientificName": "Pampus argenteus", "habitat": "Coastal waters", "bestSeason": "October-March"},
                {"name": "Mackerel", "scientificName": "Rastrelliger kanagurta", "habitat": "Open ocean", "bestSeason": "June-September"},
                {"name": "Sardine", "scientificName": "Sardinella longiceps", "habitat": "Coastal waters", "bestSeason": "August-February"},
                {"name": "Tuna", "scientificName": "Thunnus albacares", "habitat": "Deep sea", "bestSeason": "November-April"}
            ],
            weatherForecast: [
                {"date": "2025-09-29", "condition": "Partly Cloudy", "windSpeed": 15, "waveHeight": 2.1, "visibility": "Good"},
                {"date": "2025-09-30", "condition": "Clear", "windSpeed": 12, "waveHeight": 1.8, "visibility": "Excellent"},
                {"date": "2025-10-01", "condition": "Light Rain", "windSpeed": 18, "waveHeight": 2.5, "visibility": "Moderate"},
                {"date": "2025-10-02", "condition": "Clear", "windSpeed": 14, "waveHeight": 2.0, "visibility": "Good"},
                {"date": "2025-10-03", "condition": "Partly Cloudy", "windSpeed": 16, "waveHeight": 2.3, "visibility": "Good"},
                {"date": "2025-10-04", "condition": "Light Rain", "windSpeed": 20, "waveHeight": 2.8, "visibility": "Moderate"},
                {"date": "2025-10-05", "condition": "Clear", "windSpeed": 13, "waveHeight": 1.9, "visibility": "Excellent"}
            ],
            safetyAlerts: [
                {"type": "Weather Warning", "message": "Moderate waves expected in Bay of Bengal", "severity": "Medium"},
                {"type": "Navigation Alert", "message": "Fishing prohibited in restricted zone near Kalpakkam", "severity": "High"}
            ],
            translations: {
                "en": {
                    "welcome": "Welcome to AquaScope Navigator - Your AI Marine Assistant", 
                    "voicePrompt": "Speak your query or type below"
                },
                "te": {
                    "welcome": "AquaScope Navigator కు స్వాగతం - మీ AI సముద్ర సహాయకుడు", 
                    "voicePrompt": "మీ ప్రశ్న చెప్పండి లేదా క్రింద టైప్ చేయండి"
                },
                "hi": {
                    "welcome": "AquaScope Navigator में आपका स्वागत है - आपका AI समुद्री सहायक", 
                    "voicePrompt": "अपना प्रश्न बोलें या नीचे टाइप करें"
                },
                "ta": {
                    "welcome": "AquaScope Navigator-ல் உங்களை வரவேற்கிறோம்", 
                    "voicePrompt": "உங்கள் கேள்வியை பேசுங்கள் அல்லது கீழே உள்ளிடவும்"
                },
                "kn": {
                    "welcome": "AquaScope Navigator ಗೆ ಸ್ವಾಗತ", 
                    "voicePrompt": "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಮಾತನಾಡಿ ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ"
                },
                "ml": {
                    "welcome": "AquaScope Navigator-ലേക്ക് സ്വാഗതം", 
                    "voicePrompt": "നിങ്ങളുടെ ചോദ്യം പറയുക അല്ലെങ്കിൽ കീഴെ ടൈപ്പ് ചെയ്യുക"
                }
            }
        };

        this.suggestions = [
            "What's the weather forecast for fishing?",
            "Show me nearby marine stations",
            "Which fish species are best this season?",
            "Are there any safety alerts?",
            "What are the water conditions?",
            "Best fishing zones near Mumbai",
            "Current wave height information",
            "Salinity levels in coastal areas"
        ];

        this.init();
    }

    async init() {
        this.showLoadingScreen();
        await this.simulateLoading();
        this.hideLoadingScreen();
        this.setupEventListeners();
        this.setupVoiceRecognition();
        this.initializeCharts();
        this.setupParticles();
        this.renderMarineStations();
        this.renderFishDatabase();
        this.renderWeatherForecast();
        this.renderSafetyAlerts();
        this.setupTheme();
        this.updateLanguage();
        this.setupMapClickHandler();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.remove('hidden');
    }

    async simulateLoading() {
        // Simulate loading time with realistic delays
        const stages = [
            "Connecting to marine stations...",
            "Loading weather data...",
            "Initializing AI systems...",
            "Preparing user interface..."
        ];
        
        const loadingText = document.querySelector('.loading-text p');
        
        for (let i = 0; i < stages.length; i++) {
            loadingText.textContent = stages[i];
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language dropdown
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });

        // Close language dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.add('hidden');
        });

        // Language options
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const newLang = e.currentTarget.dataset.lang;
                this.currentLanguage = newLang;
                this.updateLanguage();
                languageDropdown.classList.add('hidden');
            });
        });

        // Settings language select
        document.getElementById('settingsLanguage')?.addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.updateLanguage();
        });

        // Sign In button
        document.getElementById('signInBtn').addEventListener('click', () => {
            this.openModal('signInModal');
        });

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openModal('settingsModal');
        });

        // Voice assistant
        document.getElementById('voiceBtn').addEventListener('click', () => {
            this.toggleVoiceRecognition();
        });

        // Chat
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        document.getElementById('chatInput').addEventListener('input', (e) => {
            this.showSuggestions(e.target.value);
        });

        // Fish image upload
        document.getElementById('fishImageInput').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Drag and drop for fish identification
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.processImageFile(files[0]);
            }
        });

        // Map controls
        document.getElementById('toggleStations')?.addEventListener('click', () => {
            this.toggleMapLayer('stations');
        });

        document.getElementById('toggleFishZones')?.addEventListener('click', () => {
            this.toggleMapLayer('fishZones');
        });

        document.getElementById('toggleWeather')?.addEventListener('click', () => {
            this.toggleMapLayer('weather');
        });

        // Settings form controls
        document.getElementById('themeSelect')?.addEventListener('change', (e) => {
            this.setTheme(e.target.value);
        });

        document.getElementById('highContrast')?.addEventListener('change', (e) => {
            this.toggleHighContrast(e.target.checked);
        });

        document.getElementById('reduceMotion')?.addEventListener('change', (e) => {
            this.toggleReducedMotion(e.target.checked);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchSection('dashboard');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchSection('voice-assistant');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchSection('marine-map');
                        break;
                    case '4':
                        e.preventDefault();
                        this.switchSection('fish-id');
                        break;
                    case '5':
                        e.preventDefault();
                        this.switchSection('weather');
                        break;
                }
            }
        });
    }

    setupMapClickHandler() {
        const mapCanvas = document.getElementById('marineMapDisplay');
        if (mapCanvas) {
            mapCanvas.addEventListener('click', () => {
                // Open INCOIS Ocean Observing Network map in new tab
                window.open('https://incois.gov.in/OON/index.jsp', '_blank');
                this.showNotification('Opening INCOIS Ocean Observing Network map...', 'info');
            });
        }
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // Show notification
        this.showNotification(`Switched to ${sectionName.replace('-', ' ')} section`, 'info');
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = this.getVoiceLang();

            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceUI();
                this.showNotification('Listening... Speak now', 'info');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.processVoiceCommand(transcript);
            };

            this.recognition.onerror = (event) => {
                this.showNotification('Voice recognition error: ' + event.error, 'error');
                this.isListening = false;
                this.updateVoiceUI();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceUI();
            };
        } else {
            this.showNotification('Voice recognition not supported in this browser', 'warning');
        }
    }

    getVoiceLang() {
        const langMap = {
            'te': 'te-IN',
            'hi': 'hi-IN',
            'ta': 'ta-IN',
            'kn': 'kn-IN',
            'ml': 'ml-IN',
            'en': 'en-US'
        };
        return langMap[this.currentLanguage] || 'en-US';
    }

    toggleVoiceRecognition() {
        if (!this.recognition) return;

        if (this.isListening) {
            this.recognition.stop();
        } else {
            // Update language before starting
            this.recognition.lang = this.getVoiceLang();
            this.recognition.start();
        }
    }

    updateVoiceUI() {
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceCircle = document.querySelector('.voice-circle');
        const voiceIcon = voiceBtn.querySelector('i');
        const voiceText = voiceBtn.querySelector('span');

        if (this.isListening) {
            voiceBtn.classList.add('listening');
            voiceCircle.classList.add('listening');
            voiceIcon.className = 'fas fa-stop';
            voiceText.textContent = 'Stop Listening';
        } else {
            voiceBtn.classList.remove('listening');
            voiceCircle.classList.remove('listening');
            voiceIcon.className = 'fas fa-microphone';
            voiceText.textContent = 'Start Voice Command';
        }
    }

   async processVoiceCommand(transcript) {
  this.addMessage(transcript, "user");
  try {
    const res = await fetch("https://sih-1-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: transcript })
    });
    const data = await res.json();
    this.addMessage(data.reply, "assistant");

    // 🔊 Speak the reply aloud ONLY for voice input
    if (data.reply) {
      // Cancel any ongoing speech before starting new
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(data.reply);
      utterance.lang = this.getVoiceLang(); // use your language mapping
      speechSynthesis.speak(utterance);
    }
  } catch (err) {
    this.addMessage("Error connecting to AI service", "assistant");
  }
}


    generateAIResponse(input) {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('weather') || lowerInput.includes('forecast')) {
            return "Current marine weather shows partly cloudy conditions with moderate waves. Wind speed is 15 knots with good visibility. The 7-day forecast indicates favorable fishing conditions for the next 3 days.";
        } else if (lowerInput.includes('fish') || lowerInput.includes('fishing')) {
            return "Based on current season and conditions, Pomfret and Sardine are active in coastal waters. Best fishing times are early morning (5-8 AM) and evening (6-8 PM). Water temperature is optimal at 24.5°C.";
        } else if (lowerInput.includes('safety') || lowerInput.includes('alert')) {
            return "Current safety status: Moderate wave warning in Bay of Bengal. Navigation alert for restricted zone near Kalpakkam. All other areas are safe for fishing activities.";
        } else if (lowerInput.includes('station') || lowerInput.includes('location')) {
            return "5 marine stations are currently active: Mumbai High, Kochi, Chennai, Visakhapatnam, and RAMA Buoy. All stations reporting normal conditions with real-time data updates.";
        } else if (lowerInput.includes('salinity') || lowerInput.includes('water')) {
            return "Current salinity levels are optimal at 35.1 PSU average. Water temperature ranges from 23.9°C to 26.1°C across different stations. Conditions are favorable for marine life.";
        } else {
            return "I understand you're asking about marine conditions. I can help you with weather forecasts, fish locations, safety alerts, water conditions, and navigation assistance. What specific information would you like?";
        }
    }

    showSuggestions(input) {
        const suggestionsDiv = document.getElementById('inputSuggestions');
        
        if (input.length < 2) {
            suggestionsDiv.classList.remove('show');
            return;
        }

        const filteredSuggestions = this.suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(input.toLowerCase())
        );

        if (filteredSuggestions.length > 0) {
            suggestionsDiv.innerHTML = filteredSuggestions
                .slice(0, 5)
                .map(suggestion => 
                    `<div class="suggestion-item" onclick="app.selectSuggestion('${suggestion}')">${suggestion}</div>`
                ).join('');
            suggestionsDiv.classList.add('show');
        } else {
            suggestionsDiv.classList.remove('show');
        }
    }

    selectSuggestion(suggestion) {
        document.getElementById('chatInput').value = suggestion;
        document.getElementById('inputSuggestions').classList.remove('show');
        this.sendMessage();
    }
async sendMessage() {
  const input = this.inputField.value.trim();
  if (!input) return;

  this.addMessage(input, "user");
  this.inputField.value = "";

  try {
    const res = await fetch("https://sih-1-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    if (data.reply) {
      this.addMessage(data.reply, "assistant");
    } else if (data.error) {
      this.addMessage("⚠️ Error: " + (data.error.message || "Unknown error"), "assistant");
    } else {
      this.addMessage("⚠️ Unexpected response from server", "assistant");
      console.log("Unexpected response:", data);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    this.addMessage("⚠️ Could not reach server", "assistant");
  }
}



    addMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    initializeCharts() {
        this.createMarineChart();
        this.createStationChart();
    }

    createMarineChart() {
        const ctx = document.getElementById('marineChart').getContext('2d');
        
        // Generate sample data for the last 7 days
        const labels = [];
        const temperatureData = [];
        const waveHeightData = [];
        const windSpeedData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            temperatureData.push(22 + Math.random() * 8);
            waveHeightData.push(1.5 + Math.random() * 2);
            windSpeedData.push(10 + Math.random() * 15);
        }

        this.charts.marineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatureData,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Wave Height (m)',
                    data: waveHeightData,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Wind Speed (kt)',
                    data: windSpeedData,
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createStationChart() {
        const ctx = document.getElementById('stationChart').getContext('2d');
        
        const stationTypes = {};
        this.data.marineStations.forEach(station => {
            stationTypes[station.type] = (stationTypes[station.type] || 0) + 1;
        });

        this.charts.stationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(stationTypes),
                datasets: [{
                    data: Object.values(stationTypes),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    setupParticles() {
        const canvas = document.getElementById('particleCanvas');
        const particles = [];
        
        // Create particle elements
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(31, 184, 205, ${Math.random() * 0.5 + 0.2})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationName = 'particleFloat';
            particle.style.animationIterationCount = 'infinite';
            particle.style.animationTimingFunction = 'linear';
            
            canvas.appendChild(particle);
            particles.push(particle);
        }
    }

    renderMarineStations() {
        const stationsList = document.getElementById('stationsList');
        const mapStations = document.getElementById('mapStations');
        
        stationsList.innerHTML = '';
        mapStations.innerHTML = '';

        this.data.marineStations.forEach((station, index) => {
            // Station list item
            const stationItem = document.createElement('div');
            stationItem.className = 'station-item';
            stationItem.innerHTML = `
                <h5>${station.name}</h5>
                <p>${station.type} Station</p>
                <p>Temp: ${station.temperature}°C | Wind: ${station.windSpeed}kt</p>
            `;
            stationsList.appendChild(stationItem);

            // Map marker
            const marker = document.createElement('div');
            marker.className = `station-marker ${station.type.toLowerCase().replace(' ', '-')}`;
            marker.style.left = (30 + (index * 15)) + '%';
            marker.style.top = (20 + (index * 12)) + '%';
            marker.title = `${station.name} - ${station.type}`;
            
            marker.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering map click
                this.showStationDetails(station);
            });
            
            mapStations.appendChild(marker);
        });
    }

    showStationDetails(station) {
        this.showNotification(`${station.name}: ${station.temperature}°C, ${station.windSpeed}kt wind, ${station.waveHeight}m waves`, 'info');
    }

    renderFishDatabase() {
        const fishGrid = document.getElementById('fishGrid');
        fishGrid.innerHTML = '';

        this.data.fishSpecies.forEach(fish => {
            const fishCard = document.createElement('div');
            fishCard.className = 'fish-card';
            fishCard.innerHTML = `
                <h5>${fish.name}</h5>
                <p class="scientific-name">${fish.scientificName}</p>
                <p><strong>Habitat:</strong> ${fish.habitat}</p>
                <p><strong>Season:</strong> ${fish.bestSeason}</p>
            `;
            
            fishCard.addEventListener('click', () => {
                this.showFishDetails(fish);
            });
            
            fishGrid.appendChild(fishCard);
        });
    }

    showFishDetails(fish) {
        this.showNotification(`${fish.name}: Best found in ${fish.habitat} during ${fish.bestSeason}`, 'info');
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.processImageFile(file);
        }
    }

    processImageFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.displayImagePreview(e.target.result);
            this.simulateImageAnalysis();
        };
        reader.readAsDataURL(file);
    }

    displayImagePreview(src) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = `<img src="${src}" alt="Fish Image Preview">`;
    }

    simulateImageAnalysis() {
        const results = document.getElementById('identificationResults');
        results.innerHTML = `
            <h4>Identification Results</h4>
            <div class="analysis-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Analyzing image with AI...</p>
            </div>
        `;

        // Simulate analysis time
        setTimeout(() => {
            const randomFish = this.data.fishSpecies[Math.floor(Math.random() * this.data.fishSpecies.length)];
            const confidence = Math.floor(Math.random() * 30) + 70; // 70-99% confidence
            
            results.innerHTML = `
                <h4>Identification Results</h4>
                <div class="identification-result">
                    <div class="result-header">
                        <h5>${randomFish.name}</h5>
                        <span class="confidence">${confidence}% confidence</span>
                    </div>
                    <p class="scientific-name">${randomFish.scientificName}</p>
                    <div class="fish-info">
                        <p><strong>Habitat:</strong> ${randomFish.habitat}</p>
                        <p><strong>Best Season:</strong> ${randomFish.bestSeason}</p>
                        <p><strong>Status:</strong> Commonly found in Indian waters</p>
                    </div>
                    <div class="result-actions">
                        <button class="btn btn--primary btn--sm" onclick="app.showFishingRecommendation('${randomFish.name}')">
                            Get Fishing Tips
                        </button>
                    </div>
                </div>
            `;
        }, 2000);
    }

    showFishingRecommendation(fishName) {
        const recommendations = {
            'Pomfret': 'Use small hooks with live bait. Best during high tide in depths of 20-40 meters.',
            'Mackerel': 'Try spinning lures or small jigs. Active in surface waters during early morning.',
            'Sardine': 'Use fine mesh nets or small hooks with bread bait. Found in large schools.',
            'Tuna': 'Requires deep sea fishing with heavy tackle. Use large lures and strong lines.'
        };

        const recommendation = recommendations[fishName] || 'No specific recommendations available for this species.';
        this.showNotification(`${fishName} Fishing Tip: ${recommendation}`, 'success');
    }

    renderWeatherForecast() {
        const forecastGrid = document.getElementById('forecastGrid');
        const recommendationCards = document.getElementById('recommendationCards');
        
        forecastGrid.innerHTML = '';
        
        this.data.weatherForecast.forEach((forecast, index) => {
            const date = new Date(forecast.date);
            const isToday = index === 0;
            
            const forecastCard = document.createElement('div');
            forecastCard.className = `forecast-card ${isToday ? 'today' : ''}`;
            
            const weatherIcon = this.getWeatherIcon(forecast.condition);
            
            forecastCard.innerHTML = `
                <div class="forecast-date">
                    <h5>${isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}</h5>
                    <p>${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div class="forecast-icon">
                    <i class="${weatherIcon}"></i>
                </div>
                <div class="forecast-condition">
                    <p>${forecast.condition}</p>
                </div>
                <div class="forecast-details">
                    <small><i class="fas fa-wind"></i> ${forecast.windSpeed}kt</small>
                    <small><i class="fas fa-water"></i> ${forecast.waveHeight}m</small>
                </div>
            `;
            
            forecastGrid.appendChild(forecastCard);
        });

        // Generate fishing recommendations
        recommendationCards.innerHTML = `
            <div class="recommendation-card excellent">
                <div class="rec-header">
                    <i class="fas fa-star"></i>
                    <h5>Excellent Fishing Conditions</h5>
                </div>
                <p>Next 2 days show perfect conditions with calm seas and good visibility. Ideal for offshore fishing.</p>
                <div class="rec-details">
                    <span>Best time: 5:30 AM - 8:00 AM</span>
                </div>
            </div>
            <div class="recommendation-card good">
                <div class="rec-header">
                    <i class="fas fa-thumbs-up"></i>
                    <h5>Favorable Conditions</h5>
                </div>
                <p>Moderate conditions expected mid-week. Good for coastal fishing with proper safety measures.</p>
                <div class="rec-details">
                    <span>Recommended areas: Coastal zones</span>
                </div>
            </div>
            <div class="recommendation-card caution">
                <div class="rec-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h5>Exercise Caution</h5>
                </div>
                <p>Higher waves expected towards weekend. Experienced fishermen only for deep sea fishing.</p>
                <div class="rec-details">
                    <span>Wave height: Up to 2.8m</span>
                </div>
            </div>
        `;
    }

    getWeatherIcon(condition) {
        const icons = {
            'Clear': 'fas fa-sun',
            'Partly Cloudy': 'fas fa-cloud-sun',
            'Cloudy': 'fas fa-cloud',
            'Light Rain': 'fas fa-cloud-rain',
            'Rain': 'fas fa-cloud-showers-heavy',
            'Storm': 'fas fa-thunderstorm'
        };
        return icons[condition] || 'fas fa-cloud';
    }

    renderSafetyAlerts() {
        const alertsContainer = document.getElementById('alertsContainer');
        alertsContainer.innerHTML = '';

        this.data.safetyAlerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item ${alert.severity.toLowerCase()}`;
            
            const alertIcon = this.getAlertIcon(alert.type, alert.severity);
            
            alertItem.innerHTML = `
                <div class="alert-icon">
                    <i class="${alertIcon}"></i>
                </div>
                <div class="alert-content">
                    <h5>${alert.type}</h5>
                    <p>${alert.message}</p>
                </div>
            `;
            
            alertsContainer.appendChild(alertItem);
        });
    }

    getAlertIcon(type, severity) {
        if (type.includes('Weather')) return 'fas fa-cloud-bolt';
        if (type.includes('Navigation')) return 'fas fa-route';
        if (severity === 'High') return 'fas fa-exclamation-triangle';
        return 'fas fa-info-circle';
    }

    toggleMapLayer(layer) {
        this.showNotification(`Toggled ${layer} layer on map`, 'info');
        
        // Simulate layer toggle
        const button = document.getElementById(`toggle${layer.charAt(0).toUpperCase() + layer.slice(1)}`);
        button.classList.toggle('btn--primary');
        button.classList.toggle('btn--outline');
    }

    toggleTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        if (html.getAttribute('data-color-scheme') === 'dark') {
            html.setAttribute('data-color-scheme', 'light');
            icon.className = 'fas fa-moon';
            this.currentTheme = 'light';
            this.showNotification('Switched to light theme', 'info');
        } else {
            html.setAttribute('data-color-scheme', 'dark');
            icon.className = 'fas fa-sun';
            this.currentTheme = 'dark';
            this.showNotification('Switched to dark theme', 'info');
        }
    }

    setTheme(theme) {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        this.currentTheme = theme;
        
        if (theme === 'dark') {
            html.setAttribute('data-color-scheme', 'dark');
            icon.className = 'fas fa-sun';
        } else if (theme === 'light') {
            html.setAttribute('data-color-scheme', 'light');
            icon.className = 'fas fa-moon';
        } else {
            html.removeAttribute('data-color-scheme');
            icon.className = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        this.showNotification(`Theme set to ${theme}`, 'info');
    }

    toggleHighContrast(enabled) {
        if (enabled) {
            document.body.classList.add('high-contrast');
            this.showNotification('High contrast mode enabled', 'info');
        } else {
            document.body.classList.remove('high-contrast');
            this.showNotification('High contrast mode disabled', 'info');
        }
    }

    toggleReducedMotion(enabled) {
        if (enabled) {
            document.body.classList.add('reduce-motion');
            this.showNotification('Reduced motion enabled', 'info');
        } else {
            document.body.classList.remove('reduce-motion');
            this.showNotification('Reduced motion disabled', 'info');
        }
    }

    setupTheme() {
        // Set initial theme based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            document.getElementById('themeToggle').querySelector('i').className = 'fas fa-sun';
        }
    }

    updateLanguage() {
        const translations = this.data.translations[this.currentLanguage];
        
        if (translations) {
            document.getElementById('welcomeText').textContent = translations.welcome;
            document.getElementById('voicePrompt').textContent = translations.voicePrompt;
        }

        // Update voice recognition language
        if (this.recognition) {
            this.recognition.lang = this.getVoiceLang();
        }

        // Update settings language dropdown
        const settingsLanguage = document.getElementById('settingsLanguage');
        if (settingsLanguage) {
            settingsLanguage.value = this.currentLanguage;
        }

        this.showNotification(`Language changed to ${this.currentLanguage.toUpperCase()}`, 'success');
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    saveSettings() {
        // Get settings values
        const themeSelect = document.getElementById('themeSelect');
        const languageSelect = document.getElementById('settingsLanguage');
        const highContrast = document.getElementById('highContrast');
        const reduceMotion = document.getElementById('reduceMotion');

        // Apply settings
        if (themeSelect) this.setTheme(themeSelect.value);
        if (languageSelect && languageSelect.value !== this.currentLanguage) {
            this.currentLanguage = languageSelect.value;
            this.updateLanguage();
        }
        if (highContrast) this.toggleHighContrast(highContrast.checked);
        if (reduceMotion) this.toggleReducedMotion(reduceMotion.checked);

        this.showNotification('Settings saved successfully', 'success');
        this.closeModal('settingsModal');
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Global functions for event handlers
function closeModal(modalId) {
    app.closeModal(modalId);
}

function saveSettings() {
    app.saveSettings();
}

function handleSignIn() {
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    
    if (!email || !password) {
        app.showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate sign in process
    app.showNotification('Signing in...', 'info');
    
    setTimeout(() => {
        app.showNotification('Welcome! You have been signed in successfully', 'success');
        app.closeModal('signInModal');
        
        // Update sign in button to show user
        const signInBtn = document.getElementById('signInBtn');
        signInBtn.innerHTML = '<i class="fas fa-user"></i><span>Profile</span>';
        
        // Clear form
        document.getElementById('signInEmail').value = '';
        document.getElementById('signInPassword').value = '';
    }, 1500);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AquaScopeApp();
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('SW registered: ', registration);
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
