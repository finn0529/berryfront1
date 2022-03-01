<template>
  <div class="q-pa-md">
    <q-table
      title="商品管理"
      :data="products"
      row-key="_id"
      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :pagination.sync="pagination"
      grid
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="white" text-color="black" to='/admin/newProduct'>新增商品</q-btn>
      </template>

      <template v-slot:item="props">
        <div
          style="width: 220px;"
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
        <q-card :class="props.selected ? 'bg-grey-2' : ''" >
          <q-img
            v-if="props.row.image"
            :src="props.row.image"
            style="height: 200px;"
            basic
          >
          <q-checkbox dense v-model="props.selected" style="background: none;"/>
          </q-img>

          <q-card-section class="text-center">
            <router-link :to='"/admin/newProduct/" + props.row._id'>
              {{ props.row.name }}
            </router-link>
          </q-card-section>
        </q-card>
        </div>
      </template>

    </q-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      selected: [],
      products: [],
      columns: [
        {
          name: 'desc',
          imagr: ''
        }
      ],
      pagination: {
        rowsPerPage: 24
      }
    }
  },
  methods: {
    editProduct (index) {
      this.form = { ...this.products[index], image: null, index }
      this.$router.push('/admin/newProduct')
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
    } catch (error) {
      this.$q.notify({
        message: '取得商品失敗',
        type: 'negative'
      })
    }
  }
}
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
