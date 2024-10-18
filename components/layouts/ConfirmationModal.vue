<script lang="ts" setup>
import { ConfirmationModalProps } from "~/types/logicTypes";

// Accettiamo le props per titolo, messaggio e le azioni di conferma e annullamento
const props = defineProps<ConfirmationModalProps>();

// Funzione per confermare l'azione
const confirm = () => {
  props.onConfirm(); // Eseguiamo la funzione di conferma passata come prop
};

// Funzione per annullare l'azione
const cancel = () => {
  props.onCancel(); // Eseguiamo la funzione di annullamento passata come prop
};
</script>
<template>
  <div
    class="modal fade show"
    tabindex="-1"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="cancel"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">
            Annulla
          </button>
          <button type="button" class="btn btn-danger" @click="confirm">
            Conferma
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  background-color: #fff;
  border-radius: 0.5rem;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}
</style>
