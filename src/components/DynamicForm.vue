<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
interface IFieldProps {
  label: string;
  name: string;
  placeholder: string;
  as: string;
  children?: any;
}

interface IFormProps {
  title: string;
  message: {
    description: string;
    action: string;
  };
  schema: {
    fields: IFieldProps[];
  },
  validation: any;
}

defineProps<IFormProps>();
const emit = defineEmits(['handle-form']);
const submit = (data: any) => {
  emit('handle-form', data)
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h1>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Form class="space-y-6" :validation-schema="validation" @submit="submit">
          <div v-for="{ as, name, label, children, ...attrs } in schema.fields" :key="name">
            <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
            <Field :as="as" :id="name" :name="name" v-bind="attrs"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              <template v-if="children && children.length">
                <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag"
                  v-bind="childAttrs">
                  {{ text }}
                </component>
              </template>
            </Field>
            <ErrorMessage :name="name" class="mt-2 text-pink-600 text-sm" />
          </div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

            {{ title }}
          </button>
      </Form>
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-100 text-gray-500">
              Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap justify-center items-center">
            <div>
              <a href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <img class="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="">
              </a>
            </div>
          </div>
        </div>
        <div class="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
          {{ message.description }}<a class="cursor-pointer text-indigo-600 hover:text-indigo-800">{{ message.action }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
