import { scorm } from '../main.js';

export function quizBlock(quizData) {
    const quizWrapper = document.createElement('div');
    quizWrapper.classList.add('flex', 'flex-col', 'items-center', 'space-y-6', 'w-full');

    let totalScore = 0;
    let answered = 0;

    quizData.forEach((q, qIndex) => {
        const questionWrapper = document.createElement('div');
        questionWrapper.classList.add('space-y-4', 'w-full');

        const question = document.createElement('h3');
        question.classList.add('text-lg', 'font-semibold', 'text-center');
        question.textContent = `${qIndex + 1}. ${q.question}`;
        questionWrapper.appendChild(question);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('space-y-2', 'w-full');
        optionsContainer.setAttribute('role', 'radiogroup');
        optionsContainer.setAttribute('aria-labelledby', `question-${qIndex}`);
        question.id = `question-${qIndex}`;
        const radios = [];

        q.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.classList.add('flex', 'items-center', 'space-x-2', 'cursor-pointer');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `quiz-${qIndex}`;
            radio.value = index;
            radio.id = `quiz-${qIndex}-option-${index}`;
            radio.classList.add('h-4', 'w-4');
            radio.setAttribute('aria-label', option);
            radios.push(radio);

            const text = document.createElement('span');
            text.classList.add('text-sm');
            text.textContent = option;
            text.setAttribute('for', radio.id);

            label.appendChild(radio);
            label.appendChild(text);
            optionsContainer.appendChild(label);
        });

        questionWrapper.appendChild(optionsContainer);
        quizWrapper.appendChild(questionWrapper);
    });

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Quiz';
    submitBtn.classList.add('px-6', 'py-3', 'text-white', 'rounded-full', 'hover:bg-green-700');
    submitBtn.style.backgroundColor = data.theme.primaryColor;
    submitBtn.setAttribute('aria-label', 'Submit quiz answers');

    const feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('mt-4', 'text-center', 'text-lg', 'font-semibold', 'p-2', 'rounded');
    feedbackDiv.style.color = data.theme.feedbackColor;
    feedbackDiv.setAttribute('aria-live', 'polite');
    feedbackDiv.setAttribute('role', 'status');

    submitBtn.addEventListener('click', () => {
        totalScore = 0;
        answered = 0;
        quizData.forEach((q, qIndex) => {
            const selected = document.querySelector(`input[name="quiz-${qIndex}"]:checked`);
            if (selected) {
                answered++;
                const selectedIndex = parseInt(selected.value, 10);
                const decodedCorrect = q.correct;
                const isCorrect = q.options[selectedIndex] === decodedCorrect;
                const score = isCorrect ? 100 : 0;
                totalScore += score;
            }
        });

        feedbackDiv.style.color = data.theme.feedbackColor;
        if (answered === quizData.length) {
            const finalScore = Math.round(totalScore / quizData.length);
            if (scorm && typeof scorm.set === 'function') {
                scorm.set("cmi.core.score.raw", finalScore.toString());
                scorm.set("cmi.core.lesson_status", "completed");
                scorm.save();
            } else {
                console.warn("SCORM not available - skipping score save");
            }
            feedbackDiv.textContent = `You scored ${finalScore}%!`;
            feedbackDiv.style.backgroundColor = finalScore >= 80 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(225, 29, 72, 0.2)';
        } else {
            feedbackDiv.textContent = `Please answer all ${quizData.length} questions.`;
            feedbackDiv.style.backgroundColor = 'rgba(225, 29, 72, 0.2)';
        }
    });

    quizWrapper.appendChild(submitBtn);
    quizWrapper.appendChild(feedbackDiv);
    return quizWrapper;
}