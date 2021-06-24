import CustomStore from 'devextreme/data/custom_store'
import { filterDataToRql } from './filterAdapter'
import { ComponentSource } from './ComponentSource'

/**
 * @class
 * @classdesc Класс для источника данных DevExtreme-компнента DataGrid.
 */
export default class DataGridSource extends ComponentSource {
  /**
   * Возможные опции загрузки
   * @type {Array<String>}
   * */
  availableOptions

  /**
   * Хэш для функций преобразования load options в опции rql
   * @type {Object}
   * */
  rqlOptionsMapping

  /**
   * Returns new DataGridSource
   * @param element
   * @return {*}
   * */
  constructor(element) {
    super(element)

    this.availableOptions = [
      'skip',
      'take',
      'requireTotalCount',
      'requireGroupCount',
      'sort',
      'filter',
      'totalSummary',
      'group',
      'groupSummary'
    ]

    this.rqlOptionsMapping = {
      // Устанавливает опцию $order
      sort(loadOptions, query) {
        query.$order = loadOptions.sort.map(sortOption => {
          return {
            path: sortOption.selector,
            direction: sortOption.desc ? 'desc' : 'asc'
          }
        })
      },

      // Устанавливает опцию $offset
      skip(loadOptions, query) {
        query.$offset = loadOptions.skip
      },

      // group
      group(loadOptions, query) { },

      // Устанавливает опцию $limit
      take(loadOptions, query) {
        query.$limit = loadOptions.take
      },

      // Устанавливает фильтр $where
      filter(loadOptions, query) {
        query.$where = filterDataToRql(loadOptions.filter)
      },

      // Заглушка, такой rql-опции нет
      requireTotalCount(loadOptions) { },

      // Заглушка, такой rql-опции нет
      requireGroupCount(loadOptions) { },

      groupSummary(loadOptions) { },

      totalSummary(loadOptions) { }
    }
  }

  /**
   * Возвращает хранилище customStore для элемента,
   * переданного в качестве первого параметра
   * @param {Object} element - элемент для которого создается хранилище
   * @param that - контекст
   * @return {CustomStore}
   */
  createCustomStore(element, that = this) {
    const customStore = new CustomStore({
      key: 'id',

      // Получение общего количества записей
      async totalCount() {
        const label = `${element.resource.label}`
        const url = `/arctic/api/graph/rql?type=${label}&count=true`
        let response = await fetch(url, {
          body: `{$type: '${label}', $count}`,
          method: 'post'
        })
        let result = await response.json()
        return result[0]
      },

      // Загрузка хранилища
      async load(loadOptions) {
        // rql-запрос
        let query = element.query({
          limitContextPath: '$limit',
          offsetContextPath: '$offset',
          countContextPath: '$count'
        })

        // Формирование массива опций для rql-запроса
        that.availableOptions.forEach(option => {
          if (option in loadOptions && that.isNotEmpty(loadOptions[option])) {
            that.rqlOptionsMapping[option](loadOptions, query)
          }
        })

        let response = await query.$get()
        const result = response.map(x => that.transformCollectionAttributes(x))
        return result
      }
    })
    return customStore
  }

  /**
   * Возвращает булево значение зависимо от того
   * равен ли аргумент null/undefined/''
   * @param {any} value
   * @return {boolean}
   */
  isNotEmpty(value) {
    return value !== undefined && value !== null && value !== ''
  }

  /**
   * Преобразование атрибутов-коллекций объекта вида
   * collectionAttribute: [ {id: '123'}, {id: '456'}, {id: '789',} ]
   * к виду collectionAttribute: { id: ['123', '456', '789'] }
   * @param {Object} sourceObject - исходный объект
   * @return {Object} - объект с измененной структурой атрибутов-коллекций
   * */
  transformCollectionAttributes(sourceObject) {
    // Результирующий объект с измененными атрибутами-коллекциями
    const result = {}

    // Обход корневых свойств исходного объекта
    for (let rootKey in sourceObject) {
      const attribute = sourceObject[rootKey]

      if (Array.isArray(attribute)) {
        // Если свойство является атрибутом-коллекцией объявить его как объект
        result[rootKey] = {}

        // Обход свойств атрибута-коллекции (берутся свойства первого элемента)
        // Считается что структура всех элементов одинакова
        for (let innerKey in attribute[0]) {
          // Формирование массива для каждого свойства из значений всех свойств
          // содержащих атрибуты-коллекции и его запись по ключу (имени свойства)
          result[rootKey][innerKey] = sourceObject[rootKey].map(element => {
            if (element[innerKey] && element[innerKey].constructor.name === 'Object') {
              // Если свойство является объектом вернуть его поле name
              return element[innerKey].name
            } else {
              // Если свойство является примитивом вернуть его значение
              return element[innerKey] && element[innerKey]
                ? element[innerKey][0].name
                : element[innerKey]
            }
          })
        }
      } else {
        // Если свойство НЕ является аттрибутом-коллекцией скопировать его
        result[rootKey] = sourceObject[rootKey]
      }
    }
    return result
  }
}
