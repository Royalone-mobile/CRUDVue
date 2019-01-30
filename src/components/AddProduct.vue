<template>
  <section>
    <flash-message transitionIn="animated swing"></flash-message>
    <h2>Add new product</h2>
    <form v-on:submit="createProduct">
      <div class="form-group">
        <label for="add-name">Name</label>
        <input class="form-control" id="add-name" v-model="product.name" required/>
      </div>
      <div class="form-group">
        <label for="add-description">Description</label>
        <textarea class="form-control" id="add-description" rows="10" v-model="product.description"></textarea>
      </div>
      <div class="form-group">
        <label for="add-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
        <input type="number" class="form-control" id="add-price" v-model="product.price"/>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
      <router-link to="/" class="btn btn-default">Cancel</router-link>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddProduct',
  data: function () {
    return {
      product: {
        name: '',
        description: '',
        price: ''
      }
    };
  },
  methods: {
    createProduct: function () {
      axios.post(`${this.API_URL}/product`, {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price
      }).then(response => {
        this.$router.push('/');
      }).catch(err => {
        console.log(err);
        this.flash('Add Product Error', 'error', {
          timeout: 1000
        });
      });
    }
  }
};
</script>
