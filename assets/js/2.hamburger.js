function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menuButton');
    const content = document.getElementById('content');
    const isOpen = !sidebar.classList.contains('-translate-x-full');

    sidebar.classList.toggle('-translate-x-full');
    content.classList.toggle('md:ml-64');
    // menuButton.textContent = isOpen ? '☰' : '✕';
}

toggleSidebar();