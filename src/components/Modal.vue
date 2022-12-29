<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"> </slot>
        </div>

        <div class="modal-body">
          <slot name="body"> </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"> footer </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
