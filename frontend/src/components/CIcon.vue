<template>
    <svg  height="512pt" viewBox="0 -84" focusable="false" xmlns="http://www.w3.org/2000/svg" :style="svg_styles">
      <g v-html="loadIcon"></g>
    </svg>
</template>
<script>
import all_icons from "@/assets/svg-icons";
export default {
    name: "CIcon",
    props: ["icon", "fontScale"],
    data(){
        return {
            icons: all_icons,
            svg_styles: {}
        }
    },

    computed: {
        loadIcon(){
            return this.icons[this.icon] ? this.icons[this.icon] : '';
        }
    },

    mounted(){
        const fontScale = Number(this.fontScale);
        if(fontScale > 0){
           this.svg_styles = {...this.svg_styles, ...{
               fontSize: fontScale*100+'%'
           }}
        }
        
    }
}
</script>