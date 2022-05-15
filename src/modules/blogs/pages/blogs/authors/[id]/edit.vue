<template>
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
            share.</p>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label class="block text-sm font-medium text-gray-700" for="username"> Username </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <span
                class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> workcation.com/ </span>
              <input
                id="username"
                autocomplete="username"
                class="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                name="username"
                type="text"/>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label class="block text-sm font-medium text-gray-700" for="about"> About </label>
            <div class="mt-1">
              <textarea
                id="about"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                name="about" rows="3"/>
            </div>
            <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
          </div>

          <div class="sm:col-span-6">
            <label class="block text-sm font-medium text-gray-700" for="photo"> Photo </label>
            <div class="mt-1 flex items-center">
              <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </span>
              <button
                class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button">
                Change
              </button>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label class="block text-sm font-medium text-gray-700" for="cover-photo"> Cover photo </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg aria-hidden="true" class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                     viewBox="0 0 48 48">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    for="file-upload">
                    <span>Upload a file</span>
                    <input id="file-upload" class="sr-only" name="file-upload" type="file"/>
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700" for="first-name"> First name </label>
            <div class="mt-1">
              <input
                id="first-name"
                autocomplete="given-name"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="first-name"
                type="text"/>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700" for="last-name"> Last name </label>
            <div class="mt-1">
              <input
                id="last-name"
                autocomplete="family-name"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="last-name"
                type="text"/>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label class="block text-sm font-medium text-gray-700" for="email"> Email address </label>
            <div class="mt-1">
              <input
                id="email"
                autocomplete="email"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="email"
                type="email"/>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700" for="country"> Country </label>
            <div class="mt-1">
              <select
                id="country"
                autocomplete="country-name"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="country">
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label class="block text-sm font-medium text-gray-700" for="street-address"> Street address </label>
            <div class="mt-1">
              <input
                id="street-address"
                autocomplete="street-address"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="street-address"
                type="text"/>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700" for="city"> City </label>
            <div class="mt-1">
              <input
                id="city"
                autocomplete="address-level2"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="city"
                type="text"/>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700" for="region"> State / Province </label>
            <div class="mt-1">
              <input
                id="region"
                autocomplete="address-level1"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="region"
                type="text"/>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700" for="postal-code"> ZIP / Postal code </label>
            <div class="mt-1">
              <input
                id="postal-code"
                autocomplete="postal-code"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                name="postal-code"
                type="text"/>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
          <p class="mt-1 text-sm text-gray-500">We'll always let you know about important changes, but you pick what
            else you want to hear about.</p>
        </div>
        <div class="mt-6">
          <fieldset>
            <legend class="text-base font-medium text-gray-900">By Email</legend>
            <div class="mt-4 space-y-4">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input id="comments" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                         name="comments" type="checkbox"/>
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-medium text-gray-700" for="comments">Comments</label>
                  <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                </div>
              </div>
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input id="candidates" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                         name="candidates" type="checkbox"/>
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-medium text-gray-700" for="candidates">Candidates</label>
                  <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                </div>
              </div>
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input id="offers" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                         name="offers" type="checkbox"/>
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-medium text-gray-700" for="offers">Offers</label>
                  <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset class="mt-6">
            <div>
              <legend class="text-base font-medium text-gray-900">Push Notifications</legend>
              <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
            </div>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input id="push-everything" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                       name="push-notifications" type="radio"/>
                <label class="ml-3 block text-sm font-medium text-gray-700" for="push-everything"> Everything </label>
              </div>
              <div class="flex items-center">
                <input id="push-email" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                       name="push-notifications" type="radio"/>
                <label class="ml-3 block text-sm font-medium text-gray-700" for="push-email"> Same as email </label>
              </div>
              <div class="flex items-center">
                <input id="push-nothing" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                       name="push-notifications" type="radio"/>
                <label class="ml-3 block text-sm font-medium text-gray-700" for="push-nothing"> No push
                  notifications </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button">
          Cancel
        </button>
        <button
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit">
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "edit"
}
</script>

<route>
{
name: 'EditProfile',
meta: {
requiresAuth: true
}
}
</route>

<style scoped>

</style>
