<template>
  <fragment>
    <div id="createListing" align="center">
      <h1>Post a Listing</h1>
      <form action="POST" method="/api/listing">
        <div id="listingDetails">
          <h6>Details</h6>

          <label for="listingTitle">Job Title:</label>
          <input type="text" name="listingTitle" id="listingTitle" Autofocus />
          <br />

          <label for="JobType">Job Type:</label>
          <select name="JobType" id="JobType">
            <option value="0">Lawn Mowing</option>
            <option value="1">Snow Shoveling</option>
          </select>

          <label for="listingTime">Time Estimate:</label>
          <input id="listingTime" type="number" min="0" />
          minutes
        </div>
        <div id="listingAddress">
          <h6>Address</h6>

          <label for="streetAddress">Street Address:</label>
          <input type="text" name="streetAddress" id="streetAddress" />

          <label for="city">City Name:</label>
          <input type="text" name="city" id="cityinput" />

          <label for="state">State:</label>
          <select name="state" id="stateList">
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

          <label for="zipCode">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            pattern="[0-9]*"
            maxlength="5"
          />
        </div>
        <div id="listingDesc">
          <h6>Description</h6>
          <textarea name="desc" id="listingDescription" cols="60" rows="5">
                    Enter any additional details here
                </textarea
          >
        </div>
      </form>
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'createListing',
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
</style>
