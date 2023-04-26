import enUS from '../Localization/en-US.json';
import esES from '../Localization/es-ES.json';

type localizationObjectType = {
  [key: string]: {
    [key: string]: string;
  };
};

const initLocalizationObject = (): localizationObjectType => {
  // const localizations = require.context('../Localization', false, /\.json$/);

  // const localizationObject: localizationObjectType = {};
  // localizations.keys().forEach((item: string) => {
  //   let localizationKey = item.replace(/\.\/(\w+-\w+)\.json$/, '$1');
  //   const localization = require(`../Localization/${localizationKey}`);

  //   localizationObject[localizationKey] = localization;
  // });
  const localizationObject: localizationObjectType = {};
  localizationObject['en-US'] = enUS;
  localizationObject['es-ES'] = esES;
  return localizationObject;
};

export const localizationObject = initLocalizationObject();
