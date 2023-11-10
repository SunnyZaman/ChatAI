<script setup lang="ts">
import DynamicForm from "../components/DynamicForm.vue"
import * as Yup from 'yup';
import { ref } from 'vue'

const title = ref('Sign in');
const message = ref({
  description: `Don't have an account? `,
  action: 'Sign up'
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
  password: Yup.string().min(6).required('This is a required field')
});
const onSubmit = (valueFromChild: any) => {
  console.log('From the child:', valueFromChild);
}
</script>
<template>
  <DynamicForm :title="title" :message="message" :schema="formSchema" :validation="validation" @send-message="onSubmit" />
</template>

<style scoped></style>

