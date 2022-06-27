export default {
  computed: {
    blogs() {
      if (this.$route.name === 'SavedBlogs') {
        return this.$store.getters['blogs/blogs'].filter(blog => blog.is_pinned);
      }
      return this.$store.getters['blogs/blogs'];
    },
    filteredBlogs() {
      return this.blogs.filter(blog => {
        const categoryId = blog.category.id;
        const userId = blog.creator.id;
        const queryUserIds = this.$route.query['user_id']?.split(',');
        const queryCategoryIds = this.$route.query['category_id']?.split(',');
        if (queryUserIds && queryCategoryIds) {
          return queryUserIds.includes(userId) && queryCategoryIds.includes(categoryId);
        }
        if (queryUserIds) {
          return queryUserIds.includes(userId);
        }
        if (queryCategoryIds) {
          return queryCategoryIds.includes(categoryId);
        }
        return this.blogs
      })
    },
    searchedBlogs() {
      return this.filteredBlogs.filter(blog => {
        const query = this.$route.query['search'];
        if (query) {
          return blog.title.toLowerCase().includes(query.toLowerCase());
        }
        return this.filteredBlogs
      })
    },
    sortedBlogs() {
      const sort_by = this.$route.query['sort_by'] || 'id';
      return this.searchedBlogs.sort((a, b) => {
        if (this.$route.query.order) {
          return a[sort_by] - b[sort_by];
        }
        return b[sort_by] - a[sort_by];
      })
    }
  },
};
