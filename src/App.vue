<script setup lang="ts">
const loading = ref<boolean>(false)

const setLoading = (val: boolean) => {
  loading.value = val
}
</script>

<template>
  <div class="w-screen h-screen p-10 box-border">
    <a-spin :loading="loading" tip="loading...">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="光标">
          <Cursor @setLoading="setLoading"></Cursor>
        </a-tab-pane>
        <a-tab-pane key="2" title="字段">
          <Form @setLoading="setLoading"></Form>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </div>
</template>
