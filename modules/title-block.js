// title-block.js
export function titleBlock(title) {
    const titleElement = document.createElement('h2');
    titleElement.classList.add('text-2xl', 'text-green-800');
    titleElement.textContent = title;
    return titleElement;
}
