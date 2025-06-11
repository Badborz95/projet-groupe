<template>
  <div class="container-fluid py-2">
    <h2 class="font-weight-light">Commentaires :</h2>
    <div>
      <ul class="media-scroller snaps-inline">
        <li v-for="comm in comms" :key="comm.id">
          <div class="comm-card">
            <div class="user">
              <h3 class="username">{{ comm.username }}</h3>
              <div>
                <b-form-rating v-model="comm.rating" readonly></b-form-rating>
                <p class="mt-2">Value: {{ comm.rating }}</p>
              </div>
            </div>
            <div class="texte"></div>
            <h4>{{ comm.text }}</h4>
            <h2></h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import '../style.css';


const comms = ref([
  {
    id: 1,
    username: 'xXDarkSasukeDu44Xx',
    picture: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '3'

  },

])


</script>


<style>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}

a {
  text-decoration: none;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comm-card {
  width: 200px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}


.comm-card h3 {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 1.5em
}

.comm-card h4 {
  font-size: 1em
}

.comm-card .game-text {
  display: flex;
  justify-content: space-between;
}


.media-scroller {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 25%;
  gap: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  scrollbar-color: var(--interactive-comp-two) var(--interactive-comp-one);
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 30px;
}

.snaps-inline>* {
  scroll-snap-align: start;
}

@media (min-width: 1250px) {
  .game-card {
    width: 350px;
    height: 275px;
  }

  .media-scroller {
    grid-auto-columns: 13%;
    gap: 200px;
  }
}
</style>