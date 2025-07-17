<template>
  <div id="mito-modals"></div>
  <div>
    <div class="pt-24 pb-12">
      <slot />
    </div>
  </div>
</template>

<style>
body {
  background: url("/assets/mito-earth.svg");
  background-size: cover;
}

:root,
:before,
:after,
* {
  --vf-primary: #3434e0;
  --vf-primary-darker: #3434e0;
  --vf-danger: #c6007e;
}
</style>
