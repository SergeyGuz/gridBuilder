<template>
  <div>
    <DxToolbar>
      <ToolBarItem
          :options="{ hint:'Временная кнопка для вывода всякой всячины.', icon: 'menu', onClick: () => this.myShow() }"
          location="after"
          widget="dxButton"
      />
      <ToolBarItem
          :options="{ text:'Добавить', hint:'Добавить колонку.', icon: 'insertcolumnleft', onClick: () => this.addNewColumn(null, undefined) }"
          location="before"
          widget="dxButton"
      />
      <ToolBarItem
          :options="{ text:'Подчиненная',  hint:'Добавить подчиненную колонку.', icon: 'insertcolumnright', onClick: () => this.addNewColumn(this.findItemByKey(this.myColumns, this.selectionColumn.name), undefined) }"
          location="before"
          widget="dxButton"
          :disabled="isNotColumnSelect"
      />
      <ToolBarItem
          :options="{  text:'Удалить', hint:'Удалить колонку.', icon: 'deletecolumn', onClick: () => this.deleteColumn(this.selectionColumn)}"
          location="before"
          widget="dxButton"
          :disabled="isNotColumnSelect"
      />
      <ToolBarItem
          :options="{ text:'Удалить все',  hint:'Удалить все колонки.', icon: 'deletetable', onClick: () => this.deleteAllColumn()}"
          location="before"
          widget="dxButton"
          :disabled="!isColumns"
      />
      <ToolBarItem
          :options="{ text:'Автосоздание',  hint:'Создать колонки на основе источника данных.', icon: 'inserttable',
                      onClick: () => { this.colList= fieldList; this.selectionMode = 'all'; this.popupTitle = 'Выберите колонки'; this.popupVisible = true }}"
          location="before"
          widget="dxButton"
          :disabled="isColumns"
      />
      <ToolBarItem
          :options="{ text:'Выбрать',  hint:'Выбрать колонку для настройки', icon: 'bulletlist',
                      onClick: () => { this.colList= columnList; this.selectionMode = 'single'; this.popupTitle = 'Выберите колонку'; this.popupVisible = true } }"
          location="before"
          widget="dxButton"
          :disabled=false
      />
      <ToolBarItem
          :options="{ value: this.dataSource, width:'200px', onValueChanged: this.dsValueChanged , placeholder: 'Источник данных ...', dataSource: this.dsArray, displayExpr: 'name', valueExpr: 'ds', keyExpr:'name'}"
          location="before"
          widget="dxSelectBox"
          :disabled=false
      />
    </DxToolbar>
  <DxResponsiveBox
    :height = "boxHeight"
  >
    <DxRow :ratio="0"/>
    <DxRow :ratio="2"/>
    <DxCol :ratio="1"/>
    <DxCol :ratio="4"/>
    <DxItem>
      <DxLocation :row="1" :col="0"/>
      <template #default>
        <div class="container">
          <div class="form-container2">
            <formGridOptions
                :data="formGridOptionsData"
                :grid="myGrid"
            />
            <formColumnOptions
                :data="formColumnOptionsData"
                :grid="myGrid"
                :selectionColumn="selectionColumn"
                :myColumns="myColumns"
                :fieldList="fieldList"
            />
          </div>
        </div>
      </template>
    </DxItem>
    <DxItem>
      <DxLocation :row="1" :col="1"/>
      <template #default>
        <div class="grid-container">
          <DxDataGrid
              id="grid"
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
              :data-source="dataSource"
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
            <DxPaging :page-size="5"/>
            <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 20, 30]"
                :show-info="true"
            />
            <DxGroupPanel :visible="true"/>
            <DxSearchPanel :visible="true"/>
            <DxGrouping :auto-expand-all="false"/>
            <DxColumnChooser :enabled="true"/>
            <DxSorting mode="multiple"/>
            <DxRemoteOperations :group-paging="true" />
            <template #header-cell-template="{ data }">
              <div class="cell-highlighted">
                {{ data.column.caption }}
              </div>
            </template>
            <template #cell-template="{ data }">
              <collectionGridTemplate
                  :template-data=data
                  :template-array=data.column.cellTemplateFieldArray
              />
            </template>
          </DxDataGrid>
        </div>
      </template>
    </DxItem>
  </DxResponsiveBox>
    <DxPopup
        :title="popupTitle"
        :resizeEnabled="true"
        :drag-enabled="true"
        :show-close-button="false"
        :close-on-outside-click="false"
        :width="330"
        :height="500"
        :visible="popupVisible"
    >
      <DxList v-if="this.selectionMode === 'all'"
        :data-source="colList"
        :show-selection-controls="true"
        no-data-text="Отсутствуют колонки, видимо не выбран источник данных."
        selection-mode="all"
        height="100%"
        @option-changed="listOptionChanged"
      />
      <DxList v-else
        :data-source="colList"
        :show-selection-controls="true"
        no-data-text="Отсутствуют колонки, видимо не выбран источник данных."
        selection-mode="single"
        display-expr="caption"
        key-expr="name"
        height="100%"
        @option-changed="listOptionChanged"
      />
      <DxToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="before"
          :options="{ icon: 'inserttable', text: 'Выполнить',
                      onClick: () => { if (this.selectionMode === 'all') { this.columnsFromDatasource() } else
                      { this.selectColumn( this.selectedItems[0].name ) } this.popupVisible = false; }}"
      />
      <DxToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="{icon: 'close', text: 'Отменить', onClick: () => { this.colList=[]; this.popupVisible = false} }"
      />

    </DxPopup>
  </div>
</template>
<script>
import DxToolbar, { DxItem as ToolBarItem } from 'devextreme-vue/toolbar';
import {DxDataGrid,
        DxColumn,
        DxGrouping,
        DxGroupPanel,
        DxPager,
        DxPaging,
        DxSearchPanel,
        DxColumnChooser,
        DxSorting,
        DxEditing,
        DxRemoteOperations} from 'devextreme-vue/data-grid';
import { DxList } from 'devextreme-vue/list';
import { DxPopup, DxToolbarItem  } from 'devextreme-vue/popup';
import { DxResponsiveBox, DxItem, DxLocation, DxCol, DxRow } from 'devextreme-vue/responsive-box';
import collectionGridTemplate from './components/collectionGridTemplate.vue';
import formGridOptions from './components/formGridOptions.vue';
import formColumnOptions from './components/formColumnOptions.vue';
import service from './data.js';
//import CustomStore from 'devextreme/data/custom_store';

export default {
  components: {
    DxToolbar, ToolBarItem,
    DxDataGrid, DxColumn, DxGrouping, DxGroupPanel, DxPager, DxPaging, DxSearchPanel, DxColumnChooser, DxSorting, DxEditing, DxRemoteOperations,
    DxList,
    DxPopup, DxToolbarItem,
    DxResponsiveBox, DxItem, DxLocation, DxCol, DxRow,
    collectionGridTemplate,
    formGridOptions,
    formColumnOptions
  },
  computed: {
    fieldList: function() {
      return this.getDeepKeys(this.dataSource[0]);
    },
    columnList: function() {
      let list = [];
      this.getColumnList(this.myColumns, list);
      return list;
    }
  },
  mounted () {
    this.myGrid = this.$refs.grid.instance;
    this.myGrid.option('columns', this.myColumns);
    this.formGridOptionsData = this.myGrid.option();
  },
  data() {
    const menuItems = service.getmenuItems();
    const sales = service.getSales();
    const plan = service.getPlan();
    const  defaultDS = [{}];
    return {
      defaultDS,
      menuItems,
      sales,
      plan,
      dsArray: [{name: "Default", ds: defaultDS}, {name: "Menu", ds: menuItems}, {name: "Sales", ds: sales}, {name: "Plan", ds: plan}],
      isColumns: false,
      isNotColumnSelect: true,
      globalIndex: 1,
      selectionColumn: null,
      dataSource: defaultDS,
      myColumns: [],
      myGrid: null,
      formColumnOptions: null,
      formGridOptions: null,
      popupVisible: false,
      popupTitle: 'Выберите колонки',
      selectedItems: [],
      selectionMode: "all",
      colList: [],
      formGridOptionsData: {},
      formColumnOptionsData: {},
      boxHeight: function() { return window.innerHeight - 60}
    };
  },
  methods: {
    myShow() {
      // this.tmpOption=this.myGrid.option();
      console.log(this.myGrid.option('columns'));
    },
    gridCellClick(e) {
      if (e.rowType === 'header') {
        this.selectColumn(e.column.name);
      }
    },
    selectColumn(name) {
      this.selectionColumn = this.findItemByKey(this.myColumns, name);
      this.formColumnOptionsData = this.selectionColumn;
      this.isNotColumnSelect = false;
      this.myGrid.repaint();
    },
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
    deleteColumn(column) {
      if (column.ownerName) {
        let parent = this.findItemByKey(this.myColumns, column.ownerName);
        let itemIndex = parent.columns.findIndex(el => el.name === column.name);
        parent.columns.splice(itemIndex, 1);
      } else {
        let itemIndex = this.myColumns.findIndex(el => el.name === column.name);
        this.myColumns.splice(itemIndex, 1);
      }
      this.selectionColumn = null;
      this.isNotColumnSelect = true;
      this.formColumnOptionsData = {};
      this.myGrid.option('columns', this.myColumns);
      this.isColumns = this.myColumns.length > 0;
    },
    deleteAllColumn() {
      this.selectionColumn = null;
      this.formColumnOptionsData = {};
      this.myColumns=[];
      this.myGrid.option('columns', this.myColumns);
      this.isColumns = this.myColumns.length > 0;
      this.globalIndex = 1;
    },
    NewColumn(parent, fieldName) {
      let g = {
        id: this.globalIndex,
        parentId: 0,
        alignment: 'left',
        allowEditing: true,
        allowExporting: true,
        allowFiltering: true,
        allowFixing: true,
        allowGrouping: true,
        allowHeaderFiltering: true,
        allowHiding: true,
        allowReordering: true,
        allowResizing: true,
        allowSearch: true,
        allowSorting: true,
        autoExpandGroup: true,
        caption: fieldName || 'Колонка ' + this.globalIndex,
        cellTemplate: undefined,
        columns: [],
        cssClass: undefined,
        customizeText: undefined,
        dataField: fieldName,
        dataType: undefined,
        editCellTemplate: undefined,
        editorOptions: undefined,
        encodeHtml: true,
        falseText: 'Нет',
        filterOperations: ['contains','notcontains','startswith','endswith','=','<>'],
        filterType: 'include',
        filterValue: undefined,
        filterValues: undefined,
        fixed: false,
        fixedPosition: undefined,
        format: undefined,
        formItem: undefined,
        groupCellTemplate: undefined,
        groupIndex: undefined,
        headerCellTemplate: undefined,
        headerFilter: undefined,
        hidingPriority: undefined,
        isBand: undefined,
        lookup: undefined,
        minWidth: undefined,
        name: 'column'+this.globalIndex,
        ownerBand: undefined,
        ownerName: undefined,
        renderAsync: undefined,
        selectedFilterOperation: undefined,
        showEditorAlways: false,
        showInColumnChooser: true,
        showWhenGrouped: false,
        sortIndex: undefined,
        sortOrder: undefined,
        trueText: 'Да',
        type: undefined,
        validationRules: undefined,
        visible: true,
        visibleIndex: undefined,
        width: undefined,
        cellTemplateFieldArray: []
      };
      if (parent === null) {
        this.myColumns.push(g);
      } else {
        parent.isBand = true;
        g.ownerBand = parent;
        g.ownerName = parent.name;
        parent.columns.push(g);
      }
      this.globalIndex = this.globalIndex+1;
    },
    addNewColumn(parent, fieldName) {
      this.NewColumn(parent, fieldName);
      this.myGrid.option('columns', this.myColumns);
      this.isColumns = this.myColumns.length > 0;
    },
    columnsFromDatasource() {
      for(let i = 0; i < this.selectedItems.length; i++) {
        this.NewColumn(null, this.selectedItems[i]);
      }
      this.myGrid.option('columns', this.myColumns);
      this.isColumns = this.myColumns.length > 0;
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
      if(e.rowType === "header" && this.selectionColumn) {
        e.cellElement.style.color = e.column.name === this.selectionColumn.name ? "red" : "black";
      }
    },
    findItemByKey(items, key) {
      for(let i = 0; i < items.length; i++) {
        if(items[i].name === key) {
          return items[i];
        }
        if(items[i].columns) {
          const node = this.findItemByKey(items[i].columns, key);
          if(node !== null) {
            return node;
          }
        }
      }
      return null;
    },
    array_move(arr, old_index, new_index) {
      while (old_index < 0) {
        old_index += arr.length;
      }
      while (new_index < 0) {
        new_index += arr.length;
      }
      if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    },
    getDeepKeys(obj) {
      let keys = [];
      for(let key in obj) {
        if(typeof obj.key === "object" && !Array.isArray(obj.key)) {
          let subkeys = this.getDeepKeys(obj.key);
          keys = keys.concat(subkeys.map(function(subkey) {
            return key + "." + subkey;
          }));
        } else if(Array.isArray(obj.key)) {
          // for(let i=0;i<obj[key].length;i++){
          //   let subkeys = this.getDeepKeys(obj[key][i]);
          //   keys = keys.concat(subkeys.map(function(subkey) {
          //     return key + "[" + i + "]" + "." + subkey;
          //   }));
          // }
          keys.push(key);
        } else {
          keys.push(key);
        }
      }
      return keys;
    },
    getColumnList(sourse, target) {
      for(let i = 0; i < sourse.length; i++) {
        let item = {
          id: sourse[i].id,
          parentName: sourse[i].ownerName,
          name: sourse[i].name,
          caption: sourse[i].caption,
          icon: 'columnfield',
          isBand: false
        }
        if (sourse[i].isBand) {
          item.icon = 'activefolder';
          item.isBand = true;
        }
        if (item.parentName) {
          item.icon = 'minus';
        }
        target.push(item);
        if (sourse[i].columns) {
          this.getColumnList(sourse[i].columns, target);
        }
      }
    },
    dsValueChanged (e) {
      if (e.value) {
        this.dataSource = e.value;
      } else {
        this.dataSource = this.defaultDS;
      }
    },
    listOptionChanged(e) {
      if (e.name === "selectedItems") {
        this.selectedItems=e.value;
      }
    }
  }
};
</script>
<style scoped>
.dx-toolbar {
  background-color: rgba(191, 191, 191, .15);
  padding: 5px 10px;
}

.container {
  border: 1px solid rgba(191, 191, 191, 0.25);
}

.grid-container {
  margin: 30px 30px 30px;
  padding: 20px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
}

.form-container2 {
  margin: 2px 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 20px;
}

</style>
