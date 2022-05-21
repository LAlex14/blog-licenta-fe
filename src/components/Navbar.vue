<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 lg:px-8">
    <div class="max-w-7xl mx-auto ">
      <div class="flex justify-between h-16">
        <div class="flex px-2 lg:px-0">
          <router-link
            class="flex-shrink-0 flex items-center"
            to="/blogs"
          >
            <img alt="Workflow" class="h-8 w-auto"
                 src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"/>
          </router-link>
          <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
            <router-link
              v-for="page in pages"
              :class="{
                'border-indigo-500 text-gray-900': currentRouteName === page.routeName,
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentRouteName !== page.routeName
              }"
              :to="page.to"
              class="px-1 pt-1 border-b-2 text-sm font-medium items-center inline-flex"
            >
              {{ $t(page.name) }}
            </router-link>
          </div>
        </div>
        <div class="flex items-center lg:hidden">
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
          class="hidden lg:flex lg:gap-4 lg:items-center"
        >
          <router-link
            class="flex-shrink-0"
            to="/blogs/create"
          >
            <button
              class="relative inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button">
              <PlusSmIcon aria-hidden="true" class="-ml-1 mr-1 h-5 w-5"/>
              <span>New Blog</span>
            </button>
          </router-link>
          <!-- Profile dropdown -->
          <Menu as="div" class="relative flex-shrink-0">
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">{{ $t('Open user menu') }}</span>
                <img alt=""
                     class="h-8 w-8 rounded-full"
                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
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
                  <router-link
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    to="#"
                  >
                    {{ $t('Profile') }}
                  </router-link>
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
          class="hidden lg:flex lg:gap-6 lg:items-center"
        >
          <router-link
            v-for="page in authPages"
            :class="{
                'text-gray-500 hover:text-gray-900': page.routeName === 'Login',
                'inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-origin-border px-3 py-1.5 border border-transparent rounded-md shadow-sm text-white hover:from-blue-700 hover:to-indigo-700': page.routeName === 'Register'
              }"
            :to="page.to"
            class="whitespace-nowrap text-base font-medium"
          >
            {{ $t(page.name) }}
          </router-link>
        </div>
      </div>
    </div>
    <DisclosurePanel class="lg:hidden">
      <div class="py-2 space-y-1">
        <router-link
          v-for="page in pages"
          :class="{
                'bg-indigo-50 border-indigo-500 text-indigo-700': currentRouteName === page.routeName,
                'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': currentRouteName !== page.routeName
              }"
          :to="page.to"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >
          {{ $t(page.name) }}
        </router-link>
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
          <router-link
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            to="#"
          >
            {{ $t('Profile') }}
          </router-link>
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
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {PlusSmIcon} from '@heroicons/vue/solid'
import {MenuIcon, XIcon} from '@heroicons/vue/outline'

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
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
