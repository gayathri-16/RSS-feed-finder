<template>
  <div class="flex items-center justify-center h-screen"> <!-- Parent container -->
    <div class="flex items-start px-4 h-auto flex-col w-full m-2 sm:w-11/12 md:w-auto lg:w-auto justify-start py-4 shadow-custom">
      <div class="flex flex-col px-4 sm:flex-row sm:items-start lg:items-center justify-start py-4">
        <label for="url" class="sm:px-4 font-bold text-xl">Enter URL</label>
        <input 
          id="url"
          v-model="url" 
          @input="sendUrl" 
          class="border border-gray-300 p-2 w-full sm:w-64 focus:outline-none rounded-lg mt-2 sm:mt-0 sm:ml-4" 
          type="text" 
          placeholder="Paste URL"
        >
      </div>

      <div class="flex flex-col sm:flex-row px-4 items-start justify-start py-4">
        <h4 class="font-bold text-xl">Your URL is categorized as</h4>
        <p class="text-pink-700 font-bold text-xl pl-0 sm:pl-4">{{ category }}</p>
      </div>
      <div class="flex flex-col sm:flex-row px-4 items-start justify-start py-4">
        <h4 class="font-bold text-xl">RSS-Feed-Finder:</h4>
        <p class="text-pink-700 font-bold text-xl pl-0 sm:pl-4">{{ rss_link }}</p>
      </div>

      <!-- Image box with fixed size -->
      <div class="image-box"> 
        <img 
          v-if="thumbnail" 
          :src="thumbnail" 
          alt="Thumbnail" 
          class="object-cover"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      url: '', 
      category: '', 
      thumbnail:'',
      rss_link:''

    };
  },
  methods: {
    async sendUrl() {
      if (!this.url) return; 
      try {
        console.log('API URL:', process.env.VUE_APP_API_URL);

        const response = await fetch(`${process.env.VUE_APP_API_URL}/api`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: this.url }),
        });
        
        const data = await response.json();
        this.category = data.category; 
        this.thumbnail = data.thumbnail; 
        this.rss_link = data.rssFeed;

      } catch (error) {
        console.error('Error sending URL:', error);
      }
    },
  },
};
</script>

<style scoped>
.image-box {
  width: 100%;
  max-width: 400px; /* Set max width */
  height: 200px;    /* Fixed height */
  margin-left: 1rem;
  object-fit: cover;
  position: relative;
}

.image-box > img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the box */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}
</style>
