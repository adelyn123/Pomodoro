class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.currentMode = 'work';
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.currentSession = 1;
        this.sessionsBeforeLongBreak = 4;
        this.interval = null;
        this.originalTitle = document.title;
        this.tasks = [];
        this.taskIdCounter = 1;
        
        // Settings
        this.settings = {
            workTime: 25,
            shortBreakTime: 5,
            longBreakTime: 15,
            sessionsBeforeLongBreak: 4
        };
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.updateTheme();
        this.loadTasks();
    }
    
    initializeElements() {
        this.timeDisplay = document.getElementById('time');
        this.sessionInfo = document.getElementById('session-info');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.progressFill = document.getElementById('progress-fill');
        this.currentSessionSpan = document.getElementById('current-session');
        this.totalSessionsSpan = document.getElementById('total-sessions');
        this.settingsToggle = document.getElementById('settings-toggle');
        this.settingsOverlay = document.getElementById('settings-overlay');
        this.settingsPanel = document.getElementById('settings');
        this.closeSettingsBtn = document.getElementById('close-settings');
        
        // Session mode buttons
        this.workBtn = document.getElementById('work-btn');
        this.shortBreakBtn = document.getElementById('short-break-btn');
        this.longBreakBtn = document.getElementById('long-break-btn');
        
        // Settings inputs
        this.workTimeInput = document.getElementById('work-time');
        this.shortBreakTimeInput = document.getElementById('short-break-time');
        this.longBreakTimeInput = document.getElementById('long-break-time');
        this.sessionsBeforeLongBreakInput = document.getElementById('sessions-before-long-break');
        
        // Task elements
        this.addTaskBtn = document.getElementById('add-task-btn');
        this.taskInputContainer = document.getElementById('task-input-container');
        this.taskInput = document.getElementById('task-input');
        this.saveTaskBtn = document.getElementById('save-task-btn');
        this.cancelTaskBtn = document.getElementById('cancel-task-btn');
        this.taskList = document.getElementById('task-list');
    }
    
    bindEvents() {
        this.playPauseBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Settings
        this.settingsToggle.addEventListener('click', () => this.showSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.hideSettings());
        this.settingsOverlay.addEventListener('click', (e) => {
            if (e.target === this.settingsOverlay) {
                this.hideSettings();
            }
        });
        
        // Session mode buttons
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode);
            });
        });
        
        // Settings inputs
        this.workTimeInput.addEventListener('change', () => this.updateSettings());
        this.shortBreakTimeInput.addEventListener('change', () => this.updateSettings());
        this.longBreakTimeInput.addEventListener('change', () => this.updateSettings());
        this.sessionsBeforeLongBreakInput.addEventListener('change', () => this.updateSettings());
        
        // Task management
        this.addTaskBtn.addEventListener('click', () => this.showTaskInput());
        this.saveTaskBtn.addEventListener('click', () => this.saveTask());
        this.cancelTaskBtn.addEventListener('click', () => this.hideTaskInput());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveTask();
            } else if (e.key === 'Escape') {
                this.hideTaskInput();
            }
        });
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    updatePlayPauseButton() {
        if (this.isRunning) {
            this.playPauseBtn.textContent = 'Pause';
        } else {
            this.playPauseBtn.textContent = 'Start';
        }
    }
    
    updateTheme() {
        const body = document.body;
        body.className = `theme-${this.currentMode}`;
    }
    
    showSettings() {
        this.settingsOverlay.classList.add('show');
    }
    
    hideSettings() {
        this.settingsOverlay.classList.remove('show');
    }
    
    updateSettings() {
        this.settings.workTime = parseInt(this.workTimeInput.value);
        this.settings.shortBreakTime = parseInt(this.shortBreakTimeInput.value);
        this.settings.longBreakTime = parseInt(this.longBreakTimeInput.value);
        this.settings.sessionsBeforeLongBreak = parseInt(this.sessionsBeforeLongBreakInput.value);
        
        this.totalSessionsSpan.textContent = this.settings.sessionsBeforeLongBreak;
        
        if (!this.isRunning) {
            this.reset();
        }
    }
    
    updateSessionControlsState() {
        this.workBtn.disabled = this.isRunning;
        this.shortBreakBtn.disabled = this.isRunning;
        this.longBreakBtn.disabled = this.isRunning;
    }
    
    switchMode(mode) {
        if (this.isRunning) return;
        
        this.currentMode = mode;
        this.updateTheme();
        
        // Update active button
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // Set time based on mode
        switch (mode) {
            case 'work':
                this.timeLeft = this.settings.workTime * 60;
                this.totalTime = this.settings.workTime * 60;
                this.sessionInfo.textContent = 'Work Session';
                break;
            case 'short-break':
                this.timeLeft = this.settings.shortBreakTime * 60;
                this.totalTime = this.settings.shortBreakTime * 60;
                this.sessionInfo.textContent = 'Short Break';
                break;
            case 'long-break':
                this.timeLeft = this.settings.longBreakTime * 60;
                this.totalTime = this.settings.longBreakTime * 60;
                this.sessionInfo.textContent = 'Long Break';
                break;
        }
        
        this.updateDisplay();
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.updateSessionControlsState();
        this.updatePlayPauseButton();
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.completeSession();
            }
        }, 1000);
    }
    
    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.updateSessionControlsState();
        this.updatePlayPauseButton();
        
        clearInterval(this.interval);
        document.title = this.originalTitle;
    }
    
    reset() {
        this.pause();
        this.currentSession = 1;
        this.currentMode = 'work';
        this.timeLeft = this.settings.workTime * 60;
        this.totalTime = this.settings.workTime * 60;
        
        this.updateTheme();
        
        // Reset UI
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-mode="work"]').classList.add('active');
        
        this.sessionInfo.textContent = 'Work Session';
        this.updateDisplay();
        this.updatePlayPauseButton();
        document.title = this.originalTitle;
    }
    
    completeSession() {
        this.pause();
        this.showNotification();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);
        
        this.autoAdvance();
    }
    
    autoAdvance() {
        if (this.currentMode === 'work') {
            this.currentSession++;
            
            if (this.currentSession > this.settings.sessionsBeforeLongBreak) {
                this.switchMode('long-break');
                this.currentSession = 1;
            } else {
                this.switchMode('short-break');
            }
        } else {
            this.switchMode('work');
        }
        
        this.currentSessionSpan.textContent = this.currentSession;
    }
    
    showNotification() {
        const title = this.currentMode === 'work' ? 'Work Session Complete!' : 'Break Complete!';
        const message = this.currentMode === 'work' 
            ? 'Time for a break!' 
            : 'Ready to work again?';
        
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍅</text></svg>'
            });
        }
        
        this.playNotificationSound();
    }
    
    playNotificationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        this.timeDisplay.textContent = timeString;
        
        if (this.isRunning) {
            const emoji = this.currentMode === 'work' ? '🍅' : this.currentMode === 'short-break' ? '☕' : '🛋️';
            const sessionType = this.currentMode === 'work' ? 'Work' : 'Break';
            document.title = `${emoji} ${timeString} - ${sessionType} | PomodoroFocus`;
        }
        
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        this.currentSessionSpan.textContent = this.currentSession;
    }
    
    // Task Management Methods
    showTaskInput() {
        this.taskInputContainer.style.display = 'block';
        this.taskInput.focus();
        this.addTaskBtn.style.display = 'none';
    }
    
    hideTaskInput() {
        this.taskInputContainer.style.display = 'none';
        this.taskInput.value = '';
        this.addTaskBtn.style.display = 'block';
    }
    
    saveTask() {
        const taskText = this.taskInput.value.trim();
        if (!taskText) return;
        
        const task = {
            id: this.taskIdCounter++,
            text: taskText,
            completed: false,
            createdAt: new Date()
        };
        
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.hideTaskInput();
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }
    
    renderTasks() {
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = `
                <li class="task-item example-task">
                    <span class="task-text">Click "+ Add Task" to get started</span>
                </li>
            `;
            return;
        }
        
        this.taskList.innerHTML = this.tasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="window.pomodoroTimer.toggleTask(${task.id})">
                    ${task.completed ? '✓' : ''}
                </div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="task-delete" onclick="window.pomodoroTimer.deleteTask(${task.id})" title="Delete task">
                    ×
                </button>
            </li>
        `).join('');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    saveTasks() {
        try {
            localStorage.setItem('pomodoroTasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.log('Failed to save tasks to localStorage');
        }
    }
    
    loadTasks() {
        try {
            const saved = localStorage.getItem('pomodoroTasks');
            if (saved) {
                this.tasks = JSON.parse(saved);
                this.taskIdCounter = Math.max(...this.tasks.map(t => t.id), 0) + 1;
            }
        } catch (error) {
            console.log('Failed to load tasks from localStorage');
            this.tasks = [];
        }
        this.renderTasks();
    }
    
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
    timer.requestNotificationPermission();
    window.pomodoroTimer = timer;
});