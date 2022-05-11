import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//配置@src
import { resolve } from "path";

//elementUI的配置文件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  base: "./", // 添加这个属性
  plugins: [
    vue(),
    //下面两个是elementUI的配置文件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //配置@src
  alias: {
    "@": resolve("src"),
    // "@": resolve(__dirname, ".", "src"),
    comps: resolve("src/components"),
    apis: resolve("src/apis"),
    views: resolve("src/views"),
    utils: resolve("src/utils"),
    routes: resolve("src/routes"),
    styles: resolve("src/styles"),
  },
});
