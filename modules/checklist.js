export function checklistBlock(checklistItems) {
    console.log('✅ checklistBlock received:', checklistItems);
    const container = document.createElement('div');
    container.classList.add('w-full', 'space-y-2');

    checklistItems.forEach(item => {
        console.log('🟢 Processing checklist item:', item);
        const label = document.createElement('label');
        label.classList.add('flex', 'items-center', 'space-x-2', 'cursor-pointer');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('h-4', 'w-4', 'text-green-600');

        const text = document.createElement('span');
        text.textContent = item;
        text.classList.add('text-gray-700');

        label.appendChild(checkbox);
        label.appendChild(text);
        container.appendChild(label);
    });

    return container;
}

// Add this to main.js's sectionWithChecklist if not already handled:
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
    checklistContainer.classList.add('w-full', 'py-8', 'flex', 'justify-center', 'items-center', 'rounded-lg'); // Added rounded-lg
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