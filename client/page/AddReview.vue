<template>
  <fragment>
    <div class="container">
      <b-card class="mb-3 b-card">
        <b-form @submit="onSubmit">
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
                v-model="form.rating"
                min="1"
                max="5"
                required
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group
            id="input-group-7"
            label="Comments:"
            label-for="input-7"
          >
            <b-form-textarea
              id="input-7"
              placeholder="Additional Information"
              rows="3"
              v-model="form.comment"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-button block type="submit" variant="info">Submit</b-button>
        </b-form>
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
      form: {
        targetId: document.querySelector('#targetUser').textContent,
        comment: null,
        rating: null,
      },
    };
  },

  mounted() {},

  methods: {
    onSubmit(event) {
      // Prevent event from being handled normally
      event.preventDefault();

      // Validate input data
      let errors = [];

      if (!this.form.targetId || isNaN(this.form.targetId)) {
        errors.push('Target User is invalid');
      }

      if (!this.form.comment) {
        errors.push('Please leave a comment');
      }

      if (
        !this.form.rating ||
        isNaN(this.form.rating) ||
        this.form.rating < 1 ||
        this.form.rating > 5
      ) {
        errors.push('Rating must be an integer between 1 and 5');
      }

      if (errors.length > 0) {
        let errmsg = '';
        for (let err of errors) {
          errmsg += err + ', \n';
        }
        alert(
          'Please fix the following problems before submitting this review: \n' +
            errmsg
        );
        return;
      }

      // Post the request to the server
      const apiURL = '/api/review';
      const csrfToken = document.querySelector('meta[name=csrf-token]').content;
      fetch(apiURL, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(this.form),
      }).then(() => {
        window.location.replace('/dashboard');
      });
    },
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
