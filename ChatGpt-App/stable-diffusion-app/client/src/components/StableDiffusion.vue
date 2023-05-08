<template>
  <div>
    <div class="grid">
      <div class="col">
        <Card>
          <template #content>
            <form @submit.prevent="handleSubmit">
              <label for="description">Enter the description</label>
              <textarea
                id="description"
                name="description"
                rows="6"
                v-model="description"
              ></textarea>
              <button type="submit">GENERATE</button>
              <div v-if="loading" className='loading'>
                  <h1>Loading, please wait...</h1>
              </div>
            </form>
            </template>
      </Card> 
        
      </div>
      <div class="col">
        <Card>
          <template #content>
            <div class="result-container">
            <div v-if="result.length > 0">
              <div v-for="(item, index) in result" :key="index">
                <img :src="'data:image/png;base64,' + item.logoImage" :alt="item.domainName" class="image" />
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
import { ref } from 'vue';

const loading = ref(false);
const description = ref("");
const result = ref([]);

const sendDescription = async function() {
  try {
      const request = await fetch("http://localhost:4000/api", {
          method: "POST",
          body: JSON.stringify({
              prompt: description.value,
          }),
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
      description.value = '';
  } catch (err) {
      console.error(err);
  }
}

const handleSubmit = () => {
  console.log({ description: description.value });
  loading.value = true;
  sendDescription();
};
</script>

<style lang="css" scoped>

</style>