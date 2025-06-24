<template>
  <div class="container-fluid py-2 logos">


<a href="#"><img src="/public/assets/img/playstation_icon.png"/></a>
<a href="#"><img src="/public/assets/img/xbox_game_console_play_icon.png"/></a>
<a href="#"><img src="/public/assets/img/switch_icon.png"/></a>
<a href="#"><img src="/public/assets/img/square_steam_icon.png"/></a>
<a href="#"><img src="/public/assets/img/epic_games_icon.png"/></a>
  </div>
  

</template>

<script setup>

</script>

<style>
.logos{
    height: 200px;
    display: flex;
    justify-content: space-evenly;
    align-items:center;
    background-color: var(--interactive-comp-three);
}

.logos img{
  height: 150px;
}

@media(max-width:800px){
  .logos img{
    height: 80px;
  }
  .logos{
    height: 150px;
  }
}
</style>