<template lang="pug">
q-page
  .row(style="padding:50px ; padding-top:150px ;")
    .col
      q-table(ref='table' title='我的訂單' :data='orders' :columns='columns' row-key='name' :selected-rows-label='getSelectedString' selection='multiple' :selected='selected' @selection='onSelection' :pagination.sync="pagination" style="background: none; box-shadow:none")
        template(v-slot:body="props")
          q-tr
            q-td.text-center
              q-checkbox(dense v-model="props.selected")
            q-td.text-center
              router-link(:to='"/order/" + props.row._id') {{ props.row._id }}
            q-td.text-center {{ props.row.date }}
            q-td.text-center
              p(v-if="props.row.pay") 已付款
              p(v-else) 未付款
            q-td.text-center
              p(v-if="props.row.ship") 已出貨
              p(v-else) 未出貨
            q-td.text-center NT$ {{ total(props.row) }}
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        rowsPerPage: 100
      },
      selected: [],
      lastIndex: null,
      columns: [
        { name: 'orderNumber', align: 'center', label: '訂單編號', sortable: true },
        { name: 'date', align: 'center', label: '訂單日期', sortable: true },
        { name: 'payState', align: 'center', label: '付款狀態', sortable: true },
        { name: 'shipState', align: 'center', label: '出貨狀態', sortable: true },
        { name: 'total', align: 'center', label: '總金額', sortable: true }
      ],
      orders: []
    }
  },
  methods: {
    total (thisorder) {
      return thisorder.products.reduce((accumlator, currentValue) => {
        return accumlator + currentValue.quantity * currentValue.product.price
      }, 0)
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },

    onSelection ({ rows, added, evt }) {
      if (rows.length === 0 || this.$refs.table === 0) {
        return
      }

      const row = rows[0]
      const filteredSortedRows = this.$refs.table.filteredSortedRows
      const rowIndex = filteredSortedRows.indexOf(row)
      const lastIndex = this.lastIndex

      this.lastIndex = rowIndex
      document.getSelection().removeAllRanges()

      if (this.$q.platform.is.mobile === true) {
        evt = { ctrlKey: true }
      } else if (evt !== Object(evt) || (evt.shiftKey !== true && evt.ctrlKey !== true)) {
        this.selected = added === true ? rows : []

        return
      }

      const operateSelection = added === true
        ? selRow => {
          const selectedIndex = this.selected.indexOf(selRow)
          if (selectedIndex === -1) {
            this.selected = this.selected.concat(selRow)
          }
        }
        : selRow => {
          const selectedIndex = this.selected.indexOf(selRow)
          if (selectedIndex > -1) {
            this.selected = this.selected.slice(0, selectedIndex).concat(this.selected.slice(selectedIndex + 1))
          }
        }

      if (lastIndex === null || evt.shiftKey !== true) {
        operateSelection(row)

        return
      }

      const from = lastIndex < rowIndex ? lastIndex : rowIndex
      const to = lastIndex < rowIndex ? rowIndex : lastIndex
      for (let i = from; i <= to; i += 1) {
        operateSelection(filteredSortedRows[i])
      }
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/orders/me', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.orders = data.result
    } catch (error) {
      this.$q.notify({
        message: error.response.data.message,
        type: 'negative'
      })
    }
  }
}
</script>
