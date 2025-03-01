export function chartBlock(chartData, chartBgImage) {
    const container = document.createElement('div');
    container.classList.add('w-full', 'max-w-screen-md', 'grid', 'grid-cols-2', 'gap-4', 'rounded-lg', 'p-4'); // Added p-4 for whitespace
    container.style.backgroundImage = `url(${chartBgImage})`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundRepeat = 'no-repeat';

    const leftColumn = document.createElement('div');
    leftColumn.classList.add('flex', 'flex-col', 'space-y-2');

    const rightColumn = document.createElement('div');
    rightColumn.classList.add('flex', 'flex-col', 'space-y-2');

    const leftTitle = document.createElement('h3');
    leftTitle.classList.add('text-lg', 'font-bold', 'text-center');
    leftTitle.textContent = 'Left';
    leftColumn.appendChild(leftTitle);

    const rightTitle = document.createElement('h3');
    rightTitle.classList.add('text-lg', 'font-bold', 'text-center');
    rightTitle.textContent = 'Right';
    rightColumn.appendChild(rightTitle);

    chartData.left.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('bg-white', 'bg-opacity-80', 'p-2', 'rounded-lg', 'text-center');
        p.textContent = item;
        leftColumn.appendChild(p);
    });

    chartData.right.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('bg-white', 'bg-opacity-80', 'p-2', 'rounded-lg', 'text-center');
        p.textContent = item;
        rightColumn.appendChild(p);
    });

    container.appendChild(leftColumn);
    container.appendChild(rightColumn);

    return container;
}