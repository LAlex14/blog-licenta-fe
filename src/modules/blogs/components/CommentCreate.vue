<template>
  <div class="bg-white bg-opacity-60 rounded-lg shadow px-4 py-5 sm:px-6">
    <div class="pb-5 mb-5 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">{{ $t('Comments') }}</h3>
    </div>
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <img
          :src="userAvatar"
          alt="user avatar"
          class="inline-block h-10 w-10 rounded-full"
        />
      </div>
      <div class="min-w-0 flex-1">
        <BaseForm @submit="postComment">
          <div
            class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <textarea
            v-model="comment"
            :placeholder="$t('Add your comment...')"
            class="py-1 px-2 block w-full border-0 resize-none focus:ring-0 sm:text-sm"
            name="comment"
            rows="4"
          />

          </div>

          <div class="mt-2 flex justify-end">
            <BaseButton
              :label="$t('Post')"
              type="submit"
            />
          </div>
        </BaseForm>
      </div>
    </div>
  </div>
</template>

<script>
import {DEFAULT_USER_AVATAR, STORAGE_URL} from "@/modules/common/utils/linkUtils";

export default {
  name: "CommentCreate",
  props: {
    blogId: {
      type: String,
      required: true
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    userAvatar() {
      const avatar = this.user?.avatar;
      if (avatar) {
        return avatar.includes('http') ? avatar : STORAGE_URL + avatar;
      }
      return DEFAULT_USER_AVATAR;
    },
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    async postComment() {
      try {
        await this.$store.dispatch("blogs/postComment", {
          blog_id: this.blogId,
          text: this.comment,
        });
        this.comment = '';
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>

</style>
