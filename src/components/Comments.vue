<template>
  <div class="container-fluid py-2 commentaires">
    <h2 class="font-weight-light">{{ comms.length }} Commentaires :</h2>
    <div>
      <ul class="media-scroller snaps-inline comms" id="commentairesIn">
        <li v-for="comm in comms" :key="comm.id">
          <div class="comm-card">
            <div class="small">
              <div class="user">
                <img :src="comm.picture" :alt="comm.username" />
                <h3 class="username">{{ comm.username }}</h3>
              </div>
              <div class="stars">
                <span v-for="(star, index) in 5" :key="index">
                  {{ index < comm.rating ? '★' : '☆' }} </span>
              </div>
            </div>
            <div class="texte"></div>
            <h4>
              <TruncatedText :text="comm.text" :maxLength="80" />
            </h4>
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import TruncatedText from './TruncatedText.vue';





const comms = ref([
  {
    id: 1,
    username: 'xXDarkSasukeDu44Xx',
    picture: '/assets/img/gtavi.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '1'
  },
  {
    id: 2,
    username: 'xXDarkSasukeDu44Xx',
    picture: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '2'
  },
  {
    id: 3,
    username: 'xXDarkSasukeDu44Xx',
    picture: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '3'
  },
  {
    id: 4,
    username: 'xXDarkSasukeDu44Xx',
    picture: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '5'
  },
  {
    id: 5,
    username: 'xXDarkSasukeDu44Xx',
    picture: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '3'
  },
  {
    id: 6,
    username: 'xXDarkSasukeDu44Xx',
    picture: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, placeat omnis nostrum facilis ex minima est veniam quibusdam unde dolorum. Fugiat voluptatem iure veritatis sapiente perspiciatis. Suscipit dignissimos neque debitis.',
    rating: '3'
  },

])



</script>


<style scoped>
.commentaires {
  background-color: var(--interactive-comp-one);
  height: 250px;
}

.stars span {
  font-size: 2rem;
  color: var(--text-two);
  height: 45px;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}

li {
  width: 300px;
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
  width: 250px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--border-separator-three);
  padding: 10px;
  margin-bottom: 20px;

}

.comm-card * {
  color: var(--text-high-contrast);
}

.comm-card h3 {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 1.2em
}

.comm-card h4 {
  font-size: 0.8em
}

.comm-card .game-text {
  display: flex;
  justify-content: space-between;
}


#commentairesIn {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 25%;
  gap: 150px;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  scrollbar-color: var(--interactive-comp-two) var(--interactive-comp-one);
}

.user {
  display: flex;
  justify-content: space-between;
}

.user>img {
  border-radius: 100%;
  width: 30px;
}

.username {
  margin-bottom: 0;
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 30px;
}

.snaps-inline>* {
  scroll-snap-align: start;
}

@media (max-width: 1000px) {

  .comm-card {
    width: 200px;
    height: 115px;
  }

  .comm-card .small{
    display: flex;
    flex-direction: row;
  }

  .username {
    display: none;
  }

  .user > img{
    height: 30px;
    margin: 8px;
  }

}


@media (min-width: 1400px) {
  .game-card {
    width: 400px;
    height: 275px;
  }



  #commentairesIn {
    grid-auto-columns: 13%;
    gap: 100px;
  }
}
</style>