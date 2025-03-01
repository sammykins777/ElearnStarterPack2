export function flipCard(cardData) {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card', 'relative', 'w-64', 'h-80');
    flipCard.tabIndex = 0; // Already focusable

    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    const flipCardFront = document.createElement('div');
    flipCardFront.classList.add('flip-card-front', 'bg-green-700', 'text-yellow-100', 'flex', 'justify-center', 'items-center', 'rounded-lg', 'border-1', 'border-yellow-100', 'p-8');
    flipCardFront.textContent = cardData.placeholderText || 'Placeholder';
    flipCardFront.setAttribute('aria-hidden', 'false'); // Visible by default

    const flipCardBack = document.createElement('div');
    flipCardBack.classList.add('flip-card-back', 'bg-white', 'text-gray-800', 'flex', 'justify-center', 'items-center', 'rounded-lg', 'p-8', 'shadow-lg');
    flipCardBack.textContent = cardData.backText || 'Back Content Here';
    flipCardBack.setAttribute('aria-hidden', 'true'); // Hidden by default

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    let isFlipped = false;
    flipCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            isFlipped = !isFlipped;
            flipCardInner.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
            flipCardFront.setAttribute('aria-hidden', isFlipped ? 'true' : 'false');
            flipCardBack.setAttribute('aria-hidden', isFlipped ? 'false' : 'true');
        }
    });

    flipCard.addEventListener('focus', () => flipCard.classList.add('outline', 'outline-2', 'outline-green-500'));
    flipCard.addEventListener('blur', () => flipCard.classList.remove('outline', 'outline-2', 'outline-green-500'));

    return flipCard;
}