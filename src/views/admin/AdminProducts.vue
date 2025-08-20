<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Manage Products</h1>

    <!-- Add Product Button -->
    <v-btn color="primary" class="mb-4" @click="openDialog()">
      Add Product
    </v-btn>

    <!-- Products Table -->
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading products..."
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="openDialog(item)">
          <v-icon color="blue">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteProduct(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Create/Edit Product Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ form.id ? "Edit Product" : "Add Product" }}</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="form.name" label="Name" required></v-text-field>
          <v-textarea v-model="form.description" label="Description" required></v-textarea>
          <v-text-field v-model.number="form.price" label="Price" type="number" required></v-text-field>
          <v-text-field v-model="form.image" label="Image URL (optional)"></v-text-field>
          <v-text-field v-model="form.category" label="Category" required></v-text-field>
          <v-switch v-model="form.inStock" label="In Stock"></v-switch>
          <v-text-field v-model.number="form.rating" label="Rating" type="number" step="0.1" min="0" max="5"></v-text-field>
          <v-text-field v-model.number="form.reviews" label="Reviews" type="number" min="0"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveProduct">
            {{ form.id ? "Update" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminProducts",
  data() {
    return {
      loading: false,
      dialog: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Category", value: "category" },
        { text: "In Stock", value: "inStock" },
        { text: "Rating", value: "rating" },
        { text: "Reviews", value: "reviews" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      products: [],
      form: {
        id: null,
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        inStock: true,
        rating: null,
        reviews: null,
      },
    };
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products");
        this.products = res.data;
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err);
      } finally {
        this.loading = false;
      }
    },

    openDialog(product = null) {
      this.form = product
        ? {
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            image: product.image || "",
            category: product.category || "",
            inStock: !!product.inStock,
            rating: product.rating !== null ? Number(product.rating) : null,
            reviews: product.reviews !== null ? Number(product.reviews) : null,
          }
        : {
            id: null,
            name: "",
            description: "",
            price: 0,
            image: "",
            category: "",
            inStock: true,
            rating: null,
            reviews: null,
          };
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    async saveProduct() {
      try {
        // Prepare payload
        const payload = {
          name: this.form.name,
          description: this.form.description,
          price: Number(this.form.price),
          image: this.form.image ? this.form.image : null,
          category: this.form.category,
          inStock: Boolean(this.form.inStock),
          rating: this.form.rating !== null ? Number(this.form.rating) : null,
          reviews: this.form.reviews !== null ? Number(this.form.reviews) : null,
        };

        if (this.form.id) {
          // Update product
          await axios.put(`http://127.0.0.1:8000/api/products/${this.form.id}`, payload);
        } else {
          // Create product
          await axios.post("http://127.0.0.1:8000/api/products", payload);
        }

        await this.fetchProducts();
        this.closeDialog();
      } catch (err) {
        console.error("Error saving product:", err.response?.data || err);
        alert("Failed to save product. Make sure fields are valid and try again.");
      }
    },

    async deleteProduct(id) {
      if (!confirm("Are you sure you want to delete this product?")) return;
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
        await this.fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err.response?.data || err);
        alert("Failed to delete product. Check console for errors.");
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
