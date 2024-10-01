<template>
  <div class="flex flex-col text-black/80 justify-between bg-white h-screen">
    <!-- header -->
    <div
      class="flex flex-row xl:p-16 p-8 bg-custom-teal items-center space-x-3 justify-start w-full xl:w-full"
    >
      <i class="fa-solid fa-wand-magic-sparkles text-blue text-3xl"></i>
      <h2 class="font-bold text-3xl">RSS - FEED</h2>
    </div>

    <!-- body -->

    <div class="flex items-start xl:px-16 px-8 flex-col w-full justify-start">
      <div class="flex flex-col items-start space-y-3 justify-start py-3">
        <p class="lg:text-normal sm:text:sm md:text-md text-sm">
          Enter a website URL to get the website's category, thumbnail, and RSS
          feed URL.
        </p>
        <div class="flex w-full space-x-4 items-center">
          <input
            id="url"
            v-model="url"
            class="border border-custom-teal p-2 flex-1 w-full bg-transparent focus:outline-none rounded-lg sm:mt-0"
            type="text"
            placeholder="Paste URL"
          />
          <button
            @click="sendUrl"
            class="lg:text-normal sm:text:sm md:text-md text-sm border p-2 flex-0.5 rounded border-custom-teal btn-animation"
          >
            Search
          </button>
        </div>
      </div>

      <div
        class="flex flex-col xl:flex-row xl:w-9/12 w-full m-2 justify-between"
      >
        <div class="flex flex-col items-start justify-start w-full sm:w-auto">
          <div
            class="flex sm:flex-row items-center space-x-2 justify-start py-4"
          >
            <p class="lg:text-normal sm:text:sm md:text-md text-sm">
              Your URL is categorized as:
            </p>
            <p
              v-if="category"
              class="lg:text-normal sm:text:sm md:text-md text-sm pl-2"
            >
              {{ category }}
            </p>
            <div
              v-else
              class="p-2 hover:cursor-not-allowed lg:text-normal sm:text:sm md:text-md text-sm capitalize border border-custom-teal rounded-xl"
            >
              ex: technology
            </div>
          </div>
          <div
            class="flex sm:flex-row items-center space-x-2 justify-start py-2"
          >
            <p class="lg:text-normal sm:text:sm md:text-md text-sm">
              RSS-Feed-Finder:
            </p>
            <p
              v-if="rss_link"
              class="lg:text-normal sm:text:sm md:text-md text-sm pl-2"
            >
              {{ rss_link }}
            </p>
            <div
              v-else
              class="p-2 hover:cursor-not-allowed lg:text-normal sm:text:sm md:text-md text-sm capitalize border border-custom-teal rounded-xl"
            >
              ex: https://example.com/rss-feed
            </div>
          </div>
        </div>

        <!-- Image box with fixed size -->
        <div v-if="thumbnail" class="image-box m-0 p-0 w-full sm:w-auto">
          <img
            v-if="thumbnail"
            :src="thumbnail"
            alt="Thumbnail"
            class="object-cover"
          />
        </div>
      </div>
    </div>

    <!-- loader -->
    <section v-if="loading" >
      <div class="dots">
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7;"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>





      </div>
    </section>
    <!-- Footer -->
    <div
      class="flex flex-row items-center space-x-3 p-4 justify-center w-full border-t border-gray/80 mt-auto"
    >
      <i
        class="fa-regular fa-copyright lg:text-normal sm:text:sm md:text-md text-sm"
      ></i>
      <h4 class="lg:text-normal sm:text:sm md:text-md text-sm">
        2024 RSS Finder
      </h4>
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
      thumbnail: null,
      rss_link: "",
      loading:false
    };
  },
  methods: {
    async sendUrl() {
      if (!this.url) return;
      this.loading = true; 
      try {
        console.log("API URL:", process.env.VUE_APP_API_URL);

        const response = await fetch("https://localhost:8000/api", {
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
      finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* loader */
section{
  display: flex;
  align-items: center;
  justify-content: center;
}
.dots span{
  position:absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #6AF2F0;
  transform: rotate(calc(var(--i) * (360deg/15))) translateY(35px);
  animation: animate 1.5s linear infinite;
  animation-delay:calc(var(--i) * 0.1s);
  opacity:0;

}
@keyframes animate {
  0%{
    opacity:1
  }
  100%{
    opacity: 0;
  }
}
.image-box {
  width: 100%;
  max-width: 400px; /* Set max width */
  height: 200px; /* Fixed height */
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
    border-color: rgba(0, 0, 0, 0.5); /* Full white */
  }
}

.blinking-border {
  animation: blink 1s infinite; /* Apply the blinking effect */
}

.container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.btn-animation {
  transform: scale(1);
  transition: background-color 0.5s ease, transform 0.5s ease;
}
.btn-animation:hover {
  transform: scale(1.1);
  background-color: #6af2f0;
}
</style>
