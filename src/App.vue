<template>
  <div id="app">
    <div class="app-header">
      <div class="app-title">Todo List</div>
      <a-button shape="circle" icon="user" @click="userMenu = true"/>
      <a-modal title="Set up your contact info" 
        v-model="userMenu"
        :footer="null">
        <user-data @close="userMenu = false"/>  
      </a-modal>
    </div>
    <Todos/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, ref } from '@vue/composition-api';
import Todos from './components/Todos/index.vue';
import UserData from './components/UserData.vue';
import { userData } from './utils/userData';

export default createComponent({
  name: 'app',
  components: {
    Todos,
    UserData
  },
  setup() {
    const userMenu = ref<boolean>(false)

    return {
      userMenu
    }
  }
});
</script>

<style>
body {
  box-sizing: border-box;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100%;
  background-image: url('https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg');
  background-position: center;
  background-size: cover;
}

.app-header {
  min-width: 350px;
  max-width: 40%;
  margin: 0 auto;
  padding: 20px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-title {
  color: #fff;
  font-size: 1.5rem;
}
</style>
