<template>
  <div class="app">
    <h1>Website Idea Generator</h1>
    <form @submit.prevent="handleSubmit">
      <label for="description">Enter the description</label>
      <textarea
        id="description"
        name="description"
        rows="6"
        v-model="description"
      ></textarea>
      <button type="submit">GENERATE</button>
    </form>

    <div v-if="loading" className='loading'>
          <h1>Loading, please wait...</h1>
    </div>

    <div class="result-container">
      <div v-if="result.length > 0">
        <div v-for="(item, index) in result" :key="index">
          <img :src="'data:image/png;base64,' + item.logoImage" :alt="item.domainName" class="image" />
          <p>Domain: {{ item.domainName }}</p>
        </div>
      </div>
    </div>  
  </div>
</template>

<script setup>
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
      console.log(res);
      if (res.result) {
        result.value = res.result
      }
  } catch (err) {
      console.error(err);
  }
}

const handleSubmit = () => {
  console.log({ description: description.value });
  loading.value = true;
  sendDescription();
  loading.value = false;
  description.value = '';
};
</script>

<style>
/* Styles go here */
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Space Grotesk", sans-serif;
}
.app,
.loading,
.result__container > div {
    display: flex;
    align-items: center;
    justify-content: center;
}
.app {
    width: 100%;
    margin: 50px auto;
    flex-direction: column;
}
.app > h1 {
    margin-bottom: 30px;
    color: #2b3467;
}
form {
    display: flex;
    flex-direction: column;
    width: 80%;
}
textarea {
    padding: 20px;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 5px;
    margin: 5px 0px;
    box-shadow: 0 2px 8px 0 rgba(99, 99, 99, 0.2);
}
button {
    margin-top: 15px;
    display: inline-block;
    width: 200px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
    background-color: #f0dbdb;
}
.loading {
    width: 100%;
    height: 100vh;
    background-color: #fefcf3;
}
.result__container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
}
.result__container > div {
    margin: 5px;
    flex-direction: column;
}
.image {
    width: 400px;
    height: 300px;
    margin-bottom: 15px;
}
</style>
