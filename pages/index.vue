<template>
  <section>
  <row>
    <column medium="1:3" class="column-detail">
      <div v-if="current.length > 1">
        <h2>Character</h2>
        <h1 class="preview" v-html="toChar(current,'html')"></h1>
        <table class="info">
          <tr>
            <td>
            html
            </td>
            <td>
            <span>&</span><span>#x</span>{{current[0]}}{{current[1]}}
            </td>
          </tr>
          <tr>
            <td>
            css
            </td>
            <td>
            \{{current[0]}}{{current[1]}}
            </td>
          </tr>
          <tr>
            <td>
            hex
            </td>
            <td>
            u+{{current[0]}}{{current[1]}}
            </td>
          </tr>
        </table>
      </div>
    </column>
    <column medium="2:3" class="bg-white column-list">
      <table>
        <tr>
          <td></td>
          <td v-for="a in add" :key="a">
          {{a}}
          </td>
        </tr>
          <tr v-for="c in characters" :key="c">
            <td>{{c}}</td>
            <td v-for="a in add" v-on:click="setCurrent(c,a)" :class="current ? [c,a] : 'active'" :key="a">
              <span v-html="toChar([c,a],'html')"></span>
              <span class="zoom" v-html="toChar([c,a],'html')"></span>
            </td>
          </tr>
      </table>
    </column>
  </row>
  </section>
</template>

<script>
import charData from "~/assets/data/chars.json";

export default {
  data() {
    return {
      current: [],
      add: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"],
      characters: charData.characters,
      highlighted: [2303]
    };
  },
  methods: {
    toChar: function(c, type = "") {
      if (type === "") {
        return `${c[0]}${c[1]}`;
      }
      if (type === "html") {
        return `&#x${c[0]}${c[1]};`;
      }
    },
    setCurrent: function(c, a) {
      let _this = this;
      let current = [c, a];
      console.log(current);
      _this.current = current;
    }
  }
};
</script>
<style lang="scss">
@import "~svd-style/ext";

table {
  min-width: 100%;
}
table td {
  font-size: 18px;
  text-align: center;
  position: relative;
  &:first-child {
    background-color: color(Offwhite);
    color: color(Black, 0.5);
    font-size: 0.875rem;
    font-weight: bold;
  }
  padding: 0.5rem 0;
  border-bottom: 1px solid color(Black, 0.25);
}
.zoom {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: inherit;
  transform: scale(1);

  transition: transform 0.15s, box-shadow 0.3s;
  text-align: center;
  background-color: white;
  box-shadow: 0 0 0rem 0 rgba(0, 0, 0, 0.25);
  &:hover {
    transform: scale(1.5);
    z-index: 2;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.25);
  }
}
.column.active {
  background-color: var(--color-offwhite);
}
.column-list {
  height: 100vh;
  overflow: scroll;
}
.column-detail {
  padding: 4vw;
  h1.preview {
    font-family: inherit;
    text-align: center;
    padding: 4vw;
    color: color(Black);
    background-color: color(White);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.25);
  }
  .info {
    background-color: color(Black, 0.05);
  }
  @media #{$small-only} {
    border-bottom: 1px solid color(Black, 0.5);
  }
}
small {
  font-size: 10px;
  position: absolute;
}
</style>
