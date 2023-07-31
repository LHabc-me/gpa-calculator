<template>
  <div class="pa-10">
    <div>
      通用
      <VSheet class="rounded-lg">
        <VCol>
          <VRow style="height: 60px">
            <VCol>语言</VCol>
            <VCol>
              <VSelect
                v-model="lang"
                class="float-right"
                :items="langs.map((i) => i.title)"
                variant="underlined"
                density="compact"
                color="primary"
              ></VSelect>
            </VCol>
          </VRow>
          <VRow style="height: 60px">
            <VCol>黑暗模式</VCol>
            <VCol>
              <VSwitch v-model="isDarkMode" class="float-right" color="primary"></VSwitch>
            </VCol>
          </VRow>
        </VCol>
      </VSheet>
    </div>
  </div>
</template>
<script setup>
import { useTheme } from '../../store/modules/theme'
import { ref, watch } from 'vue'
import { useI18n } from '../../store/modules/i18n'

const theme = useTheme()
const i18n = useI18n()
const isDarkMode = ref(theme.name === 'dark')
watch(isDarkMode, () => theme.changeTheme())

const langs = [
  { title: '简体中文', code: 'zh_cn' },
  { title: '懒得翻译了', code: 'zh_cn' },
  { title: '所以只有简体中文', code: 'zh_cn' }
  // { title: 'English', code: 'en_us' }
]
const lang = langs[0] // = ref(langs.find((i) => i.code === i18n.code)?.title)
watch(lang, () => i18n.changeLang(langs.find((i) => i.title === lang.value)?.code))
</script>

<!--@formatter:off-->
<route lang="json5">
{
  meta: {
    title: '设置'
  }
}
</route>
