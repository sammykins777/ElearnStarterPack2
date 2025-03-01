export function introSection(backgroundImageUrl, titleText) {
    const section = document.createElement('section');
    section.classList.add('h-screen', 'flex', 'items-center', 'justify-center', 'bg-cover', 'bg-center');
    section.style.backgroundImage = `url('${backgroundImageUrl}')`;

    const title = document.createElement('h1');
    title.classList.add(
        'text-2xl',           // Smaller base font size (1.5rem or 24px)
        'sm:text-4xl',        // Scales to 2.25rem (36px) on small screens and up
        'text-yellow-100',    // Text color
        'font-bold',          // Bold
        'text-center',        // Centered text
        'bg-green-900',       // Background color
        'bg-opacity-80',      // Opacity
        'px-4',               // Base padding-x: 1rem (16px) each side
        'sm:px-8',            // 2rem (32px) at sm breakpoint (640px+)
        'md:px-16',           // 4rem (64px) at md breakpoint (768px+)
        'py-8',               // Base padding-y: 2rem (32px)
        'sm:py-12',           // 3rem (48px) at sm breakpoint
        'md:py-24',           // 6rem (96px) at md breakpoint
        'rounded-lg',         // Rounded corners
        'max-w-[90vw]',       // Max width 90% of viewport width to prevent overflow
        'mx-auto'             // Center horizontally
    );
    title.textContent = titleText;

    section.appendChild(title);
    return section;
}