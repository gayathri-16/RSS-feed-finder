<template>
  <div class="flex items-center justify-center h-screen"> <!-- Parent container -->
    <div class="flex items-start px-4 h-1/2 flex-col w-1/2 justify-start py-4 shadow-custom">
      <div class="flex items-center justify-start py-4">
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

      <div class="flex px-4 items-start justify-start py-4">
        <h4 class="font-bold text-xl">Your URL is categorized as</h4>
        <p class="text-pink-700 font-bold text-xl pl-4">{{ category }}</p>
      </div>

      <div class="image-box"> <!-- Add overflow-hidden -->
        <img 
          v-if="thumbnail" 
          :src="thumbnail" 
          alt="Thumbnail" 
          class=""
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
      thumbnail:''
    };
  },
  methods: {
    async sendUrl() {
      if (!this.url) return; 
      try {
        
        const response = await fetch(`${process.env.API_URL}/api`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: this.url }),
        });
        
        const data = await response.json();
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
.image-box{
  width:400px;
  height:300px;
  margin-left:1rem;
  object-fit: cover;
position:relative;
}
.image-box > img{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}
</style>
