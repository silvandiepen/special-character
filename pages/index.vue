<template>
  <section>
  <row>
    <column medium="1:3" class="column-detail bg-dark">
      <div class="panels__panel panels__panel--preview" v-if="$store.state.current.selected !== null">
        <div class="preview">
          <span class="preview__character" v-html="toChar($store.state.current.selected,'html')"></span>               
          <button class="preview__button button button--rounded button-purple" v-on:click="addToSelected()">Add to selected</button>
        </div>

        <table class="infotable">
          <tr class="infotable__row ">
            <td class="infotable__item infotable__item--first"> 
            html 
            </td>
            <td class="infotable__item infotable__item--char">
            <span>&</span><span>#x</span>{{$store.state.current.selected}}
            </td>
          </tr>
          <tr class="infotable__row">
            <td class="infotable__item infotable__item--first">
            css
            </td>
            <td class="infotable__item infotable__item--char">
            \{{$store.state.current.selected}}
            </td>
          </tr>
          <tr class="infotable__row">
            <td class="infotable__item infotable__item--first">
            hex
            </td>
            <td class="infotable__item infotable__item--char">
            u+{{$store.state.current.selected}}
            </td>
          </tr>
        </table>
      </div>
      <div class="panels__panel panels__panel--selected selected" v-if="$store.state.selected.length > 0">
        <ul class="selected__list">
          <li class="selected__item" v-for="item in $store.state.selected" :key="item">
            <a v-on:click="setCurrent(item)" class="selected__link">
              <span class="selected__remove" v-on:click="removeFromSelected(item)"></span>
              <span class="selected__text" v-html="toChar(item,'html')"></span>
            </a>
          </li>
        </ul>
        <button class="button button--rounded button-purple" v-if="!savingCollection" v-on:click="savingCollection = true">Save collection</button>
        <form v-if="savingCollection" class="addForm">            
          <label>Collection name:</label>
          <div class="input-single">
            <input type="text" v-model="$store.state.current.collectionName" />         
            <button class="button button--green" v-on:click="saveCollection()">Save</button>
          </div>
        </form>
      </div>
       <div class="panels__panel panel__panel--collection collection" v-if="$store.state.collections.length > 0">
        <ul class="collection__list">
          <li class="collection__item" v-for="col in $store.state.collections" :key="col.title">
            <a class="collection__link">
              <span class="collection__title">{{col.title}}</span>
            </a>
          </li>
        </ul>
      </div>
    </column>
    <column medium="2:3" class="bg-white column-list">
      <table class="chars">
        <tr class="chars__top">
          <td class="chars__first"></td>
          <td class="chars__number" v-for="a in add" :key="a">
          {{a}}
          </td>
        </tr>
        
        <tbody class="chars__group" v-for="c in total" :key="c">
          <tr class="chars__row" v-for="b in add" :key="b">
            <td class="chars__serie"><span v-if="c < 10">0</span>{{c}}{{b}}</td>
            <td :class="['chars__char', hasStatus(c,b,a)]" v-for="a in add" :key="a" :data-char="c+''+b+'-'+ a">
              <a class="chars__link" href="#" v-on:click="setCurrent([c,b,a])"  v-on:dblclick="addToSelected([c,b,a])">
                <span class="chars__text" v-html="toChar([c,b,a],'html')"></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </column>
  </row>
  <div class="warning" ref="warning"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      savingCollection: false,
      total: 27,
      add: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
    };
  },
  created() {
    // console.log(this.$store);
  },
  methods: {
    toChar: function(c, type = "") {
      if (typeof c == "string") {
        c = c;
      } else {
        c = `${c[0]}${c[1]}${c[2]}`;
      }
      if (type === "") {
        return `${c}`;
      }
      if (type === "html") {
        return `&#x${c};`;
      }
    },
    convertToChar: function(c) {
      let current = "";
      if (c[0] < 10) {
        current = "0" + c[0] + "" + c[1] + "" + c[2];
      } else {
        current = c[0] + "" + c[1] + "" + c[2];
      }
      return current;
    },
    setCurrent: function(char) {
      let _this = this;
      let current = "";
      if (typeof char == "string") {
        current = char;
      } else {
        current = _this.convertToChar(char);
      }
      // let current = [c, a];
      console.log(current);
      _this.$store.state.current.selected = current;
    },
    isCurrent: function(char) {
      let _this = this;
      let current = _this.convertToChar(char);
      if (_this.$store.state.current.selected === current) {
        return true;
      } else {
        return false;
      }
    },
    addToSelected: function(value) {
      let _this = this;
      let newValue = null;
      if (!value) {
        _this.saveToSelected(_this.$store.state.current.selected);
      } else if (typeof value == "string") {
        _this.saveToSelected(value);
      } else {
        _this.saveToSelected(_this.convertToChar(value));
      }
    },
    removeFromSelected: function(item) {
      let _this = this;
      _this.showWarning(2, item);
      _this.$store.state.selected.splice(
        _this.$store.state.selected.indexOf(item),
        1
      );
    },
    saveToSelected: function(value) {
      let _this = this;
      // Check if the value already exists in the selected items.
      if (_this.$store.state.selected.includes(value)) {
        _this.removeFromSelected(value);
      } else {
        _this.$store.state.selected.push(value);
      }
    },
    showWarning: function(wId, item = null) {
      let _this = this;
      let message;
      let time = 2000;
      switch (wId) {
        case 1:
          message = "This item already exists in your list.";
          break;
        case 2:
          message = `<strong>${_this.toChar(
            item
          )}</strong> has been removed from the selected list.`;
          break;
        default:
          console.log("there is no warning selected or exists by this Id");
      }
      if (message.length > 0) {
        _this.$refs.warning.classList.add("active");
        _this.$refs.warning.innerHTML = message;
        setTimeout(function() {
          _this.$refs.warning.classList.remove("active");
        }, time);
      }
    },
    hasStatus: function(c, b, a) {
      let _this = this;
      let str = `${c}${b}${a}`;
      let classes = [];
      if (_this.$store.state.selected.includes(str)) {
        console.log("wooohhh");
        classes.push("isSelected");
      }
      if (_this.isCurrent([c, b, a])) {
        classes.push("isCurrent");
      }
      return classes;
    },
    saveCollection: function() {
      let _this = this;
      let currentCollection = {
        title: _this.$store.state.current.collectionName,
        items: _this.$store.state.selected
      };
      _this.$store.state.collections.push(currentCollection);
    }
  }
};
</script>
<style lang="scss">
$default-color-set: "vibrant";
@import "~svd-style/ext";

table {
  min-width: 100%;
}

.panels {
  &__panel {
    padding: grid(1);
  }
}
table {
  border-collapse: collapse;
  tr {
    td,
    th {
      margin: 0;
      border: none;
    }
  }
}
.chars {
  &__top {
    background-color: color(Pink);
  }
  &__first {
    background-color: color(Black);
    border: none;
  }
  &__group {
    & + .chars__group {
      border-top: 2px solid color(Dark);
    }
  }
  &__row {
    background-color: color(Blue, 0.05);
    &:nth-child(2n) {
      background-color: color(Blue, 0);
    }
  }
  &__number {
    padding: 1rem;
    color: color(White);
  }
  &__link {
    color: inherit;
    text-decoration: none;
    display: block;
    text-align: center;
    padding: 1rem;
    // padding: 0.5rem 0.25rem;
    // margin: 0;
    &:hover {
      background-color: color(Blue, 0.35);
    }
  }
  &__char {
    padding: 0;
    // padding: 0;
    // border: none;
    &.isCurrent {
      background-color: color(Blue, 0.25);
    }
    &.isSelected {
      border: 2px solid purple;
    }
  }
  &__text {
    font-size: 18px;
  }
  &__serie {
    background-color: color(Offwhite);
    color: color(Black, 0.5);
    font-size: 0.875rem;
    font-weight: bold;
    border: none;
  }
}
.column.active {
  background-color: var(--color-offwhite);
}
.column-list {
  min-height: 100vh;
  height: 100vh;
  overflow: scroll;
}
.column-detail {
  @media #{$small-only} {
    border-bottom: 1px solid color(Black, 0.5);
  }
}
.preview {
  font-family: inherit;
  text-align: center;
  padding: grid(2);
  color: color(Black);
  background-color: color(Offwhite);
  // box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 10;
  border-radius: 0.5rem 0.5rem 0 0;
  &__character {
    font-size: grid(1);
  }
  &__button {
    position: absolute;
    top: 100%;
    left: 50%;
    white-space: nowrap;
    transform: translate(-50%, -50%);
  }
}
.infotable {
  background-color: color(Pink);
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
  margin: 0;
  &__row {
    border: none;
    background-color: color(White, 0.5);
    @for $i from 0 through 10 {
      $percentage: ($i * 0.1);
      &:nth-child(#{$i}) {
        background-color: color(White, $percentage);
      }
    }
    &:nth-child(1) {
      .infotable__item {
        padding-top: 2rem;
      }
    }
  }
  &__item {
    border: none;
    &--first {
      font-weight: bold;
    }
  }
}
small {
  font-size: 10px;
  position: absolute;
}
.selected {
  &__list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
  }
  &__item {
    background-color: color(Black);
    color: color(White);
    position: relative;
    display: block;
    &:hover {
      z-index: 1;
      .selected__remove {
        transform: scale(1) translate(50%, -50%);
      }
    }
  }
  &__link {
    display: block;
    text-align: center;
    padding: 1.5rem 0;
    color: inherit;
    text-decoration: none;
  }
  &__remove {
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
    transform: scale(0) translate(50%, -50%);
    &:before {
      content: "\2716";
      color: color(Black);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      text-align: center;
      line-height: 1.2rem;
      font-size: 10px;
    }
  }
}

.warning {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100vh);
  background-color: color(Red);
  padding: grid(1);
  transition: 0.3s;
  &.active {
    transform: translate(-50%, -50vh);
  }
}
.addForm {
  margin: 0 -#{grid(1)};
  background-color: color(Black);
  padding: grid(1);
  width: calc(100% + #{grid(2)});
}

.input-single {
  display: flex;
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
label + .input-single {
  margin-top: 0.5rem;
}
</style>
