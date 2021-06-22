<template>
  <div>
    <div class="titul-container">
      <div class="dx-field">
        <div class="dx-field-label">Настройки таблицы:</div>
        <div class="dx-field-value">
          <DxButton
              id="viewbtn"
              :icon="buttonIcon"
              @click="formView"
          />
        </div>
      </div>
    </div>
    <DxForm
      :form-data="data"
      :col-count="1"
      :height="height"
      width="100%"
      :scrollingEnabled="true"
      @field-data-changed="formFieldDataChanged"
      :visible="formGridVisible"
    >
    <DxItem item-type="group" :visible="true" :alignItemLabels="false" :col-count=1 >
<!--      <DxItem item-type="simple" data-field="dataSourceList" editor-type='dxSelectBox' :label= "{text: 'Источник данных' }"
              :editor-options= "{ onValueChanged: (e) => { this.dsChange(e.value) }, searchEnabled: true,items: this.dsList}"/>-->
      <DxItem item-type="simple" data-field="width" editor-type="dxTextBox" :label= "{text: 'Ширина таблицы' }"/>
      <DxItem item-type="simple" data-field="height" editor-type="dxTextBox" :label= "{text: 'Высота таблицы' }"/>
      <DxItem item-type="simple" data-field="columnWidth" editor-type="dxNumberBox" :label= "{text: 'Ширина всех столбцов' }"/>
      <DxItem item-type="simple" data-field="columnMinWidth" editor-type="dxNumberBox" :label= "{text: 'Минимальная ширина столбцов' }"/>
      <DxItem item-type="simple" data-field="columnResizingMode" editor-type='dxSelectBox' :label= "{text: 'Режим изменения размера столбцов' }" :editor-options=" {items: ['nextColumn', 'widget']}"/>
    </DxItem>
    <!--              <DxItem item-type="simple" data-field="accessKey" editor-type="dxTextBox"/>-->
    <!--              <DxItem item-type="simple" data-field="activeStateEnabled" editor-type="dxCheckBox"/>-->
    <DxItem item-type="group" :visible="true" caption="Разрешения для таблицы" :alignItemLabels="true" :col-count=1 >
      <DxItem item-type="simple" data-field="allowColumnReordering" editor-type="dxCheckBox" :label= "{text: 'Переставлять столбцы' }"/>
      <DxItem item-type="simple" data-field="allowColumnResizing" editor-type="dxCheckBox" :label= "{text: 'Изменять размер столбцов' }"/>/>
      <DxItem item-type="simple" data-field="cacheEnabled" editor-type="dxCheckBox" :label= "{text: 'Кэшировать данные' }"/>
      <DxItem item-type="simple" data-field="cellHintEnabled" editor-type="dxCheckBox" :label= "{text: 'Подсказка для усеченных данных' }"/>
      <DxItem item-type="simple" data-field="columnAutoWidth" editor-type="dxCheckBox" :label= "{text: 'Авто ширина колонок' }"/>
      <DxItem item-type="simple" data-field="columnHidingEnabled" editor-type="dxCheckBox" :label= "{text: 'Автоскрытие колонок' }"/>
      <DxItem item-type="simple" data-field="disabled" editor-type="dxCheckBox" :label= "{text: 'Запретить таблицу' }"/>
      <DxItem item-type="simple" data-field="errorRowEnabled" editor-type="dxCheckBox" :label= "{text: 'Отображать с ошибкой' }"/>
      <DxItem item-type="simple" data-field="twoWayBindingEnabled" editor-type="dxCheckBox"/>
      <DxItem item-type="simple" data-field="visible" editor-type="dxCheckBox" :label= "{text: 'Видимость' }"/>
      <DxItem item-type="simple" data-field="wordWrapEnabled" editor-type="dxCheckBox" :label= "{text: 'Сворачивать строки' }"/>
    </DxItem>
    <DxItem item-type="group" :visible="true" caption="Селектор столбцов (columnChooser)" :alignItemLabels="false" :col-count=1 >
      <DxItem item-type="group" :visible="true" :col-count=2 :alignItemLabels="false" >
        <DxItem item-type="simple" data-field="columnChooser.enabled" editor-type="dxCheckBox" :label= "{text: 'Разрешить' }"/>
        <DxItem item-type="simple" data-field="columnChooser.allowSearch" editor-type="dxCheckBox" :label= "{text: 'Поиск' }"/>
        <DxItem item-type="simple" data-field="columnChooser.height" editor-type="dxNumberBox" :label= "{text: 'Высота окна селектора' }"/>
        <DxItem item-type="simple" data-field="columnChooser.width" editor-type="dxNumberBox" :label= "{text: 'Ширина окна селектора' }"/>
      </DxItem>
      <DxItem item-type="simple" data-field="columnChooser.emptyPanelText" editor-type="dxTextBox" :label= "{text: 'Текст в пустом селекторе' }"/>
      <DxItem item-type="simple" data-field="columnChooser.mode" editor-type='dxSelectBox' :label= "{text: 'Режим управления столбцами' }" :editor-options=" {items: ['dragAndDrop', 'select']}"/>
      <DxItem item-type="simple" data-field="columnChooser.searchTimeout" editor-type="dxNumberBox" :label= "{text: 'Задержка для строки поиска' }"/>
      <DxItem item-type="simple" data-field="columnChooser.title" editor-type="dxTextBox" :label= "{text: 'Заголовок селектора колонок'}"/>
    </DxItem>
    <DxItem item-type="group" :visible="true" caption="Фиксация столбца" :col-count=1 >
      <DxItem item-type="simple" data-field="columnFixing.enabled" editor-type="dxCheckBox" :label= "{text: 'Разрешить фиксацию' }"/>
      <DxItem item-type="simple" data-field="columnFixing.texts.fix" editor-type="dxTextBox" :label= "{text: 'Текст - зафиксировать столбец' }"/>
      <DxItem item-type="simple" data-field="columnFixing.texts.leftPosition" editor-type="dxTextBox" :label= "{text: 'Текст - зафиксировать слева' }"/>
      <DxItem item-type="simple" data-field="columnFixing.texts.rightPosition" editor-type="dxTextBox" :label= "{text: 'Текст - зафиксировать справа' }"/>
      <DxItem item-type="simple" data-field="columnFixing.texts.unfix" editor-type="dxTextBox" :label= "{text: 'Текст - открепить' }"/>
    </DxItem>

    <!--              <DxItem item-type="simple" data-field="dateSerializationFormat" editor-type="dxTextBox"/>-->


    <DxItem item-type="group" :visible="true" caption="Режим редактирования" :col-count=1 >
      <DxItem item-type="simple" data-field="editing.allowAdding" editor-type="dxCheckBox" :label= "{text: 'Разрешить добавление' }"/>
      <DxItem item-type="simple" data-field="editing.allowDeleting" editor-type="dxCheckBox" :label= "{text: 'Разрешить удаление' }"/>
      <DxItem item-type="simple" data-field="editing.allowUpdating" editor-type="dxCheckBox" :label= "{text: 'Разрешить изменение' }"/>
      <DxItem item-type="simple" data-field="editing.confirmDelete" editor-type="dxCheckBox"  :label= "{text: 'Подтверждать удаление' }"/>
      <DxItem item-type="simple" data-field="editing.texts.useIcons" editor-type="dxCheckBox" :label= "{text: 'Использовать значки' }"/>
      <DxItem item-type="simple" data-field="editing.selectTextOnEditStart" editor-type="dxCheckBox" :label= "{text: 'Выделять текст' }"/>
      <!--                  <DxItem item-type="simple" data-field="editing.editColumnName" editor-type="dxTextBox" :label= "{text: 'Разрешить добавление' }"/>-->
      <DxItem item-type="simple" data-field="editing.mode" editor-type='dxSelectBox' :label= "{text: 'Режим редактирования' }" :editor-options=" {items: ['batch', 'cell', 'row', 'form', 'popup']}"/>
      <DxItem item-type="simple" data-field="editing.refreshMode" editor-type='dxSelectBox'  :label= "{text: 'Режим обновления' }" :editor-options=" {items: ['full', 'reshape', 'repaint']}"/>

      <DxItem item-type="simple" data-field="editing.startEditAction" editor-type='dxSelectBox' :label= "{text: 'Переход к редактированию' }" :editor-options=" {items: ['click', 'dblClick']}"/>

      <DxItem item-type="group" :visible="true" caption="Тексты" >
        <DxItem item-type="simple" data-field="editing.texts.addRow" editor-type="dxTextBox" :label= "{location: 'top', text: 'Добавить новую запись' }"/>
        <DxItem item-type="simple" data-field="editing.texts.cancelAllChanges" editor-type="dxTextBox" :label= "{location: 'top', text: 'Отменить все изменения' }"/>
        <DxItem item-type="simple" data-field="editing.texts.cancelRowChanges" editor-type="dxTextBox" :label= "{location: 'top', text: 'Отменить изменения в записи' }"/>
        <DxItem item-type="simple" data-field="editing.texts.confirmDeleteMessage" editor-type="dxTextBox" :label= "{location: 'top', text: 'Запрос подтверждения удаления' }"/>
        <DxItem item-type="simple" data-field="editing.texts.confirmDeleteTitle" editor-type="dxTextBox" :label= "{location: 'top', text: 'Титул подтверждения удаления' }"/>
        <DxItem item-type="simple" data-field="editing.texts.deleteRow" editor-type="dxTextBox" :label= "{location: 'top', text: 'Удалить запись' }"/>
        <DxItem item-type="simple" data-field="editing.texts.editRow" editor-type="dxTextBox" :label= "{location: 'top', text: 'Редактировать запись' }"/>
        <DxItem item-type="simple" data-field="editing.texts.saveAllChanges" editor-type="dxTextBox" :label= "{location: 'top', text: 'Сохранить все изменения' }"/>
        <DxItem item-type="simple" data-field="editing.texts.saveRowChanges" editor-type="dxTextBox" :label= "{location: 'top', text: 'Сохранить изменения записи' }"/>
        <DxItem item-type="simple" data-field="editing.texts.undeleteRow" editor-type="dxTextBox" :label= "{location: 'top', text: 'Отменить удаление записи' }"/>
        <DxItem item-type="simple" data-field="editing.texts.validationCancelChanges" editor-type="dxTextBox" :label= "{location: 'top', text: 'Подсказка для кнопки отмены' }"/>
      </DxItem>
    </dxItem>
    <DxItem item-type="group" :visible="true" caption="Экспорт" :col-count=1 >
      <DxItem item-type="simple" data-field="export.enabled" editor-type="dxCheckBox" :label= "{text: 'Разрешить' }"/>
      <DxItem item-type="simple" data-field="export.allowExportSelectedData" editor-type="dxCheckBox" :label= "{text: 'Только выбранные строки' }"/>
      <DxItem item-type="simple" data-field="export.excelFilterEnabled" editor-type="dxCheckBox" :label= "{text: 'Вкл. фильтрацию Excel' }"/>
      <DxItem item-type="simple" data-field="export.excelWrapTextEnabled" editor-type="dxCheckBox" :label= "{text: 'Вкл. перенос для Excel' }"/>
      <DxItem item-type="simple" data-field="export.fileName" editor-type="dxTextBox" :label= "{text: 'Имя файла' }"/>
      <DxItem item-type="simple" data-field="export.ignoreExcelErrors" editor-type="dxCheckBox" :label= "{text: 'Игнорировать ошибки' }"/>
      <!--                <DxItem item-type="simple" data-field="export.proxyUrl" editor-type="dxTextBox"/>-->
      <DxItem item-type="simple" data-field="export.texts.exportAll" editor-type="dxTextBox" :label= "{text: 'Текст: экспортировать все' }"/>
      <DxItem item-type="simple" data-field="export.texts.exportSelectedRows" editor-type="dxTextBox" :label= "{text: 'Текст: экспортировать выделенные' }"/>
      <DxItem item-type="simple" data-field="export.texts.exportTo" editor-type="dxTextBox" :label= "{text: 'Подсказка кнопки экспорт' }"/>
    </dxItem>

    <DxItem item-type="group" :visible="true" caption="Панель фильтра" :alignItemLabels="false" :col-count=1 >
      <DxItem item-type="simple" data-field="filterPanel.customizeText" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterPanel.filterEnabled" editor-type="dxCheckBox"/>
      <DxItem item-type="simple" data-field="filterPanel.texts.clearFilter" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterPanel.texts.createFilter" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterPanel.texts.filterEnabledHint" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterPanel.visible" editor-type="dxCheckBox"/>
    </dxItem>

    <DxItem item-type="group" :visible="true" caption="Фильтр под заголовком" :alignItemLabels="false" :col-count=1 >
      <DxItem item-type="simple" data-field="filterRow.applyFilter" editor-type='dxSelectBox' :editor-options=" {items: ['auto', 'onClick']}"/>
      <DxItem item-type="simple" data-field="filterRow.applyFilterText" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.betweenEndText" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.betweenStartText" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.between" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.contains" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.endsWith" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.equal" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.greaterThan" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.greaterThanOrEqual" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.lessThan" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.lessThanOrEqual" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.notContains" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.notEqual" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.operationDescriptions.startsWith" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.resetOperationText" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.showAllText" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="filterRow.showOperationChooser" editor-type="dxCheckBox"/>
      <DxItem item-type="simple" data-field="filterRow.visible" editor-type="dxCheckBox"/>
    </dxItem>
    <DxItem item-type="group" :visible="true" caption="Фильтр в заголовке" :alignItemLabels="false" :col-count=1 >
      <DxItem item-type="simple" data-field="headerFilter.allowSearch" editor-type="dxCheckBox"/>
      <DxItem item-type="simple" data-field="headerFilter.height" editor-type="dxNumberBox"/>
      <DxItem item-type="simple" data-field="headerFilter.searchTimeout" editor-type="dxNumberBox"/>
      <DxItem item-type="simple" data-field="headerFilter.texts.cancel" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="headerFilter.texts.emptyValue" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="headerFilter.texts.ok" editor-type="dxTextBox"/>
      <DxItem item-type="simple" data-field="headerFilter.visible" editor-type="dxCheckBox"/>
      <DxItem item-type="simple" data-field="headerFilter.width" editor-type="dxNumberBox"/>
    </dxItem>

    <DxItem item-type="simple" data-field="filterSyncEnabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="filterValue" editor-type="dxTextBox"/>

    <DxItem item-type="simple" data-field="focusedColumnIndex" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="focusedRowEnabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="focusedRowIndex" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="focusedRowKey"/>
    <DxItem item-type="simple" data-field="focusStateEnabled" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="grouping.allowCollapsing" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="grouping.autoExpandAll" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="grouping.contextMenuEnabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="grouping.expandMode" editor-type='dxSelectBox' :editor-options=" {items: ['buttonClick', 'rowClick']}"/>
    <DxItem item-type="simple" data-field="grouping.texts.groupByThisColumn" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="grouping.texts.groupContinuedMessage" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="grouping.texts.groupContinuesMessage" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="grouping.texts.ungroup" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="grouping.texts.ungroupAll" editor-type="dxTextBox"/>

    <DxItem item-type="simple" data-field="groupPanel.allowColumnDragging" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="groupPanel.emptyPanelText" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="groupPanel.visible" editor-type="dxCheckBox"/>


    <DxItem item-type="simple" data-field="highlightChanges" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="hint" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="hoverStateEnabled" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="keyboardNavigation.editOnKeyPress" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="keyboardNavigation.enabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="keyboardNavigation.enterKeyAction" editor-type='dxSelectBox' :editor-options=" {items: ['startEdit', 'moveFocus']}"/>
    <DxItem item-type="simple" data-field="keyboardNavigation.enterKeyDirection" editor-type='dxSelectBox' :editor-options=" {items: ['none', 'column', 'row']}"/>

    <DxItem item-type="simple" data-field="keyExpr" editor-type="dxTextBox"/>

    <DxItem item-type="simple" data-field="loadPanel.enabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="loadPanel.height" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="loadPanel.indicatorSrc" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="loadPanel.shading" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="loadPanel.shadingColor" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="loadPanel.showIndicator" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="loadPanel.showPane" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="loadPanel.text" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="loadPanel.width" editor-type="dxNumberBox"/>

    <DxItem item-type="simple" data-field="masterDetail.autoExpandAll" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="masterDetail.enabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="masterDetail.template" editor-type="dxTextBox"/>

    <DxItem item-type="simple" data-field="noDataText" editor-type="dxTextBox"/>

    <DxItem item-type="simple" data-field="pager.allowedPageSizes" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="pager.infoText" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="pager.showInfo" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="pager.showNavigationButtons" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="pager.showPageSizeSelector" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="pager.visible" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="paging.enabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="paging.pageIndex" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="paging.pageSize" editor-type="dxNumberBox"/>

    <DxItem item-type="simple" data-field="remoteOperations" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="renderAsync" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="repaintChangesOnly" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="rowAlternationEnabled" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="rowDragging.allowReordering" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="rowDragging.autoScroll" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="rowDragging.boundary" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rowDragging.container" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rowDragging.cursorOffset.x" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="rowDragging.cursorOffset.y" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="rowDragging.dragDirection" editor-type='dxSelectBox' :editor-options=" {items: ['both', 'horizontal', 'vertical']}"/>
    <DxItem item-type="simple" data-field="rowDragging.dragTemplate" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rowDragging.dropFeedbackMode" editor-type='dxSelectBox' :editor-options=" {items: ['push', 'indicate']}"/>
    <DxItem item-type="simple" data-field="rowDragging.filter" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rowDragging.group" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rowDragging.handle" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rowDragging.scrollSensitivity" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="rowDragging.scrollSpeed" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="rowDragging.showDragIcons" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="rowTemplate" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="rtlEnabled" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="scrolling.columnRenderingMode" editor-type='dxSelectBox' :editor-options=" {items: ['standard', 'virtual']}"/>
    <DxItem item-type="simple" data-field="scrolling.mode" editor-type='dxSelectBox' :editor-options=" {items: ['infinite', 'standard', 'virtual']}"/>
    <DxItem item-type="simple" data-field="scrolling.preloadEnabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="scrolling.rowRenderingMode" editor-type='dxSelectBox' :editor-options=" {items: ['standard', 'virtual']}"/>
    <DxItem item-type="simple" data-field="scrolling.scrollByContent" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="scrolling.scrollByThumb" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="scrolling.showScrollbar" editor-type='dxSelectBox' :editor-options=" {items: ['always', 'never', 'onHover', 'onScroll']}"/>
    <DxItem item-type="simple" data-field="scrolling.useNative" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="searchPanel.highlightCaseSensitive" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="searchPanel.highlightSearchText" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="searchPanel.placeholder" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="searchPanel.searchVisibleColumnsOnly" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="searchPanel.text" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="searchPanel.visible" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="searchPanel.width" editor-type="dxNumberBox"/>

    <DxItem item-type="simple" data-field="selection.allowSelectAll" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="selection.deferred" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="selection.mode" editor-type='dxSelectBox' :editor-options=" {items: ['multiple', 'none', 'single']}"/>
    <DxItem item-type="simple" data-field="selection.selectAllMode" editor-type='dxSelectBox' :editor-options=" {items: ['allPages', 'page']}"/>
    <DxItem item-type="simple" data-field="selection.showCheckBoxesMode" editor-type='dxSelectBox' :editor-options=" {items: ['always', 'none', 'onClick', 'onLongTap']}"/>

    <DxItem item-type="simple" data-field="showBorders" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="showColumnHeaders" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="showColumnLines" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="showRowLines" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="sorting.ascendingText" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="sorting.clearText" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="sorting.descendingText" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="sorting.mode" editor-type='dxSelectBox' :editor-options=" {items: ['multiple', 'none', 'single']}"/>
    <DxItem item-type="simple" data-field="sorting.showSortIndexes" editor-type="dxCheckBox"/>

    <DxItem item-type="simple" data-field="stateStoring.enabled" editor-type="dxCheckBox"/>
    <DxItem item-type="simple" data-field="stateStoring.savingTimeout" editor-type="dxNumberBox"/>
    <DxItem item-type="simple" data-field="stateStoring.storageKey" editor-type="dxTextBox"/>
    <DxItem item-type="simple" data-field="stateStoring.type" editor-type='dxSelectBox' :editor-options=" {items: ['custom', 'localStorage', 'sessionStorage']}"/>

    <DxItem item-type="simple" data-field="tabIndex" editor-type="dxNumberBox"/>

  </DxForm>
  </div>
</template>
<script>
import { DxForm, DxItem } from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button';
export default {
  components: { DxForm, DxItem, DxButton },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    grid: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: Number,
      default: () => (800)
    }
  },
  data() {
    return {
      formGridVisible: false,
      buttonIcon: 'spindown'
    };
  },
  methods: {
    formFieldDataChanged(e) {
        this.grid.option(e.dataField, e.value);
        this.grid.repaint();
    },
    formView() {
      this.formGridVisible = !this.formGridVisible;
      if (this.formGridVisible) {
        this.buttonIcon= 'spinup'
      } else {
        this.buttonIcon= 'spindown'
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

.dx-field > .dx-field-label {
  font-weight: bold;
  font-size: 115%;
  color: #051672;
}

</style>


