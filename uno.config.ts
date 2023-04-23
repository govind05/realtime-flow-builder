import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetIcons({
      /* options */
    }),
    presetAttributify({
      /* preset options */
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
