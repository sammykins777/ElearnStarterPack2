export function imageBlock(imageUrl) {
    const imageElement = document.createElement('div');
    imageElement.classList.add('flex-1', 'px-4', 'max-w-full', 'overflow-hidden', 'sm:max-w-lg', 'sm:mx-0', 'mx-auto');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Section Image';
    img.classList.add('w-full', 'h-auto', 'max-h-80', 'rounded-lg', 'shadow-md', 'object-cover');
    imageElement.appendChild(img);
    return imageElement;
}