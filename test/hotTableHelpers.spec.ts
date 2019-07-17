import {
  rewriteSettings,
  prepareSettings,
  propFactory
} from '../src/helpers';

describe('rewriteSettings', () => {
  it('should rewrite the settings element passed to the watchers to be a clean object prepared to use withing Handsontable config, when the input element is an object', () => {
    const fakeWatcher = () => {};
    fakeWatcher.prototype.sampleMethod = () => {};
    fakeWatcher.prototype.sampleProperty = null;

    const fakeWatcherInstance = new fakeWatcher();
    fakeWatcherInstance.testedProperty = null;
    fakeWatcherInstance.testedMethod = () => {};

    expect(typeof fakeWatcherInstance.sampleMethod).toEqual('function');
    expect(typeof fakeWatcherInstance.testedMethod).toEqual('function');
    expect(fakeWatcherInstance.sampleProperty).toEqual(null);
    expect(fakeWatcherInstance.testedProperty).toEqual(null);

    let cleanObject: any = rewriteSettings(fakeWatcherInstance);

    expect(typeof cleanObject.sampleMethod).toEqual('undefined');
    expect(typeof cleanObject.testedMethod).toEqual('function');
    expect(cleanObject.sampleProperty).toEqual(void 0);
    expect(cleanObject.testedProperty).toEqual(null);
    expect(Object.prototype.toString.call(cleanObject)).toEqual('[object Object]');
  });
});

describe('propFactory', () => {
  it('should generate an object containing all the available Handsontable properties and plugin hooks', () => {
    const props: any = propFactory();

    expect(typeof props.startRows).toEqual('object');
    expect(typeof props.startCols).toEqual('object');
    expect(typeof props.data).toEqual('object');
    expect(typeof props.fixedRowsTop).toEqual('object');
    expect(typeof props.afterCreateRow).toEqual('object');
    expect(typeof props.afterGetCellMeta).toEqual('object');
    expect(typeof props.beforeInit).toEqual('object');
    expect(typeof props.randomProp).toEqual('undefined');
  });
});

describe('prepareSettings', () => {
  it('should prepare the settings object to be used with Handsontable', () => {
    const onPrefixedPropObj = {
      'afterChange': {},
      'afterCellMetaReset': {},
      'afterChangesObserved': {},
      'afterContextMenuDefaultOptions': {},
      'beforeContextMenuSetItems': {},
      'afterDropdownMenuDefaultOptions': {},
      'beforeDropdownMenuSetItems': {},
      'afterContextMenuHide': {},
      'afterContextMenuShow': {},
      'afterCopyLimit': {},
      'beforeCreateCol': {},
      'afterCreateCol': {},
      'beforeCreateRow': {},
      'afterCreateRow': {}
    };

    const result: any = prepareSettings(onPrefixedPropObj);

    expect(typeof result.afterChange).toEqual('object');
    expect(typeof result.afterCellMetaReset).toEqual('object');
    expect(typeof result.afterChangesObserved).toEqual('object');
    expect(typeof result.afterContextMenuDefaultOptions).toEqual('object');
    expect(typeof result.beforeContextMenuSetItems).toEqual('object');
    expect(typeof result.afterDropdownMenuDefaultOptions).toEqual('object');
    expect(typeof result.beforeDropdownMenuSetItems).toEqual('object');
    expect(typeof result.afterContextMenuHide).toEqual('object');
    expect(typeof result.afterContextMenuShow).toEqual('object');
    expect(typeof result.afterCopyLimit).toEqual('object');
    expect(typeof result.beforeCreateCol).toEqual('object');
    expect(typeof result.afterCreateCol).toEqual('object');
    expect(typeof result.beforeCreateRow).toEqual('object');
    expect(typeof result.afterCreateRow).toEqual('object');

    expect(typeof result.randomPropName).toEqual('undefined');
  });

  it('should prepare the settings object to be used with Handsontable (when two objects are provided)', () => {
    const onPrefixedPropObj = {
      'afterChange': {},
      'afterCellMetaReset': {},
      'afterChangesObserved': {},
      'afterContextMenuDefaultOptions': {},
      'beforeContextMenuSetItems': {},
      'afterDropdownMenuDefaultOptions': {},
      'beforeDropdownMenuSetItems': {},
      'afterContextMenuHide': {}
    };

    const secondOnPrefixedPropObj = {
      'afterContextMenuHide': {},
      'afterContextMenuShow': {},
      'afterCopyLimit': {},
      'beforeCreateCol': {},
      'afterCreateCol': {},
      'beforeCreateRow': {},
      'afterCreateRow': {}
    };

    const result: any = prepareSettings(onPrefixedPropObj, secondOnPrefixedPropObj);

    expect(typeof result.afterChange).toEqual('object');
    expect(typeof result.afterCellMetaReset).toEqual('object');
    expect(typeof result.afterChangesObserved).toEqual('object');
    expect(typeof result.afterContextMenuDefaultOptions).toEqual('object');
    expect(typeof result.beforeContextMenuSetItems).toEqual('object');
    expect(typeof result.afterDropdownMenuDefaultOptions).toEqual('object');
    expect(typeof result.beforeDropdownMenuSetItems).toEqual('object');
    expect(typeof result.afterContextMenuHide).toEqual('object');
    expect(typeof result.afterContextMenuShow).toEqual('object');
    expect(typeof result.afterCopyLimit).toEqual('object');
    expect(typeof result.beforeCreateCol).toEqual('object');
    expect(typeof result.afterCreateCol).toEqual('object');
    expect(typeof result.beforeCreateRow).toEqual('object');
    expect(typeof result.afterCreateRow).toEqual('object');

    expect(typeof result.randomPropName).toEqual('undefined');
  });
});
