<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useAuthStore } from "../stores/index.js";
import { useI18n } from 'vue-i18n'
import alerts from '../alerts/alert.js'
const router = useRouter()
const authStore = useAuthStore()
const alert = alerts()
const { tm } = useI18n()

const props = defineProps({
    mode: String
})

const form = ref({})

const checkTitle = () => {
    return props.mode === 'login' ? tm('authPage.loginTitle') : props.mode === 'signup' ? tm('authPage.signupTitle') : props.mode === 'verify' ? tm('authPage.verifyTitle') :tm('authPage.resetTitle') 
}

const email = ref()
const emailForm = ref(false)

const submit = async () => {
    if (props.mode === 'login') {
        const res = await authStore.login(form.value)
        if (res.success) {
            router.push({ path: '/user' })
        }
    } else if (props.mode === 'signup') {
        const res = await authStore.signup(form.value)
        if (res.success) {
            router.push({ path: '/verify' })
        }
    } else if (props.mode === 'resetPassword') {
        const res = await authStore.resetPassword(form.value)
        if (res.success) {
            router.push({ path: '/login' })
        }
    } else {
        const res = await authStore.verify(form.value)
        if (res.success) {
            router.push({ path: '/user' })
        }
    }
}

const resendCode = async () => {
    if (props.mode === 'login') {
        const res = await authStore.createPassword({ email: email.value })
        if (res.success) {
            alert.message('A Code Sent To Your Email')
            router.push({ path: '/resetPassword' })
            emailForm.value = false
        }
    } else {
        const res = await authStore.resendCode(email.value)
        if (res.success) {
            emailForm.value = false
            alert.message('Code Resend')
            router.push({ path: '/verify' })
        }
    }
}

</script>

<template>
    <v-form v-if="emailForm" class="d-flex flex-wrap justify-center align-center h-100 ">
        <v-col cols="10" md="3" class="elevation-0">
            <v-img class="pulse" src="./login.jpg" height="450" width="500" cover></v-img>
        </v-col>
        <v-col cols="10" md="3" class="elevation-0 justify-start align-start">
            <v-card-text align="start">
                <h6 class="text-h6 text-center text-md-left">{{ emailForm }}</h6>
                <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info"
                    variant="plain" name="email" :label="$t('authPage.emailLabel')" type="email"
                    :placeholder="$t('authPage.emailPlaceholder')" v-model="email"
                    @update:modelValue="res => email = res.replace(/[^a-z0-9@ \.,_-]/gim, '')" required />
            </v-card-text>
            <v-btn color="info" block @click="resendCode">{{ $t('authPage.submitBtn') }}</v-btn>
        </v-col>

    </v-form>



    <v-form v-else class="d-flex flex-wrap justify-center align-center h-100 ">
        <v-col cols="10" md="3" class="elevation-0">
            <v-img class="pulse" src="./login.jpg" height="450" width="500" cover></v-img>
        </v-col>
        <v-col cols="10" md="3" class="elevation-0 justify-start align-start">
            <v-card-text align="start">
                <h6 class="text-h6 text-center text-md-left">{{ checkTitle() }}</h6>
                <v-text-field v-if="props.mode === 'signup'" hide-details density="compact"
                    class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="name"
                    :label="$t('authPage.nameLabel')" :placeholder="$t('authPage.namePlaceholder')" v-model="form.name"
                    required />
                <v-text-field v-if="props.mode === 'signup'" hide-details density="compact"
                    class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="phoneNumber"
                    :label="$t('authPage.phoneLabel')" v-model="form.phone" :placeholder="$t('authPage.phonePlaceholder')"
                    required />
                <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info"
                    variant="plain" name="email" :label="$t('authPage.emailLabel')" type="email"
                    :placeholder="$t('authPage.emailPlaceholder')" v-model="form.email"
                    @update:modelValue="res => email = res.replace(/[^a-z0-9@ \.,_-]/gim, '')" required />
                <v-text-field v-if="props.mode === 'verify' || props.mode === 'resetPassword'" hide-details
                    density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="code"
                    :label="$t('authPage.codeLabel')" v-model="form.code" :placeholder="$t('authPage.codePlaceholder')"
                    required />
                <v-text-field v-if="props.mode === 'login' || props.mode === 'resetPassword' || props.mode === 'signup'"
                    hide-details density="compact" class="elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain"
                    name="password" :label="$t('authPage.passwordLabel')" type="password"
                    :placeholder="$t('authPage.passwordPlaceholder')" v-model="form.password"
                    @update:modelValue="res => password = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')" active required />
                <v-btn color="info" block @click="submit">{{ $t('authPage.submitBtn') }}</v-btn>
                <p v-if="props.mode === 'login'" class="py-5">
                    {{ $t('authPage.forgotPasswordTitle') }}
                    <span style="cursor: pointer; text-decoration: none; color: inherit;" class="font-weight-bold"
                        @click="emailForm = 'Reset Password'"> {{ $t('authPage.resetPasswordBtn') }}
                    </span>
                </p>

                <p v-if="props.mode === 'verify'" class="pt-5 pb-0 mb-0">
                    {{ $t('authPage.resendCodeTitle') }}
                    <span style="cursor: pointer; text-decoration: none; color: inherit;" class="font-weight-bold"
                        @click="emailForm = 'Resend Code'">{{ $t('authPage.resendCodeBtn') }}</span>
                </p>
                <p v-if="props.mode === 'login'" class="py-0">
                    {{ $t('authPage.createAccountTitle') }}
                    <router-link style="text-decoration: none; color: inherit;" class="font-weight-bold"
                        to="/registration">{{ $t('authPage.createAccountBtn') }}</router-link>
                </p>
            </v-card-text>
        </v-col>

    </v-form>
</template>
