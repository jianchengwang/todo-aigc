<template>
  <Card>
    <template #content>
      <div class="grid">
      <div class="col">
          <form @submit.prevent="handleSubmit" class="max-w-full">
            <div class="field">
              <Dropdown v-model="selectedModel" :options="models" optionLabel="title" placeholder="选择模型" class="w-full md:w-14rem" @change="changeModel" />
              <Button label="刷新" style="margin-left: 10px;" @click="fetchModels" />
            </div>
            <div class="field">
              <Textarea v-model="text2ImageParams.prompt" rows="4" cols="120" autoResize placeholder="小主，请输入咒语" />
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="width">宽度：</label>
                    <InputNumber id="width" v-model="text2ImageParams.width" />
                </div>
                <div class="field col">
                  <label for="width">高度：</label>
                  <InputNumber id="width" v-model="text2ImageParams.height" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="width">迭代步数：</label>
                    <InputNumber id="width" v-model="text2ImageParams.steps" />
                </div>
                <div class="field col">
                  <label for="width">随机种子：</label>
                  <InputNumber id="width" v-model="text2ImageParams.seed" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="width">提示词相关性：</label>
                    <InputNumber id="width" v-model="text2ImageParams.cfg_scale" />
                </div>
                <div class="field col">
                    <label for="width">批次数量：</label>
                    <InputNumber id="width" v-model="text2ImageParams.batch_size" />
                </div>
            </div>
            <Divider />
            <div class="field">
              <Button label="开始施法" @click="handleSubmit" />
            </div>
          </form>
      </div>
      <div class="col">
        <Checkbox v-model="image2image" :binary="true" />
        <label for="image2image" class="ml-2">图生图</label>
        <div  v-if="image2image" style="margin-top: 1rem;">
          <FileUpload mode="basic" accept="image/*" customUpload @select="customBase64Uploader">          
          </FileUpload>
          <PImage :src="'data:image/png;base64,' + uploadImageBase64" alt="Image" width="250" preview v-if="uploadImageBase64" style="margin-top: 1rem;" />
          <div class="field" style="margin-top: 1rem;">
              <label for="denoising_strength">重绘强度：</label>
              <InputNumber id="denoising_strength" v-model="text2ImageParams.denoising_strength" />
          </div>
        </div>
      </div>
      </div>
      <div v-if="loading" className='loading'>
          <h1>Loading, please wait...</h1>
      </div>
      <div v-else class="max-w-full">
        <div v-if="result.images.length > 0" class="grid">
          <div v-for="(item, index) in result.images" :key="index" class="col">
            <PImage :src="'data:image/png;base64,' + item" alt="Image" width="250" preview />
          </div>
        </div>
      </div>  
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import PImage from 'primevue/image';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import { ref, reactive, onMounted } from 'vue';

const loading = ref(false);
const selectedModel = ref({});
const sd_model_checkpoint = ref("");
const models = ref([])
const image2image = ref(false)
const text2ImageParams = reactive({
  "prompt": "1 gril, student,sailor suit, short hair, cute smile",
  "seed": -1,
  "sampler_name": "Euler a",
  "batch_size": 4,
  "steps": 32,
  "cfg_scale": 7,
  "width": 512,
  "height": 512,
  "negative_prompt": "nsfw",
  "sampler_index": "Euler",

  "denoising_strength": 0.5
});
const result = ref({
  images: []
});
const uploadImageBase64 = ref("");

const fetchOptions = function() {
  fetch("http://127.0.0.1:4000/sdapi/v1/options")
    .then((res) => res.json())
    .then((res) => {
      sd_model_checkpoint.value = res.result.sd_model_checkpoint;
      fetchModels();
    });
}

const fetchModels = function() {
  fetch("http://127.0.0.1:4000/sdapi/v1/sd_models")
    .then((res) => res.json())
    .then((res) => {
      models.value = res.result;
      if(sd_model_checkpoint.value) {
        for(let i=0; i<res.result.length; i++) {
          if(sd_model_checkpoint.value && res.result[i].title == sd_model_checkpoint.value) {
            selectedModel.value = res.result[i];
            break;
          }
        }
      } else {
        selectedModel.value = res.result[0];
        sd_model_checkpoint.value = res.result[0].title;
      }
      changeModel();
    });
}

const changeModel = function() {
  sd_model_checkpoint.value = selectedModel.value.title;
  const option_payload = {
    "sd_model_checkpoint": sd_model_checkpoint.value,
    "CLIP_stop_at_last_layers": 2
  }
  fetch("http://127.0.0.1:4000/sdapi/v1/options", {
    method: "POST",
    body: JSON.stringify(option_payload),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    mode: 'cors'
  })
  .then((res) => res.json())
  .then((res) => {
  });
}

const customBase64Uploader = function(event) {
  const file = event.files[0];
  console.info(file)
  const reader = new FileReader();
  reader.addEventListener('load', function(event) {
    const img = new Image();
    img.addEventListener('load', function() {
      text2ImageParams.width = img.width;
      text2ImageParams.height = img.height;
    });
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
  reader.onload = () => {
    uploadImageBase64.value = reader.result.replace("data:", "").replace(/^.+,/, "");
  };
}

const sendRequest = async function() {
  try {
      const requestBody = {...text2ImageParams};
      if(!selectedModel.value || !selectedModel.value.title.startsWith("dvarchMultiPrompt_dvarchExterior")) {
        requestBody.prompt = requestBody.prompt + ",(masterpiece, best quality:1.2), (ultra detailed), (illustration), (distinct_image), (intricate_details), (delicate illustration)";
        requestBody.negative_prompt = requestBody.negative_prompt + ",nsfw,(worst quality:1.4), (low quality:1.4), EasyNegative, (multiple Views:1.5), (multiple girls:1.5), (extra hands, extra fingers, extra arms, extra legs), cropped hands, extra digit, fewer digit, (bad hands:1.5), (bad antomy:1.5), (fused anatomy), (blurry:1.3), (artist name:1.5), (censored:1.4), (watermark:1.5), (text:1.5), (signature:1.5), (4 fingers, 3 fingers, 2 fingers, 3 legs, 4 legs, 3 hands, 4hands), (fewer than 5 fingers)";
      }
      let fetchUrl = "http://127.0.0.1:4000/sdapi/v1/text2image";
      if(image2image.value) {
        requestBody.init_images = [uploadImageBase64.value];
        fetchUrl = "http://127.0.0.1:4000/sdapi/v1/image2image";
      }
      const request = await fetch(fetchUrl, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          mode: 'cors'
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

onMounted(() => {
  fetchOptions();
});
</script>

<style lang="css" scoped>

</style>