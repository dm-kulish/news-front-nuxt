<template>
  <div>
    <Post
      v-for="post in posts"
      v-bind:key="post.id"
      :post="post"
    />
    <div class="text-center" id="pagination-bar">
      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="totalPages"
        circle
      >
      </v-pagination>
  </div>
  </div>
</template>
      
<script>

import { POSTS_ON_PAGE } from '~/constants';

export default {
  name: 'Posts',
  data() {
    return {
      currentPage: 1,
    }
  },

  beforeUpdate() {
    while (this.currentPage !== 1) {
      if (!this.posts.length) this.currentPage--
      else break
    }
  },

  computed: {
    posts() {
      return this.filteredPosts.slice((this.currentPage - 1) * POSTS_ON_PAGE, this.currentPage * POSTS_ON_PAGE)
    },

    totalPages() {
      return this.filteredPosts.length !== 0 ? Math.ceil(this.filteredPosts.length / POSTS_ON_PAGE) : 1;
    }
  },

  props: ['filteredPosts']
}
</script>
  
<style>
  #pagination-bar {
    margin-bottom: 10px;
  } 
</style>