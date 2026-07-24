// Formulário de contacto — envia por e-mail via Web3Forms (sem backend próprio).
// Configuração necessária: ver README.md > "Configurar o formulário de contacto".

import { t } from '../i18n.js';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(field, message) {
  const wrapper = field.closest('.field');
  const errorEl = wrapper?.querySelector('.field__error');
  wrapper?.classList.toggle('has-error', Boolean(message));
  if (errorEl) errorEl.textContent = message || '';
}

function validate(form) {
  let isValid = true;

  const name = form.elements.name;
  if (!name.value.trim()) {
    setFieldError(name, t('form.error.name'));
    isValid = false;
  } else {
    setFieldError(name, '');
  }

  const email = form.elements.email;
  if (!email.value.trim()) {
    setFieldError(email, t('form.error.email-required'));
    isValid = false;
  } else if (!EMAIL_RE.test(email.value.trim())) {
    setFieldError(email, t('form.error.email-invalid'));
    isValid = false;
  } else {
    setFieldError(email, '');
  }

  return isValid;
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.classList.remove('is-success', 'is-error');
  el.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validate(form)) return;

    if (!ACCESS_KEY || ACCESS_KEY.includes('coloca-aqui')) {
      showStatus(statusEl, t('form.status.not-configured'), 'error');
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t('form.status.sending');

    const payload = {
      access_key: ACCESS_KEY,
      subject: 'Novo pedido de contacto — Leandro Santos Photography',
      from_name: 'Site — Leandro Santos Photography',
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      wedding_date: form.elements.wedding_date.value,
      venue: form.elements.venue.value.trim(),
      message: form.elements.message.value.trim(),
      botcheck: form.elements.botcheck.value,
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        showStatus(statusEl, t('form.status.success'), 'success');
        form.reset();
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18346514684/Y_MqCMHo6dUcEPyxpqxE',
            value: 1.0,
            currency: 'EUR',
          });
        }
      } else {
        showStatus(statusEl, t('form.status.error-api'), 'error');
      }
    } catch (error) {
      showStatus(statusEl, t('form.status.error-network'), 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
