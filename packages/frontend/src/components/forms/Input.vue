<template>
	<div>
		<label class="block text-sm font-medium text-dark-100 dark:text-light-100">{{ label }}</label>
		<div class="mt-1">
			<input
				class="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700 rounded-sm text-light-100 bg-dark-110"
				:type="type"
				:placeholder="placeholder"
				:value="modelValue"
				@input="updateValue"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'text'
	}
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
	emit('update:modelValue', event.target.value);
};
</script>
