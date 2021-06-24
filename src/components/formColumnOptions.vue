<template>
  <div>
    <div class="titul-container">
        <div class="option">
          <span>Настройки колонки:</span>
          <div id="selectionColumn">{{ selectionColumn === null ? "" : selectionColumn.caption }}</div>
        <div class="btn">
          <DxButton
              id="viewbtn2"
              :icon="buttonIcon"
              @click="formView"
          />
        </div>
        </div>
    </div>
    <div class="dx-form">
      <DxForm
          :form-data="data"
          :col-count="1"
          :height="height"
          width="100%"
          :scrollingEnabled="true"
          @field-data-changed="formFieldDataChanged"
          :visible="formGridVisible"
      >
        <DxItem item-type="group" :visible="true" caption="Поле данных" :alignItemLabels="false" :col-count=1 >
          <DxItem item-type="simple" data-field='dataField' editor-type='dxSelectBox' :label= "{text: 'Имя поля' }" :editor-options= "{searchEnabled: true, items: fieldList }"/>
          <DxItem item-type="simple" data-field='dataType' editor-type='dxSelectBox' :label= "{text: 'Тип поля' }" :editor-options=" {items: [undefined, 'string', 'number', 'date', 'boolean', 'object', 'datetime']}"/>
          <DxItem item-type="simple" data-field='caption' editor-type="dxTextBox" :label= "{text: 'Заголовок колонки' }"/>
        </DxItem>
        <DxItem item-type="group" :visible="true" caption="Оформление колонки" :alignItemLabels="false" :col-count=1 >
          <DxItem item-type="simple" data-field='alignment' editor-type='dxSelectBox' :label= "{text: 'Выравнивание' }" :editor-options=" {items: [undefined, 'center', 'left', 'right']}"/>
          <DxItem item-type="simple" data-field='cellTemplate' editor-type="dxTextBox" :label= "{text: 'Шаблон ячейки' }"/>
          <DxItem item-type="simple" data-field="cellTemplateFieldlist" editor-type='dxSelectBox' :label= "{text: 'Поля для ячейки' }"
                  :editor-options= "{ onValueChanged: (e) => { cellTemplateItemsChange(e) }, searchEnabled: true, items: templateArrayList }"/>
          <DxItem item-type="simple" data-field='headerCellTemplate' :label= "{text: 'Шаблон заголовка' }"/>
          <DxItem item-type="simple" data-field='format' :label= "{text: 'Формат ячейки' }"
                  editor-type='dxSelectBox'
                  :editor-options=" {items: [undefined, 'billions', 'currency', 'day', 'decimal', 'exponential', 'fixedPoint', 'largeNumber',
                       'longDate', 'longTime', 'millions', 'millisecond', 'month', 'monthAndDay', 'monthAndYear', 'percent', 'quarter',
                        'quarterAndYear', 'shortDate', 'shortTime', 'thousands', 'trillions', 'year', 'dayOfWeek', 'hour', 'longDateLongTime', 'minute', 'second', 'shortDateShortTime']}"/>
          <DxItem item-type="simple" data-field='cssClass' editor-type="dxTextBox" :label= "{text: 'Имя стиля (CSS)' }"/>
          <DxItem item-type="simple" data-field='width' editor-type="dxTextBox" :label= "{text: 'Ширина колонки' }"/>
          <DxItem item-type="simple" data-field='minWidth' editor-type="dxNumberBox" :label= "{text: 'Минимальная ширина' }"/>
          <DxItem item-type="simple" data-field='type' editor-type='dxSelectBox'  :label= "{text: 'Тип колонки' }" :editor-options=" {items: [undefined,'adaptive', 'buttons', 'detailExpand', 'groupExpand', 'selection', 'drag']}"/>
        </DxItem>
        <DxItem item-type="group" :visible="true" caption="Разрешения для колонки" :col-count=2 >
          <DxItem item-type="simple" data-field='allowEditing' editor-type="dxCheckBox" :label= "{text: 'Редактировать' }"/>
          <DxItem item-type="simple" data-field='allowExporting' editor-type="dxCheckBox" :label= "{text: 'Экспортировать' }"/>
          <DxItem item-type="simple" data-field='allowFiltering' editor-type="dxCheckBox" :label= "{text: 'Фильтровать' }"/>
          <DxItem item-type="simple" data-field='allowFixing' editor-type="dxCheckBox" :label= "{text: 'Фиксировать' }"/>
          <DxItem item-type="simple" data-field='allowGrouping' editor-type="dxCheckBox" :label= "{text: 'Группировать' }"/>
          <DxItem item-type="simple" data-field='allowHeaderFiltering' editor-type="dxCheckBox" :label= "{text: 'Фильтр в заголовке' }"/>
          <DxItem item-type="simple" data-field='allowHiding' editor-type="dxCheckBox" :label= "{text: 'Скрывать' }"/>
          <DxItem item-type="simple" data-field='allowReordering' editor-type="dxCheckBox" :label= "{text: 'Переставлять' }"/>
          <DxItem item-type="simple" data-field='allowResizing' editor-type="dxCheckBox" :label= "{text: 'Изменять размер' }"/>
          <DxItem item-type="simple" data-field='allowSearch' editor-type="dxCheckBox" :label= "{text: 'Искать' }"/>
          <DxItem item-type="simple" data-field='allowSorting' editor-type="dxCheckBox" :label= "{text: 'Сортировать' }"/>
          <DxItem item-type="simple" data-field='autoExpandGroup' editor-type="dxCheckBox" :label= "{text: 'Раскрывать группу' }"/>
          <DxItem item-type="simple" data-field='encodeHtml' editor-type="dxCheckBox" :label= "{text: 'HTML как текст ' }"/>
          <DxItem item-type="simple" data-field='showEditorAlways' editor-type="dxCheckBox" :label= "{text: 'Показ в редакторе' }"/>
          <DxItem item-type="simple" data-field='showInColumnChooser' editor-type="dxCheckBox" :label= "{text: 'Видеть в Shooser' }"/>
          <DxItem item-type="simple" data-field='showWhenGrouped' editor-type="dxCheckBox" :label= "{text: 'Видеть при группировке' }"/>
          <DxItem item-type="simple" data-field='visible' editor-type="dxCheckBox" :label= "{text: 'Видимость' }"/>
          <DxItem item-type="simple" data-field='renderAsync' editor-type="dxCheckBox" :label= "{text: 'Рисовать после всех' }"/>
        </DxItem>
        <DxItem item-type="group" :visible="true" caption="Настройка фильтра" :alignItemLabels="false" :col-count=1 >
          <DxItem item-type="simple" data-field='filterOperations' :label= "{text: 'Доступные операции фильтрации' }"/>
          <DxItem item-type="simple" data-field='filterType'  :label= "{text: 'Тип фильтрации' }" editor-type='dxSelectBox' :editor-options=" {items: ['exclude', 'include']}"/>
          <DxItem item-type="simple" data-field='filterValue' :label= "{text: 'Значение фильтра' }"/>
          <DxItem item-type="simple" data-field='filterValues' :label= "{text: 'Значения (массив) фильтра' }"/>
          <DxItem item-type="simple" data-field='selectedFilterOperation' :label= "{text: 'Операции фильтрации' }"/>
          <DxItem item-type="simple" data-field='headerFilter.allowSearch'  :label= "{text: 'Поиск в фильтре заголовка' }" editor-type="dxCheckBox"/>
          <DxItem item-type="simple" data-field='headerFilter.dataSource'  :label= "{text: 'Источник данных фильтра заголовка' }"/>
          <DxItem item-type="simple" data-field='headerFilter.groupInterval'  :label= "{text: 'Значение для группирования' }"/>
          <DxItem item-type="simple" data-field='headerFilter.height' editor-type="dxNumberBox" :label= "{text: 'Высота фильтра заголовка' }"/>
          <DxItem item-type="simple" data-field='headerFilter.searchMode'  :label= "{text: 'Операция сравнения' }" editor-type='dxSelectBox' :editor-options=" {items: ['contains', 'startswith', 'equals']}"/>
          <DxItem item-type="simple" data-field='headerFilter.width' editor-type="dxNumberBox" :label= "{text: 'Ширина фильтра заголовка' }"/>
        </DxItem>
        <DxItem item-type="group" :visible="true" caption="Настройка столбца подстановки" :alignItemLabels="false" :col-count=1 >
          <DxItem item-type="simple" data-field='lookup.allowClearing' editor-type="dxCheckBox" :label= "{text: 'Показать кнопку очистки' }"/>
          <DxItem item-type="simple" data-field='lookup.dataSource' :label= "{text: 'Источник данных' }"/>
          <DxItem item-type="simple" data-field='lookup.displayExpr' editor-type="dxTextBox" :label= "{text: 'Поле для отображения' }"/>
          <DxItem item-type="simple" data-field='lookup.valueExpr' editor-type="dxTextBox" :label= "{text: 'Поле для значения' }"/>
        </DxItem>
        <DxItem item-type="group" :visible="true" caption="Другие настройки" :alignItemLabels="false" :col-count=1 >
          <DxItem item-type="simple" data-field='fixed' editor-type="dxCheckBox" :label= "{text: 'Фиксировать колонку' }"/>
          <DxItem item-type="simple" data-field='fixedPosition'  :label= "{text: 'Позиция фиксации' }" editor-type='dxSelectBox' :editor-options=" {items: ['left', 'right']}"/>
          <DxItem item-type="simple" data-field='groupCellTemplate'  :label= "{text: 'Шаблон ячейки группы' }"/>
          <DxItem item-type="simple" data-field='groupIndex' editor-type="dxNumberBox" :label= "{text: 'Индекс группы' }"/>
          <DxItem item-type="simple" data-field='hidingPriority' editor-type="dxNumberBox" :label= "{text: 'Номер приоритета скрытия' }"/>
          <DxItem item-type="simple" data-field='validationRules' :label= "{text: 'Правила проверки значения' }" editor-type='dxSelectBox' :editor-options=" {items: [undefined,'RequiredRule', 'NumericRule', 'RangeRule', 'StringLengthRule', 'CustomRule', 'CompareRule', 'PatternRule', 'EmailRule', 'AsyncRule']}"/>
          <DxItem item-type="simple" data-field='sortOrder' editor-type='dxSelectBox' :label= "{text: 'Направление сортировки' }" :editor-options=" {items: [undefined, 'asc', 'desc']}"/>
          <DxItem item-type="simple" data-field='sortIndex' editor-type="dxNumberBox" :label= "{text: 'Индекс сортировки' }"/>
          <DxItem item-type="simple" data-field='trueText' editor-type="dxTextBox" :label= "{text: 'Текст значения TRUE' }"/>
          <DxItem item-type="simple" data-field='falseText' editor-type="dxTextBox" :label= "{text: 'Текст значения FALSE' }"/>
          <DxItem item-type="simple" data-field='visibleIndex' editor-type="dxNumberBox"/>
        </DxItem>

      </DxForm>
    </div>
  </div>
</template>
<script>
import { DxForm, DxItem } from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button';
import service from '../data.js';
export default {
  components: { DxForm,
    DxItem,
    DxButton },
  computed: {
    templateArrayList: function() {
      return Object.keys(this.cellTemplateArrayList);
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    grid: {
      type: Object,
      default: () => ({})
    },
    selectionColumn: {
      type: Object,
      default: () => ({})
    },
    myColumns: {
      type: Array,
      default: () => ([])
    },
    fieldList: {
      type: Array,
      default: () => ([])
    },
    height: {
      type: Number,
      default: () => (window.innerHeight - 190)
    }
  },
  data() {
    const cellTemplateArrayList = service.getCellTemplateArrayList();
    return {
      cellTemplateArrayList,
      formGridVisible: true,
      buttonIcon: 'spindown'
    };
  },
  methods: {
    formFieldDataChanged(e) {
      if (this.selectionColumn !== null && this.grid.columnOption(this.selectionColumn.name, e.dataField) !== e.value) {
        this.findItemByKey(this.myColumns, this.selectionColumn.name)[e.dataField] = e.value;
        this.grid.option('columns', this.myColumns);
      }
    },
    formView() {
      this.formGridVisible = !this.formGridVisible;
      if (this.formGridVisible) {
        this.buttonIcon= 'spinup'
      } else {
        this.buttonIcon= 'spindown'
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
    getDeepKeys(obj) {
      let keys = [];
      for(let key in obj) {
        if(typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          let subkeys = this.getDeepKeys(obj[key]);
          keys = keys.concat(subkeys.map(function(subkey) {
            return key + "." + subkey;
          }));
        } else if(Array.isArray(obj[key])) {
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
    cellTemplateItemsChange(e) {
      if (e.value) {
        this.selectionColumn.cellTemplateFieldArray = this.cellTemplateArrayList[e.value];
      }
    }
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

.dx-form-group-caption {
  font-size: medium;
}

.option {
  margin-bottom: 12px;
  font-size: medium;
}

.option > .btn {
  float: right;
}

.option > span {
  position: relative;
  margin-right: 10px;
  font-weight: bold;
  color: #051672;
}

.option > div {
  display: inline-block;
  font-weight: bold;
  color: brown;
}



</style>


