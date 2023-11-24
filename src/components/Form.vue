<script setup lang="ts">
import {
	btns
} from '@/utils';
import type { IFieldMeta, ITableMeta } from '@lark-base-open/js-sdk';
import { bitable } from '@lark-base-open/js-sdk';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
const { appContext } = <ComponentInternalInstance>getCurrentInstance()


const emits = defineEmits(['setLoading'])

const formData = ref<{
	tableId: string
	fieldId: string
	separator: string
}>({ tableId: '', fieldId: '', separator: '-' });

const tableMetaList = ref<ITableMeta[]>([]);
const fieldMetaList = ref<IFieldMeta[]>([]);
const formRef = ref();

const rules = ref({
	tableId: [{ required: true, message: 'tableId is required' }],
	fieldId: [{ required: true, message: 'fieldId is required' }],
})

onMounted(async () => {
	const [tableList, selection] = await Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()]);
	formData.value.tableId = selection.tableId as string;
	tableMetaList.value = tableList;
	formData.value.tableId && getFieldMetaList()
})

const format = async (fn: Function) => {

	const valid = await formRef.value.validate()
	if (valid) return false
	emits('setLoading', true)

	const tableId = formData.value.tableId;
	const fieldId = formData.value.fieldId;

	const table = await bitable.base.getTableById(tableId);

	const recordIds = await table.getRecordIdList(); // 获取所有记录 id
	const list = []
	for (const recordId of recordIds) {
		const cellValue = await table.getCellValue(fieldId, recordId);// 单元格内容
		const val = cellValue && Array.isArray(cellValue) && cellValue[0]
		if (!val) continue

		// @ts-ignore 存在问题
		const { type, text }: { type: string, text: string } = val
		if (type !== 'text') continue
		if (text) {
			list.push({
				recordId: recordId,
				fields: {
					[fieldId]: fn.length === 2 ? fn(text, formData.value.separator) : fn(text)
				}
			})
		}
	}
	await table.setRecords(list)
	emits('setLoading', false)
	appContext.config.globalProperties.$notification.success('success!')
}

const changeTable = async () => {
	getFieldMetaList()
}

// 根据表格获取 字段list
const getFieldMetaList = async () => {
	const tableId = formData.value.tableId;
	const table = await bitable.base.getTableById(tableId);
	const fieldList = await table.getFieldMetaList();
	fieldMetaList.value = fieldList
}



</script>

<template>
	<div class="flex justify-center m-t-20">
		<div class="w-5/6">
			<a-form :model="formData" ref="formRef" :rules="rules" layout="vertical">
				<a-form-item field="tableId" tooltip="选择数据表" label="选择数据表">
					<a-select v-model="formData.tableId" placeholder="Please select ..." allow-clear @change="changeTable">
						<a-option v-for="meta in tableMetaList" :key="meta.id" :label="meta.name"
							:value="meta.id"></a-option>
					</a-select>
				</a-form-item>
				<a-form-item field="fieldId" tooltip="选择字段" label="选择字段">
					<a-select v-model="formData.fieldId" placeholder="Please select ..." allow-clear>
						<a-option v-for="meta in fieldMetaList" :key="meta.id" :label="meta.name"
							:value="meta.id"></a-option>
					</a-select>
				</a-form-item>
				<a-form-item field="separator" tooltip="连字符" label="连字符">
					<a-select v-model="formData.separator" placeholder="Please select ...">
						<a-option>-</a-option>
						<a-option>_</a-option>
					</a-select>
				</a-form-item>
			</a-form>

			<a-collapse :default-active-key="btns.map(item => item.id)">
				<a-collapse-item v-for="item in btns" :header="item.label" :key="item.id">
					<a-button class="m-r-4 m-b-4" type="primary" v-for="i in item.list" :key="i.label"
						@click="format(i.fn)">{{
							i.label }}</a-button>
				</a-collapse-item>
			</a-collapse>
		</div>
	</div>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
