<script setup>
import AppProfileComponent from './components/AppProfileComponent.vue'
import { ModalsContainer } from 'vue-final-modal'
import { usePostStore } from './stores/post'
import { LocalPostDatasource } from './views/datasources/localPostDatasourceImpl'
import { PostRepositoryImpl } from './views/repositories/postRepositoryImpl'
usePostStore().loadRespository(new PostRepositoryImpl(new LocalPostDatasource()))

</script>

<template>
  <div style="max-width: 900px" class="lg:p-12 p-5">
    <header class="flex-col justify-center">
      <app-profile-component />
    </header>

    <RouterView />
  </div>
  <ModalsContainer />
</template>


