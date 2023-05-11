<template>
    <div>
      <div class="grid">
        <div class="col">
          <Card>
            <template #content>
              <form @submit.prevent="handleSubmit" class="max-w-full">
                <div class="field">
                  <Textarea v-model="prompt" rows="4" cols="120" autoResize />
                </div>
                <div class="field">
                    <Button label="GENERATE" @click="handleSubmit" />
                </div>
              </form>
              <Divider />
              <div v-if="loading" className='loading'>
                  <h1>Loading, please wait...</h1>
              </div>
              <div v-else class="max-w-full">
                <div v-if="result.length > 0">
                    <article class="prose prose-xl" v-html="result" />
                </div>
              </div>  
            </template>
        </Card> 
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Card from 'primevue/card';
  import Textarea from 'primevue/textarea';
  import Button from 'primevue/button';
  import Image from 'primevue/image';
  import Divider from 'primevue/divider';
  import { ref, reactive } from 'vue';
  
  const loading = ref(false);
  const conversationId = ref("");
  const parentMessageId = ref("");
  const prompt = ref("");
  const result = ref("");
  
  const sendRequest = async function() {
    try {
        const request = await fetch("http://101.34.12.71:7862/api/chatGpt", {
            method: "POST",
            body: JSON.stringify(
              {
                conversationId: conversationId.value,
                parentMessageId: parentMessageId.value,
                prompt: prompt.value,
              }
            ),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const res = await request.json();
        if (res.result) {
          conversationId.value = res.result.conversationId;
          parentMessageId.value = res.result.parentMessageId;
          result.value = marked.parse(res.result.text)
        }
        loading.value = false;
    } catch (err) {
        console.error(err);
    }
  }
  
  const handleSubmit = () => {
    console.log({ prompt: prompt.value });
    loading.value = true;
    sendRequest();
  };
  </script>
  
  <style lang="css" scoped>
  
  </style>