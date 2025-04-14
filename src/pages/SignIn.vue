<template>
  <q-page  style="display: flex; justify-content: center; align-items: center; background:linear-gradient(#bff4be,#edf9eb);">
    <!-- <div class="sign_in">
      <br />
      <div class="inputs">
        <div class="inner">
          <input class="info" v-model="username" type="text" required placeholder="enter your number" />
          <input class="info" v-model="password" type="password" required placeholder="enter your password"/>
          <button class="btn" type="submit">logIn</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        </div>
      </div>
    </div> -->
    <div class="sign_in">
      <h2 style="color: green; margin: 20px">sign In</h2>
    <form @submit.prevent="handleLogin" class="inputs">
      <label>Username:</label>
      <input class="info" v-model="username" type="text" required />

      <label>Password:</label>
      <input class="info" v-model="password" type="password" required />

      <button class="btn" type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
  </q-page>
</template>



<script setup>
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });
    localStorage.setItem('token', res.data.token);
    router.push('/products'); // or your desired route
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
};
</script>



<style lang="scss">
.sign_in {
  width: 60vh;
  height: 60vh;
  border: 5px solid #bfdfcf;
  display: flex;
  background:linear-gradient(#edf9eb,#d6f6d5);
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
        cursor: pointer;
      }
      .btn:hover{
        border-color: #89948f;
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
