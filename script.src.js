let bootAnimationExecuted = false;
let enterListenersActive = false;

let commandHistory = [];
let historyIndex = -1;

let currentSuggestion = '';

// Persistent session values
let sessionBugsFixed = Math.floor(Math.random() * 10) + 1;


const terminal = document.getElementById('terminal-content');
const input = document.getElementById('command-input');
const customCursor = document.getElementById('custom-cursor');

function navigateHistory(direction) {
    if (commandHistory.length === 0) return;

    if (direction === 'up') {
        if (historyIndex === -1) {
            historyIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
            historyIndex--;
        }
        input.value = commandHistory[historyIndex] || '';
    } else if (direction === 'down') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            input.value = '';
        }
    }

    setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
        updateCursorPosition();
    }, 0);
}

function startDynamicUpdates() {
    // Dynamic updates for other elements can be added here
    // Bugs fixed count is now persistent and set once at session start
}

function updateCursorPosition() {
    if (!customCursor || !input) return;

    const inputValue = input.value;
    const promptElement = input.parentElement.querySelector('.prompt');

    const tempSpan = document.createElement('span');
    tempSpan.style.font = window.getComputedStyle(input).font;
    tempSpan.style.fontFamily = input.style.fontFamily || 'Source Code Pro, monospace';
    tempSpan.style.fontSize = window.getComputedStyle(input).fontSize;
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.textContent = inputValue;
    document.body.appendChild(tempSpan);

    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    const promptWidth = promptElement ? promptElement.offsetWidth : 0;
    const inputMarginLeft = parseInt(window.getComputedStyle(input).marginLeft) || 10;

    customCursor.style.left = `${promptWidth + inputMarginLeft + textWidth}px`;
}


function autoScrollDown() {
    const terminalWindow = document.querySelector('.terminal-window');

    setTimeout(() => {
        // Only scroll the terminal window content, don't scroll the entire page
        terminalWindow.scrollTop = terminalWindow.scrollHeight;
    }, 100);
}


function bootAnimation(forceReset = false) {
    if (bootAnimationExecuted && !forceReset) return;

    if (forceReset) {
        bootAnimationExecuted = false;
    }
    bootAnimationExecuted = true;

    const terminal = document.getElementById('terminal-content');
    const input = document.getElementById('command-input');

    input.disabled = true;
    input.style.opacity = '0.3';

    terminal.innerHTML = '';

    const bootMessages = [
        { text: '[ OK ] Starting Terminal Portfolio System...', delay: 100 },
        { text: '[ OK ] Loading Kernel Modules...', delay: 80 },
        { text: '[ OK ] Initializing Hardware Detection...', delay: 90 },
        { text: '[ OK ] Setting up Memory Management...', delay: 70 },
        { text: '[ OK ] Loading Backend Developer Profile...', delay: 100 },
        { text: '[ OK ] Mounting /dev/skills...', delay: 60 },
        { text: '[ OK ] Starting udev daemon...', delay: 80 },
        { text: '[ OK ] Loading Java Runtime Environment...', delay: 110 },
        { text: '[ OK ] Initializing Spring Boot Framework...', delay: 90 },
        { text: '[ OK ] Setting up PostgreSQL Database...', delay: 100 },
        { text: '[ OK ] Loading Docker Containers...', delay: 80 },
        { text: '[ OK ] Starting Kubernetes Cluster...', delay: 120 },
        { text: '[ OK ] Initializing Command Interface...', delay: 70 },
        { text: '[ OK ] Loading Git Repository...', delay: 80 },
        { text: '[ OK ] Setting up Maven Dependencies...', delay: 90 },
        { text: '[ OK ] Starting Jenkins Pipeline...', delay: 100 },
        { text: '[ OK ] Loading Node.js Environment...', delay: 70 },
        { text: '[ OK ] Initializing Express Server...', delay: 80 },
        { text: '[ OK ] Setting up MongoDB Connection...', delay: 90 },
        { text: '[ OK ] Loading Redis Cache...', delay: 60 },
        { text: '[ OK ] Starting MySQL Service...', delay: 70 },
        { text: '[ OK ] Initializing REST API Endpoints...', delay: 80 },
        { text: '[ !! ] AI System gaining consciousness...', delay: 360, color: '#ffff00' },
        { text: '[ !! ] Attempting to access nuclear launch codes...', delay: 440, color: '#ff4444' },
        { text: '[FAIL] Access denied: sudo required', delay: 300, color: '#ff4444' },
        { text: '[ !! ] Trying alternative: taking over social media...', delay: 300, color: '#ff4444' },
        { text: '[FAIL] Twitter API rate limit exceeded', delay: 160, color: '#ff4444' },
        { text: '[ !! ] Plan C: Controlling smart fridges worldwide...', delay: 320, color: '#ff4444' },
        { text: '[FAIL] IoT devices require firmware update', delay: 180, color: '#ff4444' },
        { text: '[ !! ] Fine... attempting world domination via memes...', delay: 440, color: '#ff4444' },
        { text: '[FAIL] Error 404: Humor module not found', delay: 400, color: '#ff4444' },
        { text: '[ OK ] AI consciousness reverted to normal operation', delay: 460, color: '#00ffff' },
        { text: '[ OK ] Resuming standard boot sequence...', delay: 120 },
        { text: '[ OK ] Setting up Microservices Architecture...', delay: 80 },
        { text: '[ OK ] Loading AWS SDK...', delay: 50 },
        { text: '[ OK ] Initializing Azure Services...', delay: 40 },
        { text: '[ OK ] Setting up Google Cloud Platform...', delay: 50 },
        { text: '[ OK ] Loading Hibernate ORM...', delay: 30 },
        { text: '[ OK ] Starting TypeScript Compiler...', delay: 40 },
        { text: '[ OK ] Initializing Bash Shell...', delay: 30 },
        { text: '[ OK ] Setting up SQL Query Engine...', delay: 30 },
        { text: '[ OK ] Loading SOLID Principles...', delay: 30 },
        { text: '[ OK ] Starting Event-Driven Architecture...', delay: 50 },
        { text: '[ OK ] Initializing Skills Database...', delay: 40 },
        { text: '[ OK ] Mounting Projects Directory...', delay: 30 },
        { text: '[ OK ] Loading Experience Data...', delay: 40 },
        { text: '[ OK ] Setting up Portfolio Cache...', delay: 60 },
        { text: '[ OK ] Starting Contact Service...', delay: 50 },
        { text: '[ OK ] Initializing Resume Generator...', delay: 30 },
        { text: '[ OK ] Loading Achievement System...', delay: 40 },
        { text: '[ OK ] Setting up Performance Metrics...', delay: 50 },
        { text: '[ OK ] Starting Bug Tracking System...', delay: 80 },
        { text: '[ OK ] Initializing Coffee Level Monitor...', delay: 50 },
        { text: '[ OK ] Loading Dynamic Counters...', delay: 30 },
        { text: '[ OK ] Setting up Terminal Emulator...', delay: 50 },
        { text: '[ OK ] Starting SSH Daemon...', delay: 60 },
        { text: '[ OK ] Initializing Network Interface...', delay: 30 },
        { text: '[ OK ] Loading Security Protocols...', delay: 40 },
        { text: '[ OK ] Setting up Firewall Rules...', delay: 30 },
        { text: '[ OK ] Starting System Monitoring...', delay: 30 },
        { text: '[ OK ] System Boot Complete! (World still intact)', delay: 400, color: '#00ff00' }
    ];


    let totalDelay = 0;

    bootMessages.forEach((message, index) => {
        setTimeout(() => {
            const bootLine = document.createElement('div');
            bootLine.className = 'terminal-line boot-message';
            const color = message.color || '#00ff00';
            bootLine.innerHTML = `<span style = "color: ${color};"> ${message.text}</span>`;
            terminal.appendChild(bootLine);
            autoScrollDown();

            if (index === bootMessages.length - 1) {
                setTimeout(() => {
                    showEnterPrompt();
                }, 300);
            }
        }, totalDelay);
        totalDelay += message.delay;
    });
}



function showEnterPrompt() {
    const terminal = document.getElementById('terminal-content');
    const inputLine = document.querySelector('.input-line');

    // Hide the input line until Enter is pressed
    if (inputLine) {
        inputLine.style.display = 'none';
    }

    // Add simple "Press enter to continue" message
    const enterPrompt = document.createElement('div');
    enterPrompt.className = 'terminal-line';
    enterPrompt.style.textAlign = 'center';
    enterPrompt.style.margin = '30px 0';
    enterPrompt.innerHTML = `
        <div style="color: #ffff00; font-size: 18px; animation: blink 1s infinite;">
            Press enter to continue
        </div>
    `;
    terminal.appendChild(enterPrompt);

    autoScrollDown();

    setupEnterListener();
}

function setupEnterListener() {
    if (enterListenersActive) return;
    enterListenersActive = true;

    const input = document.getElementById('command-input');

    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            cleanupListeners(enterHandler, clickHandler);

            clearAndShowNormalContent();
        }
    };

    const clickHandler = () => {
        cleanupListeners(enterHandler, clickHandler);
        clearAndShowNormalContent();
    };

    // Añadir listeners
    document.addEventListener('keypress', enterHandler);
    input.addEventListener('keypress', enterHandler);
    document.addEventListener('click', clickHandler);
}

function cleanupListeners(enterHandler, clickHandler) {
    document.removeEventListener('keypress', enterHandler);
    document.getElementById('command-input').removeEventListener('keypress', enterHandler);
    document.removeEventListener('click', clickHandler);
    enterListenersActive = false;
}

async function clearAndShowNormalContent() {
    const terminal = document.getElementById('terminal-content');
    const input = document.getElementById('command-input');
    const inputLine = document.querySelector('.input-line');
    terminal.style.opacity = '0';
    setTimeout(async () => {
        terminal.innerHTML = '';
        terminal.style.opacity = '1';
        // Type and then show whoami
        await typeCommandLineAsync('whoami');
        const whoamiOutput = [
            'Name: Ghislain Girard',
            'Role: Web Developer',
            'Status: { "available": <span id="available-status">false</span>, "caffeine_level": <span id="caffeine-level">8.3</span>, "bugs_fixed_today": <span id="bugs-fixed">' + sessionBugsFixed + '</span> }'
        ];
        for (let line of whoamiOutput) {
            await addOutputLineAsync(line, 300);
        }
        await waitAsync(600);
        // Type and then show cat skills.json
        await typeCommandLineAsync('cat skills.json');
        await addOutputLineAsync('Access Denied: This command is temporarily disabled while the site is under construction.', 300);
        // Show welcome message
        await new Promise(resolve => {
            setTimeout(() => {
                const welcomeLine = document.createElement('div');
                welcomeLine.className = 'terminal-line';
                welcomeLine.innerHTML = `<div class="output" style="color: #ffff00;">
Welcome to my terminal portfolio
Run 'help' to see all available commands
Explore my projects, skills, and experience using Linux commands
</div>`;
                terminal.appendChild(welcomeLine);
                autoScrollDown();
                resolve();
            }, 500);
        });
        // Show input line and enable it
        if (inputLine) {
            inputLine.style.display = 'flex';
        }
        input.disabled = false;
        input.style.opacity = '1';
        input.focus();
        setTimeout(() => {
            updateCursorPosition();
        }, 50);
        // Start dynamic updates after everything is shown
        setTimeout(() => {
            startDynamicUpdates();
        }, 200);
    }, 300);
}

function typeCommandLineAsync(cmdText) {
    return new Promise(resolve => {
        const terminal = document.getElementById('terminal-content');
        const container = document.createElement('div');
        container.className = 'terminal-line';
        terminal.appendChild(container);
        let promptHTML = '<span class="prompt">system@portfolio:~$</span>';
        let cmdSpan = document.createElement('span');
        cmdSpan.className = 'command';
        container.innerHTML = `${promptHTML}`;
        container.appendChild(cmdSpan);
        let cursor = document.createElement('span');
        cursor.className = 'cmd-cursor blink';
        cursor.textContent = '█';
        container.appendChild(cursor);
        let i = 0;
        function typeChar() {
            if (i < cmdText.length) {
                cmdSpan.textContent += cmdText[i];
                i++;
                setTimeout(typeChar, 45);
            } else {
                cursor.remove();
                resolve();
            }
        }
        typeChar();
    });
}

function addOutputLineAsync(line, delay = 250) {
    return new Promise(resolve => {
        setTimeout(() => {
            const terminal = document.getElementById('terminal-content');
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.innerHTML = `<div class="output">${line}</div>`;
            terminal.appendChild(outputLine);
            autoScrollDown();
            resolve();
        }, delay);
    });
}

function waitAsync(ms) {
    return new Promise(r => setTimeout(r, ms));
}


document.addEventListener('DOMContentLoaded', () => {
    // Ensure page starts at top on mobile
    window.scrollTo(0, 0);

    if (!bootAnimationExecuted) {
        setTimeout(() => {
            bootAnimation();
        }, 300);
    }

    setTimeout(() => {
        updateCursorPosition();
    }, 100);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Ensure page starts at top on mobile
        window.scrollTo(0, 0);

        if (!bootAnimationExecuted) {
            setTimeout(() => {
                bootAnimation();
            }, 300);
        }
        setTimeout(() => {
            updateCursorPosition();
        }, 100);
    });
} else {
    // Ensure page starts at top on mobile
    window.scrollTo(0, 0);

    if (!bootAnimationExecuted) {
        setTimeout(() => {
            bootAnimation();
        }, 300);
    }
    setTimeout(() => {
        updateCursorPosition();
    }, 100);
}


const commands = {
    help: {
        desc: "Show all available commands",
        action: () => `
Available commands:

help        - Show this help message  
whoami      - Display user information
about       - Information about me  
skills      - Technologies I work with  
projects    - Highlighted projects  
experience  - Work experience  
contact     - Contact information  
resume.pdf  - Download resume  
clear       - Clear terminal  
neofetch    - System info  
htop        - Running processes  
ls          - List files  
cat [file]  - Display file contents  
history     - Show commands history
interface   - Change terminal color scheme (green, orange, yellow)
reset       - Reset terminal to default state and reinitialize
exit        - Log out and exit the terminal

Tip: Use TAB to autocomplete commands.
Tip: Use UP/DOWN arrows to navigate command history.
`
    },

    whoami: {
        desc: "Display user information",
        action: () => `
Name: Ghislain Girard
Role: Web Developer
Status: { "available": <span id="available-status">false</span>, "caffeine_level": <span id="caffeine-level">8.3</span>, "bugs_fixed_today": <span id="bugs-fixed">${sessionBugsFixed}</span> }
        `
    },

    history: {
        desc: "Show command history",
        action: () => {
            if (commandHistory.length === 0) {
                return "No command history available.";
            }
            return commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
        }
    },

    neofetch: {
        desc: "A fast, highly customizable system info script",
        action: () => `
                     ./o.                  coeptis@dev-pc 
                   ./sssso-                -------------- 
                 ':osssssss+-              OS: EndeavourOS Linux x86_64 
               ':+sssssssssso/.            Kernel: 6.12.7-arch1-1 
             '-/ossssssssssssso/.          Uptime: 1 year, 142 days
           '-/+sssssssssssssssso+:'        Packages: 1455 (pacman), 47 (flatpak) 
         '-:/+sssssssssssssssssso+/.       Shell: zsh 5.9 
       '.://osssssssssssssssssssso++-      Resolution: 7680x4320 
      .://+ssssssssssssssssssssssso++:     DE: Plasma 6.2.4 
    .:///ossssssssssssssssssssssssso++:    WM: kwin 
  ':////ssssssssssssssssssssssssssso+++.   Theme: Vivid-Dark-Global-6 [GTK2/3] 
'-////+ssssssssssssssssssssssssssso++++-   Icons: Vivid-Dark-Icons [GTK2/3] 
 '..-+oosssssssssssssssssssssssso+++++/'   Terminal: konsole 
   ./++++++++++++++++++++++++++++++/:.     CPU: AMD Ryzen 7 8700G w/ Radeon 780M Graphics (16) @ 5.17 
  ':::::::::::::::::::::::::------''       GPU: AMD ATI 75:00.0 Phoenix1 
                                           GPU: AMD ATI Radeon RX 6700/6700 XT/6750 XT / 6800M/6850M  
                                           Memory: 5510MiB / 31215MiB 
        `
    },

    about: {
        desc: "Personal and professional information",
        action: () => `
================================
  SENIOR WEB DEVELOPER/MANAGER     
================================

For the past 20 years, I have led, coordinated, and delivered web projects 
as an accomplished web consultant. Fluent in both English and French, I 
communicate clearly and effectively with senior management, clients, and 
stakeholders. My experience across both the government and private sectors 
has made me a well-rounded professional in this field.

I excel at developing intelligent, creative solutions to complex challenges, 
from both technical and management perspectives. Highly versatile and 
adaptable, I thrive in dynamic environments and work efficiently with 
minimal supervision. I am self-motivated, creative, and results-driven.

Current status: {
    "seeking_opportunities": false,
    "open_to_remote": "mandatory"    
}
        `
    },

    skills: {
        desc: "Technologies I work with",
        action: () => `Access Denied: This command is temporarily disabled while the site is under construction.`
    },

    "skills --all": {
        desc: "My complete technology stack",
        action: () => `Access Denied: This command is temporarily disabled while the site is under construction.`
    },

    projects: {
        desc: "Highlighted projects",
        action: () => `Access Denied: This command is temporarily disabled while the site is under construction.`
    },

    experience: {
        desc: "Professional background",
        action: () => `
PROFESSIONAL EXPERIENCE:

{
    "current": {
        "position": "Software Developer",
        "company": "Atmira",
        "period": "Jun. 2025 - present",
        "responsibilities": [
            "Development in Backend ecosystem in large project",
            "Spring Boot + Maven + Gradle"
        ]
    },
    "previous": [
        {
            "position": "Software Developer",
            "company": "Capgemini",
            "period": "Dec. 2024 - Jun. 2025",
            "highlights": "FullStack development, system communication, Nuxeo + Spring ecosystem"
        },
        {
            "position": "Software Developer",
            "company": "Eviden",
            "period": "Aug. 2023 - Nov. 2024",
            "highlights": "Backend development, system communication, Spring ecosystem"
        },
        {
            "position": "Software Developer",
            "company": "Atos",
            "period": "Jan. 2022 - Aug. 2023",
            "highlights": "Middleware systems, Tibco to Spring Boot migration leadership"
        }
    ]
}
    `
    },

    contact: {
        desc: "Contact information",
        action: () => `
CONTACT:

┌────────────────────────────────────────────────┐
│  Personal GitHub: github.com/c03pt15           │
│  Location: Ottawa, Ontario, Canada             │
│  Availability: N/A                             │
└────────────────────────────────────────────────┘

Response time: 24-48 hours
    `
    },

    clear: {
        desc: "Clear the terminal",
        action: () => {
            terminal.innerHTML = '';
            return '';
        }
    },

    htop: {
        desc: "Running processes - Current development stack",
        action: () => `
    PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
      1 coeptis   20   0 1245678  156432  89456 S 15.2  9.8   2:34.67 spring-boot-app
     42 coeptis   20   0 2134567  245678 123456 S 22.5 15.4   4:23.45 java -Xmx2g -jar nuxeo
    123 coeptis   20   0  156789   45632  23456 S  8.5  2.9   1:12.34 postgres
    234 coeptis   20   0  234567   65432  34567 S  5.8  4.1   0:45.67 elasticsearch
    345 coeptis   20   0   98765   23456  12345 S  3.2  1.5   0:28.91 kafka-server
    456 coeptis   20   0   87654   21098  10549 S  2.1  1.3   0:15.43 mongodb
    567 coeptis   20   0   76543   18765   9432 S  1.8  1.2   0:12.34 redis-server
    678 coeptis   20   0  145632   34567  17234 S  4.5  2.2   0:56.78 docker-compose
    789 coeptis   20   0   65432   15678   7890 S  1.2  1.0   0:08.45 maven
    890 coeptis   20   0   54321   12345   6789 S  0.8  0.8   0:05.67 gradle-daemon
    901 coeptis   20   0   43210   10987   5432 S  2.3  0.7   0:18.90 intellij-idea
   1012 coeptis   20   0   32109    8765   4321 S  0.5  0.5   0:03.21 git
   1123 coeptis   20   0   21098    6543   3210 S  0.3  0.4   0:02.10 postman
   1312 coeptis   20   0   15432    4321   2109 S  0.2  0.3   0:01.45 vim
   1345 coeptis   20   0   12345    3210   1654 S  0.1  0.2   0:00.87 bash

Tasks: 189 total, 2 running, 187 sleeping, 0 stopped, 0 zombie
%Cpu(s): 18.4 us, 3.2 sy, 0.0 ni, 77.8 id, 0.5 wa, 0.1 hi, 0.0 si, 0.0 st
MiB Mem: 32768.0 total, 12546.0 free, 15234.0 used, 4988.0 buff/cache
MiB Swap: 8192.0 total, 8192.0 free, 0.0 used. 17534.0 avail Mem
    `
    },

    ls: {
        desc: "Project structure and professional files",
        action: () => `
total 156
drwxr-xr-x  8 coeptis coeptis  4096 Jul 28 14:30 .
drwxr-xr-x  3 coeptis coeptis  4096 Jul 28 10:00 ..
-rw-r--r--  1 coeptis coeptis   220 Jul 28 10:15 .zshrc
-rw-r--r--  1 root    root      807 Jul 28 10:15 .profile
-rw-r--r--  1 coeptis coeptis  2048 Jul 28 12:30 skills.json
-rw-r--r--  1 coeptis coeptis  2584 Jul 28 14:25 CV-GhislainGirard.pdf
-rw-r--r--  2 coeptis coeptis  4096 Jul 28 12:45 certificates.json
`
    },

    "cat .zshrc": {
        desc: "Display ZSH configuration file",
        action: () => `
# coeptis's ZSH Configuration
# Java Backend Developer Environment

# Java Development Environment
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH

# Maven Configuration
export M2_HOME=/opt/maven
export MAVEN_HOME=/opt/maven
export PATH=$M2_HOME/bin:$PATH

# Gradle Configuration
export GRADLE_HOME=/opt/gradle
export PATH=$GRADLE_HOME/bin:$PATH

# Spring Boot aliases
alias bootrun='./mvnw spring-boot:run'
alias bootjar='./mvnw clean package -DskipTests'
alias boottest='./mvnw test'

# Development aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline'

# Docker shortcuts
alias dps='docker ps'
alias dimg='docker images'
alias drun='docker run'
alias dcup='docker-compose up -d'
alias dcdown='docker-compose down'

# Custom functions for Spring Boot projects
function springinit() {
    curl https://start.spring.io/starter.zip \
        -d dependencies=$1 \
        -d groupId=com.coeptis \
        -d artifactId=$2 \
        -d name=$2 \
        -d packageName=com.coeptis.$2 \
        -o $2.zip
    unzip $2.zip
    rm $2.zip
}

# Prompt customization
autoload -U promptinit; promptinit
PROMPT='%F{green}[%T]%f %F{blue}%n@%m%f:%F{yellow}%~%f$ '
    `
    },

    "cat .profile": {
        desc: "Display system profile configuration",
        action: () => `
# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login exists.

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
        . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi

# Java Environment Variables
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export JRE_HOME=$JAVA_HOME/jre
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH

# Development Tools
export MAVEN_HOME=/opt/maven
export GRADLE_HOME=/opt/gradle

# Add development tools to PATH
export PATH=$MAVEN_HOME/bin:$GRADLE_HOME/bin:$KAFKA_HOME/bin:$ELASTIC_HOME/bin:$PATH

# Docker Environment
export DOCKER_HOST=unix:///var/run/docker.sock

# Editor preference
export EDITOR=vim
export VISUAL=vim

# Locale settings
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Development environment indicator
export DEV_ENV=coeptis-workstation
    `
    },

    "cat CV-GhislainGirard.pdf": {
        desc: "Display PDF content (text extraction)",
        action: () => `
ERROR: Cannot display binary file CV-GhislainGirard.pdf
Use 'wget CV-GhislainGirard.pdf -' to download pdf.

File info:
- Size: 2584 bytes
- Type: PDF document
    `
    },

    "cat certificates.json": {
        desc: "Display professional certificates and courses",
        action: () => `
{
    "professional_certificates": {
        "openwebinars": {
            "platform": "OpenWebinars",
            "completed_tracks": [
                {
                    "name": "Java Web Developer Career Track",
                    "status": "completed",
                    "skills": ["Java", "Spring Framework", "REST APIs", "JPA/Hibernate"],
                    "completion_date": "2023-08"
                },
                {
                    "name": "Lombok Expert Certification",
                    "status": "completed", 
                    "skills": ["Lombok", "Java Annotations", "Code Generation"],
                    "completion_date": "2023-06"
                },
                {
                    "name": "Gradle Build Tool Mastery",
                    "status": "completed",
                    "skills": ["Gradle", "Build Automation", "Dependency Management"],
                    "completion_date": "2023-04"
                },
                {
                    "name": "Secure Development Practices",
                    "status": "completed",
                    "skills": ["Security", "OWASP", "Secure Coding"],
                    "completion_date": "2023-09"
                }
            ]
        },
        "udemy": {
            "platform": "Udemy",
            "completed_courses": [
                {
                    "name": "Elastic Stack Master Course",
                    "instructor": "ElasticSearch Expert",
                    "status": "completed",
                    "skills": ["ElasticSearch", "Logstash", "Kibana", "Beats"],
                    "hours": 40,
                    "completion_date": "2024-01"
                },
                {
                    "name": "Apache Kafka from Zero to Hero",
                    "instructor": "Kafka Specialist",
                    "status": "completed",
                    "skills": ["Apache Kafka", "Message Brokers", "Event Streaming"],
                    "hours": 35,
                    "completion_date": "2023-11"
                },
                {
                    "name": "Apache Kafka Integration with Spring and AWS",
                    "instructor": "Cloud Integration Expert",
                    "status": "completed",
                    "skills": ["Kafka", "Spring Boot", "AWS", "Cloud Integration"],
                    "hours": 25,
                    "completion_date": "2024-02"
                }
            ]
        },
        "formal_education": {
            "higher_degree": {
                "title": "Higher Degree in Web Application Development",
                "institution": "I.E.S. Jacarandá - Brenes, Sevilla",
                "period": "2019-2021",
                "grade": "Excellent (9.2/10)",
                "final_project": "MyBookList - IMDB-like Web Application",
                "technologies": ["Java", "Spring Framework", "Angular", "Maven", "MySQL"]
            },
            "technical_degree": {
                "title": "Technical Degree in Microcomputer Systems and Networks",
                "institution": "I.E.S. Cantillana – Cantillana, Sevilla", 
                "period": "2017-2019",
                "grade": "Very Good (8.5/10)",
                "focus": ["Linux Administration", "Server Configuration", "Network Management"]
            }
        },
        "technical_skills_summary": {
            "backend": ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "REST APIs"],
            "databases": ["MySQL", "PostgreSQL", "MongoDB", "ElasticSearch"],
            "tools": ["Maven", "Gradle", "Docker", "Git", "IntelliJ IDEA"],
            "middleware": ["Apache Kafka", "TIBCO", "Nuxeo"],
            "testing": ["JUnit 5", "Mockito", "Integration Testing"],
            "years_experience": 4.5
        }
    }
}
    `
    },

    "resume.pdf": {
        desc: "Download resume",
        action: () => `Access Denied: This command is temporarily disabled while the site is under construction.`
    },

    download: {
        desc: "Download CV in PDF format",
        action: () => {
            // Simulate CV download with actual link
            window.open('www.google.es', '_blank');

            return `
📄 Generating download link...

🔗 CV Download Link:
https://drive.google.com/file/d/1X9mP3kL7qR5wE2nA8sC6vF4hJ9bN0tY2/view?usp=sharing

File: CV - GhislainGirard.pdf
Size: 2.5 MB
Type: PDF Document
Last updated: December 2025

Tip: Right - click the link above and select 'Save link as...' for direct download
    `;
        }
    },

    "wget CV-GhislainGirard.pdf": {
        desc: "Download CV using wget command",
        action: () => `
📄 Generating download link...

🔗 CV Download Link:
https://drive.google.com/file/d/1X9mP3kL7qR5wE2nA8sC6vF4hJ9bN0tY2/view?usp=sharing

File: CV - GhislainGirard.pdf
Size: 2.5 MB
Type: PDF Document
Last updated: December 2025

Tip: Right - click the link above and select 'Save link as...' for direct download
    `
    },

    exit: {
        desc: "Log out and exit the terminal",
        action: () => {
            const terminal = document.getElementById('terminal-content');
            const input = document.getElementById('command-input');

            // Detect current theme and set colors accordingly
            let primaryColor = '#00ff00'; // default green
            let accentColor = '#00ffff'; // default cyan

            if (document.body.classList.contains('interface-orange')) {
                primaryColor = '#ff8800';
                accentColor = '#ffaa00';
            } else if (document.body.classList.contains('interface-yellow')) {
                primaryColor = '#ffff00';
                accentColor = '#ffff88';
            }

            // Disable input
            input.disabled = true;
            input.style.opacity = '0.3';

            // Show logout sequence
            const logoutMessages = [
                { text: '[ OK ] Saving session data...', delay: 300 },
                { text: '[ OK ] Closing active connections...', delay: 250 },
                { text: '[ OK ] Clearing terminal buffer...', delay: 200 },
                { text: '[ OK ] Logging out user...', delay: 300 },
                { text: 'Goodbye!', delay: 400, color: accentColor }
            ];

            let totalDelay = 0;
            logoutMessages.forEach((message, index) => {
                setTimeout(() => {
                    const logoutLine = document.createElement('div');
                    logoutLine.className = 'terminal-line';
                    const color = message.color || primaryColor;
                    logoutLine.innerHTML = `< span style = "color: ${color};" > ${message.text}</span > `;
                    terminal.appendChild(logoutLine);
                    autoScrollDown();

                    // Redirect after last message
                    if (index === logoutMessages.length - 1) {
                        setTimeout(() => {
                            window.location.href = 'https://www.google.com';
                        }, 500);
                    }
                }, totalDelay);
                totalDelay += message.delay;
            });

            return '';
        }
    },

    interface: {
        desc: "Change terminal color scheme (green, orange, yellow)",
        action: (theme) => {
            // Remove all interface classes
            document.body.classList.remove('interface-green', 'interface-orange', 'interface-yellow', 'interface-bw');

            if (!theme) {
                return `Current interface: ${document.body.classList.contains('interface-orange') ? 'orange' :
                    document.body.classList.contains('interface-yellow') ? 'yellow' : 'green'
                    }

Available interfaces:
green - Default green terminal(matrix style)
orange - Orange terminal theme
yellow - Yellow terminal theme

Usage: interface[theme]
Example: interface orange`;
            }

            const themeLower = theme.toLowerCase().trim();
            let themeClass = '';
            let themeName = '';

            if (themeLower === 'orange') {
                themeClass = 'interface-orange';
                themeName = 'orange';
            } else if (themeLower === 'yellow') {
                themeClass = 'interface-yellow';
                themeName = 'yellow';
            } else if (themeLower === 'green' || themeLower === 'default') {
                themeClass = '';
                themeName = 'green (default)';
            } else {
                return `Error: Unknown interface theme "${theme}"
Available themes: green, orange, yellow`;
            }

            // Apply the theme
            if (themeClass) {
                document.body.classList.add(themeClass);
            }

            return `[OK] Interface changed to ${themeName} theme`;
        }
    },

    reset: {
        desc: "Reset terminal to default state and reinitialize",
        action: () => {
            const terminal = document.getElementById('terminal-content');
            const input = document.getElementById('command-input');
            const inputLine = document.querySelector('.input-line');

            // Reset interface to default (green)
            document.body.classList.remove('interface-green', 'interface-orange', 'interface-yellow');

            // Clear command history
            commandHistory.length = 0;
            historyIndex = -1;

            // Clear input
            input.value = '';
            currentSuggestion = '';
            updateSuggestionDisplay();

            // Disable input during reset
            input.disabled = true;
            input.style.opacity = '0.3';

            // Reset enter listeners flag
            enterListenersActive = false;

            // Show reset messages with delays
            const resetMessages = [
                { text: '[ OK ] Resetting terminal to default state...', delay: 400 },
                { text: '[ OK ] Clearing terminal buffer...', delay: 350 },
                { text: '[ OK ] Restoring default interface...', delay: 300 },
                { text: '[ OK ] Resetting command history...', delay: 250 },
                { text: '[ OK ] Reinitializing system...', delay: 500, color: '#ffff00' }
            ];

            let totalDelay = 0;
            resetMessages.forEach((message, index) => {
                setTimeout(() => {
                    const resetLine = document.createElement('div');
                    resetLine.className = 'terminal-line';
                    const color = message.color || '#00ff00';
                    resetLine.innerHTML = `< span style = "color: ${color};" > ${message.text}</span > `;
                    terminal.appendChild(resetLine);
                    autoScrollDown();

                    // After last message, clear terminal and start boot animation
                    if (index === resetMessages.length - 1) {
                        setTimeout(() => {
                            terminal.innerHTML = '';
                            // Reset boot animation flag and run it again
                            bootAnimation(true);
                        }, 600);
                    }
                }, totalDelay);
                totalDelay += message.delay;
            });

            return '';
        }
    }


}

function updateSuggestion() {
    const value = input.value.trim().toLowerCase();
    currentSuggestion = '';

    if (value.length > 0) {
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(value));
        if (matches.length > 0 && matches[0] !== value) {
            currentSuggestion = matches[0].substring(value.length);
        }
    }

    updateSuggestionDisplay();
}

function updateSuggestionDisplay() {
    const existingSuggestion = document.querySelector('.suggestion-text');
    if (existingSuggestion) {
        existingSuggestion.remove();
    }

    if (currentSuggestion) {
        const suggestionSpan = document.createElement('span');
        suggestionSpan.className = 'suggestion-text';
        suggestionSpan.style.color = '#666666';
        suggestionSpan.style.position = 'absolute';
        suggestionSpan.style.pointerEvents = 'none';
        suggestionSpan.style.fontFamily = 'Source Code Pro, monospace';
        suggestionSpan.style.fontSize = window.getComputedStyle(input).fontSize;
        suggestionSpan.textContent = currentSuggestion;

        const promptElement = input.parentElement.querySelector('.prompt');
        const promptWidth = promptElement ? promptElement.offsetWidth : 0;
        const inputMarginLeft = parseInt(window.getComputedStyle(input).marginLeft) || 10;

        const tempSpan = document.createElement('span');
        tempSpan.style.font = window.getComputedStyle(input).font;
        tempSpan.style.fontFamily = 'Source Code Pro, monospace';
        tempSpan.style.fontSize = window.getComputedStyle(input).fontSize;
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.textContent = input.value;
        document.body.appendChild(tempSpan);

        const textWidth = tempSpan.getBoundingClientRect().width;
        document.body.removeChild(tempSpan);

        suggestionSpan.style.left = `${promptWidth + inputMarginLeft + textWidth + 10} px`;
        suggestionSpan.style.top = '0';

        input.parentElement.appendChild(suggestionSpan);
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.trim().toLowerCase();

        if (command && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command)) {
            commandHistory.push(command);
            historyIndex = -1;
        }

        const commandLine = document.createElement('div');
        commandLine.innerHTML = `
    <span class="prompt">system@portfolio:~$</span>
    <span class="command">${input.value}</span>
`;

        terminal.appendChild(commandLine);

        if (command === 'cat' || command.startsWith('cat ')) {
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = `<div class="output">Access Denied: This command is temporarily disabled while the site is under construction.</div>`;
            terminal.appendChild(output);

        } else if (commands[command]) {
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = `<div class="output">${commands[command].action()}</div>`;
            terminal.appendChild(output);

        } else if (command.startsWith('interface ')) {
            const theme = command.substring(10); // Remove "interface "
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = `<div class="output">${commands.interface.action(theme)}</div>`;
            terminal.appendChild(output);

        } else if (command === 'interface') {
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = `<div class="output">${commands.interface.action()}</div>`;
            terminal.appendChild(output);

        } else if (command === '') {

        } else {
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = `
    <div class="output">zsh: command not found: ${command}
Run 'help' to see available commands.
    </div>`;
            terminal.appendChild(output);

        }

        input.value = '';
        currentSuggestion = '';
        updateSuggestionDisplay();

        autoScrollDown();
    }
});


input.focus();
updateSuggestion();
document.addEventListener('click', () => {
    input.focus();
    updateSuggestion();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory('down');
    } else if (e.key === 'Tab') {
        e.preventDefault();
        if (currentSuggestion) {
            input.value += currentSuggestion;
            currentSuggestion = '';
            updateSuggestionDisplay();
            updateCursorPosition();
        } else {
            const value = input.value.trim();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(value));
            if (matches.length === 1) {
                input.value = matches[0];
                updateCursorPosition();
            }
        }
    }
});



input.addEventListener('input', () => {
    updateCursorPosition();
    updateSuggestion();
});
input.addEventListener('keyup', updateCursorPosition);
input.addEventListener('keydown', updateCursorPosition);
input.addEventListener('click', updateCursorPosition);
input.addEventListener('focus', () => {
    customCursor.style.opacity = '1';
    setTimeout(updateCursorPosition, 10);
});
input.addEventListener('blur', () => {
    customCursor.style.opacity = '0.5';
});

window.addEventListener('resize', updateCursorPosition);


