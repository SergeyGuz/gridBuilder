<template>
  <div>
    <DxDataGrid
        :data-source="dataSource"
        :show-borders="false"
        :showColumnHeaders="false"
        :showRowLines="true"
        :rowAlternationEnabled="false"
        :column-auto-width="false"
        :wordWrapEnabled="true"
        :visible="true"
    >
      <DxColumn v-for="item in collArray[0]" :key="item.field"
        :data-field=item.field
        :cell-template=item.cellTemplate
        :width=item.width
      />
      <template #cellTemplate="{ data }">
        <div>
          <DxDataGrid
              :data-source="data.value"
              :show-borders="false"
              :showColumnHeaders="false"
              :showRowLines="true"
              :rowAlternationEnabled="false"
              :column-auto-width="false"
              :wordWrapEnabled="true"
              :visible="true"
          >
            <DxColumn v-for="item in collArray[1]" :key="item.field"
                      :data-field=item.field
                      :cell-template=item.cellTemplate
                      :width=item.width
            />
          </DxDataGrid>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>
<script>

import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';

export default {
  components: { DxDataGrid, DxColumn },
  props: {
    templateData: {
      type: Object,
      default: ()=>{}
    },
    templateArray: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      dataSource: this.templateData.value,
      collArray: this.templateArray
    };
  },
};
</script>
<style>

</style>
