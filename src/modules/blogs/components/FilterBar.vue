<template>
  <div class="bg-white">
    <!-- Mobile filter dialog -->
    <TransitionRoot :show="open" as="template">
      <Dialog as="div" class="relative z-40 sm:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25"/>
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                           enter-from="translate-x-full" enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                           leave-to="translate-x-full">
            <DialogPanel
              class="ml-auto pt-20 relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div class="px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                        type="button"
                        @click="open = false">
                  <span class="sr-only">Close menu</span>
                  <XIcon aria-hidden="true" class="h-6 w-6"/>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4">
                <Disclosure v-for="section in filters" :key="section.name" v-slot="{ open }"
                            as="div" class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton
                      class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400"
                      @click="showModal"
                    >
                      <span class="font-medium text-gray-900">
                        {{ section.name }}
                      </span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                         aria-hidden="true"/>
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel v-if="isLoggedIn" class="pt-6">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                        <input :id="`filter-mobile-${section.id}-${optionIdx}`" :checked="option.checked"
                               :name="`${section.id}[]`" :value="option.value"
                               class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                               type="checkbox"/>
                        <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-500">
                          {{ option.label }}
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Filters -->
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" class="sr-only">Filters</h2>
      <div class="relative z-10 bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:hidden">
        <div class="flex-1 flex items-center justify-center">
          <div class="max-w-sm w-full">
            <label class="sr-only" for="search">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon aria-hidden="true" class="h-5 w-5 text-gray-400"/>
              </div>
              <input
                id="search"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="search"
                placeholder="Search" type="search"/>
            </div>
          </div>
        </div>
      </div>
      <div class="relative z-10 bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="hidden sm:flex items-center">
            <div class="flow-root">
              <PopoverGroup
                v-if="!authorsPage"
                class="-mx-4 flex items-center"
              >
                <Popover v-for="(section) in filters" :key="section.name"
                         class="px-4 relative inline-block text-left">
                  <PopoverButton
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    @click="showModal"
                  >
                    <span>{{ section.name }}</span>
                    <span
                      class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums"
                    >
                      {{ filter[section.id].length }}
                    </span>
                    <ChevronDownIcon aria-hidden="true"
                                     class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                  </PopoverButton>

                  <transition enter-active-class="transition ease-out duration-100"
                              enter-from-class="transform opacity-0 scale-95"
                              enter-to-class="transform opacity-100 scale-100"
                              leave-active-class="transition ease-in duration-75"
                              leave-from-class="transform opacity-100 scale-100"
                              leave-to-class="transform opacity-0 scale-95">
                    <PopoverPanel
                      v-if="isLoggedIn"
                      class="origin-top-right absolute left-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <form class="space-y-4">
                        <div v-for="(option, optionIdx) in section.options" :key="option.id"
                             class="flex items-center">
                          <input
                            :id="`filter-${section.id}-${optionIdx}`"
                            :checked="isChecked(section.id, option.id)"
                            :name="`${section.id}`"
                            :value="option.id"
                            class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            type="checkbox"
                            @change="onChangeCheckbox"
                          />
                          <label
                            :for="`filter-${section.id}-${optionIdx}`"
                            class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                          >
                            {{ option.name || `${option.first_name} ${option.last_name}` }}
                          </label>
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>
            </div>
          </div>

          <div class="flex sm:flex-grow flex-row-reverse items-center">
            <div class="hidden lg:block max-w-sm w-full ml-4">
              <label class="sr-only" for="search">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon aria-hidden="true" class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="search"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="search"
                  placeholder="Search" type="search"/>
              </div>
            </div>

            <Menu as="div" class="relative inline-block text-left flex-shrink-0 pr-4">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  @click="showModal"
                >
                  Sort by
                  <ChevronDownIcon aria-hidden="true"
                                   class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  v-if="isLoggedIn"
                  class="origin-top-left absolute left-0 sm:left-auto sm:right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-for="option in searchOptions" :key="option.name" v-slot="{ active }">
                      <router-link
                        :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']"
                        :to="option.href">
                        {{ option.name }}
                      </router-link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <button class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden" type="button"
                  @click="openFilters">Filters
          </button>
        </div>
      </div>
    </section>
  </div>
  <AuthModal v-model="showAuthModal"/>
</template>

<script setup>
import {ChevronDownIcon, SearchIcon} from '@heroicons/vue/solid'
import {XIcon} from '@heroicons/vue/outline'
import AuthModal from "@/components/AuthModal.vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const searchOptions = [
  {name: 'Most Popular', href: '#', current: true},
  {name: 'Best Rating', href: '#', current: false},
  {name: 'Newest', href: '#', current: false},
]
</script>

<script>
export default {
  data() {
    return {
      showAuthModal: false,
      open: false,
      filter: {
        user_id: [],
        category_id: []
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    categories() {
      return {
        id: 'category_id',
        name: this.$t('Category'),
        options: this.$store.state.blogs.categories
      };
    },
    authors() {
      return {
        id: 'user_id',
        name: this.$t('Authors'),
        options: this.$store.state.blogs.authors
      };
    },
    filters() {
      return [
        this.authors,
        this.categories
      ]
    },
    authorsPage() {
      return this.$route.name === 'Authors'
    }
  },
  watch: {
    '$route.path': {
      handler(val, oldVal) {
        if (val === oldVal) {
          return
        }
        this.filter = {
          user_id: [],
          category_id: []
        }
      }
    },
    filter: {
      deep: true,
      handler(val) {
        this.$router.push({
          query: {
            ...this.$route.query,
            user_id: val['user_id'].length ? val['user_id'].join(',') : undefined,
            category_id: val['category_id'].length ? val['category_id'].join(',') : undefined,
          }
        })
      }
    }
  },
  methods: {
    isChecked(filter_option, filter_value) {
      return this.filter[filter_option].includes(filter_value);
    },
    onChangeCheckbox($evt) {
      const filter_option = $evt.target.name;
      const filter_value = $evt.target.value;
      if (!this.filter[filter_option].includes(filter_value)) {
        this.filter[filter_option].push(filter_value)
      } else {
        const elIndex = this.filter[filter_option].findIndex(el => el === filter_value);
        this.filter[filter_option].splice(elIndex, 1);
      }
    },
    showModal() {
      if (this.isLoggedIn) {
        return;
      }
      this.showAuthModal = true;
    },
    openFilters() {
      if (this.isLoggedIn) {
        this.open = true;
        return;
      }
      this.showAuthModal = true;
    }
  }
}
</script>
