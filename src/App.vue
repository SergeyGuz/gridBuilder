<template>
  <div>
    <DxToolbar>
      <ToolBarItem
          :options="{ icon: 'menu', onClick: () => this.openState = !this.openState }"
          location="before"
          widget="dxButton"
      />
      <ToolBarItem
          :options="{ icon: 'menu', onClick: () => this.myShow() }"
          location="before"
          widget="dxButton"
      />
      <ToolBarItem
          :options="{ icon: 'insertcolumnleft', onClick: () => this.addNewColumn(null, undefined) }"
          location="before"
          widget="dxButton"
      />
      <ToolBarItem
          :options="{ icon: 'insertcolumnright', onClick: () => this.addNewColumn(this.findItemByKey(this.myColumns, this.selectionColumn.name), undefined) }"
          location="before"
          widget="dxButton"
          :disabled="isNotColumnSelect"
      />
      <ToolBarItem
          :options="{ icon: 'deletecolumn', onClick: () => this.deleteColumn(this.selectionColumn)}"
          location="before"
          widget="dxButton"
          :disabled="isNotColumnSelect"
      />
    </DxToolbar>
    <DxDrawer
        :opened= "openState"
        :close-on-outside-click="false"
        template="GridOptions"
    >
    <template #GridOptions>
      <div class="container">
        <DxButton
            width="100%"
            icon="preferences"
            stylingMode="text"
            type="default"
            text="Параметры разрабатываемой таблицы"
            @click="showFormSetup"
        />
        <div class="form-container2">
          <DxTreeView
              ref="treeview"
              :data-source = "myTreeColumns"
              selection-mode="single"
              :select-by-click="true"
              show-check-boxes-mode="none"
              width="100%"
              key-expr="name"
              items-expr="columns"
              display-expr="caption"
              dataStructure="tree"
              no-data-text="Колонки отсутствуют"
              @item-click="selectItem"
          />
          <DxForm
              ref="form3"
              :col-count="1"
              height="760"
              :scrollingEnabled="true"
              @field-data-changed="formFieldDataChanged"
          >
            <DxTagBox :visible='false'/>
            <DxItem item-type="simple" data-field="accessKey" editor-type="dxTextBox"/>
<!--              <DxItem item-type="simple" data-field="accessKey" editor-type="dxTextBox" :label= "{text: 'Проба'}"/>-->
            <DxItem item-type="simple" data-field="activeStateEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="allowColumnReordering" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="allowColumnResizing" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="autoNavigateToFocusedRow" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="cacheEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="cellHintEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="columnAutoWidth" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="columnChooser.allowSearch" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="columnChooser.emptyPanelText" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="columnChooser.enabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="columnChooser.height" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="columnChooser.mode" editor-type='dxSelectBox' :editor-options=" {items: ['dragAndDrop', 'select']}"/>
            <DxItem item-type="simple" data-field="columnChooser.searchTimeout" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="columnChooser.title" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="columnChooser.width" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="columnFixing.enabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="columnFixing.texts.fix" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="columnFixing.texts.leftPosition" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="columnFixing.texts.rightPosition" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="columnFixing.texts.unfix" editor-type="dxTextBox"/>

            <DxItem item-type="simple" data-field="columnHidingEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="columnMinWidth" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="columnResizingMode" editor-type='dxSelectBox' :editor-options=" {items: ['nextColumn', 'widget']}"/>
            <DxItem item-type="simple" data-field="columnWidth" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="dataSource" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="dateSerializationFormat" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="disabled" editor-type="dxCheckBox"/>

            <DxItem item-type="group" :visible="true" caption="Editing" >
                <DxItem item-type="simple" data-field="editing.allowAdding" editor-type="dxCheckBox"/>
                <DxItem item-type="simple" data-field="editing.allowDeleting" editor-type="dxCheckBox"/>
                <DxItem item-type="simple" data-field="editing.allowUpdating" editor-type="dxCheckBox"/>
                <DxItem item-type="simple" data-field="editing.confirmDelete" editor-type="dxCheckBox"/>
                <DxItem item-type="simple" data-field="editing.editColumnName" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.mode" editor-type='dxSelectBox' :editor-options=" {items: ['batch', 'cell', 'row', 'form', 'popup']}"/>
                <DxItem item-type="simple" data-field="editing.refreshMode" editor-type='dxSelectBox' :editor-options=" {items: ['full', 'reshape', 'repaint']}"/>
                <DxItem item-type="simple" data-field="editing.selectTextOnEditStart" editor-type="dxCheckBox"/>
                <DxItem item-type="simple" data-field="editing.startEditAction" editor-type='dxSelectBox' :editor-options=" {items: ['click', 'dblClick']}"/>

                <DxItem item-type="simple" data-field="editing.texts.addRow" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.cancelAllChanges" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.cancelRowChanges" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.confirmDeleteMessage" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.confirmDeleteTitle" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.deleteRow" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.editRow" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.saveAllChanges" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.saveRowChanges" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.undeleteRow" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.validationCancelChanges" editor-type="dxTextBox"/>
                <DxItem item-type="simple" data-field="editing.texts.useIcons" editor-type="dxTextBox"/>
            </dxItem>
            <DxItem item-type="simple" data-field="errorRowEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="export.allowExportSelectedData" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="export.enabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="export.excelFilterEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="export.excelWrapTextEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="export.fileName" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="export.ignoreExcelErrors" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="export.proxyUrl" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="export.texts.exportAll" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="export.texts.exportSelectedRows" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="export.texts.exportTo" editor-type="dxTextBox"/>

            <DxItem item-type="simple" data-field="filterPanel.customizeText" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="filterPanel.filterEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="filterPanel.texts.clearFilter" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="filterPanel.texts.createFilter" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="filterPanel.texts.filterEnabledHint" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="filterPanel.visible" editor-type="dxCheckBox"/>

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

            <DxItem item-type="simple" data-field="headerFilter.allowSearch" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="headerFilter.height" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="headerFilter.searchTimeout" editor-type="dxNumberBox"/>
            <DxItem item-type="simple" data-field="headerFilter.texts.cancel" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="headerFilter.texts.emptyValue" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="headerFilter.texts.ok" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="headerFilter.visible" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="headerFilter.width" editor-type="dxNumberBox"/>

            <DxItem item-type="simple" data-field="height" editor-type="dxTextBox"/>
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
            <DxItem item-type="simple" data-field="twoWayBindingEnabled" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="visible" editor-type="dxCheckBox"/>
            <DxItem item-type="simple" data-field="width" editor-type="dxTextBox"/>
            <DxItem item-type="simple" data-field="wordWrapEnabled" editor-type="dxCheckBox"/>
          </DxForm>
        </div>
        <DxButton
            width="100%"
            icon="preferences"
            stylingMode="text"
            type="default"
            :text.sync='buttonText'
            @click="showItemSetup"
        />
        <div class="form-container2">
          <DxForm
              ref="form2"
              :col-count="1"
              height="760"
              :scrollingEnabled="true"
              @field-data-changed="formFieldDataChanged"
          >
            <DxItem item-type="group" :visible="true" caption="Поле данных" :alignItemLabels="false" :col-count=1 >
              <DxItem item-type="simple" data-field='dataField' editor-type='dxSelectBox' :label= "{text: 'Имя поля' }" :editor-options= "{searchEnabled: true, items: fieldList }"/>
              <DxItem item-type="simple" data-field='dataType' editor-type='dxSelectBox' :label= "{text: 'Тип поля' }" :editor-options=" {items: [undefined, 'string', 'number', 'date', 'boolean', 'object', 'datetime']}"/>
              <DxItem item-type="simple" data-field='caption' editor-type="dxTextBox" :label= "{text: 'Заголовок колонки' }"/>
            </DxItem>
            <DxItem item-type="group" :visible="true" caption="Оформление колонки" :alignItemLabels="false" :col-count=1 >
              <DxItem item-type="simple" data-field='alignment' editor-type='dxSelectBox' :label= "{text: 'Выравнивание' }" :editor-options=" {items: [undefined, 'center', 'left', 'right']}"/>
              <DxItem item-type="simple" data-field='cellTemplate' editor-type="dxTextBox" :label= "{text: 'Шаблон ячейки' }"/>
              <DxItem item-type="simple" data-field='headerCellTemplate' :label= "{text: 'Шаблон заголовка' }"/>
              <DxItem item-type="simple" data-field='format' :label= "{text: 'Формат ячейки' }"
                      editor-type='dxSelectBox'
                      :editor-options=" {items: [undefined, 'billions', 'currency', 'day', 'decimal', 'exponential', 'fixedPoint', 'largeNumber',
                     'longDate', 'longTime', 'millions', 'millisecond', 'month', 'monthAndDay', 'monthAndYear', 'percent', 'quarter',
                      'quarterAndYear', 'shortDate', 'shortTime', 'thousands', 'trillions', 'year', 'dayOfWeek', 'hour', 'longDateLongTime', 'minute', 'second', 'shortDateShortTime']}"/>
              <DxItem item-type="simple" data-field='cssClass' editor-type="dxTextBox" :label= "{text: 'Имя стиля (CSS)' }"/>
              <DxItem item-type="simple" data-field='width' editor-type="dxTextBox" :label= "{text: 'Ширина колонки' }"/>
              <DxItem item-type="simple" data-field='minWidth' editor-type="dxNumberBox" :label= "{text: 'Минимальная ширина' }"/>
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
              <!--              <DxItem item-type="simple" data-field='isBand' editor-type="dxCheckBox" :editor-options="{disabled: true}"/>-->
              <!--              <DxItem item-type="simple" data-field='name' editor-type="dxTextBox" :editor-options="{disabled: true}"/>-->
              <!--              <DxItem item-type="simple" data-field='ownerBand' editor-type="dxNumberBox" :editor-options="{disabled: true}"/>-->
              <DxItem item-type="simple" data-field='validationRules' :label= "{text: 'Правила проверки значения' }" editor-type='dxSelectBox' :editor-options=" {items: [undefined,'RequiredRule', 'NumericRule', 'RangeRule', 'StringLengthRule', 'CustomRule', 'CompareRule', 'PatternRule', 'EmailRule', 'AsyncRule']}"/>
              <DxItem item-type="simple" data-field='sortOrder' editor-type='dxSelectBox' :label= "{text: 'Направление сортировки' }" :editor-options=" {items: [undefined, 'asc', 'desc']}"/>
              <DxItem item-type="simple" data-field='sortIndex' editor-type="dxNumberBox" :label= "{text: 'Индекс сортировки' }"/>
              <DxItem item-type="simple" data-field='trueText' editor-type="dxTextBox" :label= "{text: 'Текст значения TRUE' }"/>
              <DxItem item-type="simple" data-field='falseText' editor-type="dxTextBox" :label= "{text: 'Текст значения FALSE' }"/>
              <DxItem item-type="simple" data-field='type' editor-type='dxSelectBox'  :label= "{text: 'Тип колонки' }" :editor-options=" {items: [undefined,'adaptive', 'buttons', 'detailExpand', 'groupExpand', 'selection', 'drag']}"/>
              <!--              <DxItem item-type="simple" data-field='visibleIndex' editor-type="dxNumberBox"/>-->
            </DxItem>
          </DxForm>
        </div>
      </div>
    </template>
    <div class="form-container">
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
        <DxSorting mode="none"/>
        <template #header-cell-template="{ data }">
          <div class="cell-highlighted">
            {{ data.column.caption }}
          </div>
        </template>
        <template #cell-template="{ data }">
          <collectionGridTemplate
              :template-data=data
              :template-array="dataGridAttributes"
          />
        </template>
      </DxDataGrid>
    </div>
    </DxDrawer>
  </div>
</template>
<script>
import DxToolbar, { DxItem as ToolBarItem } from 'devextreme-vue/toolbar';
import DxDrawer from 'devextreme-vue/drawer';
import { DxForm, DxItem }  from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button';
import DxTagBox from 'devextreme-vue/tag-box';
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
import DxTreeView from 'devextreme-vue/tree-view';
import collectionGridTemplate from './collectionGridTemplate.vue';

import service from './data.js';

export default {
  components: {
    DxToolbar, ToolBarItem,
    DxDrawer,
    DxForm, DxButton, DxTagBox, DxItem,
    DxDataGrid, DxColumn, DxGrouping, DxGroupPanel, DxPager, DxPaging, DxSearchPanel, DxColumnChooser, DxSorting, DxEditing,
    DxTreeView,
    collectionGridTemplate
  },
  computed: {
    fieldList: function() {
      return Object.keys(this.dataSource[0]);
    }
  },
  mounted () {
    this.myForm2 = this.$refs.form2.instance;
    this.myForm3 = this.$refs.form3.instance;
    this.myGrid = this.$refs.grid.instance;
    this.myTreeView = this.$refs.treeview.instance;

    this.myGrid.option('columns', this.myColumns);
    this.myForm3.option('formData', this.myGrid.option());
    this.myForm3.option('visible',  this.myForm3.option('visible'));
    this.myForm2.option('formData', []);
    this.myForm3.option('visible',  !this.myForm3.option('visible'));

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
      isNotColumnSelect: true,
      globalIndex: 0,
      selectionColumn: null,
      dataSource: sales,
      myColumns: [],
      myTreeColumns: [],
      myGrid: null,
      myTreeView: null,
      myForm2: null,
      myForm3: null,
      selectedTreeItem: undefined,
      selectByClickValue: true,
      openState: true,
      buttonText: 'Параметры колонки',
      dataGridAttributes: [[{field: "docNumber", width: 100, cellTemplate:""},
                            {field: "docsNameKPM.name", width: 300, cellTemplate:"" },
                            {field: "kpmForcesAndFacilitiesLink", width: 250, cellTemplate:"cellTemplate"},
                            {field: "orgFoivDepartment.name", width: 100, cellTemplate:""}],
                            [{field: "name", width: 70, cellTemplate:""},
                             {field: "version", width: 170, cellTemplate:"" }]]
    };
  },
  methods: {
    myShow() {
      console.log(this.myGrid.option());
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
    gridCellClick(e) {
      if (e.rowType === 'header') {
        if (this.selectionColumn !== null) {
          this.selectionColumn.headerCellTemplate = undefined;
        }
        this.selectionColumn = this.findItemByKey(this.myColumns, e.column.name);
        this.myForm2.option('formData', this.selectionColumn);
        this.selectionColumn.headerCellTemplate = 'header-cell-template';
        this.buttonText = this.selectionColumn.caption;
        this.myGrid.option('columns', this.myColumns);
        this.myTreeView.selectItem(this.selectionColumn.name);
        this.isNotColumnSelect = false;
      }
    },
    selectItem(e) {
      if (this.selectionColumn !== null) {
        this.selectionColumn.headerCellTemplate = undefined;
      }
      this.selectionColumn = this.findItemByKey(this.myColumns, e.itemData.name);
      this.myForm2.option('formData', this.selectionColumn);
      this.selectionColumn.headerCellTemplate = 'header-cell-template';
      this.buttonText = this.selectionColumn.caption;
      this.myGrid.option('columns', this.myColumns);
      this.myTreeView.expandAll();
      this.isNotColumnSelect = false;
    },
    addMenuItems(e) {
      if (e.target === 'header') {
        if (!e.items) e.items = [];
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
        parent = this.findItemByKey(this.myTreeColumns, column.ownerName);
        parent.columns.splice(itemIndex, 1);
      } else {
        let itemIndex = this.myColumns.findIndex(el => el.name === column.name);
        this.myColumns.splice(itemIndex, 1);
        this.myTreeColumns.splice(itemIndex, 1);
      }
      this.selectionColumn = null;
      this.isNotColumnSelect = true;
      this.myForm2.option('formData', []);
      this.buttonText = 'Параметры колонки';
      this.myGrid.option('columns', this.myColumns);
      this.myTreeView.option('dataSource', this.myTreeColumns);
      this.myTreeView.expandAll();
    },
    addNewColumn(parent, fieldName) {
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
        width: undefined
      };
      let t = {
        id: g.id,
        parentId: g.parentId,
        name: g.name,
        caption: g.caption,
        columns: []
      }
      if (parent === null) {
        this.myColumns.push(g);
        this.myTreeColumns.push(t);
      } else {
        parent.isBand = true;
        g.ownerBand = parent.index;
        g.ownerName = parent.name;
        parent.columns.push(g);
        t.parentId = g.parentId;
        let treeParent = this.findItemByKey(this.myTreeColumns, parent.name);
        treeParent.columns.push(t);
      }
      this.myGrid.option('columns', this.myColumns);
      this.globalIndex = this.globalIndex+1;
      this.myTreeView.option('dataSource', this.myTreeColumns);
      this.myTreeView.expandAll();
      if (this.selectionColumn) {
        this.myTreeView.selectItem(this.selectionColumn.name);
      }
    },
    showFormSetup() {
      this.myForm3.option('visible',  !this.myForm3.option('visible'));
    },
    showItemSetup() {
      this.myForm2.option('visible',  !this.myForm2.option('visible'));
    },
    formFieldDataChanged(e) {
      if (this.selectionColumn !== null && e.component === this.myForm2 && this.myGrid.columnOption(this.selectionColumn.name, e.dataField) != e.value) {
        console.log('column - '+ e.dataField + ' = '+e.value);
        this.findItemByKey(this.myColumns, this.selectionColumn.name)[e.dataField] = e.value;
        if (e.dataField === 'caption') {this.findItemByKey(this.myTreeColumns, this.selectionColumn.name)[e.dataField] = e.value}
        this.myGrid.option('columns', this.myColumns);
        this.myTreeView.option('dataSource', this.myTreeColumns);
      }
      if (e.component === this.myForm3) {
        console.log('grid - '+ e.dataField + ' = '+e.value);
        this.myGrid.option(e.dataField, e.value);
        this.myGrid.repaint();
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

.dx-header-row .cell-highlighted {
  color: red;
  font-style: italic;
}

.container {
  width: 500px;
}

.form-container {
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
  border: 1px solid rgba(191, 191, 191, 0.25);
}

</style>
