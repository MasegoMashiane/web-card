 // Enhanced sound effects using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Coffee brewing sounds
    function playCoffeeBrewSound() {
      // Simulate coffee brewing with filtered noise
      const bufferSize = 4096;
      const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
      const filter = audioContext.createBiquadFilter();
      const gainNode = audioContext.createGain();
      
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      
      whiteNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      };
      
      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      setTimeout(() => {
        whiteNoise.disconnect();
        filter.disconnect();
        gainNode.disconnect();
      }, 800);
    }
    
    function playCoffeeSipSound() {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);
      
      filter.type = 'lowpass';
      filter.frequency.value = 400;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    function playCoffeePourSound() {
      // Create a coffee pouring sound with noise and filtering
      const bufferSize = 2048;
      const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
      const filter = audioContext.createBiquadFilter();
      const gainNode = audioContext.createGain();
      
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 2;
      
      whiteNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.8;
        }
      };
      
      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      // Modulate the filter frequency for realistic pouring sound
      filter.frequency.setValueAtTime(1200, audioContext.currentTime);
      filter.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 1.5);
      
      setTimeout(() => {
        whiteNoise.disconnect();
        filter.disconnect();
        gainNode.disconnect();
      }, 1500);
    }
    
    function playSound(frequency, duration, type = 'sine') {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    }
    
    function playMagicSound() {
      // Deeper, more masculine magical chime sequence
      playCoffeeBrewSound();
      setTimeout(() => {
        playSound(392, 0.2); // G4
        setTimeout(() => playSound(523.25, 0.2), 100); // C5
        setTimeout(() => playSound(659.25, 0.3), 200); // E5
      }, 300);
    }
    
    function playVictorySound() {
      // Victory fanfare with coffee celebration
      playCoffeePourSound();
      setTimeout(() => {
        playSound(523.25, 0.2); // C5
        setTimeout(() => playSound(659.25, 0.2), 150); // E5
        setTimeout(() => playSound(783.99, 0.2), 300); // G5
        setTimeout(() => playSound(1046.5, 0.4), 450); // C6
      }, 200);
    }
    
    function playTypingSound() {
      const frequencies = [350, 380, 420, 390, 410]; // Deeper typing sounds
      playSound(frequencies[Math.floor(Math.random() * frequencies.length)], 0.1, 'square');
    }

    // Mouse trail effect with masculine symbols
    let mouseTrails = [];
    const trailSymbols = ['⚡', '🔧', '💻', '⭐', '◆', '◈', '▲', '■'];
    
    document.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.3) { // Only create trail 30% of the time
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.textContent = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
      }
    });

    // Create floating doodles and margin notes
    function createFloatingDoodles() {
      const doodleBg = document.getElementById('doodleBg');
      const doodles = ['⭐', '⚡', '🔧', '◊', '▲', '◯', '■', '★', '✦', '◈', '♦', '⋄', '✧', '◇'];
      const marginNotes = [
        '→ solid!', '✓ works', 'nice!', '⚡ fast', '☕ fuel', 'optimize this',
        'TODO: refactor', '// clean', 'good idea!', '⭐ epic', '✨ smooth', 'remember!'
      ];
      
      // Floating doodles
      for (let i = 0; i < 25; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'floating-doodle';
        doodle.textContent = doodles[Math.floor(Math.random() * doodles.length)];
        doodle.style.left = Math.random() * 100 + '%';
        doodle.style.top = Math.random() * 100 + '%';
        doodle.style.animationDelay = Math.random() * 8 + 's';
        doodle.style.fontSize = (12 + Math.random() * 16) + 'px';
        doodleBg.appendChild(doodle);
      }
      
      // Margin doodles
      for (let i = 0; i < 8; i++) {
        const margin = document.createElement('div');
        margin.className = 'margin-doodle';
        margin.textContent = marginNotes[Math.floor(Math.random() * marginNotes.length)];
        margin.style.setProperty('--delay', Math.random() * 4 + 's');
        
        // Position along edges
        if (Math.random() < 0.5) {
          margin.style.left = '10px';
          margin.style.top = Math.random() * 80 + 10 + '%';
        } else {
          margin.style.right = '10px';
          margin.style.top = Math.random() * 80 + 10 + '%';
        }
        
        doodleBg.appendChild(margin);
      }
    }
    createFloatingDoodles();

    // Game setup
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const revealSection = document.getElementById("reveal");
    const instruction = document.getElementById("instruction");

    let gameWon = false;
    let coffeeSpells = [];
    let sparkles = [];
    let floatingWords = [];
    let thoughtBubbles = [];
    let currentLevel = 1;

    // Hand-drawn style functions
    function drawWobblyLine(x1, y1, x2, y2, wobble = 2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      const steps = 20;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * wobble;
        const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * wobble;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function drawWobblyRect(x, y, width, height, wobble = 1) {
      ctx.beginPath();
      const points = [
        [x, y], [x + width, y], 
        [x + width, y + height], [x, y + height]
      ];
      
      ctx.moveTo(
        points[0][0] + (Math.random() - 0.5) * wobble, 
        points[0][1] + (Math.random() - 0.5) * wobble
      );
      
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(
          points[i][0] + (Math.random() - 0.5) * wobble,
          points[i][1] + (Math.random() - 0.5) * wobble
        );
      }
      ctx.closePath();
    }

    // Background elements with code snippets and coffee stains
    const backgroundDoodles = [];
    const codeSnippets = [
      'console.log("brew");', 'if (caffeine) {', '}', 'function optimize()', 
      '// FIXME', 'const power =', 'return true;', '☕', '⚡', '🔧'
    ];
    
    for (let i = 0; i < 12; i++) {
      backgroundDoodles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        speed: 0.3 + Math.random() * 0.7,
        size: 10 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.1 + Math.random() * 0.2
      });
    }

    function drawSketchyBackground() {
      // Paper texture with coffee stains
      ctx.fillStyle = '#fefffe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced coffee stains on canvas
      const coffeeStains = [
        {x: canvas.width * 0.8, y: canvas.height * 0.2, size: 25},
        {x: canvas.width * 0.15, y: canvas.height * 0.7, size: 35},
        {x: canvas.width * 0.6, y: canvas.height * 0.9, size: 20},
      ];
      
      coffeeStains.forEach(stain => {
        const gradient = ctx.createRadialGradient(stain.x, stain.y, 0, stain.x, stain.y, stain.size);
        gradient.addColorStop(0, 'rgba(139, 69, 19, 0.15)');
        gradient.addColorStop(0.6, 'rgba(139, 69, 19, 0.08)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(stain.x, stain.y, stain.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add ring stains
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(stain.x, stain.y, stain.size * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      });
      
      // Notebook lines (wobbly) with masculine blue tint
      ctx.strokeStyle = 'rgba(70, 130, 180, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 25) {
        drawWobblyLine(0, i, canvas.width, i, 0.5);
      }
      
      // Margin line with darker color
      ctx.strokeStyle = 'rgba(47, 79, 79, 0.3)';
      drawWobblyLine(80, 0, 80, canvas.height, 1);
      
      // Floating code snippets
      ctx.font = '12px Courier New';
      backgroundDoodles.forEach(doodle => {
        ctx.save();
        ctx.translate(doodle.x, doodle.y);
        ctx.rotate(doodle.rotation);
        ctx.globalAlpha = doodle.opacity;
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText(doodle.text, 0, 0);
        ctx.restore();
        
        doodle.y -= doodle.speed;
        doodle.rotation += doodle.rotSpeed;
        if (doodle.y < -30) {
          doodle.y = canvas.height + 30;
          doodle.x = Math.random() * canvas.width;
          doodle.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
      });
    }

    // Characters with personality
    const developer = {
      x: 120, y: 180, size: 60,
      isDebugging: false,
      mood: 'focused',
      coffee: 100, maxCoffee: 100,
      bounceOffset: 0,
      thoughts: ['Need more coffee...', 'This should compile!', 'Almost optimized!', 'Debug time!']
    };

    const bug = {
      x: 480, y: 180, size: 50,
      hp: 100, maxHp: 100,
      isAngry: false,
      defeated: false,
      attitude: 0,
      complaints: ['I will crash your server!', 'Try to catch me!', 'Memory leak incoming!', 'You cannot optimize me!']
    };

    function createSpeechBubble(character, message) {
      thoughtBubbles.push({
        x: character.x,
        y: character.y - 60,
        message: message,
        life: 180, // 3 seconds at 60fps
        character: character === developer ? 'dev' : 'bug'
      });
    }

    function drawDeveloper() {
      developer.bounceOffset = Math.sin(Date.now() * 0.003) * 2;
      const y = developer.y + developer.bounceOffset;
      
      ctx.save();
      ctx.translate(developer.x, y);
      
      // Developer body (laptop setup) with masculine colors
      ctx.fillStyle = '#708090';
      ctx.strokeStyle = '#2F4F4F';
      ctx.lineWidth = 3;
      drawWobblyRect(-developer.size/2, -developer.size/2, developer.size, developer.size, 2);
      ctx.fill();
      ctx.stroke();
      
      // Laptop screen
      ctx.fillStyle = '#000';
      drawWobblyRect(-20, -25, 40, 20, 1);
      ctx.fill();
      ctx.fillStyle = '#00ff00';
      ctx.font = '8px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText('> optimize.js', 0, -15);
      
      // Face based on mood
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      let face;
      if (developer.isDebugging) face = '(╯°□°)╯';
      else if (developer.mood === 'focused') face = '(◕‿◕)';
      else if (developer.mood === 'caffeinated') face = '(⊙_⊙)';
      else face = '(･_･)';
      ctx.fillText(face, 0, 10);
      
      // Coffee mug with steam
      ctx.fillStyle = '#8B4513';
      drawWobblyRect(developer.size/2 - 5, 10, 12, 15, 1);
      ctx.fill();
      ctx.fillStyle = '#2F4F4F';
      ctx.fillText('☕', developer.size/2 + 1, 20);
      
      // Steam effect
      if (developer.coffee > 50) {
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 - i * 0.15})`;
          ctx.fillText('~', developer.size/2 + 5 + i * 2, 8 - i * 4);
        }
      }
      
      // Debug wand when attacking
      if (developer.isDebugging) {
        ctx.strokeStyle = '#4682B4';
        ctx.lineWidth = 4;
        drawWobblyLine(developer.size/2, -10, developer.size/2 + 25, -25, 1);
        ctx.fillStyle = '#4682B4';
        ctx.font = '16px sans-serif';
        ctx.fillText('⚡', developer.size/2 + 30, -20);
        
        // Enhanced coffee steam during debugging
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = `rgba(70, 130, 180, ${0.7 - i * 0.1})`;
          ctx.fillText('~', developer.size/2 + 5 + i * 2, 5 - i * 3);
        }
      }
      
      ctx.restore();
      
      // Random thoughts
      if (Math.random() < 0.005 && thoughtBubbles.length < 2) {
        createSpeechBubble(developer, developer.thoughts[Math.floor(Math.random() * developer.thoughts.length)]);
      }
    }

    function drawBug() {
      const shake = bug.isAngry ? (Math.random() - 0.5) * 4 : 0;
      bug.attitude += 0.1;
      
      ctx.save();
      ctx.translate(bug.x + shake, bug.y);
      
      // Bug body (spiky and annoying) with darker colors
      ctx.fillStyle = bug.defeated ? '#999999' : '#CD5C5C';
      ctx.strokeStyle = '#2F4F4F';
      ctx.lineWidth = 3;
      
      // Animated spiky body
      ctx.beginPath();
      const spikes = 8;
      for (let i = 0; i < spikes; i++) {
        const angle = (i / spikes) * Math.PI * 2;
        const radius = bug.size + Math.sin(Date.now() * 0.01 + i) * 5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Bug legs (wiggly)
      ctx.strokeStyle = bug.defeated ? '#999999' : '#8B0000';
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const legAngle = (i / 6) * Math.PI * 2;
        const wiggle = Math.sin(Date.now() * 0.02 + i) * 3;
        const legX = Math.cos(legAngle) * (bug.size + 15 + wiggle);
        const legY = Math.sin(legAngle) * (bug.size + 15 + wiggle);
        drawWobblyLine(0, 0, legX, legY, 2);
      }
      
      // Face with attitude
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      let face;
      if (bug.defeated) face = '(×_×)';
      else if (bug.isAngry) face = '(>:C)';
      else face = '(ಠ益ಠ)';
      ctx.fillText(face, 0, 5);
      
      ctx.restore();
      
      // Reset angry state
      if (bug.isAngry) {
        setTimeout(() => bug.isAngry = false, 200);
      }
      
      // Random complaints
      if (Math.random() < 0.003 && !bug.defeated && thoughtBubbles.length < 2) {
        createSpeechBubble(bug, bug.complaints[Math.floor(Math.random() * bug.complaints.length)]);
      }
    }

    function drawSpeechBubbles() {
      thoughtBubbles.forEach((bubble, index) => {
        ctx.save();
        
        // Bubble background with masculine colors
        ctx.fillStyle = bubble.character === 'dev' ? '#F0F8FF' : '#FFE4E1';
        ctx.strokeStyle = '#2F4F4F';
        ctx.lineWidth = 2;
        
        const bubbleWidth = bubble.message.length * 8 + 20;
        const bubbleHeight = 30;
        
        drawWobblyRect(bubble.x - bubbleWidth/2, bubble.y - bubbleHeight, bubbleWidth, bubbleHeight, 1);
        ctx.fill();
        ctx.stroke();
        
        // Tail
        ctx.beginPath();
        ctx.moveTo(bubble.x - 5, bubble.y - 5);
        ctx.lineTo(bubble.x + 5, bubble.y - 5);
        ctx.lineTo(bubble.x, bubble.y + 5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Text
        ctx.fillStyle = '#2F4F4F';
        ctx.font = '12px Caveat';
        ctx.textAlign = 'center';
        ctx.fillText(bubble.message, bubble.x, bubble.y - 10);
        
        ctx.restore();
        
        bubble.life--;
        if (bubble.life <= 0) {
          thoughtBubbles.splice(index, 1);
        }
      });
    }

    // Enhanced UI with masculine hand-drawn style
    function drawProgressBar(entity, x, y, width, height, label, color) {
      const ratio = entity === developer ? entity.coffee / entity.maxCoffee : entity.hp / entity.maxHp;
      
      // Background with sketchy border
      ctx.fillStyle = '#f8f9fa';
      ctx.strokeStyle = '#2F4F4F';
      ctx.lineWidth = 2;
      drawWobblyRect(x, y, width, height, 1);
      ctx.fill();
      ctx.stroke();
      
      // Progress fill
      ctx.fillStyle = color;
      drawWobblyRect(x + 2, y + 2, (width - 4) * ratio, height - 4, 1);
      ctx.fill();
      
      // Hand-drawn label
      ctx.font = '14px Kalam';
      ctx.fillStyle = '#2F4F4F';
      ctx.textAlign = 'left';
      ctx.fillText(label, x, y - 5);
      
      // Fun icons
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      const symbol = entity === developer ? '☕' : '⚡';
      const percentage = Math.ceil(ratio * 100);
      ctx.fillText(`${percentage}% ${symbol}`, x + width - 10, y + 13);
    }

    // Enhanced magic system with coffee sounds
    function debugWithCoffee() {
      if (bug.defeated || gameWon || developer.coffee <= 0) return;
      
      // Play enhanced coffee sounds
      playTypingSound();
      setTimeout(() => {
        playCoffeeSipSound();
        setTimeout(() => playMagicSound(), 150);
      }, 100);
      
      developer.isDebugging = true;
      developer.mood = 'caffeinated';
      developer.coffee = Math.max(0, developer.coffee - 10);
      
      // Create coffee-powered debug spell
      coffeeSpells.push({
        x: developer.x + 30,
        y: developer.y,
        targetX: bug.x,
        targetY: bug.y,
        progress: 0,
        spell: ['console.debug()', 'optimize();', 'try{catch}', '// patched!'][Math.floor(Math.random() * 4)]
      });
      
      // Encouraging messages with masculine tone
      const encouragements = [
        'Solid fix!', 'Clean code!', 'Optimized!', 'Performance boost!', 
        'Well architected!', 'Bug crushed!', 'System stable!', 'Flawless!'
      ];
      floatingWords.push({
        text: encouragements[Math.floor(Math.random() * encouragements.length)],
        x: developer.x,
        y: developer.y - 40,
        life: 60,
        color: `hsl(${210 + Math.random() * 60}, 60%, 50%)`
      });
      
      setTimeout(() => {
        bug.isAngry = true;
        bug.hp = Math.max(0, bug.hp - 25);
        
        // Create impact effects with masculine symbols
        for (let i = 0; i < 15; i++) {
          sparkles.push({
            x: bug.x + (Math.random() - 0.5) * 80,
            y: bug.y + (Math.random() - 0.5) * 80,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 50,
            symbol: ['⚡', '🔧', '💻', '⭐', '☕', '🛠'][Math.floor(Math.random() * 6)]
          });
        }
        
        if (bug.hp === 0 && !bug.defeated) {
          bug.defeated = true;
          gameWon = true;
          playVictorySound();
          
          instruction.textContent = "System optimized! Welcome to my dev workspace! 🚀";
          createSpeechBubble(developer, "Perfect! Time for victory coffee!");
          
          // Massive victory celebration with masculine symbols
          for (let i = 0; i < 30; i++) {
            sparkles.push({
              x: canvas.width / 2,
              y: canvas.height / 2,
              vx: (Math.random() - 0.5) * 15,
              vy: (Math.random() - 0.5) * 15,
              life: 120,
              symbol: ['🎯', '⚡', '🔧', '⭐', '💻', '☕', '🚀'][Math.floor(Math.random() * 7)]
            });
          }
          
          setTimeout(() => {
            revealSection.style.display = "flex";
          }, 2500);
        }
      }, 600);
      
      setTimeout(() => {
        developer.isDebugging = false;
        developer.mood = 'focused';
      }, 500);
    }

    function drawMagicEffects() {
      // Coffee-powered debug spells
      coffeeSpells.forEach((spell, index) => {
        spell.progress += 0.04;
        const currentX = spell.x + (spell.targetX - spell.x) * spell.progress;
        const currentY = spell.y + (spell.targetY - spell.y) * spell.progress;
        
        // Code trail effect with masculine blue
        ctx.font = '12px Courier New';
        ctx.fillStyle = `rgba(70, 130, 180, ${1 - spell.progress})`;
        for (let i = 0; i < 4; i++) {
          const trailX = currentX - (spell.targetX - spell.x) * spell.progress * 0.1 * (i + 1);
          const trailY = currentY - (spell.targetY - spell.y) * spell.progress * 0.1 * (i + 1);
          ctx.globalAlpha = (1 - spell.progress) * (0.8 - i * 0.15);
          ctx.textAlign = 'center';
          ctx.fillText(spell.spell, trailX, trailY);
        }
        ctx.globalAlpha = 1;
        
        // Main spell with steel blue color
        ctx.font = 'bold 14px Courier New';
        ctx.fillStyle = '#4682B4';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.strokeText(spell.spell, currentX, currentY);
        ctx.fillText(spell.spell, currentX, currentY);
        
        if (spell.progress >= 1) {
          coffeeSpells.splice(index, 1);
        }
      });
      
      // Sparkle effects with masculine symbols
      sparkles.forEach((sparkle, index) => {
        ctx.font = (12 + Math.random() * 8) + 'px sans-serif';
        ctx.globalAlpha = sparkle.life / 50;
        ctx.fillStyle = '#4682B4';
        ctx.textAlign = 'center';
        ctx.fillText(sparkle.symbol, sparkle.x, sparkle.y);
        
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;
        sparkle.vx *= 0.99; // air resistance
        sparkle.vy += 0.2; // gravity
        sparkle.life--;
        
        if (sparkle.life <= 0) {
          sparkles.splice(index, 1);
        }
      });
      
      // Floating encouragement words
      floatingWords.forEach((word, index) => {
        ctx.font = 'bold 16px Kalam';
        ctx.globalAlpha = word.life / 60;
        ctx.fillStyle = word.color;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.strokeText(word.text, word.x, word.y);
        ctx.fillText(word.text, word.x, word.y);
        
        word.y -= 1.5;
        word.life--;
        
        if (word.life <= 0) {
          floatingWords.splice(index, 1);
        }
      });
      
      ctx.globalAlpha = 1;
    }

    // Main game loop
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawSketchyBackground();
      drawDeveloper();
      drawBug();
      drawMagicEffects();
      drawSpeechBubbles();
      
      // UI elements with masculine colors
      drawProgressBar(developer, 40, 30, 120, 16, "Coffee Level", "#8B4513");
      drawProgressBar(bug, 450, 30, 120, 16, "Bug Persistence", "#CD5C5C");
      
      // Game status with masculine styling
      if (!gameWon) {
        ctx.font = 'bold 16px Indie Flower';
        ctx.fillStyle = '#4682B4';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.strokeText("My First Website: The Debug Chronicles!", canvas.width/2, canvas.height - 100);
        ctx.fillText("My First Website: The Debug Chronicles!", canvas.width/2, canvas.height - 100);
        
        ctx.font = '12px Caveat';
        ctx.fillStyle = '#666';
        ctx.fillText("(Based on actual debugging sessions)", canvas.width/2, canvas.height - 80);
      } else {
        ctx.font = 'bold 20px Indie Flower';
        ctx.fillStyle = '#2F4F4F';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.strokeText("System Optimized Successfully! ⚡", canvas.width/2, canvas.height - 30);
        ctx.fillText("System Optimized Successfully! ⚡", canvas.width/2, canvas.height - 30);
      }
      
      requestAnimationFrame(gameLoop);
    }

    // Start the creative adventure
    gameLoop();

    // Event listeners
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        debugWithCoffee();
      }
    });

    // Mobile and accessibility support
    canvas.addEventListener("click", (e) => {
      // Resume audio context on user interaction
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      debugWithCoffee();
    });
    
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      debugWithCoffee();
    });

    // Enhanced avatar interactions with coffee sounds
    document.querySelector('.avatar')?.addEventListener('click', function() {
      playCoffeeSipSound();
      setTimeout(() => playMagicSound(), 200);
      
      this.style.transform = 'scale(1.2) rotate(720deg)';
      this.style.filter = 'sepia(0%) saturate(1.5) contrast(1.3) hue-rotate(210deg)';
      
      setTimeout(() => {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.filter = 'sepia(10%) saturate(1.1) contrast(1.1)';
      }, 1000);
    });

    // Interactive skill bubbles with enhanced coffee sounds
    document.querySelectorAll('.skill-bubble').forEach((bubble, index) => {
      bubble.addEventListener('click', function() {
        playTypingSound();
        setTimeout(() => playCoffeeSipSound(), 100);
        
        const masculineColors = ['#4682B4', '#708090', '#2F4F4F', '#D2691E', '#A0522D', '#8B4513', '#556B2F'];
        const randomColor = masculineColors[Math.floor(Math.random() * masculineColors.length)];
        
        this.style.backgroundColor = randomColor;
        this.style.color = '#fff';
        this.style.transform = 'scale(1.4) rotate(360deg)';
        this.style.boxShadow = '0 0 20px ' + randomColor;
        
        setTimeout(() => {
          this.style.backgroundColor = '#fff';
          this.style.color = this.style.borderColor;
          this.style.transform = 'scale(1) rotate(-2deg)';
          this.style.boxShadow = '3px 3px 0px currentColor';
        }, 800);
      });
      
      // Hover sound effects
      bubble.addEventListener('mouseenter', () => {
        if (Math.random() < 0.3) playTypingSound();
      });
    });

    // Contact item interactions with coffee brewing sounds
    document.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (Math.random() < 0.4) {
          const sounds = [playTypingSound, playCoffeeSipSound];
          sounds[Math.floor(Math.random() * sounds.length)]();
        }
      });
      
      item.addEventListener('click', () => {
        playCoffeeBrewSound();
      });
    });

    // Enhanced coffee stain creation on page interaction
    let coffeeStainCount = 0;
    document.addEventListener('click', (e) => {
      if (Math.random() < 0.1 && coffeeStainCount < 5) { // 10% chance, max 5 stains
        const stain = document.createElement('div');
        stain.style.cssText = `
          position: fixed;
          width: ${20 + Math.random() * 30}px;
          height: ${18 + Math.random() * 25}px;
          background: radial-gradient(circle, rgba(139, 69, 19, 0.2) 0%, rgba(139, 69, 19, 0.1) 60%, transparent 100%);
          border-radius: ${40 + Math.random() * 30}% ${60 + Math.random() * 20}% ${30 + Math.random() * 40}% ${50 + Math.random() * 30}%;
          pointer-events: none;
          z-index: -1;
          left: ${e.clientX - 15 + Math.random() * 30}px;
          top: ${e.clientY - 15 + Math.random() * 30}px;
          animation: gentle-float ${15 + Math.random() * 10}s ease-in-out infinite;
          opacity: 0;
          transition: opacity 2s ease-in;
        `;
        
        document.body.appendChild(stain);
        coffeeStainCount++;
        
        // Fade in the stain
        setTimeout(() => stain.style.opacity = '1', 100);
        
        // Remove after some time
        setTimeout(() => {
          stain.remove();
          coffeeStainCount--;
        }, 30000);
      }
    });

    // Keyboard shortcuts for coffee sounds
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
          case 'b': // Ctrl+B for brew sound
            e.preventDefault();
            playCoffeeBrewSound();
            break;
          case 's': // Ctrl+S for sip sound
            e.preventDefault();
            playCoffeeSipSound();
            break;
          case 'p': // Ctrl+P for pour sound
            e.preventDefault();
            playCoffeePourSound();
            break;
        }
      }
    });

    // Seasonal easter egg with masculine theme
    const currentMonth = new Date().getMonth();
    if (currentMonth === 11 || currentMonth === 0) { // December or January
      // Add some winter tech sparkle
      const winterDoodles = ['❄️', '⚡', '🔧', '⭐'];
      setInterval(() => {
        if (Math.random() < 0.08) {
          const sparkle = document.createElement('div');
          sparkle.className = 'mouse-trail';
          sparkle.textContent = winterDoodles[Math.floor(Math.random() * winterDoodles.length)];
          sparkle.style.left = Math.random() * window.innerWidth + 'px';
          sparkle.style.top = '0px';
          sparkle.style.fontSize = '20px';
          sparkle.style.color = '#4682B4';
          document.body.appendChild(sparkle);
          
          setTimeout(() => sparkle.remove(), 3000);
        }
      }, 2500);
    }

    // Coffee break reminder (fun easter egg)
    let coffeeBreakTimer;
    function startCoffeeBreakReminder() {
      coffeeBreakTimer = setTimeout(() => {
        if (Math.random() < 0.3) { // 30% chance
          const reminder = document.createElement('div');
          reminder.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #F5F5DC;
            border: 2px solid #D2691E;
            border-radius: 10px;
            padding: 10px 15px;
            font-family: 'Caveat', cursive;
            font-size: 14px;
            color: #8B4513;
            z-index: 1000;
            animation: fadeInOut 4s ease-in-out;
          `;
          reminder.textContent = '☕ Time for a coffee break?';
          document.body.appendChild(reminder);
          
          playCoffeeBrewSound();
          
          setTimeout(() => reminder.remove(), 4000);
        }
        startCoffeeBreakReminder(); // Restart timer
      }, 12000 + Math.random() * 18000); // 2-5 minutes
    }
    
    // Add CSS for fade animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(-20px); }
        20%, 80% { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    // Start the coffee break reminder
    startCoffeeBreakReminder();

    // Performance monitoring (dev joke)
    let performanceCheckCount = 0;
    setInterval(() => {
      performanceCheckCount++;
      if (performanceCheckCount % 50 === 0) { // Every ~10 seconds
        if (performance.memory && Math.random() < 0.1) {
          console.log(`☕ Coffee-powered performance check #${performanceCheckCount/50}: ${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB used`);
        }
      }
    }, 200);