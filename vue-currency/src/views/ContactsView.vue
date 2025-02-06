<script setup>
import { reactive } from 'vue';

const form = reactive({
name: '',
email: '',
message: '',
});

// Обработчик отправки формы
const submitForm = () => {
alert(`Спасибо, ${form.name}! Ваше сообщение отправлено.`);
// Здесь можно добавить логику для отправки формы на сервер
form.name = '';
form.email = '';
form.message = '';
};
</script>
<template class="bg-gray-50">
<section class="contacts-page py-10 px-4">
    <div class="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 class="text-4xl font-bold mb-6 text-center">Свяжитесь с нами</h1>

        <!-- Контактная информация -->
        <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Наши контакты</h2>
            <ul class="text-lg leading-relaxed">
            <li><strong>Email:</strong> <a href="mailto:info@currencyplatform.com" class="text-blue-600 hover:underline">info@currencyplatform.com</a></li>
            <li><strong>Телефон:</strong> +7 (495) 123-45-67</li>
            <li><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 123, офис 456</li>
            </ul>
        </div>

        <!-- Форма обратной связи -->
        <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Отправьте нам сообщение</h2>
            <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="name" class="block text-lg font-medium mb-2">Ваше имя</label>
                <input
                v-model="form.name"
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                class="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
                />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-lg font-medium mb-2">Ваш email</label>
                <input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="Введите ваш email"
                class="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
                />
            </div>
            <div class="mb-4">
                <label for="message" class="block text-lg font-medium mb-2">Сообщение</label>
                <textarea
                v-model="form.message"
                id="message"
                rows="5"
                placeholder="Введите ваше сообщение"
                class="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
                ></textarea>
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Отправить
            </button>
            </form>
        </div>

        <!-- Карта -->
        <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Наш офис на карте</h2>
            <iframe
            class="w-full rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24183.021117194575!2d37.6174944!3d55.755826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDYuOSJF!5e0!3m2!1sru!2sru!4v1614786744512!5m2!1sru!2sru"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            ></iframe>
        </div>
    </div>
</section>
</template>

