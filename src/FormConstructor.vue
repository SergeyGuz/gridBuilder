<template>
  <div style="width: 200px">
    <DxTreeView
        id="treeview"
        :ref="treeViewRef"
        :items="items"
        :width="300"
        display-expr = 'itemType'
        @item-click="selectItem"
        @item-context-menu="treeViewItemContextMenu"
        class="panel-list dx-theme-accent-as-background-color"
    />
    <DxContextMenu
        :ref="contextMenuRef"
        :data-source="menuItems"
        target="#treeview .dx-treeview-item"
        @item-click="contextMenuItemClick"
    />
  </div>
</template>
<script>
import DxTreeView from 'devextreme-vue/tree-view';
import DxContextMenu from 'devextreme-vue/context-menu';
import service from './data.js';

const treeViewRef = 'treeView';
const contextMenuRef = 'contextMenu';

export default {
  components: {
    DxTreeView,
    DxContextMenu
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const menuItems = service.getmenuItems();
    const groupNode = service.getgroupNode();
    const simpleNode = service.getsimpleNode();
    return {
      menuItems,
      groupNode,
      simpleNode,
      selectedTreeItem: undefined,
      treeViewRef,
      contextMenuRef
    };
  },
  computed: {
    treeView: function() {
      return this.$refs[treeViewRef].instance;
    },
    contextMenu: function() {
      return this.$refs[contextMenuRef].instance;
    }
  },
  methods: {
    selectItem(e) {
      console.log(e.node);
    },
    treeViewItemContextMenu(e) {
      this.selectedTreeItem = e;

      const isGroup = e.itemData.itemType === 'group';
      const isSimple = e.itemData.itemType === 'simple';
      const isButton = e.itemData.itemType === 'button';

      this.contextMenu.option('items[0].visible', isGroup);
      this.contextMenu.option('items[1].visible', isGroup);
      this.contextMenu.option('items[2].visible', isSimple || isButton);
      this.contextMenu.option('items[3].visible', isSimple || isButton);

      this.contextMenu.option('items[0].disabled', e.node.expanded);
      this.contextMenu.option('items[1].disabled', !e.node.expanded);
    },
    contextMenuItemClick(e) {
      let name = this.selectedTreeItem.itemData.name;
//      let parentName = this.selectedTreeItem.parent;
//      let index = parent.findIndex(element => element.name === name);

      console.log(this.selectedTreeItem);

      switch(e.itemData.id) {
        case 'expand': {
          this.treeView.expandItem(this.selectedTreeItem.node.key);
          break;
        }
        case 'collapse': {
          this.treeView.collapseItem(this.selectedTreeItem.node.key);
          break;
        }
        case 'addGroup': {
          break;
        }
        case 'addSimple': {
          break;
        }
        case 'delete': {
          console.log(parent);
          console.log(name);
//          console.log(index);

//          this.treeView.items[this.selectedTreeItem.node.parent.key].items.splice(this.selectedTreeItem.node.key, 1);
          break;
        }
      }
    }
  }
};
</script>
<style scoped>

</style>
