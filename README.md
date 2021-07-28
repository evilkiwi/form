<div align="center">
    <a href="https://www.npmjs.com/package/@casthub/form" target="_blank">
        <img src="https://img.shields.io/npm/v/@casthub/form?style=flat-square" alt="NPM" />
    </a>
    <a href="https://discord.gg/XMrHXtN" target="_blank">
        <img src="https://img.shields.io/discord/123906549860139008?color=7289DA&label=discord&logo=discord&logoColor=FFFFFF&style=flat-square" alt="Discord" />
    </a>
    <img src="https://img.shields.io/npm/l/@casthub/form?style=flat-square" alt="Apache-2.0" />
    <h3>Form Handling and Validation Hook for Vue 3</h3>
</div>

`@casthub/form` provides Vue 3 Hooks for consuming, validating and managing Forms.

Inspired by [vue-hooks-form](https://github.com/beizhedenglong/vue-hooks-form).

- Asynchronous validation via [async-validator](https://github.com/yiminghe/async-validator)
- No forced HTML structure/format
- Error handling
- TypeScript

## Installation

This package is available via NPM:

```bash
yarn add @casthub/form

# or

npm install @casthub/form
```

## Usage

A full example App is provided in the [example](https://github.com/casthub/form/tree/master/example) folder.

```vue
<template>
    <form @submit.prevent="submit">
        <label for="email">Email Address</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            :disabled="loading"
            @focus="email.clearError"
            v-model="email.value"
        />
        <p class="err" v-if="email.error">{{ email.error.message }}</p>
        <label for="email">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            :disabled="loading"
            @focus="password.clearError"
            v-model="password.value"
        />
        <p class="err" v-if="password.error">{{ password.error.message }}</p>
        <button
            type="submit"
            :disabled="loading"
        >Login</button>
    </form>
</template>

<script lang="ts" setup>
    import { useForm } from '@casthub/form';

    const { useField, handle, loading } = useForm<{
        email: string;
        password: string;
    }>({
        defaults: {
            email: 'hello@example.com',
        },
    });

    const email = useField('email', {
        type: 'email',
        required: true,
    });
    const password = useField('password', {
        required: true,
    });

    const submit = handle(async ({ email, password }) => {
        alert(`Email: ${email} Password: ${password}`);
    });
</script>
```

## API

### `useForm`

#### Options

**Option**|**Default**|**Type**|**Description**
-----|-----|-----|-----
defaults|`{}`|`Record<string, any>`|Optionally provide defaults for the various fields in this object by key -> value pairs.
validationMode|`submit`|`'change'|'submit'`|NOT IMPLEMENTED YET. Whether to validate input once submitted

#### Response

**Option**|**Type**|**Description**
-----|-----|-----
`useField`|`Field<unknown>`|[Documented below.](#use-field)
`handle`|`(run: values => Promise<void>) => async (e?: Event) => Promise<void>`|Registers the asynchronous handler that runs once a form is submitted and successfully validated.
`reset`|`() => void`|Reset the Form to tis default state.
`validate`|`() => Promise<boolean>`|Manually trigger validation and error handling.
`clearErrors`|`() => void`|Clear all errors for all fields.
`loading`|`Ref<boolean>`|Whether the form is currently exeuting.
`destroy`|`() => void`|Destroy and clean-up the Form handler. Happens automatically during `onBeforeUnmount`.

### `useField`

#### Options

TODO:

#### Response

TODO:

## To-do

- Add a test suite
