# Pomodoro Timer

A beautiful, modern Pomodoro timer that runs in your browser. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ⏱️ **25/5/15 Pomodoro Technique**: 25-minute work sessions, 5-minute short breaks, 15-minute long breaks
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- ⚙️ **Customizable Settings**: Adjust work time, break durations, and sessions before long break
- 🔔 **Notifications**: Browser notifications and audio alerts when sessions complete
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔄 **Auto-advance**: Automatically switches between work and break sessions
- 📊 **Progress Tracking**: Visual progress bar and session counter

## How to Use

1. **Open the Timer**: Simply open `index.html` in your web browser
2. **Start a Session**: Click the "Start" button to begin a work session
3. **Pause/Resume**: Use the "Pause" and "Start" buttons to control the timer
4. **Reset**: Click "Reset" to start over from the beginning
5. **Switch Modes**: Use the mode buttons to manually switch between Work, Short Break, and Long Break
6. **Customize**: Adjust the settings at the bottom to match your preferences

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Basic Workflow:
1. **Work Session** (25 minutes): Focus on a single task
2. **Short Break** (5 minutes): Take a quick break
3. **Repeat** 4 work sessions
4. **Long Break** (15 minutes): Take a longer break
5. **Start Over**: Begin the cycle again

## Browser Compatibility

This timer works in all modern browsers that support:
- ES6 Classes
- CSS Grid and Flexbox
- Web Audio API (for notifications)
- Browser Notifications API

## Files Structure

```
Pomodoro/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

You can easily customize the timer by modifying the settings in the browser:

- **Work Time**: Duration of work sessions (default: 25 minutes)
- **Short Break**: Duration of short breaks (default: 5 minutes)
- **Long Break**: Duration of long breaks (default: 15 minutes)
- **Sessions before Long Break**: Number of work sessions before a long break (default: 4)

## Features in Detail

### Timer Controls
- **Start**: Begin the current session
- **Pause**: Pause the timer (can be resumed)
- **Reset**: Reset to the beginning of the current session type

### Session Modes
- **Work**: Focused work time
- **Short Break**: Quick rest period
- **Long Break**: Extended rest period

### Visual Feedback
- **Progress Bar**: Shows completion percentage of current session
- **Session Counter**: Tracks current session number
- **Timer Display**: Large, easy-to-read countdown
- **Mode Indicators**: Clear visual indication of current session type

### Notifications
- **Browser Notifications**: Desktop notifications when sessions complete
- **Audio Alerts**: Beep sound when timer finishes
- **Visual Animation**: Timer display pulses when session completes

## Getting Started

### Local Development
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Allow notifications when prompted (optional)
4. Start your first Pomodoro session!

### Deploy to GitHub Pages
This app is ready to deploy to GitHub Pages! Here's how:

1. **Push your code to GitHub** (if you haven't already)
2. **Go to your repository Settings**
3. **Navigate to Pages** in the left sidebar
4. **Under Source**, select "Deploy from a branch"
5. **Choose "main" branch** and select root folder (`/ (root)`)
6. **Click Save**

Your app will be available at: `https://yourusername.github.io/your-repo-name/`

Alternatively, if you want automatic deployments on every push:
- The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy your site
- Just push your changes and GitHub will handle the rest!

## Tips for Effective Use

1. **Choose a Task**: Pick one specific task to focus on during each work session
2. **Eliminate Distractions**: Close unnecessary tabs and apps
3. **Take Real Breaks**: Step away from your computer during breaks
4. **Track Progress**: Use the session counter to monitor your productivity
5. **Adjust Settings**: Customize the timer to match your work style

## License

This project is open source and available under the MIT License.

---

Happy focusing! 🍅 