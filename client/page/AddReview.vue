<template>
  <fragment>
    <div class="container">
      <b-card class="mb-3 b-card">
        <b-form-group
          id="input-group-2"
          label="Leave a Review 1-5:"
          label-for="input-2"
        >
          <b-input-group>
            <b-form-input
              id="input-2"
              placeholder="0"
              type="number"
              min="1"
              max="5"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="input-group-7" label="Comments:" label-for="input-7">
          <b-form-textarea
            id="input-7"
            placeholder="Additional Information"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-button block href="/dashboard" type="submit" variant="info"
          >Submit</b-button
        >
      </b-card>
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'AddReview',
  components: {
    //Name of any components used on the page
  },
  data() {
    return {
      //Any variables / data used on the page
    };
  },

  mounted() {},

  methods: {
    //Api calls to populate data
  },
};
</script>

<style>
/* Any styles specific to the page */
.container {
  margin: 0px auto;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
