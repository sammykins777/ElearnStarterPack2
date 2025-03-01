// number-block.js
export function numberBlock(sectionNumber) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('bg-green-800', 'text-yellow-100', 'p-2', 'rounded-full', 'text-lg', 'font-bold', 'mb-2', 'w-16', 'h-16', 'flex', 'items-center', 'justify-center');
    numberElement.textContent = sectionNumber;
    return numberElement;
}
