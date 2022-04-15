<template>
  <fragment>
    <div @click="openDetails(job)" class="mt-4">
      <b-card
        img-src="https://placekitten.com/300/300"
        img-alt="Card image"
        img-left
        class="mb-3 card"
      >
        <b-card-text class="b-card">
          <table class="table">
            <tr>
              <td class="title">{{ job.title }}</td>
            </tr>
            <tr>
              <td>{{ job.description }}</td>
            </tr>
            <tr>
              <td>Job: {{ job.typeDetails.description }}</td>
            </tr>
            <tr>
              <td>Posted by: {{ job.creator.realName }}</td>
            </tr>
            <tr>
              <td>{{ job.status }}</td>
            </tr>
          </table>
        </b-card-text>
      </b-card>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'job-listing-card',
  props: {
    job: Object,
  },
  data() {
    //Data to populate component
    return {};
  },
  computed: {
    //Computed variables
  },
  methods: {
    //Methods for component
    openDetails(job) {
      location.href = `/jobdetails?id=${job.id}`;
    },
  },
};
</script>

<style scoped>
td {
  border: none;
}
.title {
  font-size: 3rem;
  padding: 0px;
  border-bottom: 1px solid;
}
.b-card {
  overflow: auto;
}

.card {
  width: 100%;
  margin: 0px auto;
  height: 250px;
}

.card:hover {
  border: 1px solid #000;
  box-shadow: 0 0 0 2px #d0d0d0;
  cursor: pointer;
}
</style>
