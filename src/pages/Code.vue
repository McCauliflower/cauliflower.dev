<template>
  <div class="container">
    <div class="wrapper">
      <div class="grid">
        <a href="./sites/robot-builder/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/robot-builder-thumb.png" alt="Robot Builder" />
            <div class="image-label">Robot Builder</div>
          </div>
        </a>
        <a href="./sites/unicode-hieroglyphs/unicodeLoop.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/unicode-thumb.png" alt="Unicode Hieroglyphs" />
            <div class="image-label">Unicode Hieroglyphs</div>
          </div>
        </a>
        <a href="./sites/tree-fractal/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/tree-fractal-thumb.png" alt="Tree Fractal" />
            <div class="image-label">Tree Fractal</div>
          </div>
        </a>
        <a href="./sites/snake/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/snake-thumb.png" alt="Snake" />
            <div class="image-label">Snake</div>
          </div>
        </a>
        <a href="./sites/divz/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/sun-shades-thumb.png" alt="Divz" />
            <div class="image-label">Divz</div>
          </div>
        </a>
        <a href="./sites/thesis/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/thesis-thumb.png" alt="Thesis" />
            <div class="image-label">Thesis</div>
          </div>
        </a>
        <a href="./sites/ballpit/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/ballpit-thumb.png" alt="Ballpit" />
            <div class="image-label">Ballpit</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
    max-width: 100%;
    padding-top: 60px;
    margin: 0;
}

.wrapper {
    padding: 0;
    margin: 0;
}

.grid {
    padding-top: 100px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    row-gap: 40px;
    box-sizing: border-box;
    max-width: 80%;
    margin: 0 auto;
}
.grid a, .grid a:hover {
    text-decoration: none;
    color: inherit;
}
.grid-item {
    box-shadow: 0px 0px 5px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 200px;
}

.grid-item:hover {
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2);
    transition: all 2s ease;
    transform: scale(1.05);
}

.grid-item img {
    width: 100%;
    height: auto;
    max-width: 200px; 
}

.grid-item h1 {
    margin: 10px 0 0 0;
    font-size: 1.2em;
}
</style>
