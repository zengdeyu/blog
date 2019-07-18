<template>
    <div class="markdowm">
        <textarea id="simplemde"></textarea>
        <!-- 隐藏的上传文件按钮 -->
        <input style="display:none" accept="image/gif,image/jpeg,image/jpg,image/png" type="file" id="upInput" ref="upInput">
    </div>
</template>

<script>
    import SimpleMDE from "simplemde";
    import "simplemde/dist/simplemde.min.css";
    import Bus from '../common/js/eventBus'
    export default {
        name: "markdowm",
        mounted(){
            let simplemde = new SimpleMDE({
                el: document.getElementById(simplemde),
                showIcons: ["code"],
            });
                simplemde.codemirror.on("change", () => {
                // this.content = simplemde.value();
                Bus.$emit('showEditor',simplemde.value())
            });
            //上传图片挂载
            let input = this.$refs.upInput;
            input.addEventListener("change", () => {
                let formData = new FormData();
                formData.append("i", input.files[0]);
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            })

        }
    }
</script>

<style scoped>

</style>
