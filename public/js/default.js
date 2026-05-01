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

// CHAMAR AS ROTAS DO BACK END
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form_login');

    if (!form) return; // evita erro em outras páginas

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('login_senha').value;

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha }) // Está enviando os dados em json
            });

            const data = await response.json(); // Retorno dos dados
            console.log(data);

            if (response.ok) {
                window.location.href = "/home.html";
            } else {
                alert(data.erro || 'Login inválido');
            }

        } catch (error) {
            console.error('Erro:', error);
        }
    });
});
