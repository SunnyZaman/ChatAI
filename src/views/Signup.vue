<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import DynamicForm from "../components/DynamicForm.vue";
import * as Yup from 'yup';
import { ref } from 'vue';
import router from "../router/index.js";

const title = ref('Sign up');
// const message = ref("Don't have an account?");
const message = ref({
  description: `Already have an account? `,
  action: 'Sign in',
  link: 'sign-in'
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
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      placeholder: 'Re-enter your password',
      as: 'input',
      type: 'password'
    },
  ],
});
const validation = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email').required('This is a required field'),
  password: Yup.string().min(6).required('This is a required field'),
  confirmPassword: Yup
    .string()
    .required('This is a required field')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
const onSubmit = (data: any) => {
  console.log('From the child:', data);
  createUserWithEmailAndPassword(getAuth(), data.email, data.password)
    .then(() => {
      console.log("Successfully registered!");
      router.push("/");
    })
    .catch((error: AuthError) => {
      console.error(error.code);
    })
}
</script>
<template>
  <DynamicForm :title="title" :message="message" :schema="formSchema" :validation="validation" @handle-form="onSubmit" />
</template>

<style scoped></style>
