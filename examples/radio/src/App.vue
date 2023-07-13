<template>
    <form @submit.prevent="submit">
        <div>Framework: {{ framework.value }}</div>

        <input type="radio" id="Vue" value="Vue" v-model="framework.value" />
        <label for="Vue">Vue</label>

        <input type="radio" id="React" value="React" v-model="framework.value" />
        <label for="React">React</label>

        <input type="radio" id="Svelte" value="Svelte" v-model="framework.value" />
        <label for="Svelte">Svelte</label>

        <input type="radio" id="Solid" value="Solid" v-model="framework.value" />
        <label for="Solid">Solid</label>

        <p class="err" v-if="framework.hasError">{{ framework.error?.message }}</p>
        <hr />
        <button
            type="submit"
            :disabled="loading"
        >Login</button>
        <button
            :disabled="loading"
            @click.prevent="manualError"
        >Manual error on Password</button>
    </form>
</template>

<script lang="ts" setup>
    import { useForm } from '@/../../..';

    const sleep = (length: number) => new Promise(resolve => window.setTimeout(resolve, length * 1000));

    const { useField, handle, loading } = useForm<{
        framework: string;
    }>({
        defaults: { },
    });

    const framework = useField('framework', {
        required: true,
    });

    const submit = handle(async ({ framework }) => {
        await sleep(2);
        alert(`Framework: ${framework}`);
    });

    const manualError = () => {
        framework.setError('Random error 123');
    };
</script>

<style>
    .err {
        color: red;
    }
</style>
