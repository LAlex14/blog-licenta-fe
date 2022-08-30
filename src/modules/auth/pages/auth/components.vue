<template>
  <div class="w-[1000px] space-y-10">
    <div class="flex gap-4">
      <BaseButton
        :label="$t('Primary md')"
      />
      <BaseButton
        :loading="true"
        :label="$t('Primary loading')"
      />
      <BaseButton
        :disabled="true"
        :label="$t('Primary disabled')"
      />
      <BaseButton
        variant="secondary"
        :label="$t('Secondary')"
      />
      <BaseButton
        variant="danger"
        :label="$t('Danger')"
      />
    </div>
    <div class="flex gap-4">
      <BaseButton
        variant="secondary"
        :label="$t('Secondary xs')"
        size="xs"
      />
      <BaseButton
        variant="secondary"
        :label="$t('Secondary sm')"
        size="sm"
      />
      <BaseButton
        variant="danger"
        :label="$t('Danger lg')"
        size="lg"
      />
      <BaseButton
        variant="danger"
        :label="$t('Danger xl')"
        size="xl"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "components",
  data() {
    return {
      a: "",
    };
  },
}
</script>

<style scoped>

</style>
