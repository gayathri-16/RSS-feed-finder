<template>
    <div class="note-container">
      <textarea v-model="note" placeholder="Write your notes here..."></textarea>
      <button @click="saveNote">Save</button>



      <div> <!-- Parent container -->

<!-- header -->
<header class="bg-green-400 py- text-white">
<div class="container mx-auto flex justify-between items-center">

</div>


</header>

 <div class="flex items-center justify-center h-screen">
  
  <div class="flex items-start px-4 h-auto flex-col w-full m-2 sm:w-11/12 md:w-auto lg:w-auto justify-start py-4 shadow-custom">
    <div class="flex flex-col px-4 sm:flex-row sm:items-start lg:items-center justify-start py-4">
      <label for="url" class="font-bold text-xl">Enter URL</label>
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
</div>
    </div>

  </template>
  
  <script>
  // Declare 'chrome' as a global variable to prevent linter errors
  /* global chrome */
  export default {
    data() {
      return {
        note: ''
      };
    },
    created() {
      this.loadNote();
    },
    methods: {
      loadNote() {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0].url;
            chrome.storage.sync.get([url], (result) => {
              this.note = result[url] || '';
            });
          });
        } else {
          console.error('Chrome API is not available. Make sure you are running this as a Chrome extension.');
        }
      },
      saveNote() {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0].url;
            chrome.storage.sync.set({ [url]: this.note }, () => {
              alert('Note saved!');
            });
          });
        } else {
          console.error('Chrome API is not available. Make sure you are running this as a Chrome extension.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .note-container {
    padding: 10px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  textarea {
    width: 100%;
    max-width: 600px; /* Set a max width for larger screens */
    height: 150px;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box; /* Ensure padding does not increase width */
    font-size: 1rem;
    resize: vertical; /* Allow vertical resizing */
  }
  
  button {
    width: 100%;
    max-width: 600px; /* Match the max width of the textarea */
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049; /* Change color on hover */
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .note-container {
      padding: 8px;
    }
  
    textarea, button {
      font-size: 0.9rem;
      max-width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .note-container {
      padding: 5px;
    }
  
    textarea, button {
      font-size: 0.8rem;
      padding: 8px;
      max-width: 100%;
    }
  }
  </style>
  