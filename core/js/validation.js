// core/js/validation.js
document.addEventListener('DOMContentLoaded', () => {
    // Inject Validation CSS dynamically
    if (!document.querySelector('link[href*="validation.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../core/css/validation.css';
        document.head.appendChild(cssLink);
    }

    const inputs = document.querySelectorAll('input, select, textarea');
    
    // Auto-add required to all inputs for this prototype (except radios/checkboxes/search)
    inputs.forEach(input => {
        if (!input.hasAttribute('required') && !['radio', 'checkbox', 'search', 'submit', 'button', 'hidden'].includes(input.type)) {
            input.setAttribute('required', 'true');
        }
    });

    const rules = {
        required: (val) => val.trim() !== '' || 'Este campo es obligatorio',
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Correo electrónico inválido',
        minLength: (val, min) => val.length >= min || `Mínimo ${min} caracteres`,
        maxLength: (val, max) => val.length <= max || `Máximo ${max} caracteres`,
        number: (val) => /^\d+$/.test(val) || 'Solo se permiten números',
        password: (val) => {
            if (val.length < 8) return 'Mínimo 8 caracteres';
            if (!/[A-Za-z]/.test(val)) return 'Debe contener letras';
            if (!/\d/.test(val)) return 'Debe contener números';
            return true;
        },
        name: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val) || 'Solo letras permitidas',
        phone: (val) => /^\d{10}$/.test(val.replace(/\s+/g, '')) || 'Celular inválido (10 dígitos)'
    };

    function getErrorContainer(input) {
        let target = input;
        if (input.parentElement.classList.contains('relative')) {
            target = input.parentElement;
        } else if (input.parentElement.classList.contains('flex') && input.parentElement.tagName !== 'FORM') {
             // Handle Select + Input combo
             if (input.tagName === 'INPUT' && input.type === 'number' && input.previousElementSibling?.tagName === 'SELECT') {
                 target = input.parentElement;
             }
             // Handle OTP container where multiple inputs are side by side
             else if (input.parentElement.querySelectorAll('input').length > 1) {
                 target = input.parentElement;
             }
        }
        return target;
    }

    function showError(input, message) {
        input.classList.add('input-invalid');
        input.classList.remove('input-valid');
        
        const target = getErrorContainer(input);
        let errorEl = target.nextElementSibling;
        
        if (!errorEl || !errorEl.classList.contains('error-message')) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message text-error text-label-sm font-label-sm mt-1';
            target.parentNode.insertBefore(errorEl, target.nextSibling);
        }
        errorEl.textContent = message;
    }

    function clearError(input) {
        input.classList.remove('input-invalid');
        const target = getErrorContainer(input);
        let errorEl = target.nextElementSibling;
        
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.remove();
        }
        
        if (input.value.trim() !== '') {
            input.classList.add('input-valid');
        } else {
            input.classList.remove('input-valid');
        }
    }

    function validateInput(input) {
        let isValid = true;
        let errorMessage = '';

        const val = input.value;
        const type = input.type;
        
        if (['radio', 'checkbox', 'hidden', 'submit', 'button'].includes(type)) return true;

        if (input.required || input.hasAttribute('required')) {
            const reqCheck = rules.required(val);
            if (reqCheck !== true) { isValid = false; errorMessage = reqCheck; }
        }

        if (isValid && val.trim() !== '') {
            if (type === 'email') {
                const check = rules.email(val);
                if (check !== true) { isValid = false; errorMessage = check; }
            } else if (type === 'tel') {
                const check = rules.phone(val);
                if (check !== true) { isValid = false; errorMessage = check; }
            } else if (type === 'number') {
                const check = rules.number(val);
                if (check !== true) { isValid = false; errorMessage = check; }
            } else if (type === 'password') {
                if (input.id === 'pin') {
                    if (val.length < 4) { isValid = false; errorMessage = 'El PIN debe ser de 4 dígitos'; }
                } else {
                    const check = rules.password(val);
                    if (check !== true) { isValid = false; errorMessage = check; }
                }
            } else if (input.id === 'id_number' || input.id === 'amount' || (input.placeholder && input.placeholder.includes('Número'))) {
                const check = rules.number(val);
                if (check !== true) { isValid = false; errorMessage = check; }
            } else if (input.placeholder && (input.placeholder.includes('Ej. Juan') || input.placeholder.toLowerCase().includes('nombre'))) {
                const check = rules.name(val);
                if (check !== true) { isValid = false; errorMessage = check; }
            }
            
            if (isValid && input.hasAttribute('minlength')) {
                const min = parseInt(input.getAttribute('minlength'));
                const check = rules.minLength(val, min);
                if (check !== true) { isValid = false; errorMessage = check; }
            }
            if (isValid && input.hasAttribute('maxlength')) {
                const max = parseInt(input.getAttribute('maxlength'));
                const check = rules.maxLength(val, max);
                if (check !== true) { isValid = false; errorMessage = check; }
            }
            
            // Validate against specific confirm password if exists
            const confirmPass = document.getElementById('password-confirm');
            if (isValid && confirmPass && input.id === 'password-confirm') {
                const mainPass = document.getElementById('password-input');
                if (mainPass && val !== mainPass.value) {
                    isValid = false;
                    errorMessage = 'Las contraseñas no coinciden';
                }
            }
        }

        if (!isValid) {
            showError(input, errorMessage);
        } else {
            clearError(input);
        }

        return isValid;
    }

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('input-invalid')) {
                validateInput(input);
            } else if (input.value.trim() === '') {
                clearError(input);
            }
        });
    });

    // Validate on submit globally using capture phase
    window.addEventListener('submit', (e) => {
        const form = e.target;
        if (form.tagName === 'FORM') {
            form.setAttribute('novalidate', 'true');
            let isFormValid = true;
            let firstInvalidInput = null;

            const formInputs = form.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                    if (!firstInvalidInput) firstInvalidInput = input;
                }
            });

            if (!isFormValid) {
                e.preventDefault();
                e.stopPropagation();
                if (firstInvalidInput) {
                    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalidInput.focus();
                }
            }
        }
    }, true);

    // Validate on custom button clicks that act as submit (Next, Continue, Entrar)
    window.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn) {
            const btnText = btn.textContent.toLowerCase();
            if (btn.id === 'continue-btn' || btn.id === 'next-btn' || btnText.includes('entrar') || btnText.includes('continuar')) {
                const container = btn.closest('section, main, form');
                if (!container) return;
                
                // If it's a submit button inside a form, let the 'submit' event handle it
                if (container.tagName === 'FORM' && btn.type === 'submit') return;

                // For multi-step or non-form sections, validate only visible inputs
                const visibleInputs = Array.from(container.querySelectorAll('input, select, textarea'))
                    .filter(i => i.offsetParent !== null && !i.readOnly && !i.disabled);
                
                if (visibleInputs.length > 0) {
                    let isFormValid = true;
                    let firstInvalidInput = null;
                    
                    visibleInputs.forEach(input => {
                        if (!validateInput(input)) {
                            isFormValid = false;
                            if (!firstInvalidInput) firstInvalidInput = input;
                        }
                    });

                    if (!isFormValid) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (firstInvalidInput) {
                            firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            firstInvalidInput.focus();
                        }
                    }
                }
            }
        }
    }, true);
});
