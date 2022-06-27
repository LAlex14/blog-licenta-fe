<template>
  <editor
    :id="id"
    :init="editorOptions"
    :inline="inline"
    tinymceScriptSrc="/tinymce"
    v-bind="$attrs"
  />
  <InsertImagePopup
    ref="insertImagePopup"
    v-model="showInsertImagePopup"
    :keyphrase="title"
    @insert-image="createImageTag"
  />
</template>
<script>
import Editor from '@tinymce/tinymce-vue';
import InsertImagePopup from "@/modules/blogs/components/InsertImagePopup.vue";
import {getImageContainerHtml} from "@/modules/blogs/utils/pexelUtils";

export default {
  components: {
    Editor,
    InsertImagePopup
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: 'html-editor'
    },
    placeholder: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => null
    },
    title: {
      type: String,
      default: 'random'
    },
  },
  computed: {
    editorOptions() {
      return this.options || {
        content_css: '/assets/css/juice-editor.css',
        menubar: ' edit insert format tools',
        toolbar_mode: 'wrap',
        max_height: 700,
        contextmenu: 'image',
        toolbar:
          'styleselect | bold italic underline | bullist numlist | alignleft aligncenter alignright | link codesample code | insertImageBtn',
        plugins: 'autolink codesample link lists autoresize wordcount image searchreplace paste code',
        imagetools_cors_hosts: ['pexels.com', 'images.pexels.com'],
        mobile: {
          menubar: ' edit insert format tools',
          toolbar_sticky: true,
          toolbar_sticky_offset: 64,
          toolbar_mode: 'floating',
        },
        setup: (editor) => {
          this.editor = editor;

          editor.ui.registry.addButton('insertImageBtn', {
            icon: 'image',
            onAction: () => this.toggleInsertImagePopup()
          });
        },
      }
    }
  },
  data() {
    return {
      editor: null,
      showInsertImagePopup: false,
    }
  },
  methods: {
    toggleInsertImagePopup() {
      this.showInsertImagePopup = !this.showInsertImagePopup;
    },
    createImageTag(img) {
      const imgTag = document.createElement('img');
      imgTag.src = img.src;
      imgTag.alt = img.alt || "image";
      let htmlToInsert = imgTag.outerHTML;
      if (img.src.includes('pexels')) {
        htmlToInsert = getImageContainerHtml(htmlToInsert, img.photographer)
      }
      this.insertImageTag(htmlToInsert);
    },
    insertImageTag(tag) {
      this.editor.execCommand('mceInsertRawHTML', false, tag);
      this.$refs.insertImagePopup.resetSelectedImg();
      this.showInsertImagePopup = false;
    },
  },
}
</script>

<style lang="scss">
.tox-tinymce {
  flex-grow: 1 !important;
}

.tox {
  .tox-tbtn--disabled, .tox-tbtn {
    svg {
      fill: #66747e !important;
    }
  }
}
</style>
