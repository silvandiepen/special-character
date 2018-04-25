//- <template lang="pug">
//-   .container
//-     row(center)
//-       column(medium="2:3")
//-         table
//-           tr
//-             td(v-for="a in add") {{a}}
//-           tr(v-for="c in characters")
//-             td(v-for="b in add")
//-               p !{"&{{c}}{{b}};"}
//- </template>
<template>
  <section>
  <row>
    <column small="full" medium="1:3" class="bg-dark column-detail">
      <h2>Whuttt.. special characters</h2>
        <h1 class="preview" v-if="current" v-html="current"></h1>
      <table class="info" v-if="current">
        <tr>
          <td>
          {{current}}
          </td>
        </tr>
      </table>
    </column>

      <column small="full" medium="2:3" class="bg-white column-list">
        <table>
          <tr>
            <td></td>
            <td v-for="a in add">
            {{a}}
            </td>
          </tr>
            <tr v-for="c in characters">
              <td class="bg-dark">{{c}}</td>
              <td v-for="a in add" v-on:click="current = toChar(c,a)" :class="current ? toChar(c,a) : 'active'">
                <span v-html="toChar(c,a)"></span>
                <span class="zoom" v-html="toChar(c,a)"></span>
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
      current: null,
      add: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"],
      characters: charData.characters
    };
  },
  methods: {
    toChar: function(c, a) {
      return `&#x${c}${a};`;
      return String.fromCharCode(parseInt(`${c}${a}`));
    }
  }
};
</script>
<style lang="scss">
html,body{

  //  font-family: sans-serif;
}
table td {
  font-size: 18px;
  text-align: center;
  position: relative;
  &:first-child {
    border-bottom: 2px solid rgba(255,255,255,.2);
  }
}
.zoom{ position: absolute; width: 100%; height: 100%; top: 0; left: 0; padding: inherit;
transform: scale(1); transition: transform .15s, box-shadow .3s; text-align: center;
background-color: white; box-shadow: 0 0 0rem 0 rgba(0,0,0,.25);
  &:hover{transform: scale(1.5); z-index: 2; box-shadow: 0 0 1rem 0 rgba(0,0,0,.25);  }
}

.column.active {
  background-color: var(--color-offwhite);
}
.column-list {
  height: 100vh;
  overflow: scroll ;
}
.column-detail{
  padding: 4vw;
  h1.preview {
    font-family: inherit;
    text-align: center;
    background-color: white;
    padding: 4vw; color: var(--color-dark);
  }
  .info{
    background-color: rgba(255,255,255,.2);
  }

}
small {
  font-size: 10px;
  position: absolute;
}
</style>
