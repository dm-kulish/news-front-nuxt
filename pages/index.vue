<template>
  <div id="main-page">
    <v-row id="searcher">
      <v-col cols="4">
        <v-text-field
          v-model="filterKeyword"
          placeholder="Search content"
          autofocus
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="defaultTab"
          label="Filter by?"
          :items="tabs"
          variant="underlined"
        />
      </v-col>
    </v-row>
    <v-row id="posts-loader">
      <v-progress-circular
        v-if="!filteredPosts.length"
        model-value="20"
        indeterminate
        color="blue"
        :size="50"
        :width="10"
      />
    </v-row>
    <Posts
      id="posts"
      :filtered-posts="filteredPosts"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MainPage',

  data () {
    return {
      posts: [],
      filterKeyword: '',
      tabs: ['all', 'tags', 'authors'],
      defaultTab: 'all'
    }
  },

  methods: {
    ...mapActions('post', ['fetchPosts']),
    filterPostsByAllFields (posts) {
      return posts
        .filter(post =>
          [post.author.username.toLowerCase(), post.title.toLowerCase(), post.text.toLowerCase()]
            .some(elem => elem.includes(this.filterKeyword.toLowerCase().trim())) ||
                post.tags
                  .some(tag =>
                    tag.text.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())
                  )
        )
    },
    filterPostsByTags (posts) {
      return posts
        .filter(post =>
          post.tags.some(tag =>
            tag.text.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())
          )
        )
    },
    filterPostsByAuthors (posts) {
      return posts
        .filter(post =>
          post.author.username.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())
        )
    }
  },
  computed: {
    ...mapGetters('post', ['allPosts']),
    filteredPosts () {
      if (!this.filterKeyword.trim()) { return this.posts } else {
        switch (this.defaultTab) {
          case 'all':
            return this.filterPostsByAllFields(this.posts)
          case 'tags': {
            return this.filterPostsByTags(this.posts)
          }
          case 'authors':
            return this.filterPostsByAuthors(this.posts)
          default:
            return this.posts
        }
      }
    }
  },
  async created () {
    await this.fetchPosts()
    this.posts = this.allPosts
  }
}
</script>

<style scoped>
  #searcher, #posts-loader {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  #posts-loader {
    margin-bottom: 20px;
  }

</style>
