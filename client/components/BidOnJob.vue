<script setup>
import InfoBox from './InfoBox.vue';
import InfoCard from './InfoCard.vue';

defineProps({
  img: {
    type: Image,
    required: false,
  },
});
</script>

<template>
  <!-- <div class="infoWrapper"> -->
  <InfoCard>
    <img src="{{img}}" />
    <InfoBox msg="Description" />
    <InfoBox msg="Date and Time" />
    <InfoBox msg="Estimated price from customer" />
    <div class="placeBid">
      <input class="input" type="text" placeholder="Bid Amount" />
      <button class="bidBtn">Place Bid</button>
    </div>
  </InfoCard>
  <!-- </div> -->
</template>

<style scoped>
.infoWrapper {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;
}

.placeBid {
  width: 400px;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 0.5fr;
}

img {
  height: 200px;
  width: 400px;
  margin-bottom: 10px;
}

.bidBtn {
  background-color: #41b883;
  border: none;
  border-radius: 10px;
  margin-left: 5px;
  padding: 0.5em;
  font-size: 1rem;
}

.input {
  padding: 0.5em;
  font-size: 1rem;
}

:hover.bidBtn {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  background-color: black;
  color: #fff;
}
</style>
