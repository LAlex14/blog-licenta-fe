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
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
               href="/blogs"> Blogs </a>
            <a
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              href="/blogs/followed">
              Followed </a>
            <a
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              href="/blogs/authors">
              Authors </a>
          </div>
        </div>
        <div class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" aria-hidden="true" class="block h-6 w-6"/>
            <XIcon v-else aria-hidden="true" class="block h-6 w-6"/>
          </DisclosureButton>
        </div>
        <div class="hidden lg:flex lg:gap-4 lg:items-center">
          <router-link
            class="flex-shrink-0"
            to="/blogs/create"
          >
            <button
              class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button">
              <PlusSmIcon aria-hidden="true" class="-ml-1 mr-2 h-5 w-5"/>
              <span>New Blog</span>
            </button>
          </router-link>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative flex-shrink-0">
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Open user menu</span>
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
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">Your
                    Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                     href="#">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">Sign
                    out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
    <DisclosurePanel class="lg:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
        <DisclosureButton
          as="a"
          class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          href="#">Dashboard
        </DisclosureButton>
        <DisclosureButton
          as="a"
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          href="#">
          Team
        </DisclosureButton>
        <DisclosureButton
          as="a"
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          href="#">
          Projects
        </DisclosureButton>
        <DisclosureButton
          as="a"
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          href="#">
          Calendar
        </DisclosureButton>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
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
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="a" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            href="#">Your Profile
          </DisclosureButton>
          <DisclosureButton
            as="a" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            href="#">Settings
          </DisclosureButton>
          <DisclosureButton
            as="a" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            href="#">Sign out
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {PlusSmIcon} from '@heroicons/vue/solid'
import {MenuIcon, XIcon} from '@heroicons/vue/outline'

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  {name: 'Blogs', href: '#'},
  {name: 'Categories', href: '#'},
  {name: 'Authors', href: '#'},
  {name: 'Tags', href: '#'},
]
const userNavigation = [
  {name: 'Your Profile', href: '#'},
  {name: 'Settings', href: '#'},
  {name: 'Sign out', href: '#'},
]
</script>
