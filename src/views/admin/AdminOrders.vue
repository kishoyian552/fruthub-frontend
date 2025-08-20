<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Manage Orders</h1>
    <v-data-table
      :headers="headers"
      :items="orders"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "AdminOrders",
  data() {
    return {
      headers: [
        { text: "Order ID", value: "id" },
        { text: "Customer", value: "customer" },
        { text: "Total", value: "total" },
        { text: "Status", value: "status" },
      ],
      orders: [
        { id: 101, customer: "John Doe", total: "$25", status: "Pending" },
        { id: 102, customer: "Jane Smith", total: "$45", status: "Completed" },
        { id: 103, customer: "Alice Brown", total: "$30", status: "Shipped" },
      ],
    };
  },
};
</script>
