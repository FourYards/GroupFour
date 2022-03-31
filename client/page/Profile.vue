<template>
  <fragment>
    <body class="container">
      <p>
        <strong>Email Address: </strong> {{ emailAddress }}
      </p>
      <p>
        <strong>Name:</strong> {{ name }}
      </p>
      <p>
        <strong>Phone Number:</strong> {{ formattedPhoneNumber }}
      </p>
      <p>
        <strong>Preferred Display Type:</strong> {{ displayType }}
      </p>

      <p>
        <strong>Update Email Address:</strong>
        <b-input v-model="emailAddressBox" :placeholder="emailAddress"></b-input>
      </p>
      <p>
        <strong>Update Name:</strong>
        <b-input v-model="nameBox" :placeholder="name"></b-input>
      </p>
      <p>
        <strong>Update Phone Number:</strong>
        <b-input v-model="phoneNumberBox" type="tel" :placeholder="formattedPhoneNumber"></b-input>
      </p>
      <p>
        <strong>Update Preferred Display Type:</strong>
        <b-select v-model="displayTypeBox" :options="displayTypes"></b-select>
      </p>
      <p>
        <strong>Update Password:</strong>
        <b-input v-model="password1" type="password" placeholder="Enter password"></b-input>
        <b-input v-model="password2" type="password" placeholder="Re-enter password"></b-input>
      </p>

      <p>
        <b-button @click="updateData">Update User Data</b-button>
      </p>
    </body>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'app',

  components: {
  },

  data() {
    return {
      emailAddress: "trongle@polygons.net",
      name: "Trongle Trongle",
      displayType: "Provider",
      phoneNumber: "3 33    (5) 5  5- 0 1- 3 3 ",
      emailAddressBox: "",
      nameBox: "",
      displayTypeBox: "",
      phoneNumberBox: "",
      password1: "",
      password2: "",
      displayTypes: [
        { value: "Provider", text: "Provider" },
        { value: "Customer", text: "Customer" },
      ],
    };
  },

  mounted() {
  },

  methods: {
    updateData() {
      let toUpdate = {};

      if (this.emailAddressBox != "") {
        this.emailAddress = this.emailAddressBox;
        toUpdate.emailAddress = this.emailAddressBox;
        this.emailAddressBox = "";
      }

      if (this.nameBox != "") {
        this.name = this.nameBox;
        toUpdate.realName = this.nameBox;
        this.nameBox = "";
      }

      if (this.displayTypeBox != "") {
        this.displayType = this.displayTypeBox;
        toUpdate.displayType = this.displayTypeBox;
        this.displayTypeBox = "";
      } 

      if (this.phoneNumberBox != "") {
        this.phoneNumber = this.phoneNumberBox;
        toUpdate.phoneNumber = this.phoneNumberBox;
        this.phoneNumberBox = "";
      } 

      if (this.password1 != "" && this.password2 != "") {
        if (this.password1 == this.password2) {
          toUpdate.password = this.password1;
          this.password1 = this.password2 = "";
        }
        this.passwordBox = "";
      }

      console.log(toUpdate);
      console.log("send toUpdate to server to update User infomation");
    }
  },

  computed: {
    formattedPhoneNumber() {
      let digits = this.phoneNumber.split("").filter(x => /\d/.test(x));

      if (digits.length == 10) {
        return "(" 
          + digits.slice(0, 3).join("")
          + ") "
          + digits.slice(3, 6).join("")
          + "-"
          + digits.slice(6, 10).join("")
      } else if (digits.length == 7) {
        return digits.slice(0, 3).join("")
          + "-"
          + digits.slice(3, 7).join("")
      } else {
        return digits.join("")
      }
    }
  }
};
</script>

<style>
/* Any styles specific to the page */
</style>
