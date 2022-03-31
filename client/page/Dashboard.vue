<template>
  <fragment>
    <header></header>
    <body class="container">
      <b-button id="FAB" variant="success" block href="/listing/create"
        >Post a Listing</b-button
      >
      <JobListingsTable :jobs="jobs" />
    </body>
  </fragment>
</template>

<script>
//Import statements including components used on the page
import JobListingsTable from '../components/JobListingsTable.vue';

export default {
  //Page name
  name: 'dashboard-page',
  components: {
    //Name of any components used on the page
    JobListingsTable,
  },
  data() {
    return {
      //Any variables / data used on the page
      jobs: [],
    };
  },

  mounted() {
    this.getJobs();
  },

  methods: {
    //Api calls to populate data
    async getJobs() {
      this.jobs = [
        {
          id: 1,
          title: 'Hard Job',
          customer: 'Wesley Perrett',
          description: 'This is a description for a job',
          date: 'March 23, 2021',
        },
        {
          id: 2,
          title: 'Hard Job',
          customer: 'Wesley Perrett',
          description: 'This is a description for a job',
          date: 'March 23, 2021',
        },
        {
          id: 3,
          title: 'Hard Job',
          customer: 'Wesley Perrett',
          description: 'This is a description for a job.',
          date: 'March 23, 2021',
        },
        {
          id: 4,
          title: 'Hard Job',
          customer: 'Wesley Perrett',
          description: 'This is a description for a job',
          date: 'March 23, 2021',
        },
        {
          id: 5,
          title: 'Hard Job',
          customer: 'Wesley Perrett',
          description: 'This is a description for a job',
          date: 'March 23, 2021',
        },
        {
          id: 6,
          title: 'Hard Job',
          customer: 'Wesley Perrett',
          description: 'This is a description for a job',
          date: 'March 23, 2021',
        },
      ];
    },
  },
};
</script>

<style>
/* Any styles specific to the page */

.container {
  margin: 0px auto;
  padding: 0px;
}

#FAB {
  margin-top: 16px;
}
</style>
