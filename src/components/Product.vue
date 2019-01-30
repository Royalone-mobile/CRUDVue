<template>
  <section>
    <flash-message transitionIn="animated swing"></flash-message>
    <h2>{{ product.name }}</h2>
    <b>Description: </b>
    <div>{{ product.description }}</div>
    <b>Price:</b>
    <div>{{ product.price }}<span class="glyphicon glyphicon-euro"></span></div>
    <br/>
    <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
    <router-link to="/">Back to product list</router-link>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Product',
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
        this.flash('Product Loaded!', 'success', {
          timeout: 1000
        });
      }).catch(err => {
        console.log(err);
        this.flash('Product Loading Error', 'error', {
          timeout: 1000
        });
      });
    }
  }
};
</script>
