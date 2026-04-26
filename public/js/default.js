// Função para carregar os recursos
function carregarDependencias() {
    // CSS Bootstrap
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    // Seu CSS
    const linkcss = document.createElement('link');
    linkcss.rel = 'stylesheet';
    linkcss.href = './css/default.css';
    document.head.appendChild(linkcss);

    // Font Awesome
    const linkIcons = document.createElement('link');
    linkIcons.rel = 'stylesheet';
    linkIcons.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(linkIcons);   

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = './img/logo_estrela.png'; // caminho do seu ícone

    document.head.appendChild(favicon);
}

// Chamar a função
carregarDependencias();

function toggleSenha(id, icone) {
    const input = document.getElementById(id);
    if (input.type === 'password') {
        input.type = 'text';
        icone.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icone.classList.replace('fa-eye-slash', 'fa-eye');
    }   
}