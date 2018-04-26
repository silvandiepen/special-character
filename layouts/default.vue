<template>
  <div>
    <nuxt/>
    <!-- <svd-footer></svd-footer> -->
  </div>
</template>
<script>
let headings = require('~/static/head.json');

// import svdFooter from '~svd-footer';
export default{
	head: headings,
	components: {
		// svdFooter
	}
}
</script>
