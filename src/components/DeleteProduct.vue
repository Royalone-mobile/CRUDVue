<template id="product-delete">
  <section>
    <flash-message transitionIn="animated swing"></flash-message>
    <h2>Delete product {{ product.name }}</h2>
    <form v-on:submit="deleteProduct">
      <p>The action cannot be undone.</p>
      <button type="submit" class="btn btn-danger">Delete</button>
      <router-link to="/" class="btn btn-default">Cancel</router-link>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'DeleteProduct',
  data: function () {
    return {
      product: {
        name: '',
        description: '',
        price: ''
      }
    }
  },
  mounted () {
    this.loadProduct();
  },
  methods: {
    loadProduct () {
      var id = this.$route.params.product_id;
      axios.get(`${this.API_URL}/product/get/${id}`, {}).then(response => {
        this.product = response.data;
      }).catch(err => {
        console.log(err)
      });
    },
    deleteProduct () {
      var id = this.$route.params.product_id;
      axios.delete(`${this.API_URL}/product/${id}`, {
      }).then(response => {
        this.$router.push('/');
      }).catch(err => {
        console.log(err);
        this.flash('Delete Product Error', 'error', {
          timeout: 1000
        });
      });
    }
  }
};
</script>
