<template>
  <q-page style="display: flex; justify-content: center; align-items: center">
    <div class="sign_in">
      <h2 style="color: green; margin: 20px">sign In</h2>
      <br />
      <div class="inputs">
        <div class="inner">
          <input class="info" type="text" placeholder="enter your number" />
          <input class="info" type="text" placeholder="enter your password" />
        <button class="btn">submit</button>
        </div>
        <div>
      <h6 style="margin: 0;">Don't have an account?</h6>
      <a href="">Sign Up</a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style lang="scss">
.sign_in {
  width: 60vh;
  height: 60vh;
  border: 5px solid #bfdfcf;
  display: flex;
  background: #f0f3f0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;

  .inputs {
    width: 40vh;
    height: 30vh;
    display: flex;
    flex-direction: column;
    .inner {
      display: flex;
      justify-content: center;
      align-items: center;
    flex-direction: column;
      padding: 10px;
      .btn {
        width: 10vh;
        margin: 10px;
        padding: 5px;
       border: #bfdfcf solid 2px;
       border-radius: 5px;
      }
      .info {
        width: 30vh;
        height: 4vh;
        background-color: white;
        border: solid 1px #bfdfcf;
        border-radius: 10px;
        margin: 3px;
      }
    }
  }
}
</style>
