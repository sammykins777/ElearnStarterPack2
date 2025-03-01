import { scorm } from '../main.js'; // Adjust path if needed

export function completeButton() {
    const button = document.createElement('button');
    button.textContent = 'Complete Course';
    button.classList.add('px-6', 'py-3', 'text-white', 'rounded-full', 'hover:bg-green-700');
    button.style.backgroundColor = data.theme.primaryColor;
    button.setAttribute('aria-label', 'Complete the course'); // Screen reader label
    
    button.addEventListener('click', () => {
        if (scorm && typeof scorm.set === 'function') {
            scorm.set("cmi.core.lesson_status", "completed");
            scorm.save();
            scorm.quit();
        } else {
            console.warn("SCORM not available - skipping completion");
        }
    });

    return button;
}