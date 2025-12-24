<template>
  <section class="contact-form-section">
    <header class="contact-header">
      <h2>Get in Touch</h2>
      <p>Send me a message directly</p>
    </header>

    <form @submit.prevent="handleSubmit" class="contact-form" v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Your name"
          required
          @blur="validateField('name')"
        />
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="your.email@example.com"
          required
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          placeholder="What's this about?"
          required
          @blur="validateField('subject')"
        />
        <span v-if="errors.subject" class="error-text">{{ errors.subject }}</span>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          placeholder="Your message here..."
          rows="6"
          required
          @blur="validateField('message')"
        ></textarea>
        <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
      </div>

      <div class="form-actions">
        <button
          type="submit"
          class="btn-submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Sending...' : 'Send Message' }}
        </button>
        <span v-if="error" class="error-message">{{ error }}</span>
      </div>
    </form>

    <div v-else class="success-message">
      <h3>✓ Message Sent!</h3>
      <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
      <button @click="resetForm" class="btn-reset">Send Another Message</button>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { getAccessTokenSilently, user } = useAuth0();

const submitted = ref(false);
const isLoading = ref(false);
const error = ref(null);

const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  subject: '',
  message: '',
});

const errors = reactive({
  name: null,
  email: null,
  subject: null,
  message: null,
});

const validateField = (field) => {
  switch (field) {
    case 'name':
      errors.name = form.name.trim().length < 2 ? 'Name must be at least 2 characters' : null;
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = !emailRegex.test(form.email) ? 'Please enter a valid email' : null;
      break;
    case 'subject':
      errors.subject = form.subject.trim().length < 3 ? 'Subject must be at least 3 characters' : null;
      break;
    case 'message':
      errors.message = form.message.trim().length < 10 ? 'Message must be at least 10 characters' : null;
      break;
  }
};

const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('subject');
  validateField('message');

  return !Object.values(errors).some((err) => err !== null);
};

const handleSubmit = async () => {
  error.value = null;

  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    // Get access token from Auth0
    const token = await getAccessTokenSilently();

    // Send contact form to backend
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        userId: user.value?.sub,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    submitted.value = true;
  } catch (err) {
    console.error('Contact form error:', err);
    error.value = err.message || 'Failed to send your message. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  form.name = user.value?.name || '';
  form.email = user.value?.email || '';
  form.subject = '';
  form.message = '';
  submitted.value = false;
  error.value = null;
  Object.keys(errors).forEach((key) => {
    errors[key] = null;
  });
};
</script>

<style scoped>
.contact-form-section {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
  border: 1px solid #e0e0e0;
}

.contact-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #007bff;
  padding-bottom: 1rem;
}

.contact-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.contact-header p {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.95rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.error-text {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-submit,
.btn-reset {
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-submit:hover:not(:disabled),
.btn-reset:hover {
  background: #0056b3;
}

.btn-submit:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.success-message h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.success-message p {
  margin: 0 0 1.5rem 0;
  font-size: 0.95rem;
}

@media (max-width: 600px) {
  .contact-form-section {
    padding: 1.5rem;
  }

  .form-group input,
  .form-group textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>
