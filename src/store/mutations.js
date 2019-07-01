import constants from './constants';

export default {
    [constants.TOGGLE_EDIT_MODE](state) {
        state.editMode = !state.editMode;
    },
};