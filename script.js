// Toggle sections based on checkbox
function toggleSection(checkboxId, sectionId) {
    document.getElementById(checkboxId).addEventListener('change', () => {
        document.getElementById(sectionId).style.display = 
            document.getElementById(checkboxId).checked ? 'block' : 'none';
    });
}

// By default only Timer shown
document.getElementById('showTimer').checked = true;
document.getElementById('timer-section').style.display = 'block';
document.getElementById('music-section').style.display = 'none';
document.getElementById('notes-section').style.display = 'none';
document.getElementById('ai-section').style.display = 'none';

toggleSection('showTimer','timer-section');
toggleSection('showMusic','music-section');
toggleSection('showNotes','notes-section');
toggleSection('showAI','ai-section');

// Timer logic
let timerInterval;
function startTimer() {
    let h = parseInt(document.getElementById('hours').value) || 0;
    let m = parseInt(document.getElementById('minutes').value) || 0;
    let s = parseInt(document.getElementById('seconds').value) || 0;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (s === 0) {
            if (m === 0) {
                if (h === 0) {
                    clearInterval(timerInterval);
                    return;
                } else {
                    h--; m = 59; s = 59;
                }
            } else { m--; s = 59; }
        } else { s--; }

        document.getElementById('hours').value = h.toString().padStart(2,'0');
        document.getElementById('minutes').value = m.toString().padStart(2,'0');
        document.getElementById('seconds').value = s.toString().padStart(2,'0');
    }, 1000);
}

document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', () => clearInterval(timerInterval));
document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    document.getElementById('hours').value = '00';
    document.getElementById('minutes').value = '00';
    document.getElementById('seconds').value = '00';
});

// Notes
document.getElementById('copyNotes').addEventListener('click', () => {
    const notes = document.getElementById('notesBox');
    notes.select();
    document.execCommand('copy');
});
document.getElementById('clearNotes').addEventListener('click', () => {
    document.getElementById('notesBox').value = '';
});

// Music
let audio = new Audio();
document.getElementById('musicSelect').addEventListener('change', () => {
    audio.src = document.getElementById('musicSelect').value;
});
document.getElementById('playMusic').addEventListener('click', () => audio.play());
document.getElementById('pauseMusic').addEventListener('click', () => audio.pause());
document.getElementById('stopMusic').addEventListener('click', () => { audio.pause(); audio.currentTime = 0; });

// AI Chat placeholder
document.getElementById('sendAI').addEventListener('click', () => {
    const input = document.getElementById('aiInput').value;
    const output = document.getElementById('aiOutput');
    output.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
    output.innerHTML += `<p><strong>AI:</strong> This is a placeholder response. Replace with OpenAI API.</p>`;
    document.getElementById('aiInput').value = '';
});
