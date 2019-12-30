<template>
    <div class="user-data">
        <a-input placeholder="Email" v-model="email" size="large">
            <a-icon slot="prefix" type="mail" />
            <a-tooltip slot="suffix" title="Delete">
                <a-button 
                    :disabled="!email"
                    shape="circle" 
                    icon="delete" 
                    type="danger" 
                    @click="deleteData('email')"/>
            </a-tooltip>
        </a-input>
        
        <a-input placeholder="Phone (without '+' prefix)" v-model="phone" size="large">
            <a-icon slot="prefix" type="mobile" />
            <a-tooltip slot="suffix" title="Delete">
                <a-button 
                    :disabled="!phone"
                    shape="circle" 
                    icon="delete" 
                    type="danger" 
                    @click="deleteData('phone')"/>
            </a-tooltip>
        </a-input>

        <div>Notice: Your contact info is stored only on your device</div>

        <div class="user-data__controls">
            <a-button 
                type="primary"
                size="large" 
                @click="saveData">Save</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { userData } from '../utils/userData';

export default createComponent({
    name: 'user-data',
    setup(props, { emit }) {
        const email = ref<string>(userData.read('email'))
        const phone = ref<string>(userData.read('phone'))

        const deleteData = (name: string) => {
            userData.remove(name)
            if (name === 'email') email.value = ''
            else if (name === 'phone') phone.value = ''
        }

        const saveData = (data: any) => {
            userData.write('email', email.value)
            userData.write('phone', phone.value)
            emit('close')
        }

        return { 
            email,
            phone,
            deleteData,
            saveData
        }
    }
});
</script>

<style>
.user-data > span {
    margin: 10px 0;
}

.user-data__controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
}
</style>