<script setup lang="ts">
import {
    btns
} from '@/utils';
import { bitable } from '@lark-base-open/js-sdk';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
const { appContext } = <ComponentInternalInstance>getCurrentInstance()

const separator = ref<string>('-')

const emits = defineEmits(['setLoading'])

const format = async (fn: Function) => {
    emits('setLoading', true)
    const { fieldId, recordId, tableId } = await bitable.base.getSelection(); // 获取光标单元格
    if (!fieldId || !recordId || !tableId) {
        appContext.config.globalProperties.$notification.warning('请选择单元格')
        emits('setLoading', false)
        return
    }
    const table = await bitable.base.getTableById(tableId as string); // 获取表Id
    const cellValue = await table.getCellValue(fieldId as string, recordId as string); // 单元格内容
    const val = cellValue && Array.isArray(cellValue) && cellValue[0]
    if (!val) {
        emits('setLoading', false)
        return
    }
    // @ts-ignore 存在问题
    const { type, text }: { type: string, text: string } = val
    if (type !== 'text') {
        appContext.config.globalProperties.$notification.error('不是文本类型')
        emits('setLoading', false)
        return
    }
    const res = await table.setCellValue(fieldId as string, recordId as string, fn.length === 2 ? fn(text, separator.value) : fn(text))
    if (res) {
        appContext.config.globalProperties.$notification.success('success!')
    }
    emits('setLoading', false)
}


</script>
<template>
    <div class="flex justify-center m-t-20">
        <div class="w-5/6">
            <div class="flex-wrap">
                <a-select class="m-b-4" v-model="separator" placeholder="Please select ...">
                    <a-option>-</a-option>
                    <a-option>_</a-option>
                </a-select>
                <a-collapse :default-active-key="btns.map(item => item.id)">
                    <a-collapse-item v-for="item in btns" :header="item.label" :key="item.id">
                        <a-button class="m-r-4 m-b-4" type="primary" v-for="i in item.list" :key="i.label"
                            @click="format(i.fn)">{{ i.label }}</a-button>
                    </a-collapse-item>
                </a-collapse>
            </div>
        </div>
    </div>
</template>