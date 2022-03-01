<template>
  <div id="newProduct" >
    <q-form class="q-pa-md q-gutter-sm" @submit.prevent="submitProduct" >
      <q-input outlined v-model="form.name" color="black" bg-color="white" label="商品名稱" :rules="[ val => val.length > 0 || '商品名稱必填' ]"/>
      <q-editor v-model="form.description" ref="editor" :toolbar="[
      [
          {
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],['token'], ['removeFormat'],
        [
          {
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          }
        ],
        ['undo', 'redo']
      ]">
      <template v-slot:token>
        <q-btn-dropdown dense no-caps ref="token" no-wrap unelevated color="white" text-color='black' label="Color" size="sm">
          <q-list dense>
            <q-item tag="label" clickable @click="color('backColor', highlight)">
              <q-item-section side>
                <q-icon name="highlight" />
              </q-item-section>
              <q-item-section>
                <q-color v-model="highlight" default-view="palette" no-header no-footer :palette="[
        '#ffccccaa', '#ffe6ccaa', '#ffffccaa', '#ccffccaa',
        '#ccffe6aa', '#ccffffaa', '#cce6ffaa', '#ccccffaa', '#e6ccffaa', '#ffccffaa', '#ff0000aa', '#ff8000aa', '#ffff00aa', '##00ff00aa', '#00ff80aa', '#00ffffaa', '#0080ffaa', '#0000ffaa', '#8000ffaa', '#ff00ffaa'
      ]" class="my-picker" />
              </q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="color('foreColor', foreColor)">
              <q-item-section side>
                <q-icon name="format_paint" />
              </q-item-section>
              <q-item-section>
                <q-color v-model="foreColor" no-header no-footer default-view="palette" :palette="[
        '#ff0000', '#ff8000', '#ffff00', '##00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff'
      ]" class="my-picker" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
      </q-editor>
      <q-select outlined v-model="form.category" :options="categories" color="black" bg-color="white" label="請選擇分類" />
      <q-input outlined v-model="form.price" color="black" bg-color="white" type="number" prefix="$"/>
      <!-- <vue-dropzone v-model="form.image" id="dz-image" :options="dzoptions" :useCustomSlot=true>
        <div class="dropzone-custom-content">
          <h3 class="dropzone-custom-title">拖移檔案至此</h3>
          <div class="subtitle">或點擊並選擇檔案上傳</div>
        </div>
      </vue-dropzone> -->
      <img-inputer accept="image/*"
      v-model="form.image"
      theme="light"
      size="large"
      bottom-text="點選或拖拽圖片以修改"
      hover-text="點選或拖拽圖片以修改"
      placeholder="點選或拖拽選擇圖片"
      :max-size="1024"
      exceed-size-text="檔案大小不能超過"></img-inputer>
      <div>
        <q-radio dense v-model="form.sell" val="true" label="已上架" />
        <q-radio dense v-model="form.sell" val="false" label="未上架" />
      </div>
      <q-btn color="white" text-color="black" @click="cancelSave" to="/admin/products">取消</q-btn>
      <q-btn color="blue-5" type="submitprevent">儲存</q-btn>
    </q-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      products: [],
      BtnDisabled: false,
      // dzoptions: {
      //   url: 'https://httpbin.org/post',
      //   thumbnailWidth: 200,
      //   addRemoveLinks: true,
      //   maxFilesize: 100
      // },
      categories: [
        '上衣', '褲子', '裙子', '洋裝', '配飾'
      ],
      form: {
        name: '',
        price: null,
        description: '',
        image: null,
        sell: false,
        category: '',
        files: null,
        _id: '',
        index: -1
      },
      foreColor: '#000000',
      highlight: '#ffff00aa',
      editor: ''
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        price: this.form.price.length === 0 ? null : this.form.price > 0
      }
    }
  },
  methods: {
    color (cmd, name) {
      const edit = this.$refs.editor
      this.$refs.token.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    },
    async submitProduct (event) {
      event.preventDefault()
      if (!this.state.name || !this.state.price) {
        return
      }
      this.BtnDisabled = true
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products.push(data.result)
        } else {
          const { data } = await this.api.patch('/products/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products[this.form.index] = { ...this.form, image: data.result.image }
          this.products.push(data.result)
        }
        this.$router.push('/admin/product')
        this.$q.notify({
          message: '上傳成功',
          type: 'positive'
        })
      } catch (error) {
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
      }
      this.BtnDisabled = false
    },
    cancelSave () {
      this.form = {
        name: '',
        price: 0,
        description: '',
        image: null,
        sell: false,
        category: '',
        _id: ''
      }
    }
  },
  async created () {
    // console.log(this.$router.params.id)
    if (this.$route.params.id) {
      try {
        const { data } = await this.api.get('/products/' + this.$route.params.id)
        this.form.name = data.result.name
        this.form.price = data.result.price
        this.form.description = data.result.description
        this.form.category = data.result.category
        this.form.sell = data.result.sell
        this.form._id = data.result._id
      } catch (error) {
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
      }
    }
  }
}
</script>
<style lang="sass">
</style>
