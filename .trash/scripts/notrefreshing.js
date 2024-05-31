document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.tabs .tab a[data-link]');
    const content = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const url = event.target.getAttribute('href');

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const html = await response.text();
                content.innerHTML = html;
                history.pushState(null, '', url);
            } catch (error) {
                console.error('Failed to fetch page:', error);
                content.innerHTML = '<p>Failed to load content. Please try again later.</p>';
            }
        });
    });

    window.addEventListener('popstate', async () => {
        const url = window.location.pathname;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const html = await response.text();
            content.innerHTML = html;
        } catch (error) {
            console.error('Failed to fetch page:', error);
            content.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        }
    });
});
