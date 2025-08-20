<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar app color="green darken-2" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>🍏 Fruithub Admin</v-toolbar-title>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app color="grey lighten-4" permanent>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="handleItemClick(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AdminLayout",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", to: "/admin/dashboard" },
        { title: "Products", icon: "mdi-fruit-pineapple", to: "/admin/products" },
        { title: "Users", icon: "mdi-account-group", to: "/admin/users" },
        { title: "Orders", icon: "mdi-cart", to: "/admin/orders" },
        { title: "Logout", icon: "mdi-logout", to: "/admin/login" },
      ],
    };
  },
  methods: {
    handleItemClick(item) {
      if (item.title === "Logout") {
        // Clear admin session
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("adminData");
        this.$router.push({ name: "AdminLogin" });
      } else {
        this.$router.push(item.to);
      }
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  border-right: 1px solid #ddd;
}
.v-list-item {
  border-radius: 8px;
  margin: 4px 0;
  cursor: pointer;
}
.v-list-item:hover {
  background-color: #e0f2f1;
}
</style>
