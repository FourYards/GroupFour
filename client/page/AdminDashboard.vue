<template>
  <div class="container">
    <h1 class="mt-5">Admin Dashboard</h1>
    <JobListingsTable :jobs="jobs">
      <template #listingButtons="{ job: { id } }">
        <b-button variant="danger" @click.stop="deleteJob(id)">Delete</b-button>
        <p class="text-danger mt-1" v-if="error">{{ error }}</p>
      </template>
    </JobListingsTable>
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
      error: null,
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

    async deleteJob(id) {
      const csrfToken = document.querySelector('meta[name=csrf-token]').content;

      try {
        const res = await fetch('/api/listing/', {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          mode: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        });

        if (res.status > 299) {
          this.error = await res.text();
        } else {
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
        this.error = e.message;
      }
    },
  },
};
</script>

<style>
/* Any styles specific to the page */
</style>
