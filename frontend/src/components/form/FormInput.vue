<template>
    <div>
        <div class="form-group" :class="{ 'form-group--error': errors.length > 0 || (serverError && serverError.length > 0)}">
            <label for="" v-if="label && showLabel">{{label}}</label>
            <input
                :type="type"
                autocomplete="off"
                class="form-control"
                :class="{'is-invalid': errors.length > 0 || (serverError && serverError.length > 0)}"
                @input="$emit('input', $event.target.value)"
                v-bind="$attrs"
            />
        </div>
        <div class="error" v-if="errors">{{errors[0]}}</div>
       <div class="error" v-if="serverError && serverError.length > 0">{{serverError}}</div>
    </div>
</template>
<script>
export default {
    name: "FormInput",
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'text'
        },
        errors: {
            required: false,
            default: () => []
        },
        label: {
            type: String
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        serverError: {
            type: String,
        }
    }
}
</script>

<style lang="scss" scoped>
// vuelidate form error
.form-group__message, .error {
    font-size: .75rem;
    line-height: 1;
    display: none;
    margin-top: -0.5rem;
    margin-bottom: 0.9375rem;
    text-align: left;
}

.form-group--error+.form-group__message, .form-group--error+.error {
    display: block;
    color: #f57f6c;
}
</style>