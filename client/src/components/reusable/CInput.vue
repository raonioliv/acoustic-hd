<template>
    <div class="mb-5">
        <div 
            class="form-group outlinedInput">
            <input
                :pattern="pattern"
                :placeholder="placeholder"
                class="form-control"
                :class="{ 
                    'outline-none': !outline,
                    'is-invalid': error
                }"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                :type="inputType"
            >
            <label 
                :class="{ 
                    required: required,
                    dark: theme === 'dark'
                }"
                class="form-label bg-background font-weight-medium" 
                :for="id" 
                v-text="label">
            </label>
            <i 
                v-if="type === 'password'" 
                :class="{ 
                    open: passwordState === 'text',
                    closed: passwordState === 'password', 
                    dark: theme === 'dark', 
                }" 
                class="passPreview" 
                @click="togglePasswordPreview">
            </i>
        </div>
        <div
            :class="{ 
                dark: theme === 'dark'
            }" 
            class="invalid-feedback" 
            v-if="error" 
            v-text="error.msg">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return { 
            passwordState: 'password'
        }
    },
    props: {
        required: { 
            type: Boolean, 
            default: false,
        },
        outline: { 
            type: Boolean, 
            default: false
        },
        modelValue: { 
            required: false,
            default: ''
        },
        type: { 
            type: String,
            required: false, 
            default: 'text'
        },
        id: { 
            type: String,
            required: true, 
        },
        label: { 
            type: String, 
            required: false
        }, 
        placeholder: { 
            type: String,
            required: false, 
        }, 
        error: { 
            type: [Object, String],
            required: false, 
            default: () => {},
        }, 
        pattern: { 
            type: String,
            required: false, 
        }

    },
    emits: () => ['update:modelValue'],
    computed: { 
        ...mapGetters('theme', ['theme']),
        inputType(){ 
            if(this.type === 'password'){ 
                return this.passwordState
            }
            return this.type
        },
        passPreviewClass(){ 
            return this.passwordState === 'password' ? 'closed' : 'open'
        }
    },
    methods: { 
        togglePasswordPreview(){ 
            if(this.passwordState === 'password'){ 
                this.passwordState = 'text'
            }else{ 
                this.passwordState = 'password'
            }
        }
    }
}
</script>

<style lang="scss">
    .form-group{ 
        margin-bottom: .5rem;

        .form-label{ 
            &.required::after{ 
                content: ' *';
                color: red;

            }
            &.dark::after{ 
                color: #FFF;
            }
        }

        &.outlinedInput { 
            position: relative;
            margin-bottom: 0;
            label{ 
                position: absolute;
                top: -25%;
                left: 10px;
                padding: 0 3px;
            }
        }
    }
    .form-control{ 
        width: 100%;
        font-size: 1rem;
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        border-radius: .375rem;
        border: 1px solid gray;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: 0;

        &:focus:not(.outline-none){ 
            border-color: #86b7fe;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        &.is-invalid{ 
            border: 1px solid red;
        }
    }
    
    .invalid-feedback { 
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;

        &.dark{ 
            color: #FF9233;
        }
    }
    .passPreview{ 
        display: inline-block;
        width: 22px;
        height: 22px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .5em;
        cursor: pointer;
        &.closed{ 
            content: url('@/assets/images/icons/password-preview-closed.svg');
            &.dark { 
                content: url('@/assets/images/icons/password-preview-closed-light.svg');
            }
        }
        &.open{ 
            content: url('@/assets/images/icons/password-preview-open.svg');
            &.dark { 
                content: url('@/assets/images/icons/password-preview-open-light.svg');
            }
        }
    }
</style>