import { defineConfig, presetAttributify, presetUno ,presetIcons} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({}),
    presetUno(),
    presetIcons()
  ],
  rules: [
    ["flex-c-c", { display: "flex", "justify-content": "center", "align-items": "center" }],
  ],
})