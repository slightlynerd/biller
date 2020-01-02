<template>
  <main>
    <div class="row">
      <div class="col-md-6 mt-5 py-5 px-5">
        <div class="main-content w-md-75">
          <slot />
        </div>
      </div>
      <div class="col-md-6 sidebar d-none d-md-block">
        <div class="row align-items-center h-100">
          <div class="text-center mx-auto">
            <h1>
              Welcome to
              <br />Biller
            </h1>
            <p>Keep track of your expenses with ease...</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/styles/core/auth.scss";
</style>
