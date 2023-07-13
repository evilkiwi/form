<template>
    <form @submit.prevent="submit">
        <div>Framework: {{ frameworkRadio.value }}</div>

        <template v-for="framework in frameworks">
            <input 
                type="radio"
                :id="framework" 
                :value="framework"
                v-model="frameworkRadio.value" 
                @focus="frameworkRadio.clearError" 
                :disabled="loading" />
            <label :for="framework">{{ framework }}</label>
        </template>

        <p class="err" v-if="frameworkRadio.hasError">{{ frameworkRadio.error?.message }}</p>
        <hr />
        <div>Do you like Vue?</div>
        <input type="radio" id="true" :value="true" v-model="likeVue.value" @focus="likeVue.clearError" :disabled="loading" />
        <label for="true">Yes</label>

        <input type="radio" id="false" :value="false" v-model="likeVue.value" @focus="likeVue.clearError" :disabled="loading" />
        <label for="false">No</label>

        <p class="err" v-if="likeVue.hasError">{{ likeVue.error?.message }}</p>
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
        likeVue: boolean;
    }>({
        defaults: { 
            framework: 'Vue'
        },
    });

    const frameworkRadio = useField('framework', {
        required: true,
    });

    const likeVue = useField('likeVue', {
        required: true,
    });

    const submit = handle(async ({ framework, likeVue }) => {
        await sleep(2);
        alert(`Framework: ${framework}, like Vue: ${likeVue}`);
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
