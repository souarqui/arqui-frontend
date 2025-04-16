<template>
  <section class="main-layout px-10 h-screen w-screen overflow-hidden">
    <div class="flex h-full w-full">
      <LayoutSidebarApp />

      <LayoutTopBar>
        <slot />
      </LayoutTopBar>
    </div>
  </section>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f3f4f6;
}

.main-layout {
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  margin: 0px !important;
}

.h-person {
  height: 96.5vh;
}

.bg-buton {
  background-color: #4f39f6;
}

.cutout {
  transform: translateX(0);
  height: 84px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-top: -24px;
}

.cutout::before,
.cutout::after {
  content: "";
  position: absolute;
  top: 0;
  width: 35px;
  height: 35px;
  background-color: #fff;
  z-index: 1;
}

.cutout::before {
  left: -35px;
  border-bottom-right-radius: 15px;
  box-shadow: 10px 0 0 0 #f4f4f6;
  transform: rotate(270deg);
}

.cutout::after {
  right: -35px;
  border-bottom-left-radius: 15px;
  box-shadow: -10px 0 0 0 #f4f4f6;
  transform: rotate(90deg);
}

.icons {
  display: flex;
  justify-content: space-around;
  font-size: 24px;
  color: #000;
  background-color: #fff;
  margin: 3px auto 0 auto;
  width: 246px;
  padding: 12px 18px;
  border-radius: 20px;
  position: relative;
  z-index: 2;
}

.icons i {
  cursor: pointer;
  transition: color 0.2s;
}

.icons i:hover {
  color: #ccc;
}
</style>
