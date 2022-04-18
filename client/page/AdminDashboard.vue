<template>
  <div class="container">
    <h1 class="mt-5">Admin Dashboard</h1>
    <JobListingsTable :jobs="jobs" />
  </div>
</template>

<script>
import JobListingsTable from './../components/JobListingsTable.vue';

export default {
  //Page name
  name: 'app',
  components: {
    JobListingsTable,
  },
  data() {
    return {
      jobs: [],
    };
  },

  mounted() {
    this.getJobs();
  },

  methods: {
    async getJobs() {
      // [{
      //     id: 1,
      //     title: 'Hard Job',
      //     customer: 'Wesley Perrett',
      //     description: 'This is a description for a job',
      //     date: 'March 23, 2021',
      //   },]

      const response = await fetch('/api/listing');
      this.jobs = await response.json();
      this.jobs = this.jobs.data;
    },
  },
};
</script>

<style>
/* Any styles specific to the page */
</style>
