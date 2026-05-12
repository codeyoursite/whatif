const overlay = document.getElementById('zoom-overlay');
const zoomContent = document.getElementById('zoom-content');
const activeIframe = document.getElementById('active-iframe');
const closeBtn = document.getElementById('closeBtn');
const gridItems = document.querySelectorAll('.grid-item');

let lastClickedRect = null; // Store position to zoom back

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        const rect = item.getBoundingClientRect();
        lastClickedRect = rect;
        const url = item.getAttribute('data-url');

        // Initial state: Match the tile position exactly
        zoomContent.style.transition = 'none';
        zoomContent.style.top = rect.top + 'px';
        zoomContent.style.left = rect.left + 'px';
        zoomContent.style.width = rect.width + 'px';
        zoomContent.style.height = rect.height + 'px';
        
        activeIframe.src = url;
        overlay.style.display = 'block';

        // Animate to full screen
        setTimeout(() => {
            overlay.classList.add('active');
            overlay.style.background = 'rgba(0,0,0,0.9)';
            zoomContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            zoomContent.style.top = '40px';
            zoomContent.style.left = '40px';
            zoomContent.style.width = 'calc(100vw - 80px)';
            zoomContent.style.height = 'calc(100vh - 80px)';
        }, 10);

        document.body.style.overflow = 'hidden';
    });
});

const closeZoom = () => {
    if (!lastClickedRect) return;

    // Zoom back to the original tile position
    overlay.style.background = 'rgba(0,0,0,0)';
    zoomContent.style.top = lastClickedRect.top + 'px';
    zoomContent.style.left = lastClickedRect.left + 'px';
    zoomContent.style.width = lastClickedRect.width + 'px';
    zoomContent.style.height = lastClickedRect.height + 'px';
    
    // Cleanup after animation ends
    setTimeout(() => {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        activeIframe.src = '';
        document.body.style.overflow = 'auto';
    }, 400);
};

closeBtn.addEventListener('click', closeZoom);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeZoom(); });
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeZoom(); });
