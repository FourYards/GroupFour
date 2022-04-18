<template>
  <fragment>
    <div class="table-container" id="job-listings-table">
      <p v-if="jobs.length < 1" class="empty-table">No Jobs Listed</p>
      <table class="table" v-else>
        <tbody>
          <tr :key="job.id" v-for="job in jobs">
            <td>
              <JobListingCard :job="job">
                <template #footer="slotData" v-if="$scopedSlots.listingButtons">
                  <slot name="listingButtons" v-bind="slotData"></slot>
                </template>
              </JobListingCard>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </fragment>
</template>

<script>
import JobListingCard from './JobListingCard.vue';

export default {
  name: 'job-listings-table',
  props: {
    jobs: Array,
  },
  data() {
    //Data to populate component
    return {};
  },
  components: {
    //Name of any components used on the page
    JobListingCard,
  },
  computed: {
    //Computed variables
  },
  methods: {
    //Methods for component
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  margin: 0px auto;
  padding: 0px;
}
.table {
  width: 100%;
  margin: 0px auto;
  padding: 0px;
  text-align: center;
  border-collapse: collapse;
}
td {
  border: none;
  padding: 0px;
}
button {
  margin: 0 0.5rem 0 0;
}

input {
  margin: 0;
}

.empty-table {
  text-align: center;
}
</style>
