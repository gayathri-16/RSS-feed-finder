<template>
  <div 
    class="flex items-center justify-center bg-zinc-950 h-screen" 
    :style="{ 
      backgroundImage: `url(${require('@/assets/images/rss-bg1.jpg')})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',   
      backgroundPosition: 'center'
    }"
  > 
    <!-- Parent container with glassmorphism and vertical scrollable overflow -->
    <div class="glassmorphism-container text-black mt-10 m-5 flex items-center  flex-col w-full  sm:w-11/12 md:w-8/12 lg:w-full xl:w-11/12 justify-start shadow-custom bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
    <div class="flex items-start  flex-col w-full px-4    sm:w-11/12 md:w-8/12 lg:w-full xl:w-11/12 justify-start ">

      <div class="flex flex-row  items-center space-x-3 justify-start py-4 ">
        <i class="fa-solid fa-wand-magic-sparkles text-custom-teal text-3xl"></i>
        <h4 class="font-bold text-3xl">RSS - FEED</h4>
      </div>
     
      <div class="flex flex-col items-start space-y-3   justify-start py-3">
        <label for="url" class="font-bold text-l "> Enter a website URL to get the website's category, thumbnail, and RSS feed URL.
        </label>
        <input 
          id="url"
          v-model="url" 
          @input="sendUrl" 
          class="border-2 border-white p-2 w-full bg-transparent focus:outline-none rounded-lg mt-4 sm:mt-0 blinking-border " 
          type="text" 
          placeholder="Paste URL"
        >
      </div>

      <div class="flex flex-col lg:flex-col sm:flex-row   items-start  justify-start py-3">
        <h4 class="font-bold text-l pb-3">Example (feed URL or website)</h4>
        <div class="flex flex-col md:flex-row lg:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start justify-start">
          <!-- Each container for the link -->
          <div class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-rose-50 ">
            <p>https://nytimes.com</p> 
          </div>
          <div class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-rose-50 ">
            <p>https://youtube.com</p> 
          </div>
          <div class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-rose-50 ">
            <p>https://nytimes.com</p> 
          </div>
          <div class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-rose-50 ">
            <p>https://nytimes.com</p> 
          </div>
        </div>
      </div> 

      <!-- Conditionally display category and RSS feed -->
      <div class="flex items-center xl:w-10/12 justify-between  sm:flex-row lg:flex-row flex-col">
  <div class="flex flex-col items-start justify-start w-full sm:w-auto py-4">
    <div class="flex flex-col sm:flex-row items-start justify-start py-2">
      <h4 class="font-bold text-l">Your URL is categorized as:</h4>
      <p class="text-white font-bold text-l pl-0 sm:pl-4">{{ category }}</p>
    </div>
    <div class="flex flex-col sm:flex-row items-start justify-start py-2">
      <h4 class="font-bold text-l">RSS-Feed-Finder:</h4>
      <p class="text-white font-bold text-l pl-0 sm:pl-4">{{ rss_link }}</p>
    </div>
  </div>

  <!-- Image box with fixed size -->
  <div class="image-box mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto"> 
    <img 
      v-if="thumbnail" 
      :src="thumbnail" 
      alt="Thumbnail" 
      class="object-cover"
    >
  </div>
</div>

    </div>
   
     <!-- footer -->
     <div class="flex flex-row items-center space-x-3 justify-center py-4 w-full border-t border-white">
  <i class="fa-regular fa-copyright text-sm"></i>
  <h4 class="font-bold text-sm">2024 RSS Finder</h4>
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
      thumbnail: '',
      rss_link: ''
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
@keyframes blink {
  0%, 100% {
    border-color: rgba(255, 255, 255, 0.5); /* Light white */
  }
  50% {
    border-color: rgba(255, 255, 255, 1); /* Full white */
  }
}

.blinking-border {
  animation: blink 1s infinite; /* Apply the blinking effect */
}

.glassmorphism-container {
  max-height: 98vh; /* Ensure max height for scroll */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

::-webkit-input-placeholder {
  color: white;
}

/* For better scroll styles */
.glassmorphism-container::-webkit-scrollbar {
  width: 8px;
}

.glassmorphism-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.glassmorphism-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.glassmorphism-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
