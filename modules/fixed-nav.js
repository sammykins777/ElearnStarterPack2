export function createFixedNav() {
    const navWrapper = document.createElement('div');
    navWrapper.classList.add('fixed', 'right-8', 'bottom-8', 'z-50');
    
    const arrowContainer = document.createElement('div');
    arrowContainer.classList.add('flex', 'flex-col', 'gap-2');
    
    const upArrow = createArrow('up', 'M12 19V5M5 12l7-7 7 7', 'Navigate to previous section');
    const downArrow = createArrow('down', 'M12 5v14M5 12l7 7 7-7', 'Navigate to next section');
    
    upArrow.addEventListener('click', () => scrollToSection('up'));
    downArrow.addEventListener('click', () => scrollToSection('down'));
    
    arrowContainer.appendChild(upArrow);
    arrowContainer.appendChild(downArrow);
    navWrapper.appendChild(arrowContainer);
    
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection(sections);
        upArrow.style.opacity = currentSection === 0 ? '0.3' : '1';
        upArrow.style.pointerEvents = currentSection === 0 ? 'none' : 'auto';
        downArrow.style.opacity = currentSection === sections.length - 1 ? '0.3' : '1';
        downArrow.style.pointerEvents = currentSection === sections.length - 1 ? 'none' : 'auto';
    });
    
    return navWrapper;
}

function createArrow(direction, pathD, ariaLabel) {
    const arrow = document.createElement('div');
    arrow.classList.add(
        'w-12', 
        'h-12', 
        'text-yellow-100', 
        'rounded-full', 
        'flex', 
        'items-center', 
        'justify-center', 
        'cursor-pointer',
        'hover:bg-green-700',
        'transition-colors',
        'shadow-lg'
    );
    arrow.style.backgroundColor = data.theme.primaryColor;
    arrow.setAttribute('role', 'button'); // Button role for accessibility
    arrow.setAttribute('aria-label', ariaLabel); // Screen reader label
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    svg.appendChild(path);
    arrow.appendChild(svg);
    
    return arrow;
}

function getCurrentSection(sections) {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + (windowHeight / 2);
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            return i;
        }
    }
    return 0;
}

function scrollToSection(direction) {
    const sections = document.querySelectorAll('section');
    const currentIndex = getCurrentSection(sections);
    let targetIndex;
    
    if (direction === 'up') {
        targetIndex = Math.max(0, currentIndex - 1);
    } else {
        targetIndex = Math.min(sections.length - 1, currentIndex + 1);
    }
    
    sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
}