<template>
  <div class="flex items-start flex-col w-full justify-start py-4">
    <div class="flex items-center  justify-start py-4">
      <label for="url" class="px-4 font-bold text-xl">Enter URL</label>
      <input 
        id="url"
        v-model="url" 
        @input="sendUrl" 
        class="border border-gray-300 p-2 w-64 focus:outline-none rounded-lg" 
        type="text" 
        placeholder="Paste URL"
      >
    </div>

    <div class="flex items-center">
      <h4 class="px-4 font-bold text-xl">Your URL is categorized as</h4>
      <p class="text-pink-700 font-bold text-xl">{{ category }}</p>
    </div>

    <img v-if="thumbnail" :src="thumbnail" alt="Thumbnail" class="mt-4  px-4 w-1/3 h-full">

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      url: '', 
      category: '', 
      thumbnail:''
    };
  },
  methods: {
    async sendUrl() {
      if (!this.url) return; 
      try {
        const response = await fetch('http://localhost:8000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: this.url }), // Sending the URL in the request body
        });
        
        const data = await response.json(); // Assuming the response is JSON
        this.category = data.category; 
        this.thumbnail = data.thumbnail; 

      } catch (error) {
        console.error('Error sending URL:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
