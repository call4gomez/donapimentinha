// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initProductInteractions();
    initFormValidation();
    initSearchFunctionality();
    initScrollAnimations();
    initSmoothScrolling();
    initProductFilters();
});

// Menu Mobile
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Interações dos Produtos
function initProductInteractions() {
    const productCards = document.querySelectorAll('.produto-card');
    
    productCards.forEach(card => {
        const image = card.querySelector('.produto-image img');
        const detailsBtn = card.querySelector('.btn-detalhes');
        
        // Efeito de zoom na imagem
        if (image) {
            card.addEventListener('mouseenter', function() {
                image.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                image.style.transform = 'scale(1)';
            });
        }
        
        // Ação do botão de detalhes
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('h3').textContent;
                showProductModal(productName, card);
            });
        }
        
        // Click no card inteiro
        card.addEventListener('click', function() {
            const productName = card.querySelector('h3').textContent;
            showProductModal(productName, card);
        });
    });
}

// Modal de Produto
function showProductModal(productName, card) {
    const productInfo = {
        name: productName,
        description: card.querySelector('p').textContent,
        price: card.querySelector('.preco').textContent,
        image: card.querySelector('img').src
    };
    
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${productInfo.image}" alt="${productInfo.name}">
                </div>
                <div class="modal-info">
                    <h2>${productInfo.name}</h2>
                    <p>${productInfo.description}</p>
                    <div class="modal-price">${productInfo.price}</div>
                    <div class="modal-actions">
                        <button class="btn-whatsapp" onclick="contactWhatsApp('${productInfo.name}')">
                            📱 Consultar no WhatsApp
                        </button>
                        <button class="btn-email" onclick="contactEmail('${productInfo.name}')">
                            📧 Enviar E-mail
                        </button>
                    </div>
                    <div class="product-details">
                        <h4>Características:</h4>
                        <ul>
                            <li>✓ Material de alta qualidade</li>
                            <li>✓ Embalagem discreta</li>
                            <li>✓ Entrega rápida e segura</li>
                            <li>✓ Garantia de satisfação</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar estilos do modal
    const modalStyles = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 800px;
            width: 90%;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            z-index: 1;
        }
        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }
        .modal-image img {
            width: 100%;
            border-radius: 10px;
        }
        .modal-info h2 {
            color: #FF4500;
            margin-bottom: 1rem;
        }
        .modal-price {
            font-size: 2rem;
            font-weight: bold;
            color: #FF4500;
            margin: 1rem 0;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .btn-whatsapp, .btn-email {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-whatsapp {
            background: #25D366;
            color: white;
        }
        .btn-email {
            background: #FF4500;
            color: white;
        }
        .btn-whatsapp:hover, .btn-email:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .product-details ul {
            list-style: none;
            padding: 0;
        }
        .product-details li {
            padding: 0.5rem 0;
            color: #666;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    // Adicionar estilos se não existirem
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Contato WhatsApp
function contactWhatsApp(productName) {
    const message = `Olá! Tenho interesse no produto: ${productName}. Gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Contato Email
function contactEmail(productName) {
    const subject = `Interesse no produto: ${productName}`;
    const body = `Olá!\n\nTenho interesse no produto: ${productName}.\nGostaria de mais informações sobre:\n\n- Disponibilidade\n- Formas de pagamento\n- Prazo de entrega\n\nAguardo retorno.\n\nObrigado(a)!`;
    const emailUrl = `mailto:contato@donapimentinha.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
}

// Validação do Formulário
function initFormValidation() {
    const form = document.getElementById('contato-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Limpar mensagens de erro anteriores
            clearErrorMessages();
            
            let isValid = true;
            
            // Validar nome
            if (nome === '') {
                showError('nome', 'Nome é obrigatório');
                isValid = false;
            } else if (nome.length < 2) {
                showError('nome', 'Nome deve ter pelo menos 2 caracteres');
                isValid = false;
            }
            
            // Validar email
            if (email === '') {
                showError('email', 'E-mail é obrigatório');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'E-mail inválido');
                isValid = false;
            }
            
            // Validar mensagem
            if (mensagem === '') {
                showError('mensagem', 'Mensagem é obrigatória');
                isValid = false;
            } else if (mensagem.length < 10) {
                showError('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                submitForm(form);
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch(fieldName) {
        case 'nome':
            if (value === '') {
                showError('nome', 'Nome é obrigatório');
            } else if (value.length < 2) {
                showError('nome', 'Nome deve ter pelo menos 2 caracteres');
            }
            break;
        case 'email':
            if (value === '') {
                showError('email', 'E-mail é obrigatório');
            } else if (!isValidEmail(value)) {
                showError('email', 'E-mail inválido');
            }
            break;
        case 'mensagem':
            if (value === '') {
                showError('mensagem', 'Mensagem é obrigatória');
            } else if (value.length < 10) {
                showError('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
            }
            break;
    }
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar erro
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remover erro anterior
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Adicionar novo erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#FF4500';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    
    formGroup.appendChild(errorDiv);
    field.style.borderColor = '#FF4500';
}

// Limpar erro do campo
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    field.style.borderColor = '#e0e0e0';
}

// Limpar todas as mensagens de erro
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#e0e0e0';
    });
}

// Enviar formulário
function submitForm(form) {
    const submitBtn = form.querySelector('.btn-enviar');
    const originalText = submitBtn.textContent;
    
    // Mostrar loading
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envio (em produção, usar um serviço como Formspree)
    setTimeout(() => {
        // Sucesso
        showSuccessMessage();
        form.reset();
        
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
            text-align: center;
            animation: fadeIn 0.3s ease;
        ">
            ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
    `;
    
    const form = document.getElementById('contato-form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

// Funcionalidade de Busca
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const productCards = document.querySelectorAll('.produto-card');
    
    if (searchInput && searchBtn) {
        // Busca ao clicar no botão
        searchBtn.addEventListener('click', performSearch);
        
        // Busca ao pressionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Busca em tempo real
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query === '') {
                // Mostrar todos os produtos
                productCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                // Filtrar produtos
                productCards.forEach(card => {
                    const productName = card.querySelector('h3').textContent.toLowerCase();
                    const productDesc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (productName.includes(query) || productDesc.includes(query)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query !== '') {
            // Scroll para a seção de produtos
            document.getElementById('produtos').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
}

// Animações de Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.produto-card, .diferencial, .contato-info, .contato-form');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Scroll Suave
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar header fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Filtros de Produtos
function initProductFilters() {
    // Criar botões de filtro
    const produtosSection = document.getElementById('produtos');
    const container = produtosSection.querySelector('.container');
    const sectionTitle = container.querySelector('.section-title');
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.style.cssText = `
        text-align: center;
        margin: 2rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    `;
    
    const categories = ['todos', 'algemas', 'chicotes', 'velas', 'mascaras', 'cordas', 'acessorios'];
    const categoryNames = {
        'todos': 'Todos',
        'algemas': 'Algemas',
        'chicotes': 'Chicotes',
        'velas': 'Velas',
        'mascaras': 'Máscaras',
        'cordas': 'Cordas',
        'acessorios': 'Acessórios'
    };
    
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.textContent = categoryNames[category];
        filterBtn.className = 'filter-btn';
        filterBtn.dataset.category = category;
        
        filterBtn.style.cssText = `
            padding: 0.8rem 1.5rem;
            border: 2px solid #FF4500;
            background: transparent;
            color: #FF4500;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        `;
        
        if (category === 'todos') {
            filterBtn.style.background = '#FF4500';
            filterBtn.style.color = 'white';
            filterBtn.classList.add('active');
        }
        
        filterBtn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = '#FF4500';
            });
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            this.style.background = '#FF4500';
            this.style.color = 'white';
            
            // Filtrar produtos
            filterProducts(category);
        });
        
        filterContainer.appendChild(filterBtn);
    });
    
    container.insertBefore(filterContainer, sectionTitle.nextSibling);
}

// Filtrar produtos por categoria
function filterProducts(category) {
    const productCards = document.querySelectorAll('.produto-card');
    
    productCards.forEach(card => {
        if (category === 'todos' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Efeitos adicionais
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #000000, #333333)';
        header.style.backdropFilter = 'none';
    }
});

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes para mobile
if (isMobile()) {
    // Desabilitar hover effects em mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .produto-card:hover {
                transform: none;
            }
            .produto-card:hover .produto-image img {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Console log para debug (remover em produção)
console.log('🌶️ Dona Pimentinha - Site carregado com sucesso!');