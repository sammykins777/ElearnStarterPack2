// text-block.js
export function textBlock(text) {
    const textElement = document.createElement('div');
    textElement.classList.add('flex-1', 'px-4');
    const paragraph = document.createElement('p');
    paragraph.classList.add('text-lg');
    paragraph.textContent = text;
    textElement.appendChild(paragraph);
    return textElement;
}
