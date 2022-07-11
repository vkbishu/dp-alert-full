<template>
    <div>
        <div class="form-group" :class="{ 'form-group--error': ($vField && $vField.$error) || (serverError && serverError.length > 0), 'form-group--loading': $vField && $vField.$pending }">
            <label for="" v-if="label && showLabel">{{label}}</label>
            <input
                :type="type"
                autocomplete="off"
                class="form-control"
                :class="{'is-invalid': ($vField && $vField.$error) || (serverError && serverError.length > 0)}"
                @input="$emit('input', $event.target.value)"
                v-bind="$attrs"
            />
        </div>
       <div class="error" v-if="$vField && !$vField.required">{{label}} is required</div>
       <div class="error" v-if="$vField && !$vField.email">Invalid email</div>
       <div class="error" v-if="serverError && serverError.length > 0">{{serverError}}</div>
       {{$vField.$each}}
    </div>
</template>
<script>
//["type", "field", "placeholder", "label"]
export default {
    name: "FormInput",
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'text'
        },
        $vField: {
            type: Object // vuelidate field object
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