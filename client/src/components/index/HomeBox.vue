<template>
  <div>
    <div class="text-center my-2">
      <h4>Nasıl Yardımcı Olabiliriz ?</h4>
    </div>


    <div class="home-info-box">
      <h5 class="home-info-box-title">Şehrimiz Daha Güzel Hale Getirmeye Yardım Edin</h5>
      <p class="my-2 home-info-box-text">
        098, mobil kullanıcıları şehrin gözü ve kulağı haline getirerek
        vatandaşlarla gerçek zamanlı işbirliğini mümkün kılıyor. Vatandaşlar, cep telefonlarını kullanarak şehrin herhangi
        bir yerinden çukurları, duvar yazılarını ve diğer sorunları bildiriyor.
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: "HomeBox"
}
</script>

<style scoped>
.home-info-box{
  background-color: #F7B31A;
  padding: 2rem;
  margin-bottom: 2rem;
}
.home-info-box-title{
  color: white;
  font-weight: 700;
  margin: 0;
  font-size: 18px;
  line-height: 25px;
}
.home-info-box-text{
  font-size: 15px;
  line-height: 22px;
  color: white;
}
</style>