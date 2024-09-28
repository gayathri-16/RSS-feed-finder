<template>
  <div class="flex flex-col text-black/80 justify-between bg-white h-screen">
  <!-- header -->
    <div
      class="flex flex-row xl:p-16 p-8  bg-custom-teal items-center space-x-3 justify-start w-full xl:w-full"
    >
      <i class="fa-solid fa-wand-magic-sparkles text-blue text-3xl"></i>
      <h4 class="font-bold text-3xl">RSS - FEED</h4>
    </div>

    <!-- body -->

    <div
      class="flex items-start xl:px-16 px-8 flex-col w-full justify-start"
    >
      <div class="flex flex-col items-start space-y-3 justify-start py-3">
        <label for="url" class="font-bold text-l">
          Enter a website URL to get the website's category, thumbnail, and RSS
          feed URL.
        </label>
        <input
          id="url"
          v-model="url"
          @input="sendUrl"
          class="border border-gray-300 p-2 w-full bg-transparent focus:outline-none rounded-lg mt-4 sm:mt-0"
          type="text"
          placeholder="Paste URL"
        />
      </div>

      <div
        class="flex flex-col lg:flex-col w-full md:flex-col md:items-start md:justify-start items-start justify-start py-3"
      >
        <h4 class="font-bold text-l pb-3">Example (feed URL or website)</h4>
        <div
          class="flex flex-col md:flex-row lg:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start justify-start"
        >
          <!-- Each container for the link -->
          <div
            class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-gray-300"
          >
            <p>https://nytimes.com</p>
          </div>
          <div
            class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-gray-300"
          >
            <p>https://youtube.com</p>
          </div>
          <div
            class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-gray-300"
          >
            <p>https://nytimes.com</p>
          </div>
          <div
            class="flex p-2 items-center hover:cursor-pointer border rounded-2xl border-gray-300"
          >
            <p>https://nytimes.com</p>
          </div>
        </div>
      </div>

      <!-- Conditionally display category and RSS feed -->
      <div
        class="flex items-center xl:w-9/12 w-full justify-between sm:flex-row lg:flex-row flex-col"
      >
        <div
          class="flex flex-col items-start justify-start w-full sm:w-auto "
        >
          <div class="flex flex-col sm:flex-row items-start justify-start py-4">
            <h4 class="font-bold text-l">Your URL is categorized as:</h4>
            <p class=" font-bold text-l pl-0 sm:pl-2">
              {{ category }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-start justify-start py-2">
            <h4 class="font-bold text-l">RSS-Feed-Finder:</h4>
            <p class=" font-bold text-l pl-0 sm:pl-2">
              {{ rss_link }}
            </p>
          </div>
        </div>

        <!-- Image box with fixed size -->
        <div v-if="thumbnail" class="image-box mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
          <img
            v-if="thumbnail"
            :src="thumbnail"
            alt="Thumbnail"
            class="object-cover"
          />
        </div>
      </div>
    </div>
<!-- Footer -->
<div
  class="flex flex-row items-center space-x-3 p-4 justify-center w-full border-t border-gray/80 mt-auto"
>
  <i class="fa-regular fa-copyright text-sm"></i>
  <h4 class="font-bold text-sm">2024 RSS Finder</h4>
</div>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      url: "",
      category: "",
      thumbnail: "",
      rss_link: "",
    };
  },
  methods: {
    async sendUrl() {
      if (!this.url) return;
      try {
        console.log("API URL:", process.env.VUE_APP_API_URL);

        const response = await fetch(`${process.env.VUE_APP_API_URL}/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: this.url }),
        });

        const data = await response.json();
        this.category = data.category;
        this.thumbnail = data.thumbnail;
        this.rss_link = data.rssFeed;
      } catch (error) {
        console.error("Error sending URL:", error);
      }
    },
  },
};
</script>

<style scoped>
.image-box {
  width: 100%;
  max-width: 400px; /* Set max width */
  height: 200px; /* Fixed height */
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
  0%,
  100% {
    border-color: rgba(0, 0, 0, 0.5); /* Light white */
  }
  50% {
    border-color:  rgba(0, 0, 0, 0.5); /* Full white */
  }
}

.blinking-border {
  animation: blink 1s infinite; /* Apply the blinking effect */
}


.container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}




</style>
