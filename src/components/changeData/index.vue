<template>
    <div class="changeData hide-print">
        <div class="handlers">
            <button
                class="handler-button edit-mode-handler"
                id="edit-mode-handler"
                title="Modo edição"
                @click="toggleEditMode"
            ><i class="fa fa-pencil"></i> {{ editMode ? 'Desativar' : 'Ativar' }} edit mode</button>
            <button
                class="handler-button edit-handler"
                id="edit-handler"
                title="Editar"
                @click="toggleForm"
            ><i class="fa fa-pencil"></i></button>
            <button
                class="handler-button save-handler"
                id="save-handler"
                title="Salvar alterações"
                @click="saveData"
            ><i class="fa fa-save"></i></button>
            <button
                class="handler-button clean-handler"
                id="clean-handler"
                title="Limpar dados salvos"
                @click="cleanData"
                v-if="hasSavedData"
            ><i class="fa fa-trash"></i></button>
        </div>
        <div class="changeData__form" v-if="showForm">
            <div class="changeData__form__close" @click="toggleForm"><i class="fa fa-times"></i></div>
            <h2>Altere os dados</h2>
            <textarea
                class="textarea"
                cols="80"
                rows="20"
                v-model="tempData"
            ></textarea><br/>
            <div class="feedback" v-if="error">JSON inválido! Corrija os erros.</div>
            <button class="button" @click="setMainData">Alterar</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import constants from '../../store/constants';

const isValidJSON = (string) => {
    try {
        JSON.parse(string);
        return true;
    } catch (e) {
        return false;
    }
};

export default {
    name: 'changeData',
    props: {
        data: {
            type: Object,
            required: true
        },
        updateData: {
            type: Function,
            required: true
        }
    },
    created() {
        const localStorageData = localStorage.getItem('cv_data');

        if (localStorageData) {
            this.hasSavedData = true;
        }
    },
    data() {
        return {
            showForm: false,
            error: false,
            hasSavedData: false,
            tempData: JSON.stringify(this.data, null, '\t'),
        };
    },
    computed: mapState([
        'editMode',
    ]),
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        },
        setMainData() {
            this.error = false;
            if (!isValidJSON(this.tempData)) {
                this.error = true;
            }
            this.updateData(JSON.parse(this.tempData));
        },
        saveData() {
            this.error = false;
            if (!isValidJSON(this.tempData)) {
                this.error = true;
            }
            localStorage.setItem('cv_data', this.tempData);
            this.hasSavedData = true;
            alert('Alterações salvas localmente!');
        },
        cleanData() {
            localStorage.setItem('cv_data', '');
            this.hasSavedData = false;
            alert('Alterações salvas limpas!');
        },
        ...mapMutations({
            toggleEditMode: constants.TOGGLE_EDIT_MODE
        }),
    }
}
</script>

<style lang="scss">
    .changeData {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 99999;
    }
    .handler-button {
        display: inline-block;
        background: #efefef;
        padding: 10px;
        margin: 0;
        border: 0;
        border-radius: 5px;
        margin-left: 5px;
        text-align: center;
        cursor: pointer;

        &:hover {
            background: #ccc;
        }

        .fa {
            margin: 0;
        }
    }
    .changeData__form {
        position: fixed;
        top: 60px;
        right: 10px;
        background: #FFF;
        padding: 15px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
        border: 1px solid #ccc;
        border-radius: 5px;

        .changeData__form__close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
        }
    }
</style>


