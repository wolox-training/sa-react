import i18next from 'i18next';

// eslint-disable-next-line no-undef
function requireAll(requireContext: __WebpackModuleApi.RequireContext) {
  return requireContext.keys().map(requireContext);
}

i18next.init({
  lng: 'es',
  initImmediate: false
});

requireAll(require.context('..', true, /i18n\.(js|ts)$/));
