<template>
    <form @submit.prevent="submit">
        <div>Framework: {{ frameworkRadio.value }}</div>

        <template v-for="framework in frameworks">
            <input type="radio" :id="framework" :value="framework" v-model="frameworkRadio.value" />
            <label :for="framework">{{ framework }}</label>
        </template>

        <p class="err" v-if="frameworkRadio.hasError">{{ frameworkRadio.error?.message }}</p>
        <hr />
        <button
            type="submit"
            :disabled="loading"
        >Submit</button>
        <button
            :disabled="loading"
            @click.prevent="manualError"
        >Manual error on Password</button>
    </form>
</template>

<script lang="ts" setup>
    import { useForm } from '@/../../..';

    const sleep = (length: number) => new Promise(resolve => window.setTimeout(resolve, length * 1000));

    const frameworks = ['Vue', 'React', 'Svelte', 'Solid'] as const;

    const { useField, handle, loading } = useForm<{
        framework: typeof frameworks[number]; // Vue | React | Svelte | Solid
    }>({
        defaults: { 
            framework: 'Vue'
        },
    });

    const frameworkRadio = useField('framework', {
        required: true,
    });

    const submit = handle(async ({ framework }) => {
        await sleep(2);
        alert(`Framework: ${framework}`);
    });

    const manualError = () => {
        frameworkRadio.setError('Random error 123');
    };
</script>

<style>
    .err {
        color: red;
    }
</style>
