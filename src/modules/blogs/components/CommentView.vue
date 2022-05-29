<template>
  <div class="bg-white bg-opacity-60 rounded-lg shadow px-4 py-5 sm:px-6">
    <div class="flex space-x-3">
      <div class="flex-shrink-0">
        <img
          :src="authorAvatar"
          alt="author avatar"
          class="h-10 w-10 rounded-full object-cover"
        >

      </div>
      <div class="min-w-0 flex-1">
        <div class="text-sm font-medium text-gray-900">
          <div class="hover:underline">{{ `${author?.first_name} ${author?.last_name}` }}</div>
        </div>
        <div class="text-sm text-gray-500">
          <div>{{ comment.created_at }}</div>
        </div>
      </div>
      <div
        v-if="editMode"
        class="flex items-center flex-shrink-0 gap-2"
      >
        <BaseButton
          :label="$t('Cancel')"
          size="sm"
          variant="secondary"
          @click="cancelEditMode"
        />
        <BaseButton
          :label="$t('Save')"
          size="sm"
          @click="saveComment"
        />
      </div>
      <div
        v-if="isAuthor && !editMode"
        class="flex-shrink-0 self-center flex"
      >
        <Menu as="div" class="relative z-30 inline-block text-left">
          <div>
            <MenuButton class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
              <span class="sr-only">Open options</span>
              <DotsVerticalIcon aria-hidden="true" class="h-5 w-5"/>
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1 font-semibold tracking-wide">
                <MenuItem>
                  <div
                    class="text-gray-700 flex px-4 py-2 text-gray-600 text-sm hover:bg-gray-100 cursor-pointer"
                    @click="initiateEditMode"
                  >
                    <PencilAltIcon class="mr-3 h-5 w-5"/>
                    <span>Edit</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    class="text-gray-700 flex px-4 py-2 text-red-500 text-sm hover:bg-gray-100 cursor-pointer"
                    @click="deleteComment"
                  >
                    <TrashIcon class="mr-3 h-5 w-5"/>
                    <span>Delete</span>
                  </div>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <div class="my-2">
      <div
        v-if="!editMode"
        class="text-gray-600"
        v-html="comment.text.replace(/\n/g, '<br>')"
      />
      <div v-else>
      <textarea
        v-model="commentText"
        class="py-1 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Write a comment..."
        rows="3"
      ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {DotsVerticalIcon} from '@heroicons/vue/solid'
import {PencilAltIcon, TrashIcon} from '@heroicons/vue/outline'</script>

<script>
import {DEFAULT_USER_AVATAR, STORAGE_URL} from "@/modules/common/utils/linkUtils";

export default {
  name: "CommentView",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    author() {
      return this.$store.getters['blogs/authorById'](this.comment.user_id);
    },
    authorAvatar() {
      const avatar = this?.author?.avatar;
      if (avatar) {
        return avatar.includes('http') ? avatar : STORAGE_URL + avatar;
      }
      return DEFAULT_USER_AVATAR;
    },
    isAuthor() {
      return String(this.author.id) === String(this.$store.state.auth.user.id);
    }
  },
  data() {
    return {
      editMode: false,
      commentText: '',
    };
  },
  methods: {
    initiateEditMode() {
      this.editMode = true;
      this.commentText = this.comment.text;
    },
    async deleteComment() {
      await this.$store.dispatch('blogs/deleteComment', this.comment);
    },
    cancelEditMode() {
      this.editMode = false;
      this.commentText = '';
    },
    async saveComment() {
      try {
        await this.$store.dispatch('blogs/updateComment', {
          commentId: this.comment.id,
          text: this.commentText,
        });
        this.cancelEditMode();
      } catch (e) {
        throw e
      }
    },
  },
}
</script>

<style scoped>

</style>
