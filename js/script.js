document.addEventListener('DOMContentLoaded', function() {
    // Função para salvar os dados do usuário no LocalStorage
    const cadastroForm = document.getElementById('cadastroForm');
    const messageDiv = document.getElementById('message'); // Referência ao elemento de mensagem

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário

            // Pega os valores dos inputs
            const name = document.getElementById('name').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Armazena os dados no LocalStorage
            const user = {
                name: name,
                username: username,
                email: email,
                password: password
            };
            localStorage.setItem('user', JSON.stringify(user));

            // Exibe a mensagem de sucesso
            console.log('Cadastro realizado com sucesso!'); // Mensagem de depuração
            messageDiv.textContent = 'Cadastro realizado com sucesso!';
            messageDiv.className = 'message success'; // Aplica a classe de sucesso
            messageDiv.style.display = 'block'; // Mostra a mensagem

            // Redireciona para a página de login após um breve delay para que a mensagem seja visível
            setTimeout(function() {
                window.location.href = 'login.html'; // Redireciona para a página de login
            }, 2000); // Delay de 2 segundos
        });
    }

    // Função para validar o login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário

            // Pega os valores dos inputs de login
            const loginUsername = document.getElementById('loginUsername').value;
            const loginPassword = document.getElementById('loginPassword').value;

            // Recupera os dados do usuário armazenados no LocalStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const loginMessage = document.getElementById('loginMessage'); // Referência ao elemento de mensagem

            // Verifica se as credenciais estão corretas
            if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
                loginMessage.textContent = 'Login realizado com sucesso!';
                loginMessage.className = 'login-message success'; // Aplica a classe de sucesso
                loginMessage.style.display = 'block'; // Mostra a mensagem
                
                // Redireciona para a página principal após um breve delay para que a mensagem seja visível
                setTimeout(function() {
                    window.location.href = 'index.html'; // Redireciona para a página principal
                }, 2000); // Delay de 2 segundos
            } else {
                loginMessage.textContent = 'Usuário ou senha incorretos!';
                loginMessage.className = 'login-message error'; // Aplica a classe de erro
                loginMessage.style.display = 'block'; // Mostra a mensagem
            }
        });
    }

    // Carrossel
    let currentSlide = 0;
    const slideInterval = 3000; // Tempo entre as transições em milissegundos (3 segundos)
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const carouselInner = document.querySelector('.carousel-inner');

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        const newTransformValue = -currentSlide * 100;
        carouselInner.style.transform = `translateX(${newTransformValue}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Inicializar carrossel
    showSlide(currentSlide);

    // Avançar slides automaticamente
    setInterval(nextSlide, slideInterval);

    // Adiciona eventos de clique para os controles
    document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);
    document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
});
