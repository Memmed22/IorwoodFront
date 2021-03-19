<template>
    <div class="text-center">
    <v-dialog
      v-model="successDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline primary lighten-3">
          success
        </v-card-title>

        <v-card-text class="mt-5 h5 pb-1">
          Data recorded ..
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="successDialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    props:[
        'successDialog'
    ],
}
</script>