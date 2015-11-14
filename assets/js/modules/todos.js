define(['jquery','vue', 'handle-store'], function ($, Vue, handleStore) {
  var taskList = new Vue({
    el : '.task-list',
    data : {
      list: handleStore({ get: true }).map(function (item) {
        item.isShowDelete = false;
        item.isShowTaskMask = true;
        return item;
      }),
      prevItemIndex : null,
      itemIndex : null,
      node : null,
      isInputing : false,
      inputIndex : null,
      prevInputIndex : null
    },
    ready : function () {
      this.node = $(this.$el);
      this.node.on('mouseenter', 'li.task-item', this.handleEnter);
      this.node.on('dblclick', 'div.task-mask', this.hideTaskMask);
    },
    methods : {
      showTaskMask : function (e) {
        var index = this.findItemIndex(e);
        var itemData = this.findItemData(index);
        itemData.isShowTaskMask = true;
        if (itemData.isCompleted) {
          e.preventDefault();
          return false;
        }
        // itemData.isShowDelete = true;

        this.findItemInput(index)
        .toggleClass('active')
        .blur();

        if (!e.changeInput) {
          this.inputIndex = null;
          this.prevInputIndex = null;
        } else {
          if (this.prevInputIndex != null) {
            this.findItemData(this.prevInputIndex).isShowDelete = false;
          }
        }
        itemData.isCompleted = true;
        itemData.isShowTaskMask = true;
        this.isInputing = false;
        this.freshIndex();
        return false;
      },
      hideTaskMask : function (e) {
        var index = this.findItemIndex(e);
        var itemData = this.findItemData(index);
        if (itemData.isCompleted) {
          return false;
        }
        this.inputIndex = index;

        if (this.isInputing && this.prevInputIndex != null) {
          var prevInput = this.findItemInput(this.prevInputIndex)[0];
          this.showTaskMask.call(this, {
            target : prevInput,
            changeInput : true
          });
        }

        itemData.isShowDelete = false;
        itemData.isShowTaskMask = false;

        this.findItemInput(index)
        .toggleClass('active')
        .focus();

        this.isInputing = true;
        this.prevInputIndex = index;
        return false;
      },
      handleEnter : function (e) {
        var index = this.findItemIndex(e);
        this.itemIndex = index;

        var itemData = this.findItemData(index);
        if (!itemData.isShowDelete && this.itemIndex !== this.inputIndex)
          itemData.isShowDelete = true;

        var prevItemData;
        if (this.prevItemIndex != null) {
          prevItemData = this.findItemData(this.prevItemIndex);
          if (prevItemData.isShowDelete)
            prevItemData.isShowDelete = false;
        }

        this.prevItemIndex = this.itemIndex;
        return false;
      },
      hideDelete: function (itemData) {
        itemData && (itemData.isShowDelete = false);
      },
      resetItemIndex : function () {
        this.prevItemIndex = null;
        this.itemIndex = null;
      },
      findItemData : function (index) {
        return this.$data.list[index];
      },
      findItemInput : function (index) {
        return this.node.find('li[index="' + index + '"]')
          .find('.task-main')
          .find('input');
      },
      findItemIndex : function (e) {
        var parentNode = e.target;
        while (parentNode && parentNode.tagName !== 'LI') {
          parentNode = parentNode.parentNode;
        }
        return $(parentNode).attr('index');
      },
      helpTaskListFindItem : function (e) {
        var index = taskList.$data.itemIndex;
        if (index != null) {
          var itemData = taskList.findItemData(index);
          if (itemData) {
            taskList.hideDelete(itemData);
          }
          taskList.resetItemIndex();
        }
        return false;
      },
      addItem : function (item) {
        if (typeof item === 'string') {
          item = {
            inputs: item,
            isShowDelete: false,
            isShowTaskMask: true,
            isCompleted : false
          };
        }
        this.list.push(item);
        this.renderOne(this.list.length - 1);
        this.freshIndex();
      },
      deleteItem : function (e) {
        var prev = this.list.length;
        if (e == null) {
          this.list = this.list.filter(function (item) {
            return !item.isCompleted;
          });
        } else {
          var index = this.findItemIndex(e);
          this.list.splice(index, 1);
        }

        if (prev !== this.list.length)
          this.freshIndex();
      },
      completeItem : function (e) {
        if (this.isInputing) {
          e.preventDefault();
          return false;
        }

        var index = this.findItemIndex(e);
        var item = this.findItemData(index);
        item.isCompleted = !item.isCompleted;
        this.renderOne(index);
        this.freshIndex(true);
        return false;
      },
      getActiveLength : function () {
        return this.list.filter(function (item) {
          return !item.isCompleted;
        }).length;
      },
      freshIndex : function (noFresh) {
        if (!noFresh) {
          this.node.find('li.task')
          .each(function (index) {
            $(this).attr('index', index);
          });
          handleStore({ set: true, list: this.list });
        }
        taskInfo.activeLength = this.getActiveLength();
      },
      showItems : function () {
        var self = this;
        this.node.find('li.task').each(self.renderOne.bind(self));
      },
      renderOne : function (i) {
        var ret = taskInfo.activeIndex == 1 //active
          ? !this.list[i].isCompleted
          : taskInfo.activeIndex == 2 // completed
          ? this.list[i].isCompleted
          : true;
        ret && this.node.find('li[index="'+i+'"]').show();
        !ret && this.node.find('li[index="'+i+'"]').hide();
      },
      toggleAll : function (e) {
        if (taskList.isInputing)
          return false;

        taskList.list.forEach(function (item, index) {
          taskList.node
          .find('li[index="'+index+'"]')
          .find('input[type="checkbox"]')
          .trigger('click');
        });
        taskInput.isActive = !taskInput.isActive;
        return false;
      }
    }
  });

  var taskInput = new Vue({
    el : '.task-input',
    data : {
      inputs : '',
      isActive : false
    },
    methods : {
      toggleAll : taskList.toggleAll,
      inputsDone : function (value) {
        if (value)
          taskList.addItem(value);
        this.inputs = '';
        return false;
      },
      handleEnter : taskList.helpTaskListFindItem
    }
  });

  var taskInfo = new Vue({
    el : '.task-info',
    data : {
      activeLength : taskList.getActiveLength(),
      list : ['All', 'Active', 'Compeleted'],
      activeIndex: 0,
      clearKey : 'Clear completed'
    },
    methods : {
      handleEnter : taskList.helpTaskListFindItem,
      toggle : function (index) {
        this.activeIndex = index;
        taskList.showItems();
        return false;
      },
      clearCompleted: function () {
        taskList.deleteItem();
        return false;
      }
    }
  });

  return {
    taskList: taskList,
    taskInput: taskInput,
    taskInfo: taskInfo
  };
});