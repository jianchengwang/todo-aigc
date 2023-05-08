<template>
  <div>
    <TabView>
        <TabPanel header="Stable-Diffusion">
          <StableDiffusion />
        </TabPanel>
        <TabPanel header="ChatGpt">
        </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import StableDiffusion from '@/components/StableDiffusion';

</script>

<style lang="css" scoped>

</style>