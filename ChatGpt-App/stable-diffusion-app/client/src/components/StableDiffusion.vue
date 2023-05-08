<template>
  <div>
    <div class="grid">
      <div class="col">
        <Card>
          <template #content>
            <form @submit.prevent="handleSubmit" class="max-w-full">
              <div class="grid">
                <div class="col">
                    <div class="field">
                      <Textarea v-model="text2ImageParams.prompt" rows="4" cols="120" autoResize placeholder="promot" />
                    </div>
                    <div class="field">
                      <Textarea v-model="text2ImageParams.negative_prompt" rows="4" cols="120" autoResize placeholder="negative promot" />
                    </div>
                    
                </div>
                <div class="col">
                  <div class="field">
                    <!-- <div class="grid">
                      <div class="col">
                        <InputNumber v-model="text2ImageParams.width" :min="100" :max="1024" placeholder="width" />
                      </div>
                      <div class="col">
                        <InputNumber v-model="text2ImageParams.height" :min="100" :max="1024" placeholder="height" />
                      </div>
                    </div> -->
                  </div>
                  <div class="field">
                    
                  </div>
                </div>
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
              <div v-if="result.images.length > 0" class="grid">
                <div v-for="(item, index) in result.images" :key="index" class="col">
                  <Image :src="'data:image/png;base64,' + item" alt="Image" width="250" preview />
                </div>
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
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import { ref, reactive } from 'vue';

const loading = ref(false);
const text2ImageParams = reactive({
  "prompt": "1 gril, student,sailor suit, short hair, cute smile",
  "seed": -1,
  "sampler_name": "Euler a",
  "batch_size": 6,
  "steps": 32,
  "cfg_scale": 7,
  "width": 512,
  "height": 512,
  "negative_prompt": "nsfw",
  "sampler_index": "Euler"
});
const result = ref({
  images: []
});

const sendRequest = async function() {
  try {
      const request = await fetch("http://localhost:4000/api/text2Image", {
          method: "POST",
          body: JSON.stringify(
            text2ImageParams
          ),
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      });
      const res = await request.json();
      if (res.result) {
        result.value = res.result
      }
      loading.value = false;
  } catch (err) {
      console.error(err);
  }
}

const handleSubmit = () => {
  console.log({ text2ImageParams: text2ImageParams });
  loading.value = true;
  sendRequest();
};
</script>

<style lang="css" scoped>

</style>