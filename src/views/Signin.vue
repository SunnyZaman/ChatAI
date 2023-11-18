<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import DynamicForm from "../components/DynamicForm.vue";
import * as Yup from 'yup';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { toast, type ToastOptions } from 'vue3-toastify';
const router = useRouter()
const title = ref('Sign in');
const message = ref({
  description: `Don't have an account? `,
  action: 'Sign up',
  link: 'sign-up'
})
const formSchema = ref({
  fields: [
    {
      label: 'Email address',
      name: 'email',
      placeholder: 'Enter your email address',
      as: 'input',
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      as: 'input',
      type: 'password'
    }
  ],
});
const validation = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email').required('This is a required field'),
  password: Yup.string().required('This is a required field')
});
const onSubmit = (data: any) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      console.log("Successfully signed in!");
      router.push("/");
    })
    .catch((error: AuthError) => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      } as ToastOptions);
    })
}
</script>
<template>
  <DynamicForm :title="title" :message="message" :schema="formSchema" :validation="validation" @handle-form="onSubmit" />
</template>

<style scoped></style>

