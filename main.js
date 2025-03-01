import { numberBlock } from './modules/number-block.js';
import { titleBlock } from './modules/title-block.js';
import { textBlock } from './modules/text-block.js';
import { imageBlock } from './modules/image-block.js';
import { checklistBlock } from './modules/checklist.js';
import { introSection } from './modules/intro-section.js';
import { chartBlock } from './modules/chartBlock.js';
import { flipCard } from './modules/flipCard.js';
import { createFixedNav } from './modules/fixed-nav.js';
import { completeButton } from './modules/completeButton.js';
import { quizBlock } from './modules/quizBlock.js';

// SCORM setup - Export this for quizBlock.js and completeButton.js
export const scorm = pipwerks.SCORM;
let currentSection = 0;

function initSCORM() {
    if (!scorm.init()) {
        console.warn("Failed to initialize SCORM session. Running in preview mode.");
    } else {
        const location = scorm.get("cmi.core.lesson_location");
        currentSection = location ? parseInt(location, 10) : 0;
        if (currentSection > 0) {
            document.querySelectorAll('section')[currentSection].scrollIntoView();
        }
    }
    return true;
}

function saveProgress() {
    try {
        scorm.set("cmi.core.lesson_location", currentSection.toString());
        scorm.save();
    } catch (e) {
        console.warn("Failed to save SCORM progress:", e.message);
    }
}

function markAsComplete() {
    try {
        scorm.set("cmi.core.lesson_status", "completed");
        scorm.save();
        scorm.quit();
    } catch (e) {
        console.warn("Failed to mark course as complete:", e.message);
    }
}

function showError(message) {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}

function applyBackground(element, bgColor) {
    element.classList.remove('bg-white', 'bg-yellow-100', 'bg-red-200', 'bg-gray-50');
    element.style.backgroundColor = '';
    if (bgColor === 'bg-white') {
        element.style.backgroundColor = '#ffffff';
    } else if (bgColor.startsWith('bg-')) {
        element.classList.add(bgColor);
    } else if (bgColor.startsWith('#')) {
        element.style.backgroundColor = bgColor;
    }
    console.log(`Applied bgColor=${bgColor} to section`);
}

function createSection({ title, text, image }) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'justify-center', 'items-center');
    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-8', 'py-8', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textAndImage = document.createElement('div');
    textAndImage.classList.add('flex', 'justify-center', 'items-center', 'w-full', 'space-x-8', 'flex-col-reverse', 'sm:flex-row', 'space-y-6', 'sm:space-y-0');
    const textEl = textBlock(text);
    textEl.classList.add('max-w-lg', 'mx-auto');
    textAndImage.appendChild(textEl);

    const imageEl = imageBlock(image);
    imageEl.classList.add('max-w-lg', 'mx-auto');
    textAndImage.appendChild(imageEl);
    
    sectionContent.appendChild(textAndImage);
    section.appendChild(sectionContent);
    return section;
}

function sectionWithQuiz(title, text, quizData, bgImage) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'justify-center', 'items-center');

    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-8', 'py-8', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textElement = textBlock(text);
    textElement.classList.add('text-center', 'max-w-3xl');
    sectionContent.appendChild(textElement);

    const quizContainer = document.createElement('div');
    quizContainer.classList.add('w-full', 'py-8', 'flex', 'justify-center', 'items-center', 'rounded-lg'); // Rounded corners for bg image
    quizContainer.style.backgroundImage = `url(${bgImage})`;
    quizContainer.style.backgroundSize = 'cover';
    quizContainer.style.backgroundPosition = 'center';
    quizContainer.style.backgroundRepeat = 'no-repeat';

    const quizContent = document.createElement('div');
    quizContent.classList.add('max-w-screen-md', 'w-full', 'bg-white', 'bg-opacity-80', 'p-6', 'rounded-lg', 'shadow-lg');
    quizContent.appendChild(quizBlock(quizData));
    quizContainer.appendChild(quizContent);
    sectionContent.appendChild(quizContainer);

    section.appendChild(sectionContent);
    return section;
}

function sectionWithChecklist(title, text, checklistItems, checklistBgImage) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'justify-center', 'items-center');
    
    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-8', 'py-8', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textElement = textBlock(text);
    textElement.classList.add('text-center', 'max-w-3xl');
    sectionContent.appendChild(textElement);

    const checklistContainer = document.createElement('div');
    checklistContainer.classList.add('w-full', 'py-8', 'flex', 'justify-center', 'items-center', 'rounded-lg'); // Rounded corners for bg image
    checklistContainer.style.backgroundImage = `url(${checklistBgImage})`;
    checklistContainer.style.backgroundSize = 'cover';
    checklistContainer.style.backgroundPosition = 'center';
    checklistContainer.style.backgroundRepeat = 'no-repeat';

    const checklistContent = document.createElement('div');
    checklistContent.classList.add('max-w-screen-md', 'w-full', 'bg-white', 'bg-opacity-80', 'p-6', 'rounded-lg', 'shadow-lg', 'flex', 'justify-center', 'items-center');
    checklistContent.appendChild(checklistBlock(checklistItems));
    checklistContainer.appendChild(checklistContent);
    sectionContent.appendChild(checklistContainer);

    section.appendChild(sectionContent);
    return section;
}

function sectionWithClickAndReveal(title, text, clickAndRevealItems, bgImage) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'justify-center', 'items-center');

    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-8', 'py-8', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textElement = textBlock(text);
    textElement.classList.add('text-justify', 'max-w-3xl');
    sectionContent.appendChild(textElement);

    const clickAndRevealContainer = document.createElement('div');
    clickAndRevealContainer.classList.add('w-full', 'py-8', 'flex', 'justify-center', 'items-center', 'click-reveal-container', 'transition-all', 'duration-500', 'ease-in-out', 'rounded-lg');
    clickAndRevealContainer.style.backgroundImage = `url(${bgImage})`;
    clickAndRevealContainer.style.backgroundSize = 'cover';
    clickAndRevealContainer.style.backgroundPosition = 'center';
    clickAndRevealContainer.style.backgroundRepeat = 'no-repeat';

    const clickAndRevealContent = document.createElement('div');
    clickAndRevealContent.classList.add('max-w-screen-md', 'w-full', 'bg-white', 'bg-opacity-80', 'p-6', 'rounded-lg', 'shadow-lg');

    clickAndRevealItems.forEach(item => {
        const revealWrapper = document.createElement('div');
        revealWrapper.classList.add('w-full', 'relative');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('text-lg', 'font-semibold', 'cursor-pointer');
        titleElement.textContent = item.title;

        const answerElement = document.createElement('div');
        answerElement.classList.add('text-gray-700', 'hidden', 'transition-all', 'duration-500', 'ease-in-out');
        answerElement.textContent = item.answer;

        titleElement.addEventListener('click', () => {
            answerElement.classList.toggle('hidden');
            answerElement.classList.toggle('max-h-96');
            answerElement.classList.toggle('overflow-hidden');
            answerElement.classList.toggle('opacity-0');
            answerElement.classList.toggle('opacity-100');
        });

        revealWrapper.appendChild(titleElement);
        revealWrapper.appendChild(answerElement);
        clickAndRevealContent.appendChild(revealWrapper);
    });

    clickAndRevealContainer.appendChild(clickAndRevealContent);
    sectionContent.appendChild(clickAndRevealContainer);

    section.appendChild(sectionContent);
    return section;
}

function sectionWithImageBelow(title, text, imageUrl, isFinalLesson = false) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'justify-center', 'items-center');

    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-8', 'py-8', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textElement = textBlock(text);
    textElement.classList.add('text-justify', 'max-w-3xl');
    sectionContent.appendChild(textElement);

    sectionContent.appendChild(imageBlock(imageUrl));

    if (isFinalLesson) {
        section.classList.add('final-lesson');
        const completeBtn = completeButton();
        sectionContent.appendChild(completeBtn);
    }

    section.appendChild(sectionContent);
    return section;
}

function sectionWithChart(title, text, chartData, chartBgImage) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'justify-center', 'items-center');

    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-8', 'py-8', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textElement = textBlock(text);
    textElement.classList.add('text-justify', 'max-w-3xl');
    sectionContent.appendChild(textElement);

    sectionContent.appendChild(chartBlock(chartData, chartBgImage));

    section.appendChild(sectionContent);
    return section;
}

function createFlipCardSection(title, text, flipCardData) {
    const section = document.createElement('section');
    section.classList.add('min-h-screen', 'flex', 'justify-center', 'items-center', 'py-16');
    
    const sectionContent = document.createElement('div');
    sectionContent.classList.add('max-w-screen-xl', 'w-full', 'px-4', 'flex', 'flex-col', 'items-center', 'space-y-8');

    const numberAndTitle = document.createElement('div');
    numberAndTitle.classList.add('flex', 'flex-col', 'items-center', 'text-center', 'space-y-2');
    sectionContent.appendChild(numberAndTitle);

    const textElement = document.createElement('p');
    textElement.classList.add('text-center', 'max-w-3xl', 'px-4');
    textElement.textContent = text;
    sectionContent.appendChild(textElement);

    const flipCardContainer = document.createElement('div');
    flipCardContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8', 'w-full', 'justify-items-center', 'py-8');
    flipCardData.forEach(card => flipCardContainer.appendChild(flipCard(card)));
    sectionContent.appendChild(flipCardContainer);

    section.appendChild(sectionContent);
    return section;
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof data === "undefined" || !data.sections) {
        console.error("Content data is missing or invalid. Please check data.js.");
        showError("Content data is missing or invalid. Please check data.js.");
        return;
    }

    initSCORM();

    const content = document.getElementById("content");
    let lessonCounter = 0;
    data.sections.forEach((sectionData, index) => {
        let section;
        const isIntro = sectionData.type === "intro";
        const bgIndex = isIntro ? -1 : lessonCounter;
        const defaultBgColor = isIntro ? 'bg-white' : data.theme.bgColors[bgIndex % data.theme.bgColors.length];
        const bgColor = sectionData.bgColor || defaultBgColor;
        const number = sectionData.number !== undefined ? sectionData.number : (isIntro ? null : ++lessonCounter);

        console.log(`Section ${index} (${sectionData.type}, Lesson ${number || 'Intro'}): bgColor=${bgColor}, default=${defaultBgColor}`);

        switch (sectionData.type) {
            case "intro":
                section = introSection(sectionData.image, sectionData.title);
                break;
            case "standard":
                section = createSection(sectionData);
                break;
            case "checklist":
                section = sectionWithChecklist(sectionData.title, sectionData.text, sectionData.items, sectionData.bgImage);
                break;
            case "clickAndReveal":
                section = sectionWithClickAndReveal(sectionData.title, sectionData.text, sectionData.items, sectionData.bgImage);
                break;
            case "imageBelow":
                section = sectionWithImageBelow(sectionData.title, sectionData.text, sectionData.image, sectionData.isFinal);
                break;
            case "chart":
                section = sectionWithChart(sectionData.title, sectionData.text, sectionData.chartData, sectionData.bgImage);
                break;
            case "flipCard":
                section = createFlipCardSection(sectionData.title, sectionData.text, sectionData.items);
                break;
            case "quiz":
                section = sectionWithQuiz(sectionData.title, sectionData.text, sectionData.quiz, sectionData.bgImage);
                break;
        }
        section.dataset.sectionIndex = index;
        applyBackground(section, bgColor);

        if (number !== null) {
            const numberTitleDiv = section.querySelector('.flex.flex-col.items-center.text-center.space-y-2');
            numberTitleDiv.appendChild(numberBlock(number));
            numberTitleDiv.appendChild(titleBlock(sectionData.title));
        }

        content.appendChild(section);
    });

    const fixedNav = createFixedNav();
    content.appendChild(fixedNav);

    document.body.classList.add("loaded");

    fixedNav.querySelectorAll('div').forEach(arrow => {
        arrow.addEventListener('click', () => {
            setTimeout(() => {
                const sections = document.querySelectorAll("section");
                const windowHeight = window.innerHeight;
                const scrollPosition = window.scrollY + (windowHeight / 2);
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && i !== currentSection) {
                        currentSection = i;
                        saveProgress();
                        break;
                    }
                }
            }, 100);
        });
    });
});