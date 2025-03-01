// arrow-nav.js
export function arrowNav() {
    const arrowElement = document.createElement('div');
    arrowElement.classList.add('text-center', 'mt-8', 'w-full');
    
    // Create SVG using SVG namespace
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '32');  // Added explicit width
    svg.setAttribute('height', '32'); // Added explicit height
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'currentColor');
    svg.classList.add('text-green-800', 'animate-bounce', 'mx-auto', 'cursor-pointer');
    
    // Create paths using correct namespace
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('d', 'M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z');
    path1.setAttribute('clip-rule', 'evenodd');
    
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('fill-rule', 'evenodd');
    path2.setAttribute('d', 'M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z');
    path2.setAttribute('clip-rule', 'evenodd');
    
    // Add click event for smooth scrolling
    arrowElement.addEventListener('click', () => {
        const currentSection = arrowElement.closest('section');
        const nextSection = currentSection.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Append paths to SVG
    svg.appendChild(path1);
    svg.appendChild(path2);
    arrowElement.appendChild(svg);

    return arrowElement;
}