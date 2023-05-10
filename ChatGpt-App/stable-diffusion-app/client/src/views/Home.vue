<template>
  <div>
    <TabView>
        <TabPanel header="StableDiffusion">
          <StableDiffusion />
        </TabPanel>
        <TabPanel header="ChatGpt">
          <ChatGpt />
        </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import StableDiffusion from '@/components/StableDiffusion';
import ChatGpt from '@/components/ChatGpt';

</script>

<style lang="css" scoped>

</style>