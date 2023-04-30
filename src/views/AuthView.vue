<script setup>
import { useRoute } from 'vue-router'
import LoginRegistrationForm from '../components/LoginRegistrationForm.vue';
const route = useRoute()

</script>

<template>
    <Suspense>
        <LoginRegistrationForm :mode="route.name " />
    </Suspense>
</template>