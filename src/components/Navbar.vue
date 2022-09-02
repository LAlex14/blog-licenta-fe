<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 lg:px-8">
    <div class="max-w-7xl mx-auto ">
      <div class="flex justify-between h-16">
        <div class="flex px-2 lg:px-0">
          <router-link
            class="flex-shrink-0 flex items-center"
            to="/blogs"
          >
            <img alt="Workflow" class="h-8 w-auto"
                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg">
          </router-link>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <div
              v-for="page in pages"
              :class="{
                'border-indigo-500 text-gray-900': currentRouteName === page.routeName,
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentRouteName !== page.routeName
              }"
              class="px-1 pt-1 border-b-2 text-sm font-medium items-center inline-flex cursor-pointer"
              @click="goToPage(page)"
            >
              {{ $t(page.name) }}
            </div>
          </div>
        </div>
        <div class="flex items-center md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">{{ $t('Open user menu') }}</span>
            <MenuIcon v-if="!open" aria-hidden="true" class="block h-6 w-6"/>
            <XIcon v-else aria-hidden="true" class="block h-6 w-6"/>
          </DisclosureButton>
        </div>
        <div
          v-if="isLoggedIn"
          class="hidden md:flex md:gap-4 md:items-center"
        >
          <router-link
            v-if="$route.name !== 'ViewBlog' && $route.name !== 'EditBlog' && $route.name !== 'CreateBlog'"
            class="flex-shrink-0"
            to="/blogs/create"
          >
            <BaseButton size="xs">
              <PlusSmIcon aria-hidden="true" class="-ml-1 mr-2 h-5 w-5"/>
              <span>{{ $t('New Blog') }}</span>
            </BaseButton>
          </router-link>
          <router-link
            v-if="showEditButton"
            :to="$route.path + '/edit'"
            class="flex-shrink-0"
          >
            <BaseButton
              size="sm"
              variant="secondary"
            >
              <PencilAltIcon aria-hidden="true" class="-ml-1 mr-2 h-4 w-4"/>
              <span>{{ editButtonLabel }}</span>
            </BaseButton>
          </router-link>
          <BaseButton
            v-if="$route.name === 'EditBlog'"
            size="sm"
            variant="danger"
            @click="deleteBlog"
          >
            <TrashIcon aria-hidden="true" class="-ml-1 mr-2 h-4 w-4"/>
            <span>{{ $t('Delete') }}</span>
          </BaseButton>
          <!-- Profile dropdown -->
          <Menu as="div" class="relative flex-shrink-0">
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">{{ $t('Open user menu') }}</span>
                <img
                  v-if="$user?.avatar"
                  :src="$user?.avatar"
                  alt=""
                  class="h-8 w-8 rounded-full"
                />
                <UserCircleIcon
                  v-else
                  class="h-10 w-10 rounded-full text-indigo-600"
                />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  <div
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    @click="goToProfilePage"
                  >
                    {{ $t('Profile') }}
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    @click="logout"
                  >
                    {{ $t('Sign Out') }}
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div
          v-else
          class="hidden md:flex md:gap-6 md:items-center"
        >
          <router-link
            v-for="page in authPages"
            :class="{
                'text-gray-500 hover:text-gray-900': page.routeName === 'Login',
                'inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 bg-origin-border px-3 py-1.5 border border-transparent rounded-md shadow-sm text-white hover:from-blue-700 hover:to-purple-700': page.routeName === 'Register'
              }"
            :to="page.to"
            class="whitespace-nowrap text-base font-medium"
          >
            {{ $t(page.name) }}
          </router-link>
        </div>
      </div>
    </div>
    <DisclosurePanel class="md:hidden">
      <div class="py-2 space-y-1">
        <div
          v-for="page in pages"
          :class="{
                'bg-indigo-50 border-indigo-500 text-indigo-700': currentRouteName === page.routeName,
                'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': currentRouteName !== page.routeName
              }"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
          @click="goToPage(page)"
        >
          {{ $t(page.name) }}
        </div>
      </div>
      <div
        v-if="isLoggedIn"
        class="py-2 border-t border-gray-200"
      >
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img alt=""
                 class="h-10 w-10 rounded-full"
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium text-gray-500">tom@example.com</div>
          </div>
        </div>
        <div class="space-y-1">
          <div
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            @click="goToProfilePage"
          >
            {{ $t('Profile') }}
          </div>
          <div
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            @click="logout"
          >
            {{ $t('Sign Out') }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="py-2 border-t border-gray-200 space-y-1"
      >
        <router-link
          v-for="page in authPages"
          :to="page.to"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        >
          {{ $t(page.name) }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <AuthModal v-model="showAuthModal"/>
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {PencilAltIcon, PlusSmIcon, TrashIcon, UserCircleIcon} from '@heroicons/vue/solid'
import {MenuIcon, XIcon} from '@heroicons/vue/outline'
import AuthModal from "@/components/AuthModal.vue";

const pages = [
  {
    name: 'Blogs',
    to: '/blogs',
    routeName: 'Blogs'
  },
  {
    name: 'Saved',
    to: "/blogs/saved",
    routeName: 'SavedBlogs',
  },
  {
    name: 'Authors',
    to: "/blogs/authors",
    routeName: 'Authors'
  },
];

const authPages = [
  {
    name: 'Sign in',
    to: '/auth',
    routeName: 'Login'
  },
  {
    name: 'Sign up',
    to: "/auth/register",
    routeName: 'Register',
  },
]


</script>

<script>
export default {
  data() {
    return {
      showAuthModal: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    currentRouteName() {
      return this.$route.name;
    },
    blog() {
      return this.$store.getters['blogs/blogBySlug'](this.$route.params.slug)
    },
    isAuthor() {
      return String(this.$user.id) === String(this.blog.creator.id)
    },
    showEditButton() {
      return (this.$route.name === 'ViewBlog' && this.isAuthor) ||
        (this.$route.name === 'ViewAuthor' && String(this.$route.params.id) === String(this.$user.id))
    },
    editButtonLabel() {
      return this.$route.name === 'ViewBlog' ? 'Edit article' : 'Edit profile'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    goToPage(page) {
      if (this.$route.path === page.to) {
        return;
      }
      if (!this.isLoggedIn && (page.name === 'Saved' || page.name === 'Authors')) {
        this.showAuthModal = true;
        return;
      }
      this.$router.push(page.to)
    },
    goToProfilePage() {
      this.$router.push(`/blogs/authors/${this.$user.id}`)
    },
    async deleteBlog() {
      const {id} = this.blog;
      await this.$store.dispatch('blogs/deleteBlog', id);
      this.$success('Blog deleted successfully');
      await this.$router.push('/blogs');
    },
  },
}
</script>
