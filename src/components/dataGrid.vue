<template>
  <div>
    <div class="grid-container">
      <DxDataGrid
          :visible="false"
      >
        <DxColumn
            data-field="dataField"
        />
      </DxDataGrid>
      <DxDataGrid
          id="my-grid"
          ref="grid"
          :show-borders="true"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :column-auto-width="true"
          :data-source="data"
          @context-menu-preparing="addMenuItems"
          @cell-click="gridCellClick"
          @option-changed="gridOptionChanged"
          @cell-prepared="onCellPrepared"
      >
        <DxEditing
            :allow-updating="false"
            :allow-deleting="false"
            :allow-adding="false"
            mode="form"
        />
        <DxPaging :page-size="10"/>
        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 30]"
            :show-info="true"
        />
        <DxGroupPanel :visible="true"/>
        <DxSearchPanel :visible="true"/>
        <DxGrouping :auto-expand-all="false"/>
        <DxColumnChooser :enabled="true"/>
        <DxSorting mode="multiple"/>
        <template #cell-template="{ data }">
          <collectionGridTemplate
              :template-data=data
              :template-array=data.column.cellTemplateFieldArray
          />
        </template>
      </DxDataGrid>
    </div>
  </div>
</template>
<script>

import {DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxColumnChooser,
  DxSorting,
  DxEditing } from 'devextreme-vue/data-grid';

export default {
  components: { DxDataGrid, DxColumn, DxGrouping, DxGroupPanel, DxPager, DxPaging, DxSearchPanel, DxColumnChooser, DxSorting, DxEditing },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    myColumns: {
      type: Array,
      default: () => ([])
    },
    selectionColumn: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    };
  },
  methods: {
    addMenuItems(e) {
      if (e.target === 'header') {
        if (!e.items) e.items = [];
        e.items.push({
          beginGroup: true,
          text: 'Выбрать колонку',
          icon: 'check',
          onItemClick: () => {
            this.selectColumn(e.column.name);
          }
        });
        e.items.push({
          beginGroup: true,
          text: 'Добавить колонку',
          icon: 'insertcolumnleft',
          onItemClick: () =>  this.addNewColumn(null, undefined)
        });
        e.items.push({
          text: 'Добавить вложенную колонку',
          icon: 'insertcolumnright',
          onItemClick: () => {this.addNewColumn(this.findItemByKey(this.myColumns, e.column.name), undefined)}
        });
        e.items.push({
          icon: 'trash',
          text: 'Удалить колонку',
          onItemClick: () => this.deleteColumn(e.column)
        });
      }
    },
    gridCellClick(e) {
      if (e.rowType === 'header') {
        this.selectColumn(e.column.name);
      }
    },
    gridOptionChanged(e) {
      if (e.fullName.includes(".visibleIndex")) {
        let path = e.fullName.substr(0, e.fullName.length - 13);
        let count = (path.split('[').length - 1)
        let index = path.substr(8, 1);
        let tmpFrom = this.myColumns[index];
        let i = 1;
        while (i < count) {
          index = path.substr(8+i*11, 1);
          tmpFrom = tmpFrom.columns[index];
          i = i+1;
        }
        if (count === 1) {
          this.array_move(this.myColumns, index, e.value);
        } else {
          let parent = this.findItemByKey(this.myColumns, tmpFrom.ownerName);
          this.array_move(parent.columns, index, e.value);
        }
        this.myGrid.option('columns', this.myColumns);
        this.isColumns = this.myColumns.length > 0;
      }
    },
    onCellPrepared(e) {
      if(e.rowType === "header") {
        e.cellElement.style.color = e.column.name === this.selectionColumn.name ? "red" : "black";
        e.watch(function() {
          return this.selectionColumn.name;
        }, function() {
          e.cellElement.style.color = e.column.name === this.selectionColumn.name ? "red" : "black";
        })
      }
    },


  }
};
</script>
<style scoped>
.titul-container {
  margin: 10px 5px 5px;
  padding: 2px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
}

.dx-field > .dx-field-label {
  font-weight: bold;
  font-size: 115%;
  color: #051672;
}

</style>


