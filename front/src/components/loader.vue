<template>
    <div class="loader-bg">
        <div class="loader"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<style scoped lang="scss">
.loader-bg {
    z-index: 1100;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--block-shadow);
    .loader {
        &::before, &::after {
            // background: var(--contrast);
        }
    }
}
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: loader-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--contrast) transparent transparent transparent;
}
.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loader-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>