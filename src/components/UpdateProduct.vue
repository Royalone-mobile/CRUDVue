<template id="product-edit">
  <section>
    <flash-message transitionIn="animated swing"></flash-message>
    <h2>Edit product</h2>
    <form v-on:submit="updateProduct">
      <div class="form-group">
        <label for="edit-name">Name</label>
        <input class="form-control" id="edit-name" v-model="product.name" required/>
      </div>
      <div class="form-group">
        <label for="edit-description">Description</label>
        <textarea class="form-control" id="edit-description" rows="3" v-model="product.description"></textarea>
      </div>
      <div class="form-group">
        <label for="edit-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
        <input type="number" class="form-control" id="edit-price" v-model="product.price"/>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
      <router-link to="/" class="btn btn-default">Cancel</router-link>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UpdateProduct',
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
    updateProduct () {
      var id = this.$route.params.product_id;
      axios.put(`${this.API_URL}/product/${id}`, {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price
      }).then(response => {
        this.$router.push('/');
      }).catch(err => {
        console.log(err);
        this.flash('Product Update Error', 'error', {
          timeout: 1000
        });
      });
    }
  }
};
</script>
