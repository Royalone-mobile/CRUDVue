<template>
  <section>
    <flash-message transitionIn="animated swing"></flash-message>
    <div class="actions">
      <router-link class="btn btn-default" :to="{path: '/add-product'}">
        <span class="glyphicon glyphicon-plus"></span>
        Add product
      </router-link>
    </div>
    <div class="filters row">
      <div class="form-group col-sm-3">
        <label for="search-element">Product name</label>
        <input v-model="searchKey" class="form-control" id="search-element" requred/>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th style="text-align:center;">Name</th>
        <th style="text-align:center;">Description</th>
        <th style="text-align:center;">Price</th>
        <th style="text-align:center;" class="col-sm-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in filteredProducts" :key="product.id">
        <td>
          <router-link :to="{name: 'product', params: {product_id: product._id}}">{{ product.name }}</router-link>
        </td>
        <td>{{ product.description }}</td>
        <td>
          {{ product.price }}
          <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
        </td>
        <td>
          <router-link class="btn btn-warning btn-xs" :to="{name: 'product-edit', params: {product_id: product._id}}">Edit</router-link>
          <router-link class="btn btn-danger btn-xs" :to="{name: 'product-delete', params: {product_id: product._id}}">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'List',
  data () {
    return {
      products: [],
      searchKey: ''
    };
  },
  mounted () {
    this.loadProducts();
  },
  methods: {
    loadProducts () {
      axios.get(`${this.API_URL}/product/all`, {}).then(response => {
        this.products = response.data;
        this.flash('Products Loaded!', 'success', {
          timeout: 1000
        });
      }).catch(err => {
        console.log(err);
        this.flash('Products Loading Error', 'error', {
          timeout: 1000
        });
      });
    }
  },
  computed: {
    /* Filter products by search keyword */
    filteredProducts: function () {
      var self = this;
      return self.products.filter(function (product) {
        return product.name.indexOf(self.searchKey) !== -1
      });
    }
  }
};
</script>
